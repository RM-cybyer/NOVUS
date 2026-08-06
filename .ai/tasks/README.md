# Task specifications

One file per task, written to be handed to an agent without further
conversation. Every task states its scope, the exact files it may touch,
its acceptance criteria and how to verify it.

Any agent picking up a task reads `AGENTS.md` first.

## How work is divided

Two agents run in parallel on different halves of the codebase, split so
they never edit the same file.

| | Owns |
|---|---|
| **Claude Code** | Contracts, database schema, RLS, authentication, chat persistence, and swapping local providers for real queries |
| **Cursor** | Net-new module surfaces built against those contracts: UI plus a local provider |

The split follows one rule: **Cursor creates new files, Claude Code edits
existing ones.** Everything already running — the chat, the AI provider
layer, the dashboard, the token system — stays with Claude Code, so a
parallel task cannot break a working feature.

## The contract seam

Cursor does not wait for the database. Contracts land first as TypeScript
types, Cursor builds the surface against them behind a local provider,
and the provider body is later replaced with Supabase queries keeping the
same signature. The UI never changes.

`lib/dashboard/demo-data.ts` is the reference implementation of that seam.

## Status

| Task | Module | Owner | State |
|---|---|---|---|
| TASK-01 | Projects | Cursor | Ready |
| TASK-02 | Goals | Cursor | Contract pending |
| TASK-03 | Financial Hub | Cursor | Contract pending |
| TASK-04 | Settings | Cursor | Blocked on authentication |

Claude Code's own work — Supabase project, schema, RLS, auth, chat
persistence — is tracked in `PROJECT_STATUS.md`, not here.

## Writing a new task

A task is ready when an agent could complete it correctly having read
only `AGENTS.md`, the task file, and the code it names. If it needs
context from a conversation, it is not ready.
