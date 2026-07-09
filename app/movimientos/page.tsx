import type { Metadata } from "next";
import { ArrowLeftRight } from "lucide-react";
import { EmptyState } from "@/components/primitives/empty-state";

export const metadata: Metadata = { title: "Movimientos" };

/** Surface scaffold - the module that fills it is noted in the empty state. */
export default function Page() {
  return (
    <div className="mx-auto max-w-3xl pt-6">
      <h1 className="font-display text-[28px] font-semibold tracking-(--letter-spacing-display)">Movimientos</h1>
      <p className="mt-1 text-[13px] text-(--color-text-tertiary)">Ingresos y gastos sin friccion</p>
      <EmptyState
        icon={<ArrowLeftRight />}
        title="Ingresos y gastos sin friccion"
        description="Registro por voz o texto, categorizacion con IA y deteccion de anomalias sobre tu patron real. Llega en el Modulo 4."
      />
    </div>
  );
}
