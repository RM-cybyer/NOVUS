import type { DashboardSnapshot } from "./types";

/** Local, deterministic snapshot provider.
    INTEGRATION SEAM: replace the body with the real data layer
    (Supabase + runtime engines) keeping the same signature. */
export async function getDashboardSnapshot(): Promise<DashboardSnapshot> {
  return {
    userName: "Rafnell",
    focus: "Cerrar la propuesta de Atropos y mantener Compras bajo control",
    briefing: {
      summary:
        "Buen punto de partida hoy: tu capital invertible es $560 y la tasa de ahorro va en 28%, tu mejor marca en 6 meses. Dos cosas piden decision.",
      items: [
        {
          kind: "finance-alert",
          text: "Compras va $640 sobre tu mes tipico. Recortar la mitad libera $320 para tu meta.",
          actionLabel: "Ver gastos",
          actionHref: "/movimientos",
        },
        {
          kind: "goal-risk",
          text: "Fondo de emergencia lleva 45 dias sin aportes - riesgo de estancarse.",
          actionLabel: "Revisar meta",
          actionHref: "/metas",
        },
        {
          kind: "opportunity",
          text: "La factura vencida de SIGBE ($800) cubre el aporte del mes sin tocar tu colchon.",
          actionLabel: "Ir a negocio",
          actionHref: "/negocio",
        },
      ],
    },
    priorities: [
      { id: "p1", title: "Enviar propuesta a Atropos Labs", priority: "alta", done: false, estimatedMinutes: 45, aiSuggested: false },
      { id: "p2", title: "Recordatorio de cobro a SIGBE", priority: "alta", done: false, estimatedMinutes: 10, aiSuggested: true },
      { id: "p3", title: "Revisar suscripciones sin uso (3)", priority: "media", done: false, estimatedMinutes: 15, aiSuggested: true },
      { id: "p4", title: "Registrar gastos del fin de semana", priority: "baja", done: true, estimatedMinutes: 5, aiSuggested: false },
    ],
    finance: {
      income: 3050,
      expenses: 2465,
      cashFlow: 585,
      savingsRate: 0.28,
      budgetUsed: 0.78,
      trend: [310, 420, 380, 520, 460, 610, 540, 585],
      categories: [
        { name: "Compras", amount: 820, share: 1, anomaly: { overBy: 640 } },
        { name: "Hogar", amount: 700, share: 0.85 },
        { name: "Comida", amount: 413, share: 0.5 },
      ],
    },
    goals: [
      {
        id: "g1",
        name: "Capital Finexy",
        target: 5000,
        saved: 2780,
        deadlineLabel: "dic 2026",
        prediction: "Se completa ~7 dias antes de lo planeado",
        atRisk: false,
      },
      {
        id: "g2",
        name: "Fondo de emergencia",
        target: 3000,
        saved: 400,
        deadlineLabel: "mar 2027",
        prediction: "En riesgo: sin aportes en 45 dias",
        atRisk: true,
      },
    ],
    business: {
      monthRevenue: 4850,
      pendingInvoices: { count: 2, amount: 1200 },
      activeClients: 4,
      activeProjects: 3,
      opportunity: "Moira Studio concentra el 49% del ingreso - diversificar el pipeline reduce tu riesgo.",
    },
    memories: [
      { kind: "decision", text: "Acepto apartar $280 a Capital Finexy" },
      { kind: "dato", text: "Cobra freelance los dias 15" },
      { kind: "preferencia", text: "Prefiere resumenes cortos con cifras" },
    ],
    suggestedMemory: "Su renta sube en septiembre - conviene recordarlo al planear agosto?",
    notifications: [
      { id: "n1", tag: "Resumen", kind: "accent", body: "Tu resumen matutino esta listo: una decision pendiente.", timeLabel: "08:00" },
      { id: "n2", tag: "Anomalia", kind: "danger", body: "Compras supero tu patron mensual en $640.", timeLabel: "ayer" },
      { id: "n3", tag: "Meta", kind: "accent", body: "Capital Finexy llego al 56% - 7 dias adelantado.", timeLabel: "ayer" },
      { id: "n4", tag: "Negocio", kind: "danger", body: "Factura de SIGBE vencida hace 6 dias ($800).", timeLabel: "lun" },
    ],
  };
}
