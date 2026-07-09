# Components Library

## Purpose

Define governance for the future NOVUS component library.

## Responsibilities

- Keep reusable UI components consistent.
- Document component purpose and usage.
- Support accessibility and responsive behavior.
- Avoid duplicated component implementations.

## Component Rules

- Components should have clear ownership.
- Primitive components should stay domain-agnostic.
- Domain components should remain presentation-focused.
- Component APIs should be explicit once implementation begins.
- Components should document states and accessibility behavior.

## Current Library (Design Milestone 01 - designed in Figma, not yet implemented)

Component sets with variants (canonical Figma file in `figma-governance.md`; all values bound to tokens):

| Component | Variants |
| --- | --- |
| Button | Type (Primary, Secondary, Ghost, Danger) x State (Default, Hover, Focus, Pressed, Loading, Disabled) = 24 |
| Badge | Kind: Accent, Danger, Neutral |
| Suggestion Chip | State: Default, Hover, Pressed, Disabled |
| Input | State: Default, Focus, Error, Success, Disabled |
| Toast | Kind: Default, Success, Error, Offline |
| Card | State: Default, Hover, Empty, Offline |
| Recommendation Card | State: Default, Hover, Focus, Loading, Accepted, Dismissed |
| Insight Card | Kind: Warning, Positive, Neutral |
| Bottom Nav | Active: Novus, Panel, Memoria |
| Sidebar Item | Mode (Expanded, Collapsed) x State (Default, Hover, Active, Focus) = 8 |
| Voice | State: Idle, Listening, Thinking |
| Category Bar | Kind: Normal, Anomaly |
| Transaction Row | Kind: Expense, Income, Review |

Standalone components: Skeleton Block, Tooltip, Menu, Dialog, Bottom Sheet, Top Bar.

Implementation note: when Phase 2 code begins (per `blueprints/design-system-foundation.md`), these map to `components/primitives/` (Button, Input, Badge, Tooltip, Skeleton, Toast, Sheet, Dialog, Menu) and `components/domain/` (Recommendation Card, Insight Card, Category Bar, Transaction Row, Voice, Bottom Nav, Sidebar Item), consuming `styles/tokens/tokens.css` exclusively.

## Required Component Documentation

- Purpose.
- Usage.
- Props or inputs once implementation exists.
- States.
- Accessibility notes.
- Design token usage.
- Examples when implementation exists.

## AI Ownership

- Owning AI agent: Fable.
- Collaborating AI agents: Codex, QA.

