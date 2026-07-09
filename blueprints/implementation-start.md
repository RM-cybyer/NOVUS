# Blueprint: Implementation Start - Module 1 Foundation

## Status

Implemented (Module 1 Foundation shipped; founder Master Operating System v3.0 directive; single-owner operating model).

## Problem

NOVUS has approved architecture (ADR 0007), tokens and a complete Figma design reference, but no running application. Implementation must start with the Foundation module so every later module (Chat, Goals, Finance, Memory, Dashboard, Graph, Connectors, Business) lands inside a consistent, production-ready shell.

## Goals

- Initialize the official runtime (Next.js App Router + TypeScript + Tailwind CSS + pnpm) preserving the existing repository folder architecture.
- Implement Module 1 Foundation: app shell, sidebar (expand/collapse), topbar, responsive layout with mobile bottom nav, command palette with global search, notifications panel, route scaffolding for all product surfaces, loading/error/offline/empty states, and the motion primitives from the approved catalog.
- Bridge design tokens into the app: `styles/tokens/tokens.css` remains the single visual source of truth, consumed via CSS-variable utilities.

## Non-goals

- No AI provider integration (Modules 2+; must go through the future AI Provider Layer).
- No database, auth or storage yet (Supabase lands with the first data-bearing module).
- No TanStack Query, React Hook Form, Zod, shadcn generator, ElevenLabs or Three.js yet - added per module when first needed (dependency policy: nothing speculative).
- No tests yet beyond typecheck/lint/build gates; Vitest/Playwright arrive with the first logic-bearing module.

## Proposed Architecture

Per `docs/architecture/runtime/` and `docs/architecture/repository-architecture.md`:

- `app/`: routes only (layout, template with page transitions, page stubs per surface, error/loading/not-found boundaries).
- `components/primitives/`: Button, Card, Badge, Skeleton, Kbd, Spinner, EmptyState (token-driven, domain-agnostic).
- `components/layouts/`: AppShell (sidebar + topbar + mobile nav).
- `components/composition/`: CommandPalette (cmdk + Radix Dialog), NotificationsPanel, OfflineBanner.
- `store/`: Zustand UI store (sidebar collapsed, palette open, notifications open).
- `hooks/`: `use-online`, `use-hotkey`.
- `providers/`: client-side app providers.
- `lib/utils/`: `cn` class-merge helper.
- `styles/global/`: Tailwind entry importing `styles/tokens/tokens.css`.

Dependencies (all approved by ADR 0007): next, react, react-dom, framer-motion, zustand, lucide-react, cmdk, @radix-ui/react-dialog, clsx, tailwind-merge; dev: typescript, @types/*, tailwindcss, @tailwindcss/postcss, postcss, eslint, eslint-config-next.

## AI Ownership

Single owner per founder directive v3.0: Fable (acting across all roles). Governance rules of the repository remain in force.

## Data and Service Boundaries

None in this module. No external services called.

## Security and Privacy

No secrets, no user data, no env vars required in this module. `.gitignore` extended for Node/Next artifacts.

## Accessibility

WCAG AA baseline: visible focus states via `--color-border-focus`, 44px touch targets, reduced-motion respected globally (token collapse + Framer Motion `useReducedMotion` where relevant), semantic landmarks (nav/main/header), keyboard access to palette (Ctrl/Cmd+K) and all nav.

## Testing Plan

- Gates for this module: `pnpm typecheck` (tsc --noEmit), `pnpm lint`, `pnpm build`, plus manual browser verification (desktop + mobile viewport) with screenshots.
- Vitest/Playwright introduced with the first module containing domain logic.

## Rollout Plan

- Lands on `main` (documented branch rule). The app is additive; a revert restores the docs-only state.

## Documentation Updates

- `CHANGELOG.md`, session handoff, this blueprint. Folder READMEs already describe placements; app README updated with run commands.

## Open Questions

- Vercel project creation (deployment) - founder action when ready to deploy.
