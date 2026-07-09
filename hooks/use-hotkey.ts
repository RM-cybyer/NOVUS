"use client";

import { useEffect } from "react";

/** Binds Ctrl/Cmd + key. Skips when focus is inside an editable element unless allowInInputs. */
export function useHotkey(
  key: string,
  handler: () => void,
  options?: { allowInInputs?: boolean },
) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key.toLowerCase() !== key.toLowerCase() || !(e.ctrlKey || e.metaKey)) return;
      const target = e.target as HTMLElement | null;
      const editable =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);
      if (editable && !options?.allowInInputs) return;
      e.preventDefault();
      handler();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [key, handler, options?.allowInInputs]);
}
