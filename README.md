# NOVUS OS

NOVUS OS is the official repository for the AI Life, Business and Financial Operating System.

The repository contains the engineering foundation (architecture, documentation hierarchy, AI-agent operating model, governance, templates, repository health workflow) and the NOVUS application, implemented module by module on the official stack (ADR 0007: Next.js App Router, TypeScript, Tailwind CSS, pnpm).

## Run the App

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm typecheck  # strict TypeScript gate
pnpm lint       # ESLint gate
pnpm build      # production build
```

Implemented so far: Module 1 Foundation (app shell, sidebar, topbar, responsive layout, command palette with global search, notifications panel, route scaffolding, loading/error/offline/empty states). See `blueprints/implementation-start.md`.

NOVUS OS is AI-first. The repository is designed as an operating system for an AI software engineering team, with documentation treated as executable context for autonomous agents and human reviewers.

## Repository Contract

- Official repository: `https://github.com/RM-cybyer/NOVUS`
- Default branch: `main`
- Major features start with a blueprint in `blueprints/`.
- Architecture decisions are recorded in `docs/decisions/`.
- Repository architecture is documented in `docs/architecture/repository-architecture.md`.
- AI agents must read `.ai/shared/` and their agent-specific folder before changing files.

## Start Here

- AI context: `.ai/README.md`
- Agent manuals: `.ai/agents/README.md`
- AI-first philosophy: `.ai/shared/ai-first-philosophy.md`
- Intelligence Layer: `.ai/intelligence/README.md`
- Runtime Operating System: `.ai/runtime/README.md`
- AI collaboration architecture: `docs/architecture/ai-collaboration-architecture.md`
- Repository architecture: `docs/architecture/repository-architecture.md`
- Runtime technology architecture: `docs/architecture/runtime/README.md`
- Engineering standards: `docs/engineering/README.md`
- Contribution guide: `CONTRIBUTING.md`
- Security baseline: `SECURITY.md`
- Blueprint template: `blueprints/_template.md`

## Development Status

Built and working:

- **Foundation** — app shell, sidebar, topbar, responsive layout, command palette with global search, notifications panel, loading/error/offline/empty states, motion system and design tokens.
- **Dashboard** — Mission Control at `/panel` with briefing, priorities, agenda, finance, goals, business, memory and notifications.

Built but not functional:

- **Chat** at `/chat` and the **AI Provider Layer** in `services/ai/` (registry, routing, NIM adapter, streaming). The layer has never served a live request: `AIService` is constructed in the browser and receives no API key, so calls are unauthenticated. A server route is required.

Not built: persistence (`database/` is empty), authentication, and tests. Six routes (`/memoria`, `/movimientos`, `/metas`, `/negocio`, `/ajustes`, `/conexiones`) are scaffolds showing an empty state. All dashboard data comes from `lib/dashboard/demo-data.ts`.

CI runs the repository structure check plus typecheck, lint and build on every push and pull request.

See `PROJECT_STATUS.md` for the current assessment and the MVP critical path.

## GitHub-First Collaboration

GitHub is the single source of truth for Codex, Fable, Claude and future AI agents. Each agent must pull latest changes before work, push completed work after verification and leave a handoff documented by the manuals in `.ai/agents/`.
