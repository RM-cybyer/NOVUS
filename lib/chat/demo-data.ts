import type { ChatSession, ChatMessage, ChatContext } from "./types";

/** Deterministic demo session for Sprint 2. */
export function createDemoSession(): ChatSession {
  const now = Date.now();
  const messages: ChatMessage[] = [
    {
      id: "msg-1",
      role: "assistant",
      content: "Hola. Soy Novus, tu sistema operativo para la vida, las finanzas y los negocios. No soy un chatbot: estoy aquí para ayudarte a tomar mejores decisiones entendiendo tu contexto completo —metas, dinero, agenda, proyectos, hábitos—.\n\n¿En qué te gustaría que empecemos hoy?",
      timestamp: now - 86400000,
      metadata: {
        alias: "nova-reasoning",
        providerId: "nim",
        latencyMs: 842,
        tokens: { promptTokens: 124, completionTokens: 87, totalTokens: 211 },
        costUsd: 0.00012,
      },
    },
    {
      id: "msg-2",
      role: "user",
      content: "Quiero revisar mi fondo de emergencia",
      timestamp: now - 86390000,
    },
    {
      id: "msg-3",
      role: "assistant",
      content: "Tu fondo de emergencia está en $400 de $3 000 (13 %). Lleva 45 días sin aportes —riesgo de estancamiento.\n\nOportunidad detectada: la factura vencida de SIGBE ($800) cubre el aporte del mes sin tocar tu colchón. Si la cobras hoy, el fondo sube al 40 %.\n\n¿Quieres que te ayude a redactar el recordatorio de cobro o prefieres ver el plan de aportes mensual?",
      timestamp: now - 86389000,
      metadata: {
        alias: "nova-reasoning",
        providerId: "nim",
        latencyMs: 1105,
        tokens: { promptTokens: 298, completionTokens: 156, totalTokens: 454 },
        costUsd: 0.00028,
      },
    },
  ];

  return {
    id: "demo-session-1",
    title: "Bienvenida a Novus",
    createdAt: now - 86400000,
    updatedAt: now,
    messageCount: messages.length,
    messages,
    context: {
      userProfile: { name: "Rafnell", focus: "Cerrar la propuesta de Atropos y mantener Compras bajo control" },
      activeGoals: [
        { id: "g1", name: "Capital Finexy", target: 5000, saved: 2780, deadlineLabel: "dic 2026", atRisk: false },
        { id: "g2", name: "Fondo de emergencia", target: 3000, saved: 400, deadlineLabel: "mar 2027", atRisk: true },
      ],
      financialSummary: {
        income: 3050,
        expenses: 2465,
        cashFlow: 585,
        savingsRate: 0.28,
      },
      upcomingEvents: [
        { id: "a1", title: "Llamada con Atropos Labs - propuesta", timeLabel: "10:00", kind: "reunion" },
        { id: "a2", title: "Factura SIGBE vencida - $800", timeLabel: "vencido", kind: "pago" },
        { id: "a3", title: "Enviar reporte semanal a Moira", timeLabel: "15:00", kind: "recordatorio" },
        { id: "a4", title: "Cena familiar", timeLabel: "20:30", kind: "compromiso" },
      ],
      recentMemories: [
        { kind: "decision", text: "Acepto apartar $280 a Capital Finexy" },
        { kind: "dato", text: "Cobra freelance los días 15" },
        { kind: "preferencia", text: "Prefiere resúmenes cortos con cifras" },
      ],
    },
  };
}