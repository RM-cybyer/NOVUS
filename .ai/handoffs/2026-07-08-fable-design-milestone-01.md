# Handoff: Fable Design Milestone 01

Agent: Fable
Branch: main
Latest GitHub commit: recorded at push time (see git log for this handoff's commits)
Verification performed: Figma node inventory audit (13 component sets / 68 variants, 6 standalone components, 15 screens and boards), orphan-node cleanup (5 removed), ASCII scan on modified repository files, repository-health required files untouched.

What changed:
- Created the canonical Figma file "NOVUS Design System": `https://www.figma.com/design/Nbq4qAEvhtb1KDacWLYz2N`.
- Figma variables (74 tokens/styles) mirroring `styles/tokens/tokens.css`, plus text styles and effect styles.
- Component library with states: Button (24), Badge (3), Suggestion Chip (4), Input (5), Toast (4), Card (4, incl. Empty and Offline), Recommendation Card (6, incl. Loading/Accepted/Dismissed), Insight Card (3), Bottom Nav (3), Sidebar Item (8, Expanded/Collapsed), Voice (3, Idle/Listening/Thinking), Category Bar (2), Transaction Row (3); standalone: Skeleton, Tooltip, Menu, Dialog, Bottom Sheet, Top Bar.
- Navigation system screens: desktop sidebar expanded (1440), desktop collapsed, tablet (834), mobile (402) with bottom nav and chat input pill.
- Global layout screens: app shell + command palette (Ctrl K), app shell + notifications panel.
- Onboarding flow, 9 steps: Welcome, Perfil, Metas, Finanzas, Negocio, IA (recommendation demo), Memoria (memory transparency demo), Permisos (toggles), Listo (first insight).
- Motion System board: 16 documented patterns; catalog committed to `.ai/agents/fable/animation-library.md`.
- Repository docs updated: `figma-governance.md` (canonical file + limits), `components-library.md` (current library inventory + implementation mapping), `animation-library.md` (approved pattern catalog), blueprint Design Reference section, `CHANGELOG.md`.

Why it changed:
- Founder directive: Design Milestone 01 (design only, no application code, no dependencies) after ADR 0007 unblocked the runtime decision.
- Per `figma-governance.md`, every design decision that affects future work was converted into repository documentation; Figma remains input, GitHub remains source of truth.

Affected files:
- `.ai/agents/fable/figma-governance.md`
- `.ai/agents/fable/components-library.md`
- `.ai/agents/fable/animation-library.md`
- `blueprints/design-system-foundation.md`
- `CHANGELOG.md`
- `.ai/handoffs/2026-07-08-fable-design-milestone-01.md` (this file)

Affected documentation:
- Fable design operating system (figma, components, animation docs).
- Design System Foundation blueprint.
- Changelog.

Breaking changes:
- None. No application code, dependencies or architecture changes.

Constraints found (Figma Starter plan):
- Single page per file: organized with region headers instead of pages (Tokens, Componentes, Navegacion y Layout, Onboarding, Motion).
- Single variable mode: dark values only in Figma; light values remain canonical in `styles/tokens/tokens.css`.
- Brand fonts unavailable in Figma: Space Grotesk substitutes Clash Display, Inter substitutes Satoshi. Swap once Fontshare fonts are installed; text styles keep token sizing.

Next recommended tasks:
- Founder: install Clash Display and Satoshi in Figma (Fontshare download) so text styles can be re-pointed to brand fonts; consider Figma Professional if dual-mode variables and multi-page organization are wanted.
- Codex: implementation-start blueprint (framework initialization) so Fable can begin Design System Phase 2 code.
- Fable (Milestone 02 proposal): implement Phase 2 - pnpm + Next.js + Tailwind initialization, token bridge, `components/primitives/`, then chat and panel surfaces using these designs.
- QA: accessibility review of the Figma designs (contrast on accent-soft fills, focus states, touch targets) before implementation.

Pending work:
- Dashboard, goals detail, transactions list and settings screens are not yet designed (Milestone 02 candidates).
- No prototype wiring (Figma interactions) yet; motion is documented, not simulated.
- Light mode not represented in Figma (plan limit).

Open questions:
- Light mode at launch? (Claude/founder, carried over.)
- Should the founder's original 9-screen design export be imported into this Figma file as reference frames?

QA notes:
- Insight Card Positive uses accent text on accent-soft fill; verify contrast against WCAG AA before implementation.
- Voice "Listening" state must never appear without active microphone permission (see `voice-experience.md` honesty rules).

Codex follow-up:
- Implementation-start blueprint for framework initialization.

Claude follow-up:
- Light mode launch decision; brand font licensing confirmation.
