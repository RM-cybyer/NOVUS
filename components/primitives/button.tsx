"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-(--color-accent) text-(--color-on-accent) font-bold shadow-[0_4px_14px_var(--color-accent-glow)] hover:brightness-105",
  secondary:
    "bg-(--color-surface-raised) text-(--color-text-secondary) border border-(--color-border-strong) hover:bg-(--color-surface-pressed)",
  ghost: "text-(--color-text-secondary) hover:bg-(--color-surface-raised)",
  danger:
    "bg-(--color-danger-soft) text-(--color-danger-text) border border-(--color-danger-border) hover:brightness-110",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-3.5 text-[13px] rounded-(--radius-sm)",
  md: "h-11 px-5 text-sm rounded-(--radius-md)",
  lg: "h-[50px] px-6 text-[15px] rounded-(--radius-md)",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", loading, disabled, className, children, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        "inline-flex select-none items-center justify-center gap-2 font-semibold",
        "transition-[background,filter,transform] duration-(--duration-fast) ease-out",
        "active:scale-[0.96] disabled:pointer-events-none disabled:opacity-(--opacity-disabled)",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {loading && <Loader2 className="size-4 animate-spin" aria-hidden />}
      {children}
    </button>
  ),
);
Button.displayName = "Button";
