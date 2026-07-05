# Auth Services

This folder is reserved for authentication service adapters.

## Responsibility

- Isolate authentication provider integration.
- Keep auth flows testable and auditable.
- Support future authorization boundaries.

## Rules

- Do not implement auth without a security blueprint.
- Treat sessions, tokens and identity data as sensitive.
- Document trust boundaries before implementation.

