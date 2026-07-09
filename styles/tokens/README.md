# Style Tokens

Design tokens for NOVUS. `tokens.css` is the single source of truth for every visual decision.

Status: Phase 1 implemented (framework-neutral CSS custom properties). See `blueprints/design-system-foundation.md`.

Brand palette v2 (founder, 2026-07-09): `#020300` warm black, `#F7F4F3` warm white, `#FFA400` amber accent, `#772F1A` rust status family. Derived, contrast-validated values: `#D97B54` danger text on dark (6.8:1), `#A03E00` accent text on light (6.0:1). Amber is fill-first: as text it passes only on dark (10.4:1) - use `--color-accent-text` for accent-colored text so light mode stays accessible.

## Responsibility

- Store color, typography, spacing, radius, elevation, blur, motion, opacity, z-index and sizing tokens.
- Support dark (default) and light schemes.
- Keep accessibility constraints documented next to the values they govern.

## Files

- `tokens.css`: All tokens as CSS custom properties. Dark scheme on `:root`, light scheme on `[data-theme="light"]`, reduced-motion collapse via media query.

## Usage Contract

- UI code must consume tokens; never hard-code raw colors, sizes, durations or shadows.
- Tokens are named by purpose (`--color-text-secondary`), not appearance (`--gray-72`).
- New visual values require a new token here first, not an inline value.
- `--color-text-muted` is decorative/placeholder only; never use it for essential information.
- Interactive elements must be at least `--size-touch-target` (44px) in both axes.
- Text on the accent color must use `--color-on-accent`; never white on lime.
- Glass surfaces pair a `--blur-*` token with its `--saturate-*` companion.

## Token Categories

| Category | Prefix | Notes |
| --- | --- | --- |
| Background | `--color-bg-*` | Three gradient stops: base, warm, deep |
| Surface | `--color-surface-*` | Layered translucent surfaces; `-inverse` is the light glass card on dark |
| Border | `--color-border-*` | Includes `-focus` for focus rings |
| Text | `--color-text-*` | Contrast ratios documented inline |
| Accent | `--color-accent*` | Brand lime plus `--color-on-accent` |
| Status | `--color-danger*`, `--color-positive` | Warnings, anomalies, progress |
| Typography | `--font-*`, `--text-*`, `--font-weight-*`, `--line-height-*`, `--letter-spacing-*` | Clash Display for display, Satoshi for body |
| Spacing | `--space-*` | 4px grid |
| Radius | `--radius-*` | Includes `--radius-bubble-tail` for chat |
| Elevation | `--shadow-*` | Includes accent glow and inverse-card shine |
| Blur | `--blur-*`, `--saturate-*` | Glass recipes |
| Motion | `--duration-*`, `--ease-*` | `--ease-standard` is the NOVUS signature curve |
| Opacity | `--opacity-*` | Disabled and dimmed states |
| Z-index | `--z-*` | base < raised < sticky < nav < overlay < modal < toast |
| Sizing | `--size-*` | Touch target, input bar, icons, avatars |

## Breakpoints

CSS custom properties cannot drive media queries. Until the runtime ADR selects tooling, use these documented values directly and reference this table:

| Name | Value | Meaning |
| --- | --- | --- |
| phone | 560px | Below: full-viewport app; above: framed column |
| tablet | 768px | Two-pane layouts become available |
| desktop | 1024px | Sidebar plus content |
| wide | 1280px | Maximum content width engages |

## Typography Sources

Clash Display and Satoshi are served by Fontshare. Font binaries are not committed; `assets/fonts/README.md` requires license verification first. Fallback stacks are part of the font tokens.

## Iconography

Icons are stroke-based, 24x24 viewBox, 2px stroke, round caps and joins, matching the NOVUS spark mark. No icon assets are committed yet; document the source when the first asset lands in `assets/icons/`.

## Rules

- Do not invent new brand colors without founder/Claude direction.
- Keep dark and light schemes in sync: every dark override needs a light audit.
- Document contrast for any new text/background pair.
- Motion additions must respect `prefers-reduced-motion` (handled centrally in `tokens.css`).
