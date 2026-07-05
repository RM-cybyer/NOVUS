# Tests

The `tests/` folder is reserved for automated tests, fixtures and test utilities.

## Responsibility

- Provide confidence in repository, runtime and product behavior.
- Keep test types organized by scope.

## Subfolders

- `unit/`: Unit tests.
- `integration/`: Integration tests.
- `e2e/`: End-to-end tests.
- `fixtures/`: Test fixtures.
- `utils/`: Test utilities.

## Rules

- Do not add tests for product code before product code exists.
- Define test tooling through an ADR when a runtime is selected.
- Keep fixtures free of real user data.

## AI Placement Contract

- Why this folder exists: Organize automated verification as implementation grows.
- What belongs here: Unit, integration, end-to-end tests, fixtures and test utilities.
- What never belongs here: Product implementation, secrets, real user data, deployment scripts or undocumented tooling.
- Owning AI agent: QA.
- Collaborating AI agents: Codex, Fable.
- Governing docs: `docs/testing/test-strategy.md` and future test tooling ADRs.
