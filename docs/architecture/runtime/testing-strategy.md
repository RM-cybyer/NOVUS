# Testing Strategy

## Purpose

Define the official testing strategy for NOVUS implementation.

## Decisions

- Vitest is the unit and integration test runner.
- Playwright is the end-to-end test runner.
- ESLint is the linting tool.
- Prettier is the formatter.
- WCAG AA is the accessibility target.

## Responsibilities

- Validate runtime behavior.
- Protect auth, authorization, data and AI workflow boundaries.
- Keep tests fast enough for local development and CI.
- Provide confidence before GitHub tasks are complete.

## Test Layers

| Layer | Tool | Purpose |
| --- | --- | --- |
| Unit | Vitest | Pure logic, validation, helpers, permission functions and small services. |
| Integration | Vitest | Server Actions, service boundaries, database queries and runtime module contracts. |
| End-to-end | Playwright | Critical user workflows in the browser. |
| Accessibility | Playwright plus focused checks | Keyboard, focus, labels, contrast and major WCAG AA expectations. |
| Lint | ESLint | Static code quality and correctness rules. |
| Format | Prettier | Consistent formatting. |

## Priority Coverage

Testing must be strongest around:

- Auth and authorization.
- Runtime Orchestrator.
- Provider routing and fallback.
- Tool execution.
- Memory and knowledge updates.
- Financial and business data boundaries.
- Form validation.
- Critical UI workflows.

## CI Expectations

Future CI should run:

- Type check.
- Lint.
- Format check.
- Unit tests.
- Integration tests.
- Playwright smoke or critical-path tests.

## Non-Goals

- No test framework is installed here.
- No tests are written here.
- No CI runtime commands are added here.

