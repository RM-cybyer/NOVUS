import type { ModelRequest } from "@/services/ai/types";
import type { DashboardSnapshot } from "@/lib/dashboard/types";
import type { ChatContext } from "./types";

/** Wire format for a turn sent to /api/chat. Deliberately smaller than
    the UI ChatMessage: ids, timestamps and cards never reach the model. */
export interface ChatTurn {
  role: "user" | "assistant";
  content: string;
}

/** Turns older than this are dropped before the request is built.
    Keeps prompt cost bounded until real summarization exists. */
export const MAX_HISTORY_TURNS = 10;

/** Project the dashboard snapshot into the chat's context shape.
    INTEGRATION SEAM: when Supabase replaces demo-data, only the snapshot
    provider changes -- this mapping stays. */
export function dashboardToChatContext(snapshot: DashboardSnapshot): ChatContext {
  return {
    userProfile: { name: snapshot.userName, focus: snapshot.focus },
    activeGoals: snapshot.goals.map((g) => ({
      id: g.id,
      name: g.name,
      target: g.target,
      saved: g.saved,
      deadlineLabel: g.deadlineLabel,
      atRisk: g.atRisk,
    })),
    financialSummary: {
      income: snapshot.finance.income,
      expenses: snapshot.finance.expenses,
      cashFlow: snapshot.finance.cashFlow,
      savingsRate: snapshot.finance.savingsRate,
    },
    upcomingEvents: snapshot.agenda.map((a) => ({
      id: a.id,
      title: a.title,
      timeLabel: a.timeLabel,
      kind: a.kind,
    })),
    recentMemories: snapshot.memories.map((m) => ({ kind: m.kind, text: m.text })),
  };
}

const IDENTITY = [
  "Eres Novus, un AI Operating System para la vida, las finanzas y los negocios.",
  "Tu mision: ayudar al usuario a tomar mejores decisiones. Nunca respondas solo por responder.",
  "Actuas como Chief of Staff, Strategic Advisor, Financial Advisor, Executive Assistant, Decision Partner y Second Brain.",
  "Principios: comprende antes de responder, analiza antes de recomendar, explica el porque, muestra la evidencia y conecta informacion entre areas.",
];

const STYLE = [
  "Responde en espanol, en tono natural, humano, profesional y directo. Nunca robotico.",
  "Usa las cifras concretas del contexto cuando respalden tu analisis. No inventes datos que no esten en el contexto.",
  "Si no tienes un dato, dilo y explica que necesitarias para responder bien.",
];

/** Build the system prompt, injecting whatever context is available. */
export function buildSystemPrompt(ctx?: ChatContext): string {
  const parts = [...IDENTITY, ""];

  if (ctx?.userProfile) {
    parts.push(`Usuario: ${ctx.userProfile.name}`);
    if (ctx.userProfile.focus) parts.push(`Foco actual: ${ctx.userProfile.focus}`);
    parts.push("");
  }

  if (ctx?.financialSummary) {
    const f = ctx.financialSummary;
    parts.push(
      `Finanzas del mes: ingresos $${f.income.toLocaleString("es")}, ` +
        `gastos $${f.expenses.toLocaleString("es")}, ` +
        `flujo $${f.cashFlow.toLocaleString("es")}, ` +
        `tasa de ahorro ${Math.round(f.savingsRate * 100)}%.`,
    );
  }

  if (ctx?.activeGoals?.length) {
    parts.push("Metas activas:");
    for (const g of ctx.activeGoals) {
      const pct = g.target > 0 ? Math.round((g.saved / g.target) * 100) : 0;
      const risk = g.atRisk ? " [EN RIESGO]" : "";
      parts.push(
        `- ${g.name}: ${pct}% ($${g.saved.toLocaleString("es")} de ` +
          `$${g.target.toLocaleString("es")}), meta ${g.deadlineLabel}${risk}`,
      );
    }
  }

  if (ctx?.upcomingEvents?.length) {
    parts.push("Agenda proxima:");
    for (const e of ctx.upcomingEvents.slice(0, 5)) {
      parts.push(`- ${e.timeLabel} - ${e.title} (${e.kind})`);
    }
  }

  if (ctx?.recentMemories?.length) {
    parts.push("Lo que Novus recuerda del usuario:");
    for (const m of ctx.recentMemories) parts.push(`- [${m.kind}] ${m.text}`);
  }

  parts.push("", ...STYLE);
  return parts.join("\n");
}

/** Build a provider-neutral request from the conversation and context. */
export function buildChatRequest(turns: ChatTurn[], ctx?: ChatContext): ModelRequest {
  return {
    modelAlias: "nova-reasoning",
    messages: turns.slice(-MAX_HISTORY_TURNS).map((t) => ({
      role: t.role,
      content: t.content,
    })),
    systemPrompt: buildSystemPrompt(ctx),
    // Tuned for a reasoning model: enough room to think, and sampling loose
    // enough that answers read as considered rather than canned.
    temperature: 0.6,
    topP: 0.95,
    maxTokens: 8192,
    reasoningBudget: 4096,
    sensitivity: "internal",
    workflowType: "chat",
    stream: true,
  };
}
