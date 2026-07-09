"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { useUiStore } from "@/store/ui-store";
import { Badge } from "@/components/primitives/badge";
import { Card } from "@/components/primitives/card";

/** Placeholder feed until the runtime notification engine exists (Module 7+).
    Copy follows voice rules: decision-oriented, no noise. */
const PLACEHOLDER = [
  { tag: "Resumen", kind: "accent" as const, body: "Novus esta listo. Conecta tus datos para recibir tu primer resumen matutino." },
  { tag: "Consejo", kind: "neutral" as const, body: "Pulsa Ctrl K en cualquier pantalla para buscar o navegar sin tocar el raton." },
];

export function NotificationsPanel() {
  const { notificationsOpen, setNotificationsOpen } = useUiStore();
  const reduce = useReducedMotion();
  return (
    <Dialog.Root open={notificationsOpen} onOpenChange={setNotificationsOpen}>
      <AnimatePresence>
        {notificationsOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 bg-(--color-scrim)"
              />
            </Dialog.Overlay>
            <Dialog.Content asChild aria-describedby={undefined}>
              <motion.aside
                initial={reduce ? false : { x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
                className="fixed inset-y-0 right-0 z-50 flex w-[min(380px,100vw)] flex-col gap-3 border-l border-(--color-border-strong) bg-(--color-bg-warm) p-5"
              >
                <div className="flex items-center justify-between">
                  <Dialog.Title className="font-display text-xl font-semibold tracking-(--letter-spacing-title)">
                    Notificaciones
                  </Dialog.Title>
                  <Dialog.Close
                    aria-label="Cerrar notificaciones"
                    className="flex size-9 items-center justify-center rounded-full text-(--color-text-muted) transition-colors duration-(--duration-fast) hover:bg-(--color-surface-raised) hover:text-(--color-text-secondary)"
                  >
                    <X className="size-4" aria-hidden />
                  </Dialog.Close>
                </div>
                <p className="text-xs text-(--color-text-tertiary)">
                  Solo te avisare cuando haya una decision que tomar.
                </p>
                <div className="flex flex-col gap-2.5 overflow-y-auto">
                  {PLACEHOLDER.map((n) => (
                    <Card key={n.body} className="rounded-(--radius-lg) p-3.5">
                      <Badge kind={n.kind}>{n.tag}</Badge>
                      <p className="mt-2 text-[13px] leading-relaxed text-(--color-text-secondary)">
                        {n.body}
                      </p>
                    </Card>
                  ))}
                </div>
              </motion.aside>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
