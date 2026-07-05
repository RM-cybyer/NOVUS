# Handoff: Fable Design Operating System

Agent: Codex
Branch: main
Primary commit: f36c851
Verification performed: README coverage, Fable document presence, ASCII scan, no application code files, repository status review.

## What Changed

- Expanded `.ai/agents/fable/` into a full Design Operating System.
- Added Fable documentation for UI philosophy, motion, Figma governance, design review, GitHub workflow, voice, dashboards, chat, settings, goals, transactions, components, animations and tokens.
- Added `.ai/handoffs/` as the GitHub-backed location for session handoffs.
- Added ADR 0006 for the Fable Design Operating System.
- Updated repository health workflow to require the new Fable docs.

## Why It Changed

- Fable needs reusable repository-native operating instructions instead of repeated large prompts.
- GitHub must remain the source of truth for future design and implementation work.
- Future Fable sessions should be able to start by reading repository documentation.

## Affected Files

- `.ai/agents/fable/`
- `.ai/agents/README.md`
- `.ai/README.md`
- `.ai/handoffs/README.md`
- `.github/workflows/repository-health.yml`
- `docs/architecture/repository-architecture.md`
- `docs/architecture/ai-collaboration-architecture.md`
- `docs/decisions/0006-fable-design-operating-system.md`
- `CHANGELOG.md`

## Affected Documentation

- Fable agent manual.
- AI Agent System manual.
- Repository architecture.
- AI collaboration architecture.
- Repository health workflow.
- ADR history.

## Breaking Changes

- None. This is documentation and governance only.

## Next Recommended Tasks

- Future Fable prompts should instruct Fable to read `.ai/agents/fable/`, `.ai/runtime/`, `.ai/intelligence/`, `.ai/shared/` and `docs/` before acting.
- Define concrete design tokens after Claude approves brand and product direction.
- Add QA accessibility checklists when UI implementation begins.

## Pending Work

- No implementation work has started.
- No Figma links exist yet.
- No component code exists yet.

## Future Improvements

- Add design review issue template when UI work begins.
- Add visual regression strategy after frontend tooling is selected.
- Add Storybook or equivalent only after runtime and dependency ADRs exist.

## Open Questions

- Which milestone should Fable execute first?
- Will Figma be used as the design source input, and where will canonical links be documented?

