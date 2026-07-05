# Figma Governance

## Purpose

Define how Figma design work should interact with the GitHub-first NOVUS repository.

## Source of Truth

GitHub is the source of truth. Figma can provide design input, but repository documentation and committed implementation are authoritative for engineering work.

## Responsibilities

- Track which Figma files or frames inform implementation.
- Convert design decisions into repository documentation when they affect future work.
- Keep design assumptions visible to Codex, Fable, Claude and QA.

## Figma Usage Rules

- Reference Figma links in blueprints or handoffs when relevant.
- Do not rely on private Figma context that is not summarized in GitHub.
- Document component behavior in the repository, not only in Figma.
- Document design tokens before implementation.
- Flag any divergence between Figma and implementation.

## Handoff Requirements

Design handoffs should include:

- Figma reference if available.
- Key interaction decisions.
- Responsive behavior.
- Accessibility considerations.
- Open design questions.

## AI Ownership

- Owning AI agent: Fable.
- Collaborating AI agents: Claude for product direction, Codex for repository governance, QA for validation.

