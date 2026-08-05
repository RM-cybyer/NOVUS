# Project Status — NOVUS Release 1

Last updated: 2026-08-05, after the cleanup pass.

## Summary

The design system, foundation UI, routing and the Mission Control
dashboard are built and working. The AI Provider Layer and the chat UI are
written but have never executed a single live request, because the
application has no server side: there are no API routes, no persistence
and no authentication.

The gates are green (`pnpm run typecheck`, `pnpm run lint`,
`pnpm run build`) and CI now enforces them.

## What works

- **Foundation** — app shell, sidebar, topbar, responsive layout, command
  palette, notifications panel, offline banner, loading/error/404 states,
  motion system, design tokens.
- **Dashboard** at `/panel` — briefing, priorities, agenda, finance,
  goals, business, memory, notifications, quick actions. Below-the-fold
  sections are code-split.

## What is written but does not work

- **Chat** at `/chat` — the UI is complete (bubbles, markdown, typing
  indicator, decision cards, suggested actions) but cannot reach a model.
- **AI Provider Layer** — types, registry, capability-based routing,
  normalized errors, NVIDIA NIM adapter with SSE streaming, cost
  estimation, health check, zod-validated env config.

## What is not built

- Persistence. `database/` is empty; chat sessions live in an in-memory
  `Map` and the dashboard reads `lib/dashboard/demo-data.ts`.
- Authentication. There is no user identity.
- Tests. `tests/` is empty.
- Deployment. Vercel is the documented target; nothing is deployed.
- Six routes are scaffolds: `/memoria`, `/movimientos`, `/metas`,
  `/negocio`, `/ajustes`, `/conexiones`.

## Blocking defects

1. **No server side.** `app/api/` does not exist. `ChatView` is a client
   component that instantiates `AIService` in the browser and calls
   NVIDIA directly. It reads config from `window.__ENV__`, which nothing
   defines, so no API key is present and every request would be
   unauthenticated. Injecting the key client-side is not an option: it
   would ship the credential to every visitor.
2. **`ChatService` is not wired.** `lib/chat/service.ts` injects goals,
   finances, agenda and memory into the system prompt. `ChatView` never
   calls it and builds its own request with a weaker prompt and no
   context, so context awareness exists in code but not in the product.
3. **Streaming has no fallback.** `streamWithFallback` ignores the
   fallback chain. `executeWithFallback` retries against the same
   adapter, so cross-provider fallback cannot work.

## Bundle baseline

Measured at the cleanup commit, for tracking regressions:

| Route | Route size | First load JS |
|---|---|---|
| `/chat` | 77 kB | 227 kB |
| `/panel` | 7.5 kB | 175 kB |
| scaffolds | 629 B | 142 kB |
| shared | — | 102 kB |

`/chat` is the outlier because the AI layer, the registry and zod are
bundled into the browser. Moving execution to a server route removes them.

## MVP critical path

Target: sign in, talk to Novus with real data in context, see it on the
dashboard, and have it persist.

1. `app/api/chat/route.ts` — run `AIService` server-side, stream back,
   remove the client-side import, wire `ChatService`.
2. Supabase — schema for users, sessions, messages, goals, transactions,
   events and memories, with RLS. Replace `demo-data.ts` with queries.
3. Authentication — Supabase Auth; a single user is enough for the MVP.
4. Deploy to Vercel with `NOVUS_AI_NIM_API_KEY` as a server secret.
5. Tests — routing engine, registry, chat route.

The scaffold routes can stay scaffolds for the MVP. A chat that genuinely
knows the user's finances plus a dashboard with real, persistent data is a
product; nine screens of invented data is not.

## Technical debt

- No tests for adapters, routing or the registry.
- No telemetry for provider latency or token counts.
- Fallback policy is hard-coded; new providers need code changes.
- Cost estimates come from static config and need manual updates.
- `nova-fast` and `nova-fast-fallback` in the registry point at the same
  provider model id, so the fallback is not a real alternative.
