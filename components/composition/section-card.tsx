"use client";

import { type ReactNode } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { RotateCcw, WifiOff } from "lucide-react";
import type { SectionStatus } from "@/lib/dashboard/types";
import { Card, CardLabel } from "@/components/primitives/card";
import { Skeleton } from "@/components/primitives/skeleton";
import { cn } from "@/lib/utils/cn";

/** Dashboard section wrapper: consistent header, entrance motion and
    the four non-ready states (loading, empty, error, offline). */
export function SectionCard({
  label,
  status = "ready",
  emptyText,
  errorText = "No pude cargar esta seccion. Reintenta en un momento.",
  onRetry,
  href,
  linkLabel,
  delay = 0,
  className,
  children,
}: {
  label: string;
  status?: SectionStatus;
  emptyText?: string;
  errorText?: string;
  onRetry?: () => void;
  href?: string;
  linkLabel?: string;
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.section
      aria-label={label}
      initial={reduce ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1], delay }}
    >
      <Card className={cn("flex flex-col gap-3 p-4", className)}>
        <div className="flex items-center justify-between gap-2">
          <CardLabel>{label}</CardLabel>
          {href && (
            <Link
              href={href}
              className="text-[11px] font-semibold text-(--color-text-tertiary) transition-colors duration-(--duration-fast) hover:text-(--color-text-secondary)"
            >
              {linkLabel ?? "Ver todo"}
            </Link>
          )}
        </div>
        {status === "ready" && children}
        {status === "loading" && (
          <div className="flex flex-col gap-2.5" aria-busy>
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-16 w-full rounded-(--radius-lg)" />
          </div>
        )}
        {status === "empty" && (
          <p className="py-4 text-[13px] leading-relaxed text-(--color-text-tertiary)">
            {emptyText ?? "Aun no hay datos aqui. Novus lo llenara en cuanto haya algo util que decidir."}
          </p>
        )}
        {status === "error" && (
          <div className="flex items-center justify-between gap-3 py-2">
            <p className="text-[13px] text-(--color-text-tertiary)">{errorText}</p>
            {onRetry && (
              <button
                onClick={onRetry}
                className="flex h-9 shrink-0 items-center gap-1.5 rounded-(--radius-sm) border border-(--color-border-strong) px-3 text-xs font-semibold text-(--color-text-secondary) transition-colors duration-(--duration-fast) hover:bg-(--color-surface-raised)"
              >
                <RotateCcw className="size-3.5" aria-hidden />
                Reintentar
              </button>
            )}
          </div>
        )}
        {status === "offline" && (
          <p className="flex items-center gap-2 py-4 text-[13px] text-(--color-text-tertiary)">
            <WifiOff className="size-3.5 shrink-0" aria-hidden />
            Sin conexion - mostrando lo ultimo sincronizado.
          </p>
        )}
      </Card>
    </motion.section>
  );
}
