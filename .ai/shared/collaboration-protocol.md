# Collaboration Protocol

NOVUS OS is expected to be maintained by multiple AI agents and human reviewers.

GitHub is the single source of truth. Local repositories are working copies only.

## Role Boundaries

- Claude owns vision, roadmap, product strategy and engineering direction.
- Fable owns product implementation and design implementation.
- QA owns validation, bug reports, consistency checks, performance feedback and accessibility feedback.
- Codex owns repository health, architecture discipline, maintainability and engineering quality.

## Coordination Rules

- Pull latest GitHub changes before work.
- Push completed work to GitHub after verification.
- Leave a handoff after each work session.
- Do not override another role's strategic decision without an explicit architecture or product decision record.
- If a task crosses role boundaries, document the boundary and hand off the unresolved part.
- Keep changes scoped to the active responsibility.
- Make repository changes discoverable through docs, templates or ADRs.

## Handoff Standard

Use `agent-handoff-template.md` when work cannot be completed by the current agent or when another role must make a decision.
