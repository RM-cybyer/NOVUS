# Scripts

The `scripts/` folder is reserved for developer, CI, maintenance and release scripts.

## Responsibility

- Automate repeatable engineering tasks.
- Keep operational scripts discoverable.
- Document script prerequisites and side effects.

## Subfolders

- `ci/`: Scripts used by CI workflows.
- `dev/`: Local development helper scripts.
- `maintenance/`: Repository maintenance scripts.
- `release/`: Release and versioning scripts.

## Rules

- Do not add scripts without a README or usage notes.
- Prefer idempotent scripts.
- Avoid scripts that require hidden local state.

## AI Placement Contract

- Why this folder exists: Keep repeatable engineering automation discoverable.
- What belongs here: CI, development, maintenance and release scripts with documented usage.
- What never belongs here: Application runtime code, product logic, secrets or destructive scripts without safeguards.
- Owning AI agent: Codex.
- Collaborating AI agents: Fable, QA.
- Governing docs: `docs/engineering/workflow-overview.md` and `docs/operations/release-process.md`.
