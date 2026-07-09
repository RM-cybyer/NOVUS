# Runtime Framework

## Purpose

Define the official NOVUS runtime framework.

## Decision

NOVUS will use Next.js App Router with TypeScript, React and Node.js LTS.

## Responsibilities

- Provide the application routing model.
- Support server and client rendering boundaries.
- Host Server Actions for command and mutation flows.
- Provide a deployment-aligned runtime for Vercel.

## Architecture Rules

- `app/` contains routes and route-level composition only.
- Business logic must not live in route files.
- Runtime workflows must pass through the Runtime Orchestrator boundary once implemented.
- Server Actions must call service or runtime modules rather than embedding domain workflows directly.
- Route handlers are allowed only for webhooks, external callbacks, streaming endpoints or integration surfaces that Server Actions do not fit.
- Edge runtime use requires a separate ADR because provider SDKs, database access and runtime APIs can differ from Node.js.

## Why Next.js App Router

- Aligns with React Server Components and modern React application architecture.
- Supports route-level composition and server-side execution.
- Fits Vercel deployment with first-class framework support.
- Allows progressive implementation while keeping frontend and backend boundaries in one repository.

## Why Node.js LTS

- Provides broad compatibility for AI provider SDKs, database drivers, Drizzle, Supabase tooling and testing tools.
- Reduces edge-runtime compatibility risk during early implementation.
- Keeps background jobs and provider routing architecture easier to reason about before distributed execution exists.

## Interactions

- Frontend architecture uses App Router routes and React components.
- Backend architecture uses Server Actions and service boundaries.
- Deployment architecture targets Vercel.
- Testing strategy uses Vitest and Playwright around this runtime.

## Constraints

- No Next.js project files exist yet.
- Runtime initialization requires a future implementation commit.
- Any generated framework files must preserve the current repository folder architecture.

