import type { Metadata } from "next";
import { getDashboardSnapshot } from "@/lib/dashboard/demo-data";
import { DashboardView } from "@/components/domain/dashboard/dashboard-view";

export const metadata: Metadata = {
  title: "Panel",
  description: "Mission Control de Novus: briefing, prioridades, finanzas, metas y negocio.",
};

export default async function PanelPage() {
  const data = await getDashboardSnapshot();
  return <DashboardView data={data} />;
}
