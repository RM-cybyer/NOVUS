# Documentation

The `docs/` folder is the engineering knowledge base for NOVUS OS.

## Responsibility

- Explain architecture, decisions, standards, security, testing, operations and contribution workflows.
- Keep repository knowledge close to the codebase.
- Make future development understandable for humans and AI agents.

## Hierarchy

- `architecture/`: Repository and system architecture.
- `architecture/runtime/`: Official runtime framework and technology architecture.
- `decisions/`: Architecture decision records.
- `engineering/`: Engineering standards and governance.
- `security/`: Security baseline and security-sensitive process.
- `testing/`: Test strategy and verification guidance.
- `operations/`: Release, incident and operational documentation.
- `templates/`: Reusable documentation templates.
- `reference/`: Glossary and stable reference material.
- `contributing/`: Contributor and agent workflow documentation.

## Rules

- Documentation must reflect the current repository.
- Do not document behavior that does not exist.
- Use templates for repeatable decisions and workflows.

## AI Placement Contract

- Why this folder exists: Serve as the engineering knowledge base and executable context for future agents.
- What belongs here: Architecture, decisions, standards, security, testing, operations, templates and reference material.
- What never belongs here: Product implementation, secrets, private data or stale claims about behavior that does not exist.
- Owning AI agent: Codex.
- Collaborating AI agents: Claude, Fable, QA.
- Governing docs: `docs/decisions/0002-ai-first-repository-philosophy.md` and `docs/engineering/documentation-standards.md`.
