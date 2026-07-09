import type { Metadata } from "next";
import { Plug } from "lucide-react";
import { EmptyState } from "@/components/primitives/empty-state";

export const metadata: Metadata = { title: "Conexiones" };

/** Surface scaffold - the module that fills it is noted in the empty state. */
export default function Page() {
  return (
    <div className="mx-auto max-w-3xl pt-6">
      <h1 className="font-display text-[28px] font-semibold tracking-(--letter-spacing-display)">Conexiones</h1>
      <p className="mt-1 text-[13px] text-(--color-text-tertiary)">Cada conexion, mejores decisiones</p>
      <EmptyState
        icon={<Plug />}
        title="Cada conexion, mejores decisiones"
        description="Notion, Linear, GitHub, Google, Slack y mas - preparado para integraciones MCP. Todo pasa por tu aprobacion. Llega en el Modulo 9."
      />
    </div>
  );
}
