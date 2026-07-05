# Engineering Workflow Overview

This repository starts with a foundation-first workflow.

GitHub is the single source of truth for every AI agent. No agent should work from outdated local state.

## Mandatory GitHub-First Flow

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

## Foundation Work

1. Pull latest GitHub changes.
2. Verify branch.
3. Read `.ai/shared/`.
4. Read `.ai/agents/README.md`.
5. Read the relevant agent folder under `.ai/agents/`.
6. Inspect repository state.
7. Make documentation or structure changes.
8. Update ADRs or templates when required.
9. Run repository health verification.
10. Commit, push and hand off.

## Future Feature Work

1. Create a blueprint.
2. Review architecture, security, testing and rollout.
3. Implement in scoped commits.
4. Add tests and documentation.
5. Validate through CI.
6. Push to GitHub.
7. Generate handoff.
8. Release through documented operations.

## Current Limitation

No runtime-specific workflow exists yet because no runtime has been selected.
