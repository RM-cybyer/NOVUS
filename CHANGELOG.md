# Changelog

All notable repository foundation changes should be recorded here once the project begins versioned releases.

## Unreleased

- Module 02 Dashboard implemented (Mission Control): greeting with dynamic salute and daily focus, AI briefing card with decision items, priorities, financial overview (sparkline, budget, category anomaly), goals with risk prediction, business summary, memory insights, swipe-dismissable notifications and a quick-actions FAB with bottom sheet. Mobile-first, two-column desktop, lazy-loaded below-the-fold sections, typed data contracts with a documented backend seam (`lib/dashboard/`). Mobile nav expanded to 5 destinations and `/ajustes` scaffold added.

- Initialized the NOVUS OS engineering foundation.
- Added repository architecture, documentation hierarchy, AI-agent context, templates and repository health workflow.
- Added the NOVUS Intelligence Layer architecture under `.ai/intelligence/`.
- Added the NOVUS Runtime Operating System architecture under `.ai/runtime/`.
- Added the GitHub-first AI Agent System under `.ai/agents/`.
- Added the Fable Design Operating System and GitHub-backed handoff directory.
- Added the official runtime and technology architecture under `docs/architecture/runtime/`.
- Added the Design System Foundation blueprint and Phase 1 design tokens in `styles/tokens/` (framework-neutral CSS custom properties, dark and light schemes).
- Completed Design Milestone 01: canonical Figma design system (tokens, 13 component sets, navigation, onboarding, global layout) and the approved motion pattern catalog in `.ai/agents/fable/animation-library.md`.
- Design Milestone 02 (built, pending visual repair pass): 13 product screens in Figma (Chat, Voice, Dashboard desktop/mobile, Metas, Movimientos, Ajustes, Memoria, Conexiones, Grafo de Conocimiento, Negocio, Notificaciones, state screens) plus interactive prototype flows; QA findings and repair procedure recorded in the milestone handoff.
- Brand palette v2 applied to the token system: warm black `#020300`, warm white `#F7F4F3`, amber accent `#FFA400`, rust status family `#772F1A`, with WCAG-validated derived values (`#D97B54` danger text on dark, `#A03E00` accent text on light) and a new `--color-accent-text` token. The running app restyled automatically through the token bridge.
- Module 1 Foundation implemented: Next.js App Router + TypeScript + Tailwind CSS v4 + pnpm initialized preserving the repository architecture; app shell with animated sidebar, topbar, mobile bottom nav, command palette (Ctrl/Cmd+K) with global search, notifications panel, offline banner, route scaffolding for all surfaces, loading/error/not-found/empty states, and token-driven primitives (Button, Card, Badge, Skeleton, Kbd, EmptyState). Verified: typecheck, lint, production build, browser QA at 375/1280 viewports.
