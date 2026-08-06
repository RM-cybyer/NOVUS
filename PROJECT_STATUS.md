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

- **Chat** at `/` — full conversational surface backed by
  `app/api/chat/route.ts`. The route validates the conversation, injects
  the dashboard context into the system prompt, runs `AIService`
  server-side and streams SSE back. Needs `NOVUS_AI_NIM_API_KEY` in the
  server environment to reach a real model.
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

1. **Streaming has no fallback.** `streamWithFallback` ignores the
   fallback chain. `executeWithFallback` retries against the same
   adapter, so cross-provider fallback cannot work.
2. **Nothing persists.** Reloading the page loses the conversation: the
   route is stateless and the client holds the history in React state.

Resolved on 2026-08-05: the app had no server side, and the context
injection existed in code but was never wired to the UI. Both were fixed
by `app/api/chat/route.ts`.

## Bundle baseline

Measured at the cleanup commit, for tracking regressions:

| Route | Route size | First load JS |
|---|---|---|
| `/` (chat) | 51.8 kB | 202 kB |
| `/panel` | 7.5 kB | 175 kB |
| `/api/chat` | 134 B | — |
| scaffolds | 629 B | 142 kB |
| shared | — | 102 kB |

Chat was 77 kB / 227 kB before the AI layer moved to the server. What
remains in the client bundle is react-markdown, remark-gfm and
framer-motion.

## MVP critical path

Target: sign in, talk to Novus with real data in context, see it on the
dashboard, and have it persist.

1. ~~Server route for chat~~ — done 2026-08-05.
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
