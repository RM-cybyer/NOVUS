# ADR 0006: Fable Design Operating System

## Status

Accepted

## Context

Fable owns UI, UX, design system, motion, product features and production code. NOVUS is an AI-first repository where GitHub is the source of truth. Fable needs a durable design operating system before implementation begins so future UI work follows consistent product, design and repository rules.

## Decision

Expand `.ai/agents/fable/` into the Fable Design Operating System.

The design operating system defines:

- UI philosophy.
- Motion system.
- Figma governance.
- Design review.
- GitHub workflow.
- Voice experience.
- Dashboard, chat, settings, goals and transactions design guidance.
- Components library governance.
- Animation library governance.
- Design token governance.

## AI Context Impact

Fable must read these documents before design or implementation work. Codex should verify that Fable-facing design changes remain GitHub-first and do not bypass repository architecture, Runtime architecture or Intelligence architecture.

## Alternatives Considered

- Use a large prompt for Fable. Rejected because it would keep operational rules outside GitHub.
- Keep design rules only in future implementation files. Rejected because Fable needs design context before code exists.
- Wait for Figma to define all rules. Rejected because GitHub is the source of truth for AI collaboration.

## Consequences

- Fable can work from repository documentation instead of large prompts.
- Design rules become versioned and reviewable.
- Future UI work has surface-specific guidance before implementation.
- Repository governance remains separate from Fable implementation ownership.

## Follow-up

- Add concrete design tokens after product and brand direction are approved.
- Create component documentation when implementation begins.
- Add QA accessibility review checklists once UI exists.
- Link Figma references from blueprints or handoffs when available.

