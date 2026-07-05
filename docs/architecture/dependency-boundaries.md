# Dependency Boundaries

This repository currently has no package manager and no runtime dependencies.

## Dependency Introduction Policy

Before adding dependencies:

1. Select and document the runtime and package manager.
2. Explain the dependency need in a blueprint or ADR.
3. Confirm maintenance status, license, security posture and bundle/runtime impact.
4. Add verification through CI when possible.

## Isolation Policy

- External services belong behind adapters in `services/`.
- Cross-cutting utilities belong in `lib/`.
- UI libraries should be isolated through `components/` conventions.
- Testing tools should be documented in `docs/testing/`.

## Rejection Criteria

Do not add a dependency when:

- Native platform capability is sufficient.
- The dependency solves only speculative future needs.
- It introduces unclear licensing or security risk.
- It bypasses documented architecture boundaries.

