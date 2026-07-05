# Styles

The `styles/` folder is reserved for global styles, design tokens and style utilities.

## Responsibility

- Store styling foundations once a UI stack exists.
- Keep visual tokens and global styling discoverable.

## Subfolders

- `tokens/`: Design tokens. Implemented as framework-neutral CSS custom properties in `tokens/tokens.css` (see `blueprints/design-system-foundation.md`).
- `global/`: Global style entry points once a runtime exists.

## Rules

- Do not encode product behavior in styles.
- Keep tokens centralized and documented.

## AI Placement Contract

- Why this folder exists: Keep style foundations discoverable after UI implementation begins.
- What belongs here: Global styles, design tokens and style utilities.
- What never belongs here: Product logic, route definitions, service calls, secrets or unapproved brand decisions.
- Owning AI agent: Fable.
- Collaborating AI agents: Codex, QA.
- Governing docs: `docs/architecture/module-boundaries.md` and future design system ADRs.
