"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import type { Briefing, BriefingKind } from "@/lib/dashboard/types";
import { Card } from "@/components/primitives/card";
import { Badge } from "@/components/primitives/badge";

const KIND_META: Record<BriefingKind, { label: string; kind: "accent" | "danger" | "neutral" }> = {
  "finance-alert": { label: "Alerta", kind: "danger" },
  "goal-risk": { label: "Meta en riesgo", kind: "danger" },
  opportunity: { label: "Oportunidad", kind: "accent" },
  info: { label: "Info", kind: "neutral" },
};

export function GreetingHeader({ name, focus }: { name: string; focus: string }) {
  const reduce = useReducedMotion();
  const now = new Date();
  const hour = now.getHours();
  const salute = hour < 12 ? "Buenos dias" : hour < 19 ? "Buenas tardes" : "Buenas noches";
  const dateLabel = now.toLocaleDateString("es", { weekday: "long", day: "numeric", month: "long" });
  return (
    <motion.header
      initial={reduce ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
      className="pt-2"
    >
      <p className="text-xs capitalize text-(--color-text-muted)">{dateLabel}</p>
      <h1 className="font-display mt-1 text-[30px] font-semibold leading-tight tracking-(--letter-spacing-display) md:text-4xl">
        {salute}, {name}
      </h1>
      <p className="mt-1.5 text-sm text-(--color-text-tertiary)">
        Foco de hoy: <span className="text-(--color-text-secondary)">{focus}</span>
      </p>
    </motion.header>
  );
}

/** AI Briefing - the first card. Summary plus decision-oriented items,
    each with one action. Dynamic by contract (DashboardSnapshot). */
export function AiBriefingCard({ briefing }: { briefing: Briefing }) {
  const reduce = useReducedMotion();
  return (
    <motion.section
      aria-label="Resumen de Novus"
      initial={reduce ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1], delay: 0.06 }}
    >
      <Card className="flex flex-col gap-3.5 border-(--color-border-strong) bg-(--color-surface-raised) p-4 md:p-5">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-(--color-accent)" aria-hidden />
          <span className="text-[10px] font-bold uppercase tracking-(--letter-spacing-caps) text-(--color-accent-text)">
            Briefing de Novus
          </span>
        </div>
        <p className="text-[14.5px] leading-relaxed text-(--color-text-secondary)">
          {briefing.summary}
        </p>
        <ul className="flex flex-col gap-2">
          {briefing.items.map((item) => {
            const meta = KIND_META[item.kind];
            return (
              <li key={item.text}>
                <Link
                  href={item.actionHref}
                  className="group flex min-h-11 items-start justify-between gap-3 rounded-(--radius-lg) border border-(--color-border) bg-(--color-surface) p-3 transition-colors duration-(--duration-fast) hover:border-(--color-border-strong)"
                >
                  <span className="flex flex-col gap-1.5">
                    <Badge kind={meta.kind}>{meta.label}</Badge>
                    <span className="text-[13px] leading-snug text-(--color-text-secondary)">
                      {item.text}
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-1 pt-0.5 text-[11px] font-semibold text-(--color-text-tertiary) transition-colors duration-(--duration-fast) group-hover:text-(--color-text-secondary)">
                    {item.actionLabel}
                    <ArrowRight className="size-3" aria-hidden />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Card>
    </motion.section>
  );
}
