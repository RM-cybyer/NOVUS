# Components

The `components/` folder is reserved for reusable UI components after the application runtime is selected.

## Responsibility

- Store reusable UI building blocks.
- Prevent duplicated interface implementation.
- Keep presentation separate from domain services and persistence.

## Subfolders

- `primitives/`: Low-level reusable UI primitives.
- `composition/`: Components composed from primitives.
- `layouts/`: Reusable page or screen layout structures.
- `domain/`: Domain-specific UI components that remain presentation-only.

## Rules

- Do not put business logic here.
- Extract reusable components when duplication appears.
- Keep component APIs explicit and typed once TypeScript is introduced.

## AI Placement Contract

- Why this folder exists: Keep reusable UI implementation organized after product UI begins.
- What belongs here: Presentation components, UI primitives, layouts and reusable composition patterns.
- What never belongs here: Business logic, database access, external service calls, secrets or route definitions.
- Owning AI agent: Fable.
- Collaborating AI agents: Codex, QA.
- Governing docs: `docs/architecture/module-boundaries.md` and future UI architecture ADRs.
