"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

/** Token-driven progress bar. `tone` reserves rust for at-risk states
    (never color alone - pair with a text label). */
export function ProgressBar({
  value,
  tone = "accent",
  className,
  label,
}: {
  /** 0..1 */
  value: number;
  tone?: "accent" | "danger" | "neutral";
  className?: string;
  /** Accessible name, e.g. "Progreso de Capital Finexy". */
  label: string;
}) {
  const reduce = useReducedMotion();
  const pct = Math.max(0, Math.min(1, value)) * 100;
  const fill =
    tone === "accent"
      ? "bg-(--color-accent)"
      : tone === "danger"
        ? "bg-(--color-danger-text)"
        : "bg-(--color-text-tertiary)";
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pct)}
      className={cn("h-1.5 w-full overflow-hidden rounded-full bg-(--color-surface-raised)", className)}
    >
      <motion.div
        initial={reduce ? { width: `${pct}%` } : { width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        className={cn("h-full rounded-full", fill)}
      />
    </div>
  );
}
