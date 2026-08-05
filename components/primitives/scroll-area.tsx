"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export const ScrollArea = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & { className?: string }
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-(--color-border-strong) hover:scrollbar-thumb-(--color-text-muted)",
      className,
    )}
    {...props}
  >
    {children}
  </div>
));

ScrollArea.displayName = "ScrollArea";