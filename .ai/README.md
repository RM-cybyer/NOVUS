# AI Operating System

The `.ai/` directory is the permanent operating context for AI agents working on NOVUS OS.

NOVUS OS is AI-first. This repository is designed for durable collaboration between autonomous AI agents and human reviewers. Human readability and AI readability are equal architectural requirements.

## Responsibility

- Preserve shared project identity and engineering rules.
- Define role-specific boundaries for AI agents.
- Provide handoff, review and quality checklists.
- Make future AI collaboration predictable and auditable.

## Required Reading Order

Every agent must read:

1. `.ai/shared/README.md`
2. Relevant files in `.ai/shared/`
3. `.ai/agents/README.md`
4. The agent-specific folder under `.ai/agents/`
5. `docs/architecture/repository-architecture.md`
6. Any blueprint or ADR relevant to the requested change

## Agent Folders

- `.ai/agents/`: GitHub-first operational manuals for each AI agent.
- `.ai/handoffs/`: Session handoffs that preserve GitHub-backed continuation context.
- `.ai/shared/`: Rules and context shared by every agent.
- `.ai/intelligence/`: Architecture for how NOVUS thinks, remembers, reasons and orchestrates AI providers.
- `.ai/runtime/`: Architecture for how NOVUS executes workflows, events, tools, jobs and responses.
- `.ai/codex/`: Repository Guardian instructions.
- `.ai/claude/`: Product strategy and engineering direction boundary notes.
- `.ai/fable/`: Product implementation boundary notes.
- `.ai/qa/`: Quality assurance boundary notes.

## Executable Context Rule

Documentation in `.ai/` is executable context. Agents should treat it as active operating instructions, not optional prose.

Every AI-facing document should be understandable without previous chat history.

## GitHub-First Rule

GitHub is the single source of truth for every AI agent. Local folders are working copies only.

Every agent must pull latest GitHub state before work, push completed work after verification and leave a handoff that allows another agent to continue from GitHub.

## AI Placement Contract

- Why this folder exists: Preserve executable context for autonomous AI collaboration.
- What belongs here: Shared AI rules, role boundaries, GitHub-first agent manuals, handoff templates and agent-specific operating notes.
- What never belongs here: Product code, UI implementation, API implementation, secrets or undocumented strategy changes.
- Owning AI agent: Codex.
- Collaborating AI agents: Claude, Fable, QA.
- Governing docs: `docs/architecture/ai-collaboration-architecture.md` and `docs/decisions/0002-ai-first-repository-philosophy.md`.
