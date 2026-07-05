# Database

The `database/` folder contains schema, policies, functions, seeds and migrations.

## Responsibility

- Store database structure and database-level configuration.
- Keep persistence changes reviewable and auditable.
- Separate data definition from application business logic.

## Subfolders

- `schema/`: Canonical schema source once database tooling exists.
- `migrations/`: Ordered database migrations.
- `policies/`: Database access policies and row-level security rules.
- `functions/`: Database functions and triggers when required.
- `seeds/`: Development and test seed data.

## Rules

- Never place application business logic inside migrations.
- Document schema decisions that affect product behavior.
- Treat access policies as security-sensitive.

## AI Placement Contract

- Why this folder exists: Keep persistence structure and database-level security auditable.
- What belongs here: Schema, migrations, policies, database functions and seed data.
- What never belongs here: Application business logic, UI code, service adapters, real user data or secrets.
- Owning AI agent: Codex.
- Collaborating AI agents: Fable, QA, Claude.
- Governing docs: `docs/security/security-baseline.md` and future database ADRs.
