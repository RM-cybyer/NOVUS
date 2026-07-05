# ADR 0001: Repository Operating System

## Status

Accepted

## Context

NOVUS OS begins as an empty official repository. Before product implementation, the repository needs a durable engineering foundation for architecture, documentation, AI-agent collaboration, templates and workflow discipline.

## Decision

Create a documentation-first repository operating system before adding application code.

The foundation includes:

- Root folder architecture.
- AI-agent operating context.
- Documentation hierarchy.
- Engineering standards.
- Security baseline.
- Testing strategy placeholder.
- Blueprint and ADR templates.
- GitHub issue and pull request templates.
- Repository health workflow.

## Consequences

- Future product work has clear boundaries before implementation begins.
- Runtime and package manager decisions remain intentionally deferred.
- New folders and architectural changes require documentation.
- CI validates the repository foundation without installing dependencies.

