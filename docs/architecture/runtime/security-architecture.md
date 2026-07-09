# Security Architecture

## Purpose

Define the official security architecture for the NOVUS runtime stack.

## Responsibilities

- Protect identity, sessions, user data and AI context.
- Enforce server-side authorization.
- Prevent provider lock-in from becoming a data exposure risk.
- Keep secrets out of source control.
- Preserve auditability for sensitive workflows.

## Security Decisions

- Supabase Auth handles identity.
- Server Actions and route handlers enforce authorization server-side.
- Supabase RLS is used where database access can cross user boundaries.
- Zod validates untrusted input at runtime boundaries.
- AI providers are isolated behind the AI Provider Layer.
- Tool execution requires NOVUS validation and confirmation for sensitive actions.
- Telemetry must be anonymous or consent-based.

## Secret Handling

- No secrets in GitHub.
- No `.env` commits.
- Platform secrets live in Vercel, Supabase, provider consoles or approved secret managers.
- Logs must not include tokens, credentials, provider keys or private user content.

## Data Sensitivity

Sensitive domains include:

- Financial records.
- Business strategy.
- Personal identity.
- Relationships.
- Memory records.
- Documents.
- Provider prompts and responses when they include user context.

## AI Security

- Providers receive minimum necessary context.
- Provider routing can block providers for sensitive workflows.
- Model output is untrusted until Response Processing validates it.
- Tool calls are requests, not actions.
- Memory writes require policy checks.

## Accessibility and Safety

WCAG AA is a product quality and compliance baseline. Security-sensitive UI such as auth, settings, memory controls and financial workflows must be accessible by keyboard and screen readers.

## Non-Goals

- No security middleware is implemented here.
- No auth provider is configured here.
- No secrets are created here.

