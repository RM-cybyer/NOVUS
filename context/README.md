# Context

The `context/` folder is reserved for shared application context modules.

## Responsibility

- Host shared context definitions when runtime state cannot be passed directly.
- Keep context ownership clear and limited.

## Rules

- Prefer explicit data flow before global context.
- Avoid using context as a general state dumping ground.
- Document context boundaries when introduced.

## AI Placement Contract

- Why this folder exists: Hold shared application context modules when explicit prop flow is insufficient.
- What belongs here: Narrow context definitions with clear ownership and lifecycle.
- What never belongs here: Global dumping-ground state, business workflows, service clients, secrets or persistence logic.
- Owning AI agent: Fable.
- Collaborating AI agents: Codex, QA.
- Governing docs: `docs/architecture/module-boundaries.md` and future state management ADRs.
