# Onboarding — read this before your first task

You are joining a project already in progress. This document is the
context you do not have. Read it fully, then read `AGENTS.md`, then your
task file.

## What NOVUS is

NOVUS is an **AI Operating System for life, business and finances** — a
personal chief of staff that knows the user's real situation and helps
them make better decisions.

The product's own rule, from `.ai/agents/fable/chat-design.md`:

> NOVUS is not a chatbot. Conversation is one interface into the
> operating system, not the whole product.

That matters for everything you build. The user's goals, finances and
projects are not screens attached to a chatbot — they are the data the
assistant reasons over. When you build the Goals surface, you are
building something the AI reads.

The scope of record is `blueprints/mvp-scope.md`. It defines what is in
the MVP and what is deliberately deferred. Do not build anything from the
deferred list.

## The immediate objective

A working MVP by **11–12 August 2026**, good enough to show to clients
and to stand in a portfolio. Narrow scope, genuinely working — not many
features half-built.

Two agents work in parallel:

- **Claude Code** owns the database, authentication, the chat, the AI
  provider layer and the dashboard. It edits existing files.
- **You (Cursor)** own new module surfaces. You create new files.

The split exists so that a parallel task cannot break a feature that
already works. Respect it strictly.

## What already works

Do not rebuild any of this, and do not modify it.

| Surface | State |
|---|---|
| `/` | Chat. Live: streams real answers from NVIDIA Nemotron through `app/api/chat/route.ts`, reasoning over the user's context |
| `/panel` | Mission Control dashboard. Complete UI over demo data |
| App shell | Sidebar, topbar, mobile bottom nav, command palette (Ctrl/Cmd+K), notifications panel, offline banner |
| States | loading, error, not-found, empty |
| Design system | Tokens in `styles/tokens/tokens.css`, primitives in `components/primitives/` |

## What does not exist yet

No database, no authentication, no persistence. Anything the user does is
lost on reload. Claude Code is building that layer right now, in parallel
with you.

**This is why you do not wait for it.** Contracts are written first as
TypeScript types; you build the UI behind a local provider; the provider
body is later swapped for real queries with the same signature. Your UI
does not change when that happens.

The reference implementation of that seam is `lib/dashboard/demo-data.ts`:

```ts
/** Local, deterministic snapshot provider.
    INTEGRATION SEAM: replace the body with the real data layer
    (Supabase + runtime engines) keeping the same signature. */
export async function getDashboardSnapshot(): Promise<DashboardSnapshot> {
```

Copy that shape and that comment style.

## Stack

Next.js 15 App Router, React 19, TypeScript strict, Tailwind CSS v4,
pnpm. State via Zustand, animation via Framer Motion, icons via
`lucide-react`.

Do not add dependencies. The repository has an explicit policy against
speculative dependencies; if a task genuinely needs one, stop and report.

TypeScript runs with `noUncheckedIndexedAccess`. Indexing an array yields
`T | undefined`. Handle it with a guard:

```ts
const current = items[idx];
if (!current) return items;
```

Never with `!`.

## Styling

Tailwind utilities that read CSS custom properties. **Never a hex value
in a component.**

```tsx
className="text-(--color-text-primary) border-(--color-border) bg-(--color-surface)"
```

The tokens you will use most:

| Token | Use |
|---|---|
| `--color-text-primary` | Body text |
| `--color-text-secondary` | Supporting text |
| `--color-text-tertiary` / `--color-text-muted` | Labels, metadata |
| `--color-surface` / `--color-surface-raised` | Card backgrounds |
| `--color-border` / `--color-border-strong` | Borders, hover borders |
| `--color-accent` | Amber accent, decorative |
| `--color-accent-text` | Accent text — contrast-safe, use for text |
| `--color-danger-text` | Risk and error text |
| `--radius-lg` / `--radius-xl` / `--radius-2xl` | Corners |
| `--duration-fast` | Transitions |

Both light and dark themes come free through the tokens, as long as you
never hard-code a colour.

## Primitives available

In `components/primitives/`: `Button`, `Card` (with `CardLabel`),
`Badge`, `ProgressBar`, `Sparkline`, `Skeleton`, `EmptyState`, `Kbd`,
`ScrollArea`.

In `components/composition/`: `SectionCard` — a titled card with a
built-in empty state, used by every dashboard section.

**Use these. Do not build new primitives.** If something is missing, say
so in your handoff rather than inventing a parallel component.

## The pattern to copy

`components/domain/dashboard/planning.tsx` is your reference for a domain
component: token classes, `cn()` for conditional classes, `lucide-react`
icons with `aria-label` when meaningful and `aria-hidden` when
decorative, `min-h-11` on interactive rows for touch targets.

```tsx
<li className="flex min-h-11 items-center gap-3 border-b border-(--color-border) py-2.5 last:border-b-0">
```

Match its density and conventions rather than introducing your own.

## Language

- Code, comments, commit messages, documentation: **English**.
- Everything the user reads on screen: **Spanish**.

The existing UI copy is warm and direct, never robotic. "Sin metas
todavía. Crea la primera y Novus empezará a seguirla" — not "No data
available".

Note the existing code writes Spanish UI strings without accents in some
older files. New code should use proper accents.

## Accessibility baseline

WCAG AA. Visible focus states, 44 px touch targets (`min-h-11`), semantic
landmarks, keyboard access to everything, `prefers-reduced-motion`
respected. State must never be communicated by colour alone — pair it
with a label or an icon.

## Before you report a task done

Run all three gates and paste the real output:

```bash
pnpm run typecheck
pnpm run lint
pnpm run build
```

Then run `pnpm dev` and actually use the feature in a browser. A green
build is not verification. Say exactly what you exercised and what you
did not.
