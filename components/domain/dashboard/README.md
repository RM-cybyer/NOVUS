# Dashboard Components

Presentation components for the Dashboard module (Mission Control). Data arrives via `lib/dashboard/types.ts` contracts only - no fetching, no services, no persistence here.

- `briefing.tsx`: GreetingHeader, AiBriefingCard (the always-first AI card).
- `planning.tsx`: PrioritiesCard, GoalsCard.
- `finance.tsx`: FinanceOverviewCard (sparkline, budget, categories), BusinessCard.
- `awareness.tsx`: MemoryInsightsCard, NotificationsCard (swipe-to-dismiss + button).
- `quick-actions.tsx`: floating action button + bottom sheet.
- `dashboard-view.tsx`: responsive assembly; lazy-loads below-the-fold sections.
