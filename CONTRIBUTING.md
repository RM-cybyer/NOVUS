# Contributing to NOVUS OS

This repository is in foundation mode. Contributions should improve repository clarity, engineering standards, documentation, templates, governance or future development readiness.

## Required Reading

Before changing files, read:

1. `.ai/shared/README.md`
2. The relevant agent folder under `.ai/`
3. `.ai/shared/ai-first-philosophy.md`
4. `docs/architecture/repository-architecture.md`
5. `docs/architecture/ai-collaboration-architecture.md`
6. `docs/engineering/repository-governance.md`

## Change Rules

- Do not add product code without an approved blueprint.
- Do not initialize a framework without an architecture decision record.
- Do not add dependencies without documenting why they are needed.
- Keep changes focused and reviewable.
- Update docs in the same change when architecture or process changes.
- Keep new modules understandable without previous conversation context.
- Document AI ownership and collaborators for major folders.

## Current Verification

Every change must pass the three gates before it lands. CI runs the same
three on every push and pull request:

```bash
pnpm run typecheck
pnpm run lint
pnpm run build
```

A green build is not sufficient on its own: run the affected surface with
`pnpm dev` and confirm the behaviour you changed.

## AI Agents

Agents working in this repository must read `AGENTS.md` before touching a
file, and work from a specification in `.ai/tasks/`.
