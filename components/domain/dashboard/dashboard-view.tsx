"use client";

import dynamic from "next/dynamic";
import type { DashboardSnapshot } from "@/lib/dashboard/types";
import { GreetingHeader, AiBriefingCard } from "./briefing";
import { PrioritiesCard, GoalsCard } from "./planning";
import { FinanceOverviewCard } from "./finance";
import { QuickActions } from "./quick-actions";
import { Skeleton } from "@/components/primitives/skeleton";

/* Below-the-fold sections load lazily to keep the first paint light. */
const sectionFallback = <Skeleton className="h-40 w-full rounded-(--radius-2xl)" />;
const BusinessCard = dynamic(() => import("./finance").then((m) => m.BusinessCard), {
  loading: () => sectionFallback,
});
const MemoryInsightsCard = dynamic(() => import("./awareness").then((m) => m.MemoryInsightsCard), {
  loading: () => sectionFallback,
});
const NotificationsCard = dynamic(() => import("./awareness").then((m) => m.NotificationsCard), {
  loading: () => sectionFallback,
});

/** Mission Control. Mobile-first single column; two columns from lg
    (primary decisions left, awareness right). */
export function DashboardView({ data }: { data: DashboardSnapshot }) {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-4 pb-6 md:gap-5">
      <GreetingHeader name={data.userName} focus={data.focus} />
      <AiBriefingCard briefing={data.briefing} />

      <div className="grid grid-cols-1 items-start gap-4 md:gap-5 lg:grid-cols-[3fr_2fr]">
        <div className="flex min-w-0 flex-col gap-4 md:gap-5">
          <PrioritiesCard tasks={data.priorities} delay={0.12} />
          <FinanceOverviewCard finance={data.finance} delay={0.18} />
          <BusinessCard business={data.business} delay={0.24} />
        </div>
        <div className="flex min-w-0 flex-col gap-4 md:gap-5">
          <GoalsCard goals={data.goals} delay={0.15} />
          <MemoryInsightsCard memories={data.memories} suggested={data.suggestedMemory} delay={0.21} />
          <NotificationsCard notifications={data.notifications} delay={0.27} />
        </div>
      </div>

      <QuickActions />
    </div>
  );
}
