"use client";

import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { Calendar, DollarSign, Bell, Users } from "lucide-react";
import type { AgendaItem, AgendaItemKind } from "@/lib/dashboard/types";
import { SectionCard } from "@/components/composition/section-card";

const KIND_ICON: Record<AgendaItemKind, typeof Calendar> = {
  evento: Calendar,
  pago: DollarSign,
  recordatorio: Bell,
  reunion: Users,
  compromiso: Calendar,
};

const KIND_LABEL: Record<AgendaItemKind, string> = {
  evento: "Evento",
  pago: "Pago",
  recordatorio: "Recordatorio",
  reunion: "Reunion",
  compromiso: "Compromiso",
};

export function AgendaCard({ items, delay }: { items: AgendaItem[]; delay?: number }) {
  return (
    <SectionCard
      label="Agenda de hoy"
      href="/calendario"
      delay={delay}
      emptyText="Sin eventos hoy. Conecta tu calendario para ver tu agenda aqui."
    >
      <ul className="flex flex-col gap-2" role="list" aria-label="Agenda de hoy">
        {items.map((item) => {
          const Icon = KIND_ICON[item.kind];
          return (
            <li
              key={item.id}
              className="flex items-center gap-3 rounded-(--radius-lg) border border-(--color-border) bg-(--color-surface) p-3"
            >
              <span
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-(--radius-sm) border border-(--color-border) bg-(--color-surface-raised)",
                  item.kind === "pago" && "text-(--color-danger-text)",
                  item.kind === "reunion" && "text-(--color-accent)",
                )}
              >
                <Icon className="size-3.5" aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-medium text-(--color-text-secondary)">
                  {item.title}
                </span>
                <span className="mt-0.5 flex items-center gap-2 text-[11px] text-(--color-text-muted)">
                  <span className="flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-(--color-text-muted)" aria-hidden />
                    {KIND_LABEL[item.kind]}
                  </span>
                  <span>{item.timeLabel}</span>
                  {item.location && <span>{item.location}</span>}
                </span>
              </span>
              {item.href && (
                <Link
                  href={item.href}
                  className="flex shrink-0 items-center gap-1 text-[11px] font-semibold text-(--color-text-tertiary) transition-colors duration-(--duration-fast) hover:text-(--color-text-secondary)"
                >
                  Ver
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </SectionCard>
  );
}