# Store

The `store/` folder is reserved for client or server state stores.

## Responsibility

- Host durable state management modules after state strategy is documented.
- Keep state ownership explicit.

## Rules

- Do not introduce a state library without an ADR.
- Keep server state, client state and cached remote state conceptually separate.
- Avoid duplicated sources of truth.

## AI Placement Contract

- Why this folder exists: Hold explicit state stores after state strategy is documented.
- What belongs here: Client or server state stores with clear ownership and boundaries.
- What never belongs here: Undocumented global state, persistence migrations, external provider clients or UI-only styling.
- Owning AI agent: Fable.
- Collaborating AI agents: Codex, QA.
- Governing docs: `docs/architecture/module-boundaries.md` and future state management ADRs.
