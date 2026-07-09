# Database Architecture

## Purpose

Define the official database architecture for NOVUS.

## Decisions

- PostgreSQL is the primary database.
- Supabase is the managed Postgres platform.
- Drizzle ORM is the schema and query layer.
- Database access must respect user and tenant boundaries.

## Responsibilities

- Store durable product data.
- Store future runtime state, events, jobs, memory records and knowledge graph records when approved.
- Enforce constraints at the database layer where invariants must hold.
- Support migrations through an auditable migration process.

## Supabase Role

Supabase provides:

- Hosted PostgreSQL.
- Auth integration.
- Storage integration.
- Row Level Security support.
- Operational database management.

## Drizzle Role

Drizzle provides:

- TypeScript-friendly schema definitions.
- Typed queries.
- Migration generation and review workflow when configured.
- Database access without hiding SQL concepts.

## Data Boundary Rules

- Migrations belong in `database/migrations/`.
- Canonical schema belongs in `database/schema/`.
- RLS and access policies belong in `database/policies/`.
- Seeds belong in `database/seeds/`.
- Application business logic does not belong in migrations.

## Future Data Domains

- Users and profiles.
- Goals and projects.
- Transactions and financial context.
- Runtime events and jobs.
- Memory records.
- Knowledge graph entities and relationships.
- Recommendations and decisions.

## Security Requirements

- Use Row Level Security where Supabase tables are exposed through client-aware paths.
- Use server-side authorization checks for sensitive actions.
- Treat financial, memory and relationship data as sensitive.
- Design for deletion, correction and auditability before storing long-term memory.

## Non-Goals

- No schema is created in this phase.
- No migration is created in this phase.
- No database package is installed in this phase.

