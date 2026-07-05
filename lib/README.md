# Lib

The `lib/` folder contains shared utilities, configuration, constants, validation, logging, analytics helpers and common functions.

## Responsibility

- Provide reusable non-UI helpers.
- Centralize cross-cutting utilities.
- Keep shared code small, typed and dependency-conscious.

## Subfolders

- `analytics/`: Analytics helpers and event definitions.
- `config/`: Configuration readers and environment validation.
- `constants/`: Shared constants.
- `logger/`: Logging adapters and log formatting.
- `utils/`: General utilities with broad reuse.
- `validation/`: Shared schemas and validation helpers.

## Rules

- Do not place product workflows here by default.
- Do not create generic helpers until reuse is real.
- Keep modules dependency-light and easy to test.

## AI Placement Contract

- Why this folder exists: Centralize shared non-UI foundations that are reused across modules.
- What belongs here: Configuration, constants, validation, logging, analytics helpers and small reusable utilities.
- What never belongs here: Route handlers, UI components, external provider implementations, database migrations or product workflows.
- Owning AI agent: Codex.
- Collaborating AI agents: Fable, QA.
- Governing docs: `docs/architecture/dependency-boundaries.md` and `docs/engineering/coding-standards.md`.
