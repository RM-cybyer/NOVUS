"use client";

import { type ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/** Reusable bottom sheet (mobile-first; centers as a panel on desktop).
    Motion per catalog: translateY 100% -> 0, 320ms signature ease. */
export function BottomSheet({
  open,
  onOpenChange,
  title,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 bg-(--color-scrim) backdrop-blur-sm"
              />
            </Dialog.Overlay>
            <Dialog.Content asChild aria-describedby={undefined}>
              <motion.div
                initial={reduce ? false : { y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ duration: 0.32, ease: [0.2, 0.8, 0.2, 1] }}
                className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-md rounded-t-(--radius-3xl) border border-b-0 border-(--color-border-strong) bg-(--color-bg-warm) p-5 pb-[max(20px,env(safe-area-inset-bottom))]"
              >
                <div aria-hidden className="mx-auto mb-4 h-1 w-9 rounded-full bg-(--color-text-muted)" />
                <Dialog.Title className="font-display mb-4 text-xl font-semibold tracking-(--letter-spacing-title)">
                  {title}
                </Dialog.Title>
                {children}
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
