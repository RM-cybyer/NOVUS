import type { Metadata } from "next";
import { Brain } from "lucide-react";
import { EmptyState } from "@/components/primitives/empty-state";

export const metadata: Metadata = { title: "Memoria" };

/** Surface scaffold - the module that fills it is noted in the empty state. */
export default function Page() {
  return (
    <div className="mx-auto max-w-3xl pt-6">
      <h1 className="font-display text-[28px] font-semibold tracking-(--letter-spacing-display)">Memoria</h1>
      <p className="mt-1 text-[13px] text-(--color-text-tertiary)">Lo que Novus aprende de ti</p>
      <EmptyState
        icon={<Brain />}
        title="Lo que Novus aprende de ti"
        description="Cada recuerdo sera visible, editable y borrable - y siempre sabras por que existe. Solo se guarda lo que mejora tus decisiones. Llega en el Modulo 5."
      />
    </div>
  );
}
