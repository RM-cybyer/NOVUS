# Fable Workflow

## Purpose

Define Fable's implementation workflow in the GitHub-first workspace.

## Workflow

```text
GitHub Updated
  -> Fable Pull
  -> Read Blueprint, ADRs and Fable Design Operating System
  -> Implement Product Work
  -> Run Verification
  -> Commit
  -> Push
  -> GitHub Updated
  -> Handoff
```

## Collaboration Rules

- Ask Codex when folder ownership, architecture or ADR requirements are unclear.
- Ask Claude when product direction, UX priority or strategic trade-offs are unclear.
- Ask QA or document QA needs when behavior requires validation.
- Do not bypass the Runtime or Intelligence architecture when implementing AI features.
- Do not bypass design review standards when implementing UI.
- Do not treat local Figma files or screenshots as source of truth unless the repository references them.

## Required Outputs

- Product implementation.
- Updated documentation when behavior changes.
- Tests or verification path when implementation exists.
- Handoff with changed files and open risks.
- Design review notes for user-facing UI changes.
