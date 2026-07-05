# ADR 0002: AI-First Repository Philosophy

## Status

Accepted

## Context

NOVUS OS is intended to be built by a long-running team of AI agents and human reviewers. The repository must be understandable without relying on previous conversation context.

## Decision

Treat the repository as an AI-first engineering operating system.

Every major architectural decision must optimize for:

- Human readability
- AI readability

Documentation is considered executable context. Major folders must declare purpose, allowed contents, disallowed contents, owning AI agent and collaborating AI agents.

Major folder READMEs must answer:

- Why this folder exists.
- What belongs here.
- What should never be placed here.
- Owning AI agent.
- Collaborating AI agents.

## Consequences

- Folder READMEs become part of the operating model.
- New modules must carry enough context for future autonomous work.
- Architecture docs must describe ownership and collaboration, not only file placement.
- Pull request reviews should reject unclear ownership or hidden-context changes.
