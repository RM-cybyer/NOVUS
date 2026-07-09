"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Mic,
  Plus,
  Sparkles,
  Target,
  type LucideIcon,
} from "lucide-react";
import { BottomSheet } from "@/components/composition/bottom-sheet";
import { useUiStore } from "@/store/ui-store";

interface QuickAction {
  label: string;
  hint: string;
  icon: LucideIcon;
  run: () => void;
}

/** Floating quick-action button. Actions route to their surface today;
    they gain in-place flows as each module lands. */
export function QuickActions() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const setPaletteOpen = useUiStore((s) => s.setPaletteOpen);
  const reduce = useReducedMotion();

  const go = (href: string) => () => {
    setOpen(false);
    router.push(href);
  };
  const actions: QuickAction[] = [
    { label: "Registrar gasto", hint: "Modulo Finanzas", icon: ArrowDownToLine, run: go("/movimientos") },
    { label: "Registrar ingreso", hint: "Modulo Finanzas", icon: ArrowUpFromLine, run: go("/movimientos") },
    { label: "Nueva meta", hint: "Modulo Metas", icon: Target, run: go("/metas") },
    {
      label: "Preguntar a Novus",
      hint: "Busqueda global",
      icon: Sparkles,
      run: () => {
        setOpen(false);
        setPaletteOpen(true);
      },
    },
    { label: "Modo voz", hint: "Llega con el chat", icon: Mic, run: go("/") },
  ];

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        aria-label="Acciones rapidas"
        whileTap={reduce ? undefined : { scale: 0.92 }}
        className="fixed bottom-24 right-4 z-40 flex size-13 items-center justify-center rounded-full bg-(--color-accent) text-(--color-on-accent) shadow-(--shadow-accent) transition-[filter] duration-(--duration-fast) hover:brightness-105 md:bottom-8 md:right-8"
      >
        <Plus className="size-5" aria-hidden />
      </motion.button>

      <BottomSheet open={open} onOpenChange={setOpen} title="Accion rapida">
        <ul className="flex flex-col gap-1.5">
          {actions.map(({ label, hint, icon: Icon, run }) => (
            <li key={label}>
              <button
                onClick={run}
                className="flex min-h-12 w-full items-center gap-3 rounded-(--radius-lg) px-3 text-left transition-colors duration-(--duration-fast) hover:bg-(--color-surface-raised)"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-(--radius-sm) border border-(--color-border) bg-(--color-surface)">
                  <Icon className="size-4 text-(--color-accent)" aria-hidden />
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="text-sm font-semibold text-(--color-text-primary)">{label}</span>
                  <span className="text-[11px] text-(--color-text-muted)">{hint}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </BottomSheet>
    </>
  );
}
