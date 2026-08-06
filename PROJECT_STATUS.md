# Project Status — NOVUS MVP

Last updated: 2026-08-05, after the chat went live against a real model.

Scope of record: `blueprints/mvp-scope.md`.

## Summary

The design system, foundation UI, routing and the Mission Control
dashboard are built. The chat is live: it reasons over the user's context
against NVIDIA Nemotron and streams back through a server route.

Everything it reasons over is demo data. There is no database, no
authentication and no persistence, so nothing the user does survives a
page reload. Of the fourteen MVP modules, two are materially underway.

The gates are green (`pnpm run typecheck`, `pnpm run lint`,
`pnpm run build`) and CI enforces them.

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

## MVP progress

Measured against `blueprints/mvp-scope.md`, the founder-issued scope.

| Module | Status |
|---|---|
| Authentication | Not started |
| Dashboard | UI complete, on demo data. Missing active projects and recent conversations |
| Chat | Conversations, streaming, markdown and code rendering work. Missing history, attachments, search, persistent context |
| Memory Engine | Not started |
| Projects | Not started — no route, no contracts |
| Goals | Scaffold route only |
| Financial Hub | Scaffold route only |
| Knowledge Base | Not started |
| AI Router | Engine works. Providers do not match the scope — see open decisions |
| Decision Engine | Not started. The chat parses decision cards, but nothing produces them |
| Settings | Scaffold route only |
| Backend | Only `app/api/chat` |
| Database | Not started |
| Infrastructure | GitHub only. No Vercel, Cloudflare, PostgreSQL, Supabase or Redis |

Roughly two of fourteen modules are materially underway. Everything else
blocks on the database and authentication.

## Open decisions

These conflicts between the built system and the MVP scope need a founder
call before the work continues.

1. **AI Router providers.** The scope lists OpenAI, Anthropic, Gemini,
   Perplexity and DeepSeek. The running chat uses NVIDIA NIM, which the
   scope does not list, and the registry has no Perplexity or DeepSeek
   entries. Either NVIDIA joins the scope or it is a temporary provider to
   be replaced.
2. **Business.** `/negocio` and the dashboard's business card are built,
   but the scope places Business OS in the future roadmap. Dashboard
   "active projects" may be what replaces it.
3. **Connections.** `/conexiones` advertises integrations that the scope
   defers entirely.

## Suggested build order

Everything below is sequenced by dependency, not by preference.

1. **Database and infrastructure** — Supabase/PostgreSQL with the schema
   from the scope. Every remaining module blocks on this.
2. **Authentication** — user identity, which the schema needs first.
3. **Chat persistence** — history, search and persistent context turn the
   existing chat into the scoped one.
4. **Memory Engine** — the core component, and the dashboard and Decision
   Engine both read from it.
5. **Projects and Goals** — CRUD that the dashboard is specified to show.
6. **Dashboard on real data** — replace `lib/dashboard/demo-data.ts`.
7. **Financial Hub**, then **Decision Engine** (it needs the data above),
   then **Knowledge Base** and **Settings**.

AI Router provider expansion is independent and can land at any point once
decision 1 is settled.

## Technical debt

- No tests for adapters, routing or the registry.
- No telemetry for provider latency or token counts.
- Fallback policy is hard-coded; new providers need code changes.
- Cost estimates come from static config and need manual updates.
- `nova-fast` and `nova-fast-fallback` in the registry point at the same
  provider model id, so the fallback is not a real alternative.
