import type { Metadata } from "next";
import { BarChart3 } from "lucide-react";
import { EmptyState } from "@/components/primitives/empty-state";

export const metadata: Metadata = { title: "Panel" };

/** Surface scaffold - the module that fills it is noted in the empty state. */
export default function Page() {
  return (
    <div className="mx-auto max-w-3xl pt-6">
      <h1 className="font-display text-[28px] font-semibold tracking-(--letter-spacing-display)">Panel</h1>
      <p className="mt-1 text-[13px] text-(--color-text-tertiary)">Tu situacion financiera, en vivo</p>
      <EmptyState
        icon={<BarChart3 />}
        title="Tu situacion financiera, en vivo"
        description="Cuando registres movimientos o conectes tus datos, aqui vivira tu capital invertible, tasa de ahorro, categorias y lo que Novus observa. Llega en el Modulo 4."
      />
    </div>
  );
}
