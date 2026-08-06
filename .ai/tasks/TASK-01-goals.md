# TASK-01 — Goals module

**Assigned to:** Cursor
**Branch:** `task/01-goals`
**Priority:** highest. Start with this one.
**Depends on:** nothing. The contract is written and final.
**Read first:** `.ai/tasks/ONBOARDING.md`, then `AGENTS.md`, then this file.

## Why this module matters

The chat already reasons about the user's goals — it currently says
things like "tu fondo de emergencia está al 13% y en riesgo" using demo
data. The moment goals are real, that answer becomes real. This is the
module that turns the assistant's output from a demo into the product.

Build it accordingly: this surface is read by a person **and** by the AI.

## Scope

The `/metas` surface: list goals, create one, edit one, record progress,
change status and priority, and see which goals are at risk.

`/metas` currently exists as a 20-line placeholder rendering an
`EmptyState`. You are replacing that page entirely.

## Files you may create or modify

```
app/metas/page.tsx                              (replace: currently a placeholder)
app/metas/[id]/page.tsx                          (create)
lib/goals/demo-data.ts                           (create)
lib/goals/README.md                              (create)
components/domain/goals/goal-list.tsx            (create)
components/domain/goals/goal-card.tsx            (create)
components/domain/goals/goal-detail.tsx          (create)
components/domain/goals/goal-form.tsx            (create)
components/domain/goals/progress-entry.tsx       (create)
components/domain/goals/README.md                (create)
```

Nothing else. In particular: do not touch `lib/goals/types.ts` (final),
`lib/constants/navigation.ts` (`/metas` is already in the nav), or
anything under `lib/dashboard/`.

## The contract

`lib/goals/types.ts` is written and final. It gives you `Goal`,
`GoalStatus`, `GoalPriority`, `GoalUnit`, `CreateGoalInput`,
`UpdateGoalInput`, and two pure helpers:

- `goalProgress(goal)` → 0..1. **Use this. Never compute progress
  inline** — a second implementation will drift.
- `isGoalAtRisk(goal, now?)` → boolean. Use this for the risk state.

Read the file before you start; the comments explain why `current` is
separate from `target` and why progress is derived rather than stored.

## The data provider

Create `lib/goals/demo-data.ts` exporting exactly:

```ts
export async function getGoals(): Promise<Goal[]>
export async function getGoal(id: string): Promise<Goal | null>
```

Open it with the same "INTEGRATION SEAM" comment used in
`lib/dashboard/demo-data.ts`. This body is replaced by Supabase queries
later; the signature is the contract.

Seed **six** goals in Spanish that a real person would have. Requirements:

- At least one per `GoalStatus` (activa, pausada, completada, archivada).
- At least two with `unit: "moneda"` and at least one with
  `unit: "cantidad"`.
- At least one that `isGoalAtRisk` returns true for, and at least one it
  returns false for. Verify by reading the helper, not by guessing.
- One with `deadline: null`.
- One completed goal where `current` exceeds `target`, so the UI is
  forced to handle over-completion.

Two of them should match the goals the dashboard already shows —
"Capital Finexy" ($5.000 target, $2.780 saved, deadline December 2026)
and "Fondo de emergencia" ($3.000 target, $400 saved, at risk) — so the
chat's existing answers stay coherent.

## What to build

### `/metas` — the list

- Header with the title and a count of active goals.
- A "Nueva meta" button opening the create form.
- Filter by status. The active filter must be visibly active, and there
  must be a way back to "todas".
- Each goal renders as a card showing: name, a `ProgressBar`, progress as
  both a percentage and the raw values (`$2.780 de $5.000`), priority,
  deadline, and a risk badge when `isGoalAtRisk` is true.
- Money formats as `$2.780` (thousands separated, no decimals). Counts
  format as `8 de 12`.
- Empty state when the filter matches nothing, using `EmptyState`, with
  copy that tells the user what to do next.

### `/metas/[id]` — the detail

- Everything from the card, plus the description and created/updated
  dates.
- Controls to change status and priority.
- The progress entry control (below).
- An unknown id renders Next.js not-found rather than crashing.

### Creating and editing

`goal-form.tsx` serves both. Validation, all messages in Spanish and
inline — never `alert()`:

| Rule | Message |
|---|---|
| Name required | "Ponle un nombre a tu meta" |
| Name ≤ 80 chars | "El nombre es demasiado largo" |
| Target > 0 | "El objetivo tiene que ser mayor que cero" |
| Deadline not in the past | "Esa fecha ya pasó" |

Description and deadline are optional. A field that fails validation gets
`aria-invalid` and its message linked via `aria-describedby`.

### Recording progress

`progress-entry.tsx`: the user enters an amount to add to `current`.

- Accept a positive or negative number, so a mistake can be corrected.
- Never let `current` go below 0.
- When the update makes `current >= target`, surface that the goal was
  completed. Do not silently change status.

## No persistence yet

There is no database. After a create, edit or progress entry, navigate
back to the relevant view. **Do not fake persistence with a
module-level mutable array or `localStorage`** — it produces bugs that
disappear when the real data layer lands, and hides whether your UI
handles the async provider correctly.

## Acceptance criteria

1. `/metas` lists the six seeded goals with correct progress percentages.
2. Status filtering works and the active filter is visible.
3. A goal opens at `/metas/[id]`; an unknown id shows not-found.
4. Create validates all four rules above with inline Spanish messages.
5. Status and priority can be changed from the detail view.
6. Progress entry adds and subtracts, clamps at 0, and signals completion.
7. Goals `isGoalAtRisk` flags carry a visible risk badge — with a text
   label, not colour alone.
8. Over-completed goals (`current > target`) render without breaking the
   progress bar.
9. Layout works at 375 px and 1280 px.
10. Every control is keyboard reachable with a visible focus ring.
11. `prefers-reduced-motion` respected, as `planning.tsx` does.
12. UI copy in Spanish with correct accents; code and comments English.

## Verification required

```bash
pnpm run typecheck
pnpm run lint
pnpm run build
```

Paste the real output. Then `pnpm dev`, open `http://localhost:3000/metas`
and exercise, listing in your handoff which you actually did:

- the list renders with correct percentages
- each status filter
- opening a goal, and an invented id like `/metas/no-existe`
- creating with an empty name, a zero target, and a past deadline
- a successful create
- adding progress, subtracting progress, and driving a goal past its target
- the 375 px viewport

## Out of scope

Database, authentication, deleting goals, linking goals to projects or
conversations, notifications, charts beyond `ProgressBar`, and any change
to the chat, the AI layer or the dashboard.
