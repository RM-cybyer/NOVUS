# Authentication Architecture

## Purpose

Define the official authentication and authorization architecture for NOVUS.

## Decisions

- Supabase Auth is the identity provider.
- Authorization decisions are enforced server-side.
- Auth is identity proof, not permission proof.
- Sensitive workflows require explicit permission checks beyond login state.

## Responsibilities

- Authenticate users.
- Maintain secure session state.
- Support account lifecycle flows.
- Provide identity context to runtime workflows.
- Enforce user and tenant boundaries in server actions, route handlers and database access.

## Auth Flows

Future implementation should document:

- Sign up.
- Login.
- Logout.
- Password reset or magic link if enabled.
- OAuth providers if enabled.
- Email verification.
- Account deletion.
- MFA when product scope requires it.

## Authorization Rules

- Every sensitive action requires a server-side authorization check.
- Client-provided role, user ID, tenant ID or organization ID is never trusted alone.
- Resource access must be scoped by owner, tenant, organization or explicit membership.
- Default behavior is deny when identity or permission context is missing.

## Supabase Integration

- Supabase Auth stores identity data in Supabase-managed auth tables.
- Application profile data should live in application-owned tables.
- Profile tables should reference auth users without duplicating secrets or auth tokens.
- RLS policies must be reviewed as security-sensitive code.

## Session Requirements

- Session handling must follow Supabase and Next.js guidance when implemented.
- Tokens must not be logged.
- Tokens must not be stored in repository files.
- Server-side session validation is required before sensitive work.

## Non-Goals

- No auth implementation is created here.
- No OAuth provider is enabled here.
- No auth package is installed here.

