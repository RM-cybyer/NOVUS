# Deployment Architecture

## Purpose

Define the official deployment architecture for NOVUS.

## Decision

Vercel is the official deployment platform for the Next.js runtime.

## Responsibilities

- Host the Next.js application.
- Provide preview deployments for GitHub changes.
- Support production deployment from the GitHub source of truth.
- Manage environment variables through platform secrets, not repository files.

## Deployment Flow

```text
GitHub main
  -> Vercel build
  -> Preview or production deployment
  -> Runtime verification
  -> Observability review
```

## Environment Rules

- Secrets must be stored in Vercel, Supabase, provider consoles or approved secret management.
- `.env` files must not be committed.
- `.env.example` may be introduced later with safe placeholder values only.
- Required environment variables must be documented before implementation.

## Deployment Environments

Future implementation should define:

- Local development.
- Preview.
- Staging if needed.
- Production.

## Vercel Runtime Rules

- Node.js runtime is the default.
- Edge runtime requires a separate ADR.
- Background jobs and scheduled work must be evaluated against Vercel platform capabilities before implementation.
- Long-running workflows may require queue or worker architecture later.

## Non-Goals

- No Vercel project is configured here.
- No deployment workflow is created here.
- No environment variables are added here.

