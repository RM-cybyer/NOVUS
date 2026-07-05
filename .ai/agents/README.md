# AI Agent System

The `.ai/agents/` directory is the operational manual system for every AI agent working on NOVUS OS.

GitHub is the single source of truth. No AI agent should depend on local folders, previous chat context or stale working copies as the authoritative project state.

## Purpose

- Define responsibilities, permissions, workflows and handoff rules for each AI agent.
- Make GitHub-first collaboration mandatory.
- Ensure every agent can continue work from repository state and documented handoffs.
- Prevent role confusion between architecture, implementation and product direction.

## Mandatory GitHub-First Workflow

```text
GitHub Repository
  -> Codex Pull
  -> Architecture
  -> Commit
  -> Push
  -> GitHub Updated
  -> Fable Pull
  -> Implementation
  -> Commit
  -> Push
  -> GitHub Updated
  -> Claude Review
  -> Product Decisions
  -> New Tasks
  -> Codex
```

## Source of Truth Rule

- GitHub repository state is authoritative.
- Local repositories are temporary working copies.
- Every agent must pull latest changes before work.
- Every agent must push completed work back to GitHub.
- No agent should continue from an outdated local repository.
- Handoffs must describe the current GitHub-backed state, not private assumptions.

## Agent Manuals

- `codex/`: Repository Guardian and architecture owner.
- `fable/`: Product implementation, UI, UX, design operating system and production code owner.
- `claude/`: CTO, product vision, roadmap and technical direction owner.

## Fable Design Operating System

Fable's manual includes a design operating system for UI philosophy, motion, Figma governance, design review, surface design, components, animations and tokens.

Before sending Fable a milestone, direct Fable to read:

1. `.ai/agents/fable/`
2. `.ai/runtime/`
3. `.ai/intelligence/`
4. `.ai/shared/`
5. `docs/`

The milestone prompt should reference repository documentation instead of repeating large operational rules.

## Required Session Startup

Before every work session, every agent must:

1. Pull latest changes from GitHub.
2. Verify branch.
3. Review repository status.
4. Read new ADRs.
5. Read updated documentation.
6. Read updated blueprints.
7. Review the previous handoff.
8. Confirm the task belongs to its responsibility.

## Required Session Closeout

After every work session, every agent must:

1. Run repository verification appropriate to the change.
2. Review modified files.
3. Commit focused changes.
4. Push to GitHub.
5. Verify GitHub has the latest state.
6. Generate a handoff.
7. Leave the repository clean or explicitly document why it is not clean.

## Handoff Protocol

Every handoff must document:

- What changed.
- Why it changed.
- Affected files.
- Affected documentation.
- Breaking changes.
- Next recommended tasks.
- Pending work.
- Future improvements.
- Open questions.

## AI Placement Contract

- Why this folder exists: Define GitHub-first operational manuals for every AI agent working on NOVUS.
- What belongs here: Agent responsibilities, permissions, workflows, ownership rules, GitHub rules and handoff protocols.
- What never belongs here: Application code, product implementation, private strategy outside the repository, secrets or undocumented local-only instructions.
- Owning AI agent: Codex.
- Collaborating AI agents: Claude, Fable, QA and future AI agents.
- Governing docs: `.ai/shared/ai-first-philosophy.md`, `docs/engineering/repository-governance.md` and `docs/decisions/0005-github-first-agent-workspace.md`.
