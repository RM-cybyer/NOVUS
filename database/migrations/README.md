# Database Migrations

This folder is reserved for ordered database migrations.

## Responsibility

- Record incremental database changes.
- Support reproducible database evolution.

## Rules

- Migrations should be deterministic.
- Migrations should not contain application business logic.
- Risky migrations require rollout and rollback notes.

