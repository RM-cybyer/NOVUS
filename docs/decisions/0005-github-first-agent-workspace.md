# ADR 0005: GitHub-First Agent Workspace

## Status

Accepted

## Context

NOVUS OS is an AI-first repository intended for collaboration between Codex, Fable, Claude and future AI agents. The repository now contains architecture, Intelligence Layer and Runtime Layer documentation. The next risk is fragmented local context across agents.

If agents treat local folders or chat history as the source of truth, work will drift, handoffs will weaken and architecture decisions will become hard to audit.

## Decision

Make GitHub the single source of truth for every AI agent.

Create `.ai/agents/` as the operational manual system for agent responsibilities, permissions, workflows, GitHub usage, ownership and handoff requirements.

## AI Context Impact

Every AI agent must:

- Pull latest GitHub changes before work.
- Verify branch and repository status.
- Read new ADRs, documentation, blueprints and handoffs.
- Work only within documented responsibilities.
- Commit and push completed work.
- Verify GitHub updated.
- Generate a handoff that lets another agent continue immediately.

## Alternatives Considered

- Continue relying on existing `.ai/codex`, `.ai/fable` and `.ai/claude` folders. Rejected because those folders define role context but not a complete GitHub-first operating manual.
- Let each agent manage its own workflow independently. Rejected because independent local workflows create source-of-truth drift.
- Store handoff process outside the repository. Rejected because documentation is executable context and must live in GitHub.

## Consequences

- GitHub becomes the authoritative state for all agents.
- Local repositories are temporary working copies.
- Agent handoffs become mandatory.
- Workflow drift becomes a governance issue.
- Future agents can join by reading `.ai/agents/`.

## Follow-up

- Add issue templates for agent handoff tasks if needed.
- Define branch strategy before implementation work begins.
- Define commit message standards before production development.
- Add repository verification scripts once tooling exists.

