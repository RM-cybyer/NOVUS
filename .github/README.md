# GitHub Configuration

This folder contains GitHub-specific repository workflows, issue templates and pull request templates.

## Responsibility

- Define repository automation that supports engineering quality.
- Provide contribution templates that enforce architectural and documentation discipline.
- Keep automation focused on repository health until the application runtime exists.

## Rules

- Do not add runtime-specific CI until the runtime is selected.
- Do not add deployment workflows until release architecture is documented.
- Keep workflow checks deterministic and dependency-light.

## AI Placement Contract

- Why this folder exists: Provide repository automation and contribution templates.
- What belongs here: GitHub Actions, issue templates, pull request templates and repository metadata.
- What never belongs here: Application code, product logic, private credentials or deployment automation without an operations decision.
- Owning AI agent: Codex.
- Collaborating AI agents: QA, Fable.
- Governing docs: `docs/engineering/repository-governance.md` and `docs/operations/release-process.md`.
