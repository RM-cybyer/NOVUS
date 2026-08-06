# Agent rules

Standing rules for any AI agent working in this repository — Cursor,
Claude Code, Codex or otherwise. They exist so parallel work does not
break what already runs.

Read this before touching a file. If a task specification conflicts with
this document, stop and ask; do not guess.

## The one rule

**Build exactly what the task specifies. Nothing more.**

No speculative abstractions, no "while I was here" refactors, no extra
files, no dependencies that the task did not ask for. If you believe
something outside your task is broken, write it down in the handoff and
leave it alone.

This repository already has a dependency policy: nothing speculative.
Extra code is not a bonus. It is unreviewed surface area.

## Scope discipline

Every task specification lists the files you may create or modify. That
list is exhaustive.

- Do not edit a file outside your list, not even to fix a type error.
  If your task cannot be completed without touching one, stop and report.
- Do not rename, move or delete existing files.
- Do not reformat files you did not otherwise change.
- Do not touch `pnpm-lock.yaml` unless your task adds a dependency.

Files that are off limits unless a task names them explicitly:

| Path | Why |
|---|---|
| `app/api/chat/route.ts` | Live chat execution path |
| `lib/chat/*` | Live chat client, prompt and contracts |
| `components/domain/chat/*` | Live chat UI |
| `services/ai/*` | Provider layer that the chat depends on |
| `styles/tokens/tokens.css` | Design source of truth |
| `.github/workflows/*` | CI gates |
| `blueprints/mvp-scope.md` | Founder-issued scope |

## Gates

Your work is not done until all three pass locally:

```bash
pnpm run typecheck
pnpm run lint
pnpm run build
```

CI runs the same three on every push and pull request. A red gate is a
failed task, not a follow-up.

TypeScript is strict, including `noUncheckedIndexedAccess`. Indexing an
array gives you `T | undefined`; handle it with a guard rather than a
non-null assertion.

## Conventions

- **Language.** Code, comments, commit messages and documentation in
  English. User-facing UI copy in Spanish.
- **Styling.** Tailwind utilities reading CSS custom properties from the
  token system, e.g. `text-(--color-text-primary)`. Never hard-code a
  hex value.
- **Imports.** Absolute via the `@/` alias.
- **Comments.** Explain why, not what. Match the density of the file you
  are in.
- **Secrets.** Never commit a key. Server-side environment variables
  only; nothing sensitive reaches a client component.
- **Data access.** Server-side. A client component never queries the
  database directly.

## Git

- One branch per task: `task/<id>-<slug>`.
- Never commit directly to `main`.
- Never force-push, never rebase shared history, never amend a pushed
  commit.
- Commit messages: imperative subject under 72 characters, then a body
  explaining why the change was needed.

## Definition of done

1. Every acceptance criterion in the task specification is met.
2. The three gates pass.
3. You verified the feature actually runs — not only that it compiles.
4. Files touched match the task's allowed list exactly.
5. Handoff written: what you built, what you verified and how, anything
   you found but deliberately left alone.

## Reporting honestly

If something does not work, say so plainly and show the output. A task
reported as done that is not done costs more than a task reported as
blocked. Do not describe work as verified unless you ran it.
