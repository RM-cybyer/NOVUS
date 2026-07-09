import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

/** Loading placeholder. Match the layout of the real content it replaces. */
export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden
      className={cn(
        "animate-pulse rounded-(--radius-sm) bg-(--color-surface-raised)",
        className,
      )}
      {...props}
    />
  );
}
