# Animation Library

## Purpose

Define governance for reusable animation patterns after implementation begins.

## Responsibilities

- Document reusable animation patterns.
- Keep motion consistent.
- Support accessibility and reduced-motion behavior.
- Prevent one-off animation drift.

## Animation Rules

- Animation must have a product purpose.
- Reusable patterns should be named and documented.
- Durations and easing should follow approved tokens once defined.
- Reduced-motion alternatives are required.
- Financial or high-stakes surfaces should use restrained motion.

## Approved Pattern Catalog (Design Milestone 01)

All durations and easings reference `styles/tokens/tokens.css`. Signature easing is `--ease-standard: cubic-bezier(0.2, 0.8, 0.2, 1)`. Every pattern collapses to 1ms under `prefers-reduced-motion`; state must remain perceivable without motion.

| Pattern | Spec |
| --- | --- |
| Page transition | Fade + rise 12px, `--duration-gentle` (300ms), ease-standard. Exit: fade `--duration-fast` ease-exit. |
| Card enter (messages, insights) | TranslateY 10px + fade, 300ms ease-standard, 60ms stagger between cards. |
| Greeting / onboarding blocks | TranslateY 16px + fade, `--duration-slow` (500ms) ease-standard, 80ms stagger. |
| Button press | Scale 0.92, `--duration-instant` (100ms) ease-exit; release `--duration-fast` ease-standard. |
| Hover | Background/elevation only, 150ms ease-standard. Never move layout on hover. |
| Loading spinner | Continuous 900ms linear rotation. Only for actions over 300ms. |
| Skeleton pulse | Opacity 0.35 to 1 loop, 900ms ease-in-out. Must match real content layout. |
| Thinking dots (AI reasoning) | 3 dots, scale 0.85 to 1 + opacity, 900ms loop, 200ms stagger. Always paired with a status label. |
| Voice waveform | Bar heights follow real audio; fallback 6 bars, 700ms, 80ms stagger. Never simulate listening. |
| Bottom sheet | TranslateY 100% to 0, 320ms ease-standard; scrim fade 200ms; close 240ms ease-exit. |
| Dialog | Scale 0.96 + fade, `--duration-base` (200ms) ease-standard, scrim simultaneous. |
| Toast / notification | Rise 8px + fade, 250ms ease-standard; auto-dismiss 2400ms; exit fade 150ms. |
| Mobile nav tab morph | Active chip expands, 200ms ease-standard; icon cross-fade 150ms. |
| Sidebar collapse (desktop) | Width 248 to 64px, 300ms ease-standard; labels fade out 150ms before collapse. |
| Goal progress bar | Width 600ms ease-standard. Milestones get a single accent-glow pulse, never a loop. |
| Chart bars | Grow from 0, 500ms ease-standard, 40ms stagger. First load only. |

These patterns are also boarded in the canonical Figma file (see `figma-governance.md`).

## AI Ownership

- Owning AI agent: Fable.
- Collaborating AI agents: QA, Codex.

