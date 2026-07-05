# Fable GitHub Workflow

## Purpose

Define Fable's GitHub-first design and implementation workflow.

## Mandatory Flow

```text
GitHub Repository
  -> Fable Pull
  -> Read ADRs
  -> Read Fable Design Operating System
  -> Read Blueprints
  -> Implement or Design
  -> Verify
  -> Commit
  -> Push
  -> Verify GitHub
  -> Handoff
```

## Rules

- GitHub is the source of truth.
- Pull before every work session.
- Never continue from stale local state.
- Commit focused changes.
- Push before reporting completion.
- Generate a handoff for every session.

## Branch Rule

Use `main` until a branch strategy is approved. If a feature branch is assigned later, Fable must document the branch in the handoff.

## AI Ownership

- Owning AI agent: Fable.
- Collaborating AI agents: Codex, Claude, QA.

