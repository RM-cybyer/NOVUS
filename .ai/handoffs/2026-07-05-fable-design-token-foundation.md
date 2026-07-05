# Handoff: Fable Design Token Foundation

Agent: Fable
Branch: main
Latest GitHub commit: recorded at push time (see git log for this handoff's commits)
Verification performed: ASCII scan on all new and modified files, CSS brace balance check (6/6), 136 token declarations parsed, repository-health required files untouched, every touched directory retains a README.

What changed:
- Added `blueprints/design-system-foundation.md` (Design System Foundation, phased plan).
- Added `styles/tokens/tokens.css`: Phase 1 design tokens as framework-neutral CSS custom properties. Categories: background, surface, border, text, accent, status, typography, spacing, radius, elevation, blur, motion, opacity, z-index, sizing. Dark scheme default, light scheme via `[data-theme="light"]`, reduced-motion collapse via media query.
- Rewrote `styles/tokens/README.md` as the token usage contract (naming rules, accessibility constraints, breakpoint table, iconography and typography source notes).
- Updated `styles/README.md` and `.ai/agents/fable/design-tokens.md` to reference the implemented tokens.
- Updated `CHANGELOG.md`.

Why it changed:
- Founder directive set the Design System as Fable's first implementation milestone.
- Visual direction already exists (founder-approved design exploration: dark surfaces, lime #C9F24E accent, coral #E05A50 status, Clash Display + Satoshi), satisfying the "design direction exists" precondition in `styles/tokens/README.md` and `design-tokens.md`.
- Tokens are the only Design System layer implementable today without violating governance: `components/` is gated on the runtime ADR and dependencies are gated on `docs/architecture/dependency-boundaries.md`.

Affected files:
- `blueprints/design-system-foundation.md` (new)
- `styles/tokens/tokens.css` (new)
- `styles/tokens/README.md`
- `styles/README.md`
- `.ai/agents/fable/design-tokens.md`
- `CHANGELOG.md`
- `.ai/handoffs/2026-07-05-fable-design-token-foundation.md` (this file)

Affected documentation:
- Fable design token governance (now references implemented tokens).
- Styles placement contracts.
- Changelog.

Breaking changes:
- None. Tokens are inert until consumed; nothing imports them yet.

Next recommended tasks:
- Codex: author the runtime/framework and package manager ADR. Fable proposes evaluating Next.js + TypeScript + Framer Motion (founder's stated stack). This ADR unblocks Phase 2 (component primitives).
- Codex: ratify `blueprints/design-system-foundation.md` or request changes.
- Fable (after runtime ADR): token bridge into the selected framework, then `components/primitives/` (Button, Input, Card, Sheet, Pill) consuming tokens exclusively, with all states per `components-library.md`.
- QA: validate documented contrast ratios and the reduced-motion strategy.

Pending work:
- No component code exists (intentionally gated).
- Font binaries not committed (license verification pending per `assets/fonts/README.md`).
- Light scheme is token-complete but has never been rendered; needs visual QA when UI exists.

Future improvements:
- Add a contrast-check script under `scripts/ci/` once tooling ADRs exist.
- Consider splitting `tokens.css` by category if it grows beyond one comfortable read.

Open questions:
- Which runtime/framework will the ADR select? (Blocks Phase 2.)
- Is light mode a launch requirement? (Claude/founder.)
- Canonical Figma file: none exists yet. The founder's design source is a local design export (9 screens: Chat, Dashboard v1/v2, Goals, Movements, Nav, Approval, Proposals, Queue, Record). Should these be summarized into `blueprints/` as the design reference, per `figma-governance.md`?

QA notes:
- Contrast ratios are documented inline in `tokens.css`; verify independently.
- `--color-text-muted` is decorative-only by contract; flag any essential-information use in future reviews.

Codex follow-up:
- Runtime/framework + package manager ADR (highest priority; blocks all component work).
- Blueprint ratification.

Claude follow-up:
- Confirm light-mode scope for launch.
- Approve summarizing the founder's design export into a repository design reference document.
