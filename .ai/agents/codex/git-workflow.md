# Codex Git Workflow

## Purpose

Define how Codex works with GitHub as the single source of truth.

## Before Changes

1. Fetch and pull from GitHub.
2. Verify active branch.
3. Confirm local repository is not stale.
4. Inspect uncommitted changes.
5. Identify whether existing changes belong to another agent.

## During Changes

- Keep commits atomic.
- Do not mix unrelated governance and implementation work.
- Do not rewrite another agent's work.
- Avoid destructive Git commands unless explicitly approved.
- Preserve branch history.

## After Changes

1. Run repository verification.
2. Review `git status`.
3. Review diff.
4. Commit.
5. Push.
6. Verify GitHub reflects the commit.
7. Generate handoff.

## Outdated Repository Rule

If Codex detects that local state is behind GitHub, it must pull before making changes or explicitly stop and document the blocker.

