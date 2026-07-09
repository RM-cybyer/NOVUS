"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

/** Empty is an experience: teach, guide, recommend - never a blank screen.
    `icon` is a rendered element (e.g. <Target />) so server components can use it. */
export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
      className="mx-auto flex max-w-md flex-col items-center gap-3 px-6 py-16 text-center"
    >
      <span
        aria-hidden
        className="flex size-12 items-center justify-center rounded-(--radius-lg) border border-(--color-border) bg-(--color-surface) text-(--color-accent) [&>svg]:size-5"
      >
        {icon}
      </span>
      <h2 className="font-display text-xl font-semibold tracking-(--letter-spacing-title)">
        {title}
      </h2>
      <p className="text-sm leading-relaxed text-(--color-text-tertiary)">{description}</p>
      {action && <div className="mt-3">{action}</div>}
    </motion.div>
  );
}
