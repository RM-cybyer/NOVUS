# Documentation Contract

Documentation is part of the NOVUS OS engineering product.

Documentation is executable context for AI agents. It should be written so a future agent can act correctly without reading prior conversation history.

## Required Updates

Update documentation when a change affects:

- Repository structure
- Folder ownership
- Architecture boundaries
- Engineering standards
- Security expectations
- Testing strategy
- Release process
- AI-agent workflow
- Templates
- CI or repository automation

## Major Folder Contract

Major folder READMEs must explain:

- Why the folder exists.
- What belongs there.
- What should never be placed there.
- Which AI agent owns it.
- Which AI agents collaborate with it.

## Placement

- Architecture: `docs/architecture/`
- Decisions: `docs/decisions/`
- Engineering standards: `docs/engineering/`
- Security: `docs/security/`
- Testing: `docs/testing/`
- Operations: `docs/operations/`
- Templates: `docs/templates/`
- AI-agent context: `.ai/`
