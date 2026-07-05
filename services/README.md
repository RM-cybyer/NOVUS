# Services

The `services/` folder contains external service integrations and service adapters.

## Responsibility

- Isolate third-party APIs and infrastructure services.
- Keep integration details out of routes and UI components.
- Provide clear boundaries for authentication, storage, notifications, calendar, email, AI APIs and other integrations.

## Subfolders

- `ai/`: AI provider adapters and model gateway integration.
- `auth/`: Authentication service adapters.
- `calendar/`: Calendar integrations.
- `email/`: Email providers.
- `integrations/`: Third-party integrations that do not fit a specific service folder.
- `notifications/`: Notification delivery services.
- `storage/`: File and object storage integrations.

## Rules

- Do not place UI code here.
- Do not hide product decisions inside service adapters.
- Document external service contracts before production use.

## AI Placement Contract

- Why this folder exists: Isolate external systems behind explicit service boundaries.
- What belongs here: Auth, email, storage, notification, calendar, AI and third-party integration adapters.
- What never belongs here: UI components, route definitions, database migrations, secrets or undocumented product strategy.
- Owning AI agent: Fable.
- Collaborating AI agents: Codex, QA, Claude.
- Governing docs: `docs/architecture/dependency-boundaries.md` and `docs/security/security-baseline.md`.
