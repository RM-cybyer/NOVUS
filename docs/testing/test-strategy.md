# Test Strategy

The official test stack is documented in `docs/architecture/runtime/testing-strategy.md`.

No test framework is installed yet because application implementation has not begun.

## Future Test Layers

- Unit tests for isolated logic.
- Integration tests for module and service boundaries.
- End-to-end tests for critical user workflows.
- Accessibility checks for user-facing UI.
- Security tests for auth, authorization and sensitive data handling.

## Selection Criteria

Testing tools are selected by ADR 0007. Implementation must add package scripts and CI checks in a focused follow-up commit.

## Current Verification

The repository health workflow validates foundation structure.
