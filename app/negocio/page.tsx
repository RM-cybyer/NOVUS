import type { Metadata } from "next";
import { Briefcase } from "lucide-react";
import { EmptyState } from "@/components/primitives/empty-state";

export const metadata: Metadata = { title: "Negocio" };

/** Surface scaffold - the module that fills it is noted in the empty state. */
export default function Page() {
  return (
    <div className="mx-auto max-w-3xl pt-6">
      <h1 className="font-display text-[28px] font-semibold tracking-(--letter-spacing-display)">Negocio</h1>
      <p className="mt-1 text-[13px] text-(--color-text-tertiary)">Tu espacio de trabajo empresarial</p>
      <EmptyState
        icon={<Briefcase />}
        title="Tu espacio de trabajo empresarial"
        description="CRM, proyectos, clientes, facturas y propuestas conectados a tus finanzas personales. Llega en el Modulo 10."
      />
    </div>
  );
}
