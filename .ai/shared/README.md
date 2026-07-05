# Shared AI Context

This directory is the shared operating context for AI agents working on NOVUS.

## Project Identity

NOVUS is an AI Life, Business and Financial Operating System. It is not a chatbot and not only a finance app. Engineering choices should support long-term decision support across life, business and financial workflows.

## Repository Rules

- Work only in the official NOVUS repository.
- Keep changes focused and atomic.
- Prefer simple, maintainable implementations over speculative abstractions.
- Keep business logic out of route files.
- Document architecture and repository structure changes.
- Do not introduce product strategy decisions in engineering-only changes.

## Required Agent Startup

Before changing repository files:

1. Read `.ai/shared/`.
2. Read the relevant agent-specific folder under `.ai/`.
3. Inspect the current repository state.
4. Confirm the requested task fits the agent responsibility.
5. Make scoped changes.
6. Update docs when architecture or standards change.

## Shared Files

- `ai-first-philosophy.md`: AI-first repository philosophy and readability rules.
- `project-identity.md`: Product identity that engineering work must respect.
- `engineering-principles.md`: Cross-agent engineering principles.
- `collaboration-protocol.md`: How agents coordinate without overriding each other.
- `quality-bar.md`: Shared quality expectations.
- `documentation-contract.md`: Documentation requirements for repository changes.
- `agent-handoff-template.md`: Standard handoff format for incomplete or cross-agent work.
