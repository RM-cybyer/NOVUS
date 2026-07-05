# Hooks

The `hooks/` folder is reserved for reusable client hooks after a frontend runtime is selected.

## Responsibility

- Host reusable client-side state and interaction hooks.
- Keep hooks small and composable.

## Rules

- Do not place business logic here when it belongs in services or domain modules.
- Do not create hooks before the runtime and framework are selected.
- Keep hook side effects explicit and testable.

## AI Placement Contract

- Why this folder exists: Provide reusable client-side hooks after a frontend runtime exists.
- What belongs here: Focused hooks for client state, effects and reusable interaction behavior.
- What never belongs here: Product workflows, service adapters, persistence logic, UI components or framework setup.
- Owning AI agent: Fable.
- Collaborating AI agents: Codex, QA.
- Governing docs: `docs/architecture/module-boundaries.md` and future runtime ADRs.
