import type { Metadata } from "next";
import { Settings } from "lucide-react";
import { EmptyState } from "@/components/primitives/empty-state";

export const metadata: Metadata = { title: "Ajustes" };

/** Surface scaffold - the module that fills it is noted in the empty state. */
export default function Page() {
  return (
    <div className="mx-auto max-w-3xl pt-6">
      <h1 className="font-display text-[28px] font-semibold tracking-(--letter-spacing-display)">Ajustes</h1>
      <p className="mt-1 text-[13px] text-(--color-text-tertiary)">Tu controlas los datos y el comportamiento</p>
      <EmptyState
        icon={<Settings />}
        title="Tu controlas los datos y el comportamiento"
        description="Perfil, IA, voz, memoria, notificaciones, apariencia, privacidad y consumo. Llega en el Modulo de Ajustes."
      />
    </div>
  );
}
