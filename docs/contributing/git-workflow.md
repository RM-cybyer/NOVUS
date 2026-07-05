# Git Workflow

The repository has not defined a full branch strategy yet.

GitHub is the single source of truth for all AI agents.

## Current Expectations

- Pull before every work session.
- Verify branch before changes.
- Keep commits focused.
- Do not mix unrelated changes.
- Do not rewrite shared history without explicit agreement.
- Document architecture changes in the same branch as the change.
- Push completed work to GitHub.
- Verify GitHub reflects the latest commit.
- Leave a handoff.

## Outdated Local Repository Rule

No AI agent should work on an outdated local repository. If local state is behind GitHub, pull first. If pulling is blocked, stop and document the blocker.

## Future Decisions

Branch strategy, release tagging and deployment promotion should be documented before production releases.
