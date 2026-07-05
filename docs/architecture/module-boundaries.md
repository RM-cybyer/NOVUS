# Module Boundaries

NOVUS OS should preserve clear boundaries before feature development begins.

## Boundary Rules

- `app/` can compose routes but should not own business logic.
- `components/` can render UI but should not own data persistence or external service calls.
- `services/` can integrate with external systems but should not own product strategy.
- `lib/` can expose shared utilities but should not become a domain dumping ground.
- `database/` can define persistence structure but should not hide application workflows.
- `.ai/` can define agent context but should not contain application implementation.
- `docs/` can describe current and proposed behavior but should not promise unimplemented behavior as current.

## Dependency Direction

When implementation begins, prefer dependencies to flow from specific entry points toward shared foundations:

```text
app -> components -> hooks/context/store -> services/lib -> database
```

This direction is a guide, not a framework decision. Any exception that affects multiple modules should be documented in an ADR.

