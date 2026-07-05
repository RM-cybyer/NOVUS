# App

The `app/` folder is reserved for application routes and route-level composition.

## Responsibility

- Define URL and screen entry points once a framework is selected.
- Keep routing concerns separated from business logic.
- Delegate domain behavior to `services/`, shared utilities to `lib/` and UI reuse to `components/`.

## Rules

- Do not place business logic here.
- Do not create routes before a framework decision exists.
- Route files should stay thin and orchestration-focused.

## AI Placement Contract

- Why this folder exists: Hold application routes after a runtime is selected.
- What belongs here: Route entry points and route-level composition.
- What never belongs here: Business logic, external service clients, persistence logic or reusable UI primitives.
- Owning AI agent: Fable.
- Collaborating AI agents: Codex, QA, Claude.
- Governing docs: `docs/architecture/module-boundaries.md` and future runtime ADRs.
