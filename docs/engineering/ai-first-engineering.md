# AI-First Engineering

NOVUS OS is optimized for collaboration between autonomous AI agents and human reviewers.

## Engineering Rule

Every new module should be understandable without previous conversation context.

## Documentation as Executable Context

Repository documentation instructs future agents how to act. It should be:

- Current
- Specific
- Located near the relevant ownership boundary
- Written with explicit allowed and disallowed placement rules

## AI Readability Requirements

When adding or changing a folder, document:

- Why this folder exists
- What belongs here
- What should never be placed here
- Owning AI agent
- Collaborating AI agents
- Required ADRs, blueprints or templates

## Review Requirement

Reject changes that depend on hidden chat context, unclear ownership or undocumented architecture boundaries.
