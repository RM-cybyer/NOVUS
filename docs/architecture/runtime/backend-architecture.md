# Backend Architecture

## Purpose

Define the official backend architecture for NOVUS.

## Decisions

- Next.js Server Actions are the primary backend command boundary.
- Node.js LTS is the default server runtime.
- Route handlers are reserved for external integration surfaces where Server Actions are not appropriate.
- External services must be isolated under `services/`.
- Shared validation, config and logging belong under `lib/`.

## Responsibilities

- Validate inputs at server boundaries.
- Enforce authorization server-side.
- Call Runtime Orchestrator workflows rather than embedding runtime logic in route or action handlers.
- Isolate provider, storage, auth and integration clients.
- Emit events for runtime workflows when implemented.

## Server Action Rules

- Server Actions must validate input with Zod or approved validators.
- Server Actions must check auth and authorization before side effects.
- Server Actions must not trust client-provided user IDs, roles or tenant IDs.
- Server Actions must return structured results.
- Server Actions must not call AI providers directly.

## Route Handler Rules

Route handlers may be used for:

- Webhooks.
- OAuth callbacks.
- Provider callbacks.
- Streaming responses.
- Public integration endpoints.

Route handlers require explicit documentation of:

- Authentication model.
- Authorization model.
- Rate limiting expectation.
- Input validation.
- Event emission.

## Runtime Interaction

Backend entry points should call into future runtime modules:

```text
Server Action or Route Handler
  -> Input Validation
  -> Auth and Authorization
  -> Runtime Orchestrator
  -> Services or Database
  -> Structured Result
```

## Non-Goals

- No API implementation is created by this architecture.
- No Server Actions are written yet.
- No backend package is installed yet.

