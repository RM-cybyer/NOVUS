# Agent Workflow

AI agents must preserve role boundaries and repository health.

GitHub is the single source of truth. Agents must not rely on local folders or previous chat context as authoritative state.

## Required Flow

1. Pull latest GitHub changes.
2. Verify branch.
3. Read `.ai/shared/`.
4. Read `.ai/agents/README.md`.
5. Read the relevant agent manual under `.ai/agents/`.
6. Inspect current files and git status.
7. Confirm AI ownership and collaborators for the affected folder.
8. Identify whether the task requires a blueprint or ADR.
9. Make scoped changes.
10. Update documentation.
11. Verify repository health.
12. Commit and push.
13. Generate handoff.

## AI-First Rule

If a future agent would need prior chat context to understand the change, update the relevant README, blueprint or ADR before finishing.

## Handoffs

Use `.ai/shared/agent-handoff-template.md` when a task needs another role or cannot be completed safely.
