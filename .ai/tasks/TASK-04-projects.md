# TASK-04 — Projects module (optional)

**Assigned to:** Cursor
**Branch:** `task/04-projects`
**Start:** only if there is spare capacity, or as the fallback while TASK-03 is blocked. Cut this before cutting anything else.
**Read first:** `AGENTS.md`, then this file.

## Context

`Projects` is an MVP module (`blueprints/mvp-scope.md`) and nothing of it
exists yet. The dashboard is specified to show active projects, so this
module has to exist before that section can be real.

The database is being built in parallel. You are **not** waiting for it:
you build against the contracts in `lib/projects/types.ts`, which are
already written and final, behind a local provider. When the database
lands, only the provider body is replaced — the same seam
`lib/dashboard/demo-data.ts` already documents. Your UI does not change.

## Scope

Build the `/proyectos` surface: list projects, create one, edit one,
change status and priority, and view a single project with its linked
conversations, goals and files.

Linked conversations, goals and files are **displayed only**. Creating or
attaching them is out of scope for this task — render what the contract
provides, and render an empty state when a list is empty.

## Files you may create

```
app/proyectos/page.tsx
app/proyectos/[id]/page.tsx
lib/projects/demo-data.ts
components/domain/projects/project-list.tsx
components/domain/projects/project-card.tsx
components/domain/projects/project-detail.tsx
components/domain/projects/project-form.tsx
components/domain/projects/README.md
lib/projects/README.md
```

## Files you may modify

None. `lib/projects/types.ts` is final — if you believe it is wrong,
stop and report rather than editing it. The navigation entry for
`/proyectos` is added separately; do not touch
`lib/constants/navigation.ts`.

## How to build it

- Follow the dashboard module as your reference for structure, motion and
  token usage: `components/domain/dashboard/`. Match its conventions
  rather than inventing new ones.
- `lib/projects/demo-data.ts` exports
  `getProjects(): Promise<Project[]>` and
  `getProject(id: string): Promise<Project | null>`, with the same
  "INTEGRATION SEAM" comment style as `lib/dashboard/demo-data.ts`.
  Seed six realistic projects in Spanish, at least one per status, with
  at least one project carrying linked conversations, goals and files,
  and at least one carrying none so the empty states are exercised.
- Page components are server components that await the provider and pass
  data down; mark a component `"use client"` only where interaction
  genuinely requires it.
- Create and edit forms hold state locally and call the provider. There
  is no persistence yet: after a create, navigate back to the list. Do
  not fake persistence with a module-level mutable array.
- Reuse existing primitives — `Card`, `Badge`, `Button`, `EmptyState`,
  `Skeleton`. Do not build new primitives.
- Status and priority both need a visible form, not only a colour:
  a labelled badge, so state reads without relying on hue.

## Acceptance criteria

1. `/proyectos` lists projects with name, status, priority and counts of
   linked conversations, goals and files.
2. Filtering by status works and the active filter is visible.
3. `/proyectos/[id]` shows one project with its description, metadata and
   the three linked lists, each with an empty state.
4. A project can be created and validated: a name is required, and an
   invalid submit shows an inline message in Spanish, not an alert.
5. A project's status and priority can be changed from the detail view.
6. An unknown id renders the not-found state rather than crashing.
7. Works at 375 px and 1280 px viewports.
8. Keyboard reachable: every control focusable with a visible focus ring.
9. `prefers-reduced-motion` respected, as the dashboard does.
10. All UI copy in Spanish; all code and comments in English.

## Verification required

Run all three gates and paste the output in your handoff:

```bash
pnpm run typecheck
pnpm run lint
pnpm run build
```

Then run `pnpm dev` and confirm in a browser: the list renders, the
filter works, a project opens, a create succeeds, validation fires on an
empty name, and an unknown id shows not-found. Say which of these you
actually exercised. Do not report the task done on a green build alone.

## Out of scope

Database, authentication, file upload, attaching conversations or goals,
search, and any change to the chat, the AI layer or the dashboard.
