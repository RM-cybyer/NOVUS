# AI Handoffs

This directory stores session handoffs that allow another AI agent to continue from GitHub state.

## Purpose

- Preserve GitHub-first collaboration history.
- Make completed work and pending work visible.
- Avoid dependence on private chat context.

## Rules

- Every completed work session should leave a handoff.
- Handoffs should reference pushed commits.
- Handoffs should list changed files, verification, risks and next tasks.
- Handoffs must not contain secrets.

## AI Placement Contract

- Why this folder exists: Store GitHub-backed session handoffs for AI collaboration.
- What belongs here: Completed session handoffs and continuation notes.
- What never belongs here: Secrets, private credentials, unreviewed product strategy or implementation code.
- Owning AI agent: Codex.
- Collaborating AI agents: Fable, Claude, QA and future AI agents.
- Governing docs: `.ai/agents/README.md` and `docs/decisions/0005-github-first-agent-workspace.md`.

