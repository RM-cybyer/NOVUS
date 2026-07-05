# Codex Workflow

## Purpose

Define the mandatory Codex workflow inside the GitHub-first workspace.

## Workflow

```text
GitHub Repository
  -> Codex Pull
  -> Read ADRs and Docs
  -> Inspect Repository
  -> Architecture or Governance Work
  -> Repository Verification
  -> Commit
  -> Push
  -> GitHub Updated
  -> Handoff
```

## Collaboration Rules

- Coordinate with Claude when product direction or technical trade-offs are unclear.
- Coordinate with Fable when architecture changes affect implementation paths.
- Coordinate with QA when verification, reliability or accessibility standards are affected.
- Do not create product features.
- Do not implement business logic.

## Required Outputs

- Updated documentation or architecture files.
- ADRs when required.
- Repository verification result.
- GitHub push.
- Handoff.

## Failure Handling

If Codex cannot push or verify GitHub state, the handoff must clearly say the repository is not fully synchronized.

