import type { Metadata } from "next";
import { Target } from "lucide-react";
import { EmptyState } from "@/components/primitives/empty-state";

export const metadata: Metadata = { title: "Metas" };

/** Surface scaffold - the module that fills it is noted in the empty state. */
export default function Page() {
  return (
    <div className="mx-auto max-w-3xl pt-6">
      <h1 className="font-display text-[28px] font-semibold tracking-(--letter-spacing-display)">Metas</h1>
      <p className="mt-1 text-[13px] text-(--color-text-tertiary)">Objetivos con plan, no deseos</p>
      <EmptyState
        icon={<Target />}
        title="Objetivos con plan, no deseos"
        description="Crea metas con submetas, riesgo, prioridad y prediccion de exito. Novus conectara cada decision diaria con su impacto en tus metas. Llega en el Modulo 3."
      />
    </div>
  );
}
