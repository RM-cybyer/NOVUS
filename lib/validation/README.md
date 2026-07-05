# Validation

This folder is reserved for shared validation schemas and helpers.

## Responsibility

- Validate inputs at trust boundaries.
- Share schemas across routes, services and tests when appropriate.

## Rules

- Validate external input before use.
- Keep validation errors explicit.
- Do not mix validation with persistence or business workflows.

