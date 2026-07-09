"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useUiStore } from "@/store/ui-store";

const SUGGESTIONS = [
  "Cuanto puedo invertir este mes?",
  "Como voy con mi meta?",
  "Resume mis gastos",
];

const EASE = [0.2, 0.8, 0.2, 1] as const;

/** Novus home. The conversational surface lands here in Module 2;
    today it greets, orients and teaches the palette - never a dead end. */
export default function HomePage() {
  const reduce = useReducedMotion();
  const setPaletteOpen = useUiStore((s) => s.setPaletteOpen);

  return (
    <div className="mx-auto flex min-h-[70dvh] max-w-xl flex-col justify-end gap-8 pb-10 pt-16">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE, delay: 0.05 }}
      >
        <h1 className="font-display text-4xl font-semibold leading-[1.08] tracking-(--letter-spacing-display)">
          Hola.
        </h1>
        <p className="font-display mt-1 text-[34px] font-medium leading-[1.12] tracking-(--letter-spacing-display) text-(--color-text-secondary)">
          En que te ayudo hoy?
        </p>
      </motion.div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
        className="flex flex-col gap-2.5"
      >
        {SUGGESTIONS.map((q) => (
          <button
            key={q}
            onClick={() => setPaletteOpen(true)}
            className="flex min-h-12 items-center justify-between gap-3 rounded-(--radius-lg) border border-(--color-border) bg-(--color-surface) px-4 py-3 text-left text-sm font-medium text-(--color-text-secondary) transition-colors duration-(--duration-fast) hover:border-(--color-border-strong) hover:bg-(--color-surface-raised)"
          >
            {q}
            <ChevronRight className="size-4 shrink-0 text-(--color-text-muted)" aria-hidden />
          </button>
        ))}
        <p className="mt-2 text-xs text-(--color-text-muted)">
          El chat conversacional llega en el Modulo 2. Mientras tanto, estas sugerencias abren la
          busqueda global.
        </p>
      </motion.div>
    </div>
  );
}
