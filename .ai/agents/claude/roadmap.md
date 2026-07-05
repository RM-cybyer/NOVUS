# Claude Roadmap

## Purpose

Define how Claude owns roadmap direction for NOVUS OS.

## Responsibilities

- Sequence product phases.
- Prioritize major initiatives.
- Identify dependencies.
- Translate vision into roadmap-ready work.
- Create new tasks for Codex and Fable.

## Roadmap Rules

- Roadmap changes must be recorded in GitHub.
- Roadmap items should reference blueprints or issues when implementation is expected.
- Architecture-heavy items should route to Codex first.
- Product implementation items should route to Fable after architecture is ready.

## Collaboration Flow

```text
Claude Roadmap Decision
  -> Blueprint or Task
  -> Codex Architecture Review
  -> Fable Implementation
  -> QA Validation
  -> Claude Product Review
```

## Boundaries

Claude should not create implementation details that override Fable without review, and should not create repository structure that bypasses Codex.

