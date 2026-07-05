# Logger

This folder is reserved for logging utilities and adapters.

## Responsibility

- Standardize logs across the application.
- Provide structured logging once runtime exists.
- Keep sensitive data out of logs.

## Rules

- Never log secrets, tokens or private user data.
- Keep logging implementation replaceable.
- Document log fields when introduced.

