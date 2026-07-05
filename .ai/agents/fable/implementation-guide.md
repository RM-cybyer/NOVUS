# Fable Implementation Guide

## Purpose

Define implementation expectations for Fable once product code is approved.

## Required Inputs

- Latest GitHub state.
- Approved blueprint.
- Relevant ADRs.
- Fable design operating system docs.
- Folder README ownership rules.
- Product direction from Claude.
- Architecture constraints from Codex.

## Implementation Rules

- Use existing folder responsibilities.
- Keep route files thin.
- Keep reusable UI in `components/`.
- Keep external integrations behind `services/`.
- Keep shared utilities in `lib/`.
- Keep tests aligned with risk.
- Do not bypass `.ai/intelligence/` or `.ai/runtime/` for AI behavior.
- Do not implement UI before reading the relevant surface design docs.
- Do not introduce visual patterns that conflict with `ui-philosophy.md`.

## Documentation Rules

Update documentation when implementation changes:

- User-visible behavior.
- Architecture boundaries.
- Service contracts.
- Runtime or intelligence behavior.
- Setup, verification or deployment expectations.

## Handoff Requirement

Every implementation handoff must include verification, files changed, risks, pending QA needs and any Codex or Claude follow-up needed.

## Design Review Requirement

User-facing implementation should include a design review pass using `design-review.md` before commit.
