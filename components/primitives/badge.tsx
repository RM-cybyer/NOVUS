import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type Kind = "accent" | "danger" | "neutral";

const kindClasses: Record<Kind, string> = {
  accent: "bg-(--color-accent) text-(--color-on-accent)",
  danger: "bg-(--color-danger-soft) text-(--color-danger-text)",
  neutral: "bg-(--color-surface-raised) text-(--color-text-tertiary)",
};

export function Badge({
  kind = "neutral",
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { kind?: Kind }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-(--letter-spacing-caps)",
        kindClasses[kind],
        className,
      )}
      {...props}
    />
  );
}
