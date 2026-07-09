import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

/** Base operational surface card. */
export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-(--radius-2xl) border border-(--color-border) bg-(--color-surface) p-4",
        className,
      )}
      {...props}
    />
  );
}

/** Uppercase section label used inside cards. */
export function CardLabel({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "text-[10px] font-bold uppercase tracking-(--letter-spacing-caps) text-(--color-text-tertiary)",
        className,
      )}
      {...props}
    />
  );
}
