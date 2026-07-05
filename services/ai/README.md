# AI Services

This folder is reserved for AI provider adapters and model access boundaries.

## Responsibility

- Isolate model provider calls.
- Centralize prompt, model and response handling once approved.
- Support auditing and testing of AI interactions.

## Rules

- Do not introduce AI providers without security and cost review.
- Keep prompts and model choices documented.
- Avoid leaking private user data to providers without explicit policy.

