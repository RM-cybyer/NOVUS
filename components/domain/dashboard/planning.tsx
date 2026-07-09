"use client";

import { Circle, CircleCheck, Sparkles } from "lucide-react";
import type { GoalSummary, PriorityTask, TaskPriority } from "@/lib/dashboard/types";
import { SectionCard } from "@/components/composition/section-card";
import { ProgressBar } from "@/components/primitives/progress-bar";
import { cn } from "@/lib/utils/cn";

const PRIORITY_META: Record<TaskPriority, { label: string; dot: string }> = {
  alta: { label: "Alta", dot: "bg-(--color-danger-text)" },
  media: { label: "Media", dot: "bg-(--color-accent)" },
  baja: { label: "Baja", dot: "bg-(--color-text-muted)" },
};

export function PrioritiesCard({ tasks, delay }: { tasks: PriorityTask[]; delay?: number }) {
  const pending = tasks.filter((t) => !t.done).length;
  return (
    <SectionCard
      label={`Prioridades de hoy - ${pending} pendientes`}
      delay={delay}
      emptyText="Sin prioridades hoy. Cuando conectes tu calendario y metas, Novus propondra el orden del dia."
    >
      <ul className="flex flex-col">
        {tasks.map((t) => {
          const meta = PRIORITY_META[t.priority];
          return (
            <li
              key={t.id}
              className="flex min-h-11 items-center gap-3 border-b border-(--color-border) py-2.5 last:border-b-0"
            >
              {t.done ? (
                <CircleCheck className="size-4.5 shrink-0 text-(--color-accent)" aria-label="Completada" />
              ) : (
                <Circle className="size-4.5 shrink-0 text-(--color-text-muted)" aria-label="Pendiente" />
              )}
              <span className="min-w-0 flex-1">
                <span
                  className={cn(
                    "block truncate text-[13.5px]",
                    t.done ? "text-(--color-text-muted) line-through" : "text-(--color-text-secondary)",
                  )}
                >
                  {t.title}
                </span>
                <span className="mt-0.5 flex items-center gap-2 text-[11px] text-(--color-text-muted)">
                  <span className="flex items-center gap-1">
                    <span aria-hidden className={cn("size-1.5 rounded-full", meta.dot)} />
                    {meta.label}
                  </span>
                  <span>~{t.estimatedMinutes} min</span>
                  {t.aiSuggested && (
                    <span className="flex items-center gap-1 text-(--color-accent-text)">
                      <Sparkles className="size-3" aria-hidden />
                      Sugerida
                    </span>
                  )}
                </span>
              </span>
            </li>
          );
        })}
      </ul>
    </SectionCard>
  );
}

export function GoalsCard({ goals, delay }: { goals: GoalSummary[]; delay?: number }) {
  return (
    <SectionCard
      label="Metas"
      href="/metas"
      delay={delay}
      emptyText="Sin metas activas. Crea la primera y Novus conectara cada decision con su impacto."
    >
      <ul className="flex flex-col gap-4">
        {goals.map((g) => {
          const pct = Math.round((g.saved / g.target) * 100);
          return (
            <li key={g.id} className="flex flex-col gap-2">
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-display text-[15px] font-medium text-(--color-text-primary)">
                  {g.name}
                </span>
                <span className="text-[11.5px] text-(--color-text-tertiary)">
                  ${g.saved.toLocaleString("en-US")} / ${g.target.toLocaleString("en-US")} - {g.deadlineLabel}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <ProgressBar
                  value={g.saved / g.target}
                  tone={g.atRisk ? "danger" : "accent"}
                  label={`Progreso de ${g.name}`}
                  className="flex-1"
                />
                <span className="w-9 text-right text-[11.5px] font-bold text-(--color-text-secondary)">
                  {pct}%
                </span>
              </div>
              <p
                className={cn(
                  "text-[11.5px]",
                  g.atRisk ? "font-semibold text-(--color-danger-text)" : "text-(--color-text-muted)",
                )}
              >
                {g.prediction}
              </p>
            </li>
          );
        })}
      </ul>
    </SectionCard>
  );
}
