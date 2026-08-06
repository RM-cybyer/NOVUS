# TASK-02 — Financial Hub module

**Assigned to:** Cursor
**Branch:** `task/02-finance`
**Start:** after TASK-01 is pushed.
**Depends on:** nothing technical. The contract is written and final.
**Read first:** `.ai/tasks/ONBOARDING.md`, then `AGENTS.md`, then this file.

## Why this module matters

The chat already reasons about the user's money — it says things like
"tu flujo es $585 y tu tasa de ahorro va en 28%". Those numbers are
invented today. This module makes them real.

## Scope

The `/movimientos` surface: record income and expenses, categorise them,
and see a financial overview.

`/movimientos` currently exists as a 20-line placeholder rendering an
`EmptyState`. You are replacing that page entirely.

## Files you may create or modify

```
app/movimientos/page.tsx                              (replace: currently a placeholder)
lib/finance/demo-data.ts                              (create)
lib/finance/README.md                                 (create)
components/domain/finance/transaction-list.tsx        (create)
components/domain/finance/transaction-row.tsx         (create)
components/domain/finance/transaction-form.tsx        (create)
components/domain/finance/overview-summary.tsx        (create)
components/domain/finance/category-breakdown.tsx      (create)
components/domain/finance/README.md                   (create)
```

Nothing else. Do not touch `lib/finance/types.ts` (final),
`lib/constants/navigation.ts` (`/movimientos` is already in the nav), or
anything under `lib/dashboard/`.

## The contract

`lib/finance/types.ts` is final. It gives you `Transaction`, `Category`,
`CategoryTotal`, `FinanceOverview`, `CreateTransactionInput`,
`UpdateTransactionInput`, and two pure helpers: `netFlow(transactions)`
and `savingsRate(income, expenses)`.

Two decisions in that file you must respect:

- **`amount` is always positive.** Direction lives in `kind`
  (`"ingreso"` / `"gasto"`). Never store a negative amount.
- **`Category.colorToken` is a token name**, e.g. `"--color-accent"`,
  never a hex value. Resolve it through the token system.

Use `netFlow` and `savingsRate` rather than recomputing inline.

## The data provider

Create `lib/finance/demo-data.ts` exporting exactly:

```ts
export async function getTransactions(): Promise<Transaction[]>
export async function getCategories(): Promise<Category[]>
export async function getOverview(): Promise<FinanceOverview>
```

Open it with the same "INTEGRATION SEAM" comment as
`lib/dashboard/demo-data.ts`.

Seed realistic Spanish data for the current month:

- Six to eight categories across both kinds — Salario, Freelance,
  Compras, Hogar, Comida, Transporte, Suscripciones.
- Twenty-five to thirty-five transactions spread across the month.
- Totals must reconcile with what the dashboard already shows: income
  around $3.050, expenses around $2.465, cash flow around $585, savings
  rate around 28%. Compute the overview from the transactions — **do not
  hard-code the totals** — then adjust the transactions until the
  computed numbers land near those figures.
- Compras should be visibly the largest expense category, since the
  dashboard already flags it as an anomaly.
- `trend` carries eight values, oldest first.

## What to build

### Overview summary

Income, expenses, cash flow and savings rate as four figures. Cash flow
must read as positive or negative without relying on colour alone —
pair it with a sign or a word. Use `--color-accent-text` for positive
emphasis and `--color-danger-text` for negative.

Reuse `Sparkline` for `trend`. It already exists; do not build a chart.

### Category breakdown

Each category with its total and a bar whose width is `share`. The dot
uses `colorToken` resolved through the token system. Show the share as a
percentage too, so the bar is not the only encoding.

### Transaction list

Grouped by date, most recent first. Each row: description, category,
date, amount. Income and expenses must be distinguishable by more than
colour — a sign or an icon.

Filters: by kind (todos / ingresos / gastos) and by category. The active
filter must be visible with a way back to unfiltered.

Empty state via `EmptyState` when a filter matches nothing.

### Recording a transaction

`transaction-form.tsx`. Validation, inline and in Spanish, never
`alert()`:

| Rule | Message |
|---|---|
| Amount > 0 | "El monto tiene que ser mayor que cero" |
| Description required | "Describe el movimiento" |
| Category required | "Elige una categoría" |
| Date not in the future | "No puedes registrar un movimiento futuro" |

The category selector must only offer categories matching the selected
`kind` — expense categories for an expense. When `kind` changes, reset a
category that no longer applies rather than leaving an invalid pair.

## Formatting

Money renders as `$2.780` — thousands separated, no decimals, consistent
with the dashboard. Use `font-variant-numeric: tabular-nums` wherever
amounts stack in a column so digits align.

## No persistence yet

Same rule as TASK-01: after a create, navigate back to the list. Do not
fake persistence with a module-level array or `localStorage`.

## Acceptance criteria

1. `/movimientos` shows the overview with figures computed from the
   seeded transactions, near the dashboard's numbers.
2. The category breakdown renders with correct shares and percentages.
3. Transactions list grouped by date, most recent first.
4. Kind and category filters work, with a visible active state.
5. The form validates all four rules with inline Spanish messages.
6. Changing `kind` updates the category options and clears an invalid one.
7. Income and expenses are distinguishable without colour.
8. Amounts align in columns via tabular numerals.
9. Layout works at 375 px and 1280 px.
10. Keyboard reachable with visible focus rings.
11. UI copy in Spanish with correct accents; code and comments English.

## Verification required

```bash
pnpm run typecheck
pnpm run lint
pnpm run build
```

Paste the real output. Then `pnpm dev`, open
`http://localhost:3000/movimientos` and exercise, listing what you did:

- the computed overview figures, and state the four numbers you got
- each filter, including one that matches nothing
- the form with a zero amount, an empty description, a future date
- switching kind with a category already selected
- a successful create
- the 375 px viewport

## Out of scope

Database, authentication, editing or deleting transactions, recurring
transactions, budgets, multi-currency, date-range selection beyond the
seeded month, imports, and any change to the chat, the AI layer or the
dashboard.
