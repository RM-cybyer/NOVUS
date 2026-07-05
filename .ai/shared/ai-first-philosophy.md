# AI-First Philosophy

NOVUS OS is an AI-first software project.

The repository is designed as the operating system for an AI software engineering team. Human engineers remain important reviewers and maintainers, but repository structure, documentation and templates must also support autonomous AI agents working across multiple years.

## Core Principle

Every architectural decision should optimize for both:

- Human readability
- AI readability

## Documentation as Executable Context

Documentation is active operating context. Agents should be able to read repository files and understand:

- What exists.
- Why it exists.
- Who owns it.
- Who collaborates on it.
- What belongs there.
- What must never be placed there.
- Which decision or template governs future changes.

## No Hidden Context

Every new module should be understandable without previous conversation history.

If a future agent needs a chat transcript to understand a module, the repository documentation is incomplete.

## Required Folder Metadata

Major folders should document:

- Why this folder exists
- What belongs here
- What should never be placed here
- Owning AI agent
- Collaborating AI agents
- Related docs, ADRs or templates
