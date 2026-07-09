# Dependency Boundaries

The official package manager is pnpm and the official runtime stack is documented in `docs/architecture/runtime/`.

This repository still has no installed runtime dependencies until implementation begins.

## Dependency Introduction Policy

Before adding dependencies:

1. Confirm the dependency belongs to the official stack or has an approved ADR.
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
