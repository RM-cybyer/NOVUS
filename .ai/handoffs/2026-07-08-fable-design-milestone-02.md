# Handoff: Fable Design Milestone 02 - Product Surfaces

Agent: Fable
Branch: main
Latest GitHub commit: recorded at push time (see git log for this handoff's commits)
Verification performed: Figma build calls returned success for all 13 screens and prototype wiring; visual QA executed on 1 exported render (Chat) before the Figma MCP Starter-plan tool-call cap blocked further repair and export calls.

## Status: BUILT, PENDING VISUAL REPAIR PASS

All Milestone 02 surfaces exist in the canonical Figma file, with prototype flows wired. Visual QA on the first export found real layout defects that could not be repaired before the Figma MCP rate limit was reached. Milestone 02 is therefore NOT complete by the founder's visual standard until the repair + export pass runs.

What changed (Figma - `https://www.figma.com/design/Nbq4qAEvhtb1KDacWLYz2N`):
- 13 product screens in a new "06 - PRODUCTO" region: Chat conversation (mobile), Voice overlay (listening state with transcript), Chat states (Empty/Loading/Error/Offline), Dashboard desktop (1440), Dashboard mobile, Dashboard states (Empty/Loading), Metas (incl. blocked-goal state), Movimientos (filters, day groups, review row, FAB), Ajustes (perfil, IA, memoria/privacidad, zona de riesgo), Memoria (typed memory rows + deletion promise), Conexiones desktop (6 connectors: Conectado/Sync/Disponible/Error states), Grafo de Conocimiento desktop (nodes/edges canvas + entity panel), Negocio desktop (KPIs, clients table with overdue state, business insights), Notificaciones mobile.
- Interactive prototype: onboarding 9-step chain into Chat, mobile bottom-nav tabs across 5 screens, Chat input to Voice overlay and back, desktop sidebar navigation across Panel/Negocio/Conexiones/Grafo, 3 flow starting points (Onboarding, App movil, App desktop).
- Repository docs updated: `figma-governance.md` (MCP rate-limit constraint).

Why it changed:
- Founder Master Operating Prompt v2.0: every milestone must visibly advance the product in Figma; single-owner operating model.

## Visual QA findings (from the Chat export - MUST FIX in the next Figma session)

1. Auto-layout frames created without explicit sizing modes render at the default 100x100 size instead of hugging content. Affected: day chip, typing bubble, brand rows, message wrapper rows, filter chips, some KPI rows.
2. Recommendation Card instance inside Chat renders with an oversized badge and clipped body (wrapper frame clipping).
3. Bottom Nav instance renders compressed/vertical on Chat; needs width hug verification and re-centering on all 5 mobile screens.

Repair procedure (ready to run once Figma MCP calls are available):
- Walk all frames under `Producto /` and `Onboarding /` roots with layoutMode set.
- If width==100 and height==100: set primary and counter sizing to AUTO, clipsContent=false.
- If HORIZONTAL with height==100 and width>100: primary FIXED, counter AUTO, clipsContent=false.
- If VERTICAL with width==100 and height>100: counter AUTO, clipsContent=false.
- Re-center every `Active=` Bottom Nav instance: x = (frame.width - nav.width) / 2.
- Re-export all 13 screens and visually verify each before declaring the milestone complete.

Affected files:
- `.ai/agents/fable/figma-governance.md`
- `CHANGELOG.md`
- `.ai/handoffs/2026-07-08-fable-design-milestone-02.md` (this file)

Breaking changes:
- None (design only; no application code, no dependencies, no architecture changes).

Exported previews:
- `C:\Users\muror\Downloads\NOVUS-milestone-02\01-chat.png` (local, shows the defects above). Remaining exports blocked by the MCP cap; all screens are viewable directly in Figma via node links (file key Nbq4qAEvhtb1KDacWLYz2N, node ids recorded below).
- Node ids: Chat 11:205, Voice 11:257, Dashboard desktop 12:229, Dashboard mobile 12:352, Metas 13:331, Movimientos 13:375, Ajustes 13:431, Memoria 13:483, Conexiones 14:392, Grafo 14:493, Negocio 14:576, Notificaciones 14:670.

Next recommended tasks:
- Fable (next session, first action): run the repair procedure, re-export all 13 screens, complete visual QA, then declare Milestone 02 complete.
- Founder: the Figma Starter plan capped this session (MCP tool calls) and previously limited pages/variable modes. Upgrading to Professional materially improves design throughput.
- Codex: implementation-start blueprint remains the gate for beginning Phase 2 code.

Open questions:
- Rate-limit reset window for Figma MCP Starter plan (unknown; affects scheduling of the repair pass).

QA notes:
- Treat every future Figma build session as incomplete until at least one export per new screen is visually verified. This session proves builds can succeed structurally while rendering incorrectly.

Codex follow-up:
- None required by this change.

Claude follow-up:
- None required by this change.
