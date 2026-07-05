# Blueprints

Large features and architectural changes begin with a blueprint before implementation.

Blueprints are not product code. They define the problem, boundaries, risks, rollout and verification plan before implementation begins.

## Required Sections

Each blueprint should include:

- Problem
- Goals
- Non-goals
- Proposed architecture
- Data and service boundaries
- Security and privacy considerations
- Accessibility considerations when user-facing UI is affected
- Testing plan
- Rollout plan
- Documentation updates

## Naming

Use kebab-case filenames:

```text
blueprints/example-feature.md
```

Start from `_template.md`.

## AI Placement Contract

- Why this folder exists: Require durable planning before major feature or architecture work.
- What belongs here: Blueprints for large features, architecture changes and cross-agent implementation plans.
- What never belongs here: Product implementation, secrets, throwaway notes or undocumented strategy changes.
- Owning AI agent: Codex.
- Collaborating AI agents: Claude, Fable, QA.
- Governing docs: `docs/templates/blueprint-template.md` and `docs/engineering/repository-governance.md`.
