"use client";

import { AnimatePresence, motion } from "framer-motion";
import { WifiOff } from "lucide-react";
import { useOnline } from "@/hooks/use-online";

/** Non-blocking connectivity notice. State stays visible without motion. */
export function OfflineBanner() {
  const online = useOnline();
  return (
    <AnimatePresence>
      {!online && (
        <motion.div
          role="status"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
          className="overflow-hidden"
        >
          <div className="flex items-center justify-center gap-2 border-b border-(--color-border) bg-(--color-surface) px-4 py-2 text-xs font-semibold text-(--color-text-tertiary)">
            <WifiOff className="size-3.5" aria-hidden />
            Sin conexion - trabajando con datos locales. Se sincroniza al volver.
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
