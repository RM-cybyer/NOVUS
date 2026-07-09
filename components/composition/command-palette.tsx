"use client";

import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CornerDownLeft } from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants/navigation";
import { useUiStore } from "@/store/ui-store";

/** Global search and command palette (Ctrl/Cmd + K). */
export function CommandPalette() {
  const { paletteOpen, setPaletteOpen } = useUiStore();
  const router = useRouter();
  const reduce = useReducedMotion();

  function go(href: string) {
    setPaletteOpen(false);
    router.push(href);
  }

  return (
    <Dialog.Root open={paletteOpen} onOpenChange={setPaletteOpen}>
      <AnimatePresence>
        {paletteOpen && (
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
                initial={reduce ? false : { opacity: 0, scale: 0.96, y: -8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
                className="fixed left-1/2 top-[18%] z-50 w-[min(560px,calc(100vw-32px))] -translate-x-1/2"
              >
                <Dialog.Title className="sr-only">Buscar o ejecutar un comando</Dialog.Title>
                <Command
                  label="Paleta de comandos"
                  className="overflow-hidden rounded-(--radius-lg) border border-(--color-border-strong) bg-[#161613]/98 shadow-(--shadow-lg)"
                >
                  <Command.Input
                    autoFocus
                    placeholder="Que necesitas decidir?"
                    className="h-14 w-full border-b border-(--color-border) bg-transparent px-4 text-[15px] text-(--color-text-primary) outline-none placeholder:text-(--color-text-muted)"
                  />
                  <Command.List className="max-h-80 overflow-y-auto p-2">
                    <Command.Empty className="px-3 py-8 text-center text-sm text-(--color-text-tertiary)">
                      Sin resultados. Pronto podras preguntarle esto a Novus directamente.
                    </Command.Empty>
                    <Command.Group
                      heading="Ir a"
                      className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-bold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-(--letter-spacing-caps) [&_[cmdk-group-heading]]:text-(--color-text-muted)"
                    >
                      {NAV_ITEMS.map(({ label, href, icon: Icon }) => (
                        <Command.Item
                          key={href}
                          value={label}
                          onSelect={() => go(href)}
                          className="flex h-11 cursor-pointer items-center justify-between gap-3 rounded-(--radius-sm) px-3 text-sm text-(--color-text-secondary) data-[selected=true]:bg-(--color-surface-raised) data-[selected=true]:text-(--color-text-primary)"
                        >
                          <span className="flex items-center gap-2.5">
                            <Icon className="size-4 text-(--color-text-tertiary)" aria-hidden />
                            {label}
                          </span>
                          <CornerDownLeft className="size-3.5 text-(--color-text-muted)" aria-hidden />
                        </Command.Item>
                      ))}
                    </Command.Group>
                  </Command.List>
                </Command>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
