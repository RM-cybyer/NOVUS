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

## Order of work

Do them in this order. The order is by demo value, not by size: the chat
already reasons about goals and money, so those two modules turn its
existing answers real.

| Task | Module | State | Contract |
|---|---|---|---|
| TASK-01 | Goals | **Ready — start here** | `lib/goals/types.ts` |
| TASK-02 | Financial Hub | Ready after 01 | `lib/finance/types.ts` |
| TASK-03 | Settings | Blocked on authentication | authored in-task |
| TASK-04 | Projects | Optional. Cut first if time runs short | `lib/projects/types.ts` |

Claude Code's own work — Supabase project, schema, RLS, authentication,
chat persistence, and swapping the local providers for real queries — is
tracked in `PROJECT_STATUS.md`, not here.

## Before the first task

Read `.ai/tasks/ONBOARDING.md`. It carries the product context, the state
of the codebase, the styling and accessibility conventions, and the
verification bar. An agent that skips it will invent conventions that
already exist.

## Writing a new task

A task is ready when an agent could complete it correctly having read
only `AGENTS.md`, the task file, and the code it names. If it needs
context from a conversation, it is not ready.
