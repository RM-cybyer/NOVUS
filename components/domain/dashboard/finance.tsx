"use client";

import { TrendingUp } from "lucide-react";
import type { BusinessSummary, FinanceOverview } from "@/lib/dashboard/types";
import { SectionCard } from "@/components/composition/section-card";
import { Sparkline } from "@/components/primitives/sparkline";
import { ProgressBar } from "@/components/primitives/progress-bar";
import { cn } from "@/lib/utils/cn";

const usd = (n: number) => "$" + n.toLocaleString("en-US");

function Stat({ label, value, tone }: { label: string; value: string; tone?: "accent" }) {
  return (
    <div className="flex min-w-0 flex-col gap-0.5">
      <span className="text-[10px] font-bold uppercase tracking-(--letter-spacing-caps) text-(--color-text-tertiary)">
        {label}
      </span>
      <span
        className={cn(
          "font-display truncate text-lg font-semibold tracking-(--letter-spacing-title)",
          tone === "accent" ? "text-(--color-accent-text)" : "text-(--color-text-primary)",
        )}
      >
        {value}
      </span>
    </div>
  );
}

export function FinanceOverviewCard({ finance, delay }: { finance: FinanceOverview; delay?: number }) {
  return (
    <SectionCard
      label="Finanzas - ultimos 30 dias"
      href="/movimientos"
      delay={delay}
      emptyText="Registra tu primer movimiento y esta seccion cobra vida."
    >
      <div className="grid grid-cols-3 gap-3">
        <Stat label="Ingresos" value={usd(finance.income)} />
        <Stat label="Gastos" value={usd(finance.expenses)} />
        <Stat label="Cash flow" value={"+" + usd(finance.cashFlow)} tone="accent" />
      </div>

      <div className="flex items-center justify-between gap-4 rounded-(--radius-lg) border border-(--color-border) bg-(--color-surface) p-3">
        <div className="flex flex-col gap-0.5">
          <span className="flex items-center gap-1.5 text-[11px] font-semibold text-(--color-text-tertiary)">
            <TrendingUp className="size-3.5" aria-hidden />
            Tendencia de cash flow
          </span>
          <span className="text-[12.5px] text-(--color-text-secondary)">
            Ahorro en <b className="text-(--color-text-primary)">{Math.round(finance.savingsRate * 100)}%</b> - tu mejor marca en 6 meses
          </span>
        </div>
        <Sparkline points={finance.trend} className="shrink-0 text-(--color-accent)" />
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-semibold text-(--color-text-tertiary)">Presupuesto del mes</span>
          <span className="text-(--color-text-secondary)">{Math.round(finance.budgetUsed * 100)}% usado</span>
        </div>
        <ProgressBar
          value={finance.budgetUsed}
          tone={finance.budgetUsed > 0.9 ? "danger" : "neutral"}
          label="Presupuesto del mes"
        />
      </div>

      <ul className="flex flex-col gap-2" aria-label="Gastos por categoria">
        {finance.categories.map((c) => (
          <li key={c.name} className="flex items-center gap-2.5">
            <span className="w-16 shrink-0 truncate text-[12px] text-(--color-text-secondary)">{c.name}</span>
            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-(--color-surface-raised)">
              <span
                aria-hidden
                className={cn(
                  "block h-full rounded-full",
                  c.anomaly ? "bg-(--color-danger-text)" : "bg-(--color-text-muted)",
                )}
                style={{ width: `${Math.round(c.share * 100)}%` }}
              />
            </span>
            <span className="w-12 shrink-0 text-right text-[12px] font-bold text-(--color-text-secondary)">
              {usd(c.amount)}
            </span>
            {c.anomaly && (
              <span className="shrink-0 text-[10px] font-bold text-(--color-danger-text)">
                +{usd(c.anomaly.overBy)} sobre patron
              </span>
            )}
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}

export function BusinessCard({ business, delay }: { business: BusinessSummary; delay?: number }) {
  return (
    <SectionCard
      label="Negocio"
      href="/negocio"
      delay={delay}
      emptyText="Conecta clientes y facturas en el modulo de negocio para ver tu operacion aqui."
    >
      <div className="grid grid-cols-2 gap-3">
        <Stat label="Ingresos del mes" value={usd(business.monthRevenue)} tone="accent" />
        <Stat
          label={`Facturas pendientes (${business.pendingInvoices.count})`}
          value={usd(business.pendingInvoices.amount)}
        />
        <Stat label="Clientes activos" value={String(business.activeClients)} />
        <Stat label="Proyectos" value={String(business.activeProjects)} />
      </div>
      <p className="rounded-(--radius-lg) border border-(--color-border) bg-(--color-surface) p-3 text-[12.5px] leading-relaxed text-(--color-text-tertiary)">
        {business.opportunity}
      </p>
    </SectionCard>
  );
}
