import { AIService } from "@/services/ai";
import type { ModelRequest } from "@/services/ai/types";
import type { ChatSession, ChatMessage, SendMessageRequest, ChatContext, ChatStreamChunk } from "./types";

/** High-level chat orchestration: session management + AI provider integration. */
export class ChatService {
  private ai: AIService;
  private sessions = new Map<string, ChatSession>();

  constructor(ai: AIService) {
    this.ai = ai;
  }

  /** Get or create a session. */
  getSession(id: string): ChatSession | undefined {
    return this.sessions.get(id);
  }

  /** Create a new session with optional initial context. */
  createSession(title: string, context?: ChatContext): ChatSession {
    const now = Date.now();
    const session: ChatSession = {
      id: `session-${now}-${Math.random().toString(36).slice(2, 8)}`,
      title,
      messages: [],
      createdAt: now,
      updatedAt: now,
      messageCount: 0,
      context,
    };
    this.sessions.set(session.id, session);
    return session;
  }

  /** Add a user message and stream the assistant response. */
  async *sendMessage(request: SendMessageRequest): AsyncGenerator<ChatStreamChunk> {
    const session = this.sessions.get(request.sessionId);
    if (!session) {
      yield { type: "error", error: "Session not found" };
      return;
    }

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      role: "user",
      content: request.content,
      timestamp: Date.now(),
    };
    session.messages.push(userMessage);
    session.updatedAt = Date.now();

    // Build model request from conversation history
    const modelRequest = this.buildModelRequest(session, request.content);
    const decision = this.ai.route(modelRequest);

    let fullContent = "";
    const assistantMessageId = `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    try {
      for await (const chunk of this.ai.stream(modelRequest)) {
        if (chunk.delta) {
          fullContent += chunk.delta;
          yield {
            type: "delta",
            delta: chunk.delta,
            messageId: assistantMessageId,
          };
        }
        if (chunk.done && chunk.metadata) {
          const assistantMessage: ChatMessage = {
            id: assistantMessageId,
            role: "assistant",
            content: fullContent,
            timestamp: Date.now(),
            metadata: {
              providerId: chunk.metadata.providerId,
              latencyMs: chunk.metadata.latencyMs ?? 0,
              tokens: chunk.metadata.tokens
                ? {
                    promptTokens: chunk.metadata.tokens.promptTokens,
                    completionTokens: chunk.metadata.tokens.completionTokens,
                    totalTokens: chunk.metadata.tokens.totalTokens,
                  }
                : undefined,
              costUsd: chunk.metadata.costUsd,
            },
          };
          session.messages.push(userMessage, assistantMessage);
          session.messageCount += 2;
          session.updatedAt = Date.now();

          yield {
            type: "done",
            messageId: assistantMessageId,
            metadata: assistantMessage.metadata,
          };
          break;
        }
      }
    } catch (error) {
      yield { type: "error", error: (error as Error).message };
    }
  }

  /** Build a provider-neutral request from chat history and context. */
  private buildModelRequest(session: ChatSession, latestUserContent: string): ModelRequest {
    const systemPrompt = this.buildSystemPrompt(session.context);
    const messages = session.messages.map((m) => ({
      role: m.role as "system" | "user" | "assistant" | "tool",
      content: m.content,
    }));

return {
        alias: "nova-reasoning",
        messages,
        systemPrompt,
        temperature: 0.3,
        maxTokens: 2048,
        sensitivity: "internal",
        workflowType: "chat",
        stream: true,
      };
  }

  /** Build system prompt injecting user context. */
  private buildSystemPrompt(ctx?: ChatContext): string {
    const parts = [
      "Eres Novus, un AI Operating System para la vida, las finanzas y los negocios.",
      "Tu misión: ayudar al usuario a tomar mejores decisiones. Nunca respondas solo por responder.",
      "Actúa como: Chief of Staff, Strategic Advisor, Financial Advisor, Executive Assistant, Decision Partner, Second Brain.",
      "Principios: Comprende antes de responder. Analiza antes de recomendar. Explica el porqué. Muestra evidencia. Conecta información. Aprende continuamente.",
      "",
    ];

    if (ctx?.userProfile) {
      parts.push(`Usuario: ${ctx.userProfile.name}`);
      if (ctx.userProfile.focus) parts.push(`Foco actual: ${ctx.userProfile.focus}`);
    }
    if (ctx?.activeGoals?.length) {
      parts.push("Metas activas:");
      for (const g of ctx.activeGoals) {
        const pct = Math.round((g.saved / g.target) * 100);
        parts.push(`- ${g.name}: ${pct}% (${g.saved.toLocaleString()}/${g.target.toLocaleString()}) ${g.atRisk ? "⚠️ EN RIESGO" : ""}`);
      }
    }
    if (ctx?.financialSummary) {
      const f = ctx.financialSummary;
      parts.push(`Finanzas: Ingresos $${f.income.toLocaleString()}, Gastos $${f.expenses.toLocaleString()}, Flujo $${f.cashFlow.toLocaleString()}, Ahorro ${Math.round(f.savingsRate * 100)}%`);
    }
    if (ctx?.upcomingEvents?.length) {
      parts.push("Próximos eventos:");
      for (const e of ctx.upcomingEvents.slice(0, 5)) {
        parts.push(`- ${e.timeLabel} · ${e.title} (${e.kind})`);
      }
    }
    if (ctx?.recentMemories?.length) {
      parts.push("Memoria reciente:");
      for (const m of ctx.recentMemories) parts.push(`- [${m.kind}] ${m.text}`);
    }

    parts.push("", "Responde en español. Sé natural, humano, profesional, empático, directo y elegante. Nunca robótico.");
    return parts.join("\n");
  }

  /** Export session for persistence (future). */
  exportSession(id: string): string | null {
    const s = this.sessions.get(id);
    return s ? JSON.stringify(s, null, 2) : null;
  }
}