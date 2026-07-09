# Runtime Technology Architecture

This section defines the official technology architecture for NOVUS implementation.

## Purpose

Document the runtime, frontend, backend, database, authentication, storage, deployment, testing, dependency and security decisions required before application implementation begins.

## Responsibility

- Translate the approved Runtime Layer into concrete technology choices.
- Keep the Intelligence Layer provider-neutral.
- Document why each technology is selected.
- Establish implementation boundaries before Fable writes production code.

## Current Status

The official stack is selected by ADR 0007. No application code, package manifest, dependencies or framework files have been created yet.

## Documents

- `tech-stack.md`: Official technology stack summary.
- `runtime-framework.md`: Runtime framework decision.
- `frontend-architecture.md`: Frontend architecture.
- `backend-architecture.md`: Backend architecture.
- `database-architecture.md`: PostgreSQL, Supabase and Drizzle architecture.
- `authentication.md`: Supabase Auth and authorization boundaries.
- `storage.md`: Supabase Storage and Cloudflare R2 future readiness.
- `deployment.md`: Vercel deployment architecture.
- `dependency-policy.md`: Dependency approval and lifecycle policy.
- `package-manager.md`: pnpm architecture.
- `testing-strategy.md`: Vitest, Playwright, linting and formatting strategy.
- `performance-strategy.md`: Runtime performance strategy.
- `security-architecture.md`: Security architecture.
- `ai-provider-layer.md`: Provider-neutral AI architecture.

## AI Placement Contract

- Why this folder exists: Define official runtime technology decisions before implementation.
- What belongs here: Architecture decisions, technology boundaries, provider-neutral AI architecture and implementation prerequisites.
- What never belongs here: Application code, framework initialization, package manifests, secrets or provider SDK implementation.
- Owning AI agent: Codex.
- Collaborating AI agents: Fable, Claude, QA.
- Governing docs: `docs/decisions/0007-official-runtime-framework.md`, `.ai/runtime/`, `.ai/intelligence/` and `docs/architecture/dependency-boundaries.md`.

