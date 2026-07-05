# Providers

The `providers/` folder is reserved for application-level provider wiring.

## Responsibility

- Centralize dependency providers, context providers and integration wrappers.
- Keep provider composition separate from route files.

## Rules

- Do not add providers before the runtime requires them.
- Keep provider order documented when order matters.

## AI Placement Contract

- Why this folder exists: Centralize application provider wiring after runtime setup exists.
- What belongs here: Provider composition, dependency context wrappers and documented provider order.
- What never belongs here: Business logic, route definitions, database access, secrets or provider-specific product strategy.
- Owning AI agent: Fable.
- Collaborating AI agents: Codex, QA.
- Governing docs: `docs/architecture/module-boundaries.md` and future runtime ADRs.
