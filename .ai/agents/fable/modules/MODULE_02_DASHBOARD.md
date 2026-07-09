# Module 02 - Dashboard (Mission Control)

Version 1.0 - Founder spec (2026-07-09). Status: IMPLEMENTED (v1, demo data provider; backend integration pending).

## Mission

The Dashboard is NOVUS Mission Control: production-quality UI (not a mockup) that later connects to the backend. Mobile first; desktop adapts from mobile. Every section reusable and supporting Loading, Empty, Error and Offline states.

## Sections (as implemented)

1. Greeting: dynamic salute + real date + today's focus. Weather deferred to a future connector.
2. AI Briefing: always-first card; summary plus decision items (alert / goal risk / opportunity), each with one action link.
3. Today's Priorities: task list with priority colors, estimated time, AI-suggested markers.
4. Financial Overview: income / expenses / cash flow, savings rate, budget bar, cash-flow sparkline, category bars with anomaly status (rust + text label, never color alone).
5. Goals: progress, %, deadline, AI prediction, at-risk indicator.
6. Business: revenue, pending invoices, clients, projects, opportunity note.
7. Memory Insights: recent memories, suggested memory, knowledge-graph shortcut.
8. Notifications: grouped, animated, swipe-to-dismiss on touch plus explicit dismiss button.
9. Quick Actions: FAB opening a bottom sheet (add expense/income, new goal, ask NOVUS, voice mode).

## Architecture

- Data contracts: `lib/dashboard/types.ts`. Provider seam: `lib/dashboard/demo-data.ts` (`getDashboardSnapshot()`), to be replaced by the real data layer with the same signature.
- Components: `components/domain/dashboard/` (presentation only) + shared `components/composition/section-card.tsx` (state wrapper) and `bottom-sheet.tsx`, primitives `sparkline.tsx`, `progress-bar.tsx`.
- Route: `app/panel/` (server component fetches snapshot; `loading.tsx` mirrors layout).
- Below-the-fold sections lazy-load via `next/dynamic`.
- Mobile bottom nav updated to the 5 primary destinations (Panel, Novus, Metas, Movimientos, Ajustes); `/ajustes` scaffold added.

## Acceptance criteria status

Mobile UI: done. Desktop UI: done (two-column from lg). Responsive: verified 375/1280. Motion: entrance stagger, progress bars, FAB press, sheet slide, notification swipe/exit - all reduced-motion aware. Reusable components: yes. GitHub updated: yes. Documentation: this file + CHANGELOG + handoff. Ready for backend: provider seam documented.

## Remaining for this module

- Backend integration (Supabase + runtime engines) behind `getDashboardSnapshot()`.
- Weather connector (future), notification grouping by day, per-section error/offline wiring to real fetch states.
