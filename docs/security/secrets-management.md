# Secrets Management

NOVUS OS does not currently define runtime environment variables.

## Rules

- Use `.env.example` only for safe placeholder names if environment variables are introduced.
- Never commit `.env` or real secret files.
- Store secrets in the deployment platform or approved secret manager.
- Rotate secrets if accidental exposure is suspected.

## Documentation Requirement

Every required environment variable must be documented with:

- Name
- Purpose
- Required or optional status
- Safe example value
- Where it is used

