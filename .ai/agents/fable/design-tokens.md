# Design Tokens

## Purpose

Define governance for NOVUS design tokens.

## Current State

Phase 1 tokens are implemented in `styles/tokens/tokens.css` (framework-neutral CSS custom properties, dark and light schemes, reduced-motion handling). Usage contract and category map live in `styles/tokens/README.md`. Authorized by the founder's Design System milestone; blueprint: `blueprints/design-system-foundation.md`.

## Responsibilities

- Establish token categories before implementation.
- Keep visual decisions consistent.
- Support theming and future scalability.
- Prevent hard-coded design values from spreading.

## Token Categories

- Color.
- Typography.
- Spacing.
- Radius.
- Border.
- Shadow.
- Motion.
- Layout.
- Z-index.

## Token Rules

- Tokens should be named by purpose when possible.
- Do not invent brand tokens without product or design direction.
- Do not hard-code repeated values once tokens exist.
- Document token changes.
- Keep accessibility contrast requirements visible.

## AI Ownership

- Owning AI agent: Fable.
- Collaborating AI agents: Claude for brand/product direction, Codex for architecture, QA for accessibility.

