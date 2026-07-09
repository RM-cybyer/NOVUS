# Blueprint: Design System Foundation

## Status

Draft - implementation of Phase 1 (tokens) authorized by founder milestone directive; pending Codex ratification for Phase 2+.

## Problem

NOVUS has an approved visual direction (founder-approved design exploration: dark operational surfaces, lime accent, Clash Display and Satoshi typography, glass recommendation cards) but no repository-native design system. Without centralized tokens, future UI work will hard-code visual values and drift, violating `.ai/agents/fable/design-tokens.md` governance.

## Goals

- Centralize every visual decision as a reusable, purpose-named token.
- Support dark mode (default) and light mode from day one.
- Keep tokens framework-neutral so they survive the pending runtime decision.
- Document accessibility constraints (contrast, touch targets, reduced motion) next to the values they govern.
- Give future component work a single source of visual truth.

## Non-goals

- No UI components in this phase (`components/` is gated on the runtime ADR).
- No framework, package manager or dependency introduction (gated on ADRs per `docs/architecture/dependency-boundaries.md`).
- No font binaries committed (gated on license verification per `assets/fonts/README.md`).
- No Figma library creation in this phase (no canonical Figma file exists yet; see `figma-governance.md`).

## Proposed Architecture

Phase 1 (this blueprint's implemented scope):

- `styles/tokens/tokens.css`: framework-neutral CSS custom properties covering color (semantic, dark and light schemes), typography, spacing, radius, elevation, motion, blur, opacity, z-index and sizing.
- `styles/tokens/README.md`: token documentation, naming rules, accessibility notes and usage contract.

Phase 2 (after ADR 0007):

- Token bridge into Next.js and Tailwind CSS without renaming tokens.
- `components/primitives/` implementation consuming tokens exclusively.
- Motion primitives implemented with Framer Motion / Motion for React.

Phase 3 (after component library exists):

- Domain components (recommendation card, warning card, goal card, transaction row) per surface design docs.
- Storybook or equivalent only after tooling ADRs exist.

## Design Reference

Design Milestone 01 (2026-07-08) produced the canonical Figma file `https://www.figma.com/design/Nbq4qAEvhtb1KDacWLYz2N`: Figma variables mirroring `styles/tokens/tokens.css`, 13 component sets plus 6 standalone components (states included), navigation screens (desktop expanded/collapsed, tablet, mobile), 9-step onboarding flow, app shell with command palette and notifications, and 16 documented motion patterns (catalog in `.ai/agents/fable/animation-library.md`). Figma is design input; this repository remains the source of truth.

## AI Ownership

- Owning AI agent: Fable (styles/, future components/).
- Collaborating AI agents: Codex (architecture ratification, runtime ADR), Claude (brand direction), QA (accessibility validation).

## Data and Service Boundaries

None. Tokens are static style values. No persistence, no services, no external calls.

## Security and Privacy

No secrets, no user data. Fonts referenced by name only; no third-party requests are introduced by the token file itself.

## Accessibility

- Text color tokens document their contrast ratio against base surfaces (WCAG 2.1 AA minimum for body text).
- `--color-text-muted` is documented as decorative/non-essential only.
- `--size-touch-target` (44px) encodes the minimum interactive target.
- Motion tokens ship with a documented reduced-motion rule.

## Testing Plan

- No test tooling exists yet (per `docs/testing/test-strategy.md`).
- Manual verification: CSS parses, values match the approved design direction, README documents every category.
- Future: contrast checks and visual regression once tooling ADRs exist.

## Rollout Plan

- Tokens land on `main` (documented branch rule) as inert files; nothing consumes them until Phase 2, so rollback is a simple revert.

## Documentation Updates

- `styles/README.md` and `styles/tokens/README.md` updated with current state.
- `.ai/agents/fable/design-tokens.md` updated to reference the implemented tokens.
- `CHANGELOG.md` entry.
- Session handoff in `.ai/handoffs/`.

## Open Questions

- Resolved by ADR 0007: official runtime is Next.js App Router, TypeScript, Tailwind CSS and Framer Motion / Motion for React with pnpm.
- Claude: confirm light mode is required for launch or can remain token-complete but unshipped.
- Founder/Claude: license verification for Clash Display and Satoshi (Fontshare licenses) before committing font binaries to `assets/fonts/`.
