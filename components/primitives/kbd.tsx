import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

/** Keyboard shortcut hint. */
export function Kbd({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <kbd
      className={cn(
        "rounded-md border border-(--color-border) bg-(--color-surface) px-1.5 py-0.5 text-[11px] font-semibold text-(--color-text-tertiary)",
        className,
      )}
      {...props}
    />
  );
}
