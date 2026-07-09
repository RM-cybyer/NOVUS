"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Network, X } from "lucide-react";
import type { DashboardNotification, MemoryInsight, MemoryKind } from "@/lib/dashboard/types";
import { SectionCard } from "@/components/composition/section-card";
import { Badge } from "@/components/primitives/badge";

const MEMORY_LABEL: Record<MemoryKind, string> = {
  meta: "Meta",
  dato: "Dato",
  preferencia: "Preferencia",
  decision: "Decision",
};

export function MemoryInsightsCard({
  memories,
  suggested,
  delay,
}: {
  memories: MemoryInsight[];
  suggested: string;
  delay?: number;
}) {
  return (
    <SectionCard
      label="Memoria"
      href="/memoria"
      delay={delay}
      emptyText="Novus aun no sabe nada de ti. Cuentale tus metas en el chat y aparecera aqui."
    >
      <ul className="flex flex-col gap-2">
        {memories.map((m) => (
          <li key={m.text} className="flex items-start gap-2.5">
            <Badge kind={m.kind === "meta" ? "accent" : m.kind === "decision" ? "danger" : "neutral"}>
              {MEMORY_LABEL[m.kind]}
            </Badge>
            <span className="text-[12.5px] leading-snug text-(--color-text-secondary)">{m.text}</span>
          </li>
        ))}
      </ul>
      <div className="rounded-(--radius-lg) border border-dashed border-(--color-border-strong) p-3">
        <p className="text-[12px] leading-relaxed text-(--color-text-tertiary)">
          <span className="font-bold text-(--color-accent-text)">Sugerencia: </span>
          {suggested}
        </p>
      </div>
      <Link
        href="/memoria"
        className="flex min-h-11 items-center gap-2 text-[12px] font-semibold text-(--color-text-tertiary) transition-colors duration-(--duration-fast) hover:text-(--color-text-secondary)"
      >
        <Network className="size-3.5" aria-hidden />
        Explorar el grafo de conocimiento
      </Link>
    </SectionCard>
  );
}

/** Grouped notifications with swipe-to-dismiss on touch (drag right)
    and an explicit dismiss button for keyboard and desktop users. */
export function NotificationsCard({
  notifications,
  delay,
}: {
  notifications: DashboardNotification[];
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const [items, setItems] = useState(notifications);
  const dismiss = (id: string) => setItems((xs) => xs.filter((x) => x.id !== id));

  return (
    <SectionCard
      label={`Notificaciones - ${items.length}`}
      delay={delay}
      status={items.length === 0 ? "empty" : "ready"}
      emptyText="Todo al dia. Solo te avisare cuando haya una decision que tomar."
    >
      <ul className="flex flex-col gap-2 overflow-hidden">
        <AnimatePresence initial={false}>
          {items.map((n) => (
            <motion.li
              key={n.id}
              layout={!reduce}
              exit={{ opacity: 0, x: 80, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
              drag={reduce ? false : "x"}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={{ left: 0, right: 0.6 }}
              onDragEnd={(_, info) => {
                if (info.offset.x > 96) dismiss(n.id);
              }}
              className="flex items-start gap-2.5 rounded-(--radius-lg) border border-(--color-border) bg-(--color-surface) p-3"
            >
              <Badge kind={n.kind}>{n.tag}</Badge>
              <span className="min-w-0 flex-1 text-[12.5px] leading-snug text-(--color-text-secondary)">
                {n.body}
              </span>
              <span className="shrink-0 text-[10.5px] text-(--color-text-muted)">{n.timeLabel}</span>
              <button
                onClick={() => dismiss(n.id)}
                aria-label={`Descartar notificacion: ${n.tag}`}
                className="flex size-6 shrink-0 items-center justify-center rounded-full text-(--color-text-muted) transition-colors duration-(--duration-fast) hover:bg-(--color-surface-raised) hover:text-(--color-text-secondary)"
              >
                <X className="size-3.5" aria-hidden />
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </SectionCard>
  );
}
