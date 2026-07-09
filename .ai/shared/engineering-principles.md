# Engineering Principles

## Priorities

Engineering work should prioritize:

- AI readability
- Human readability
- Maintainability
- Scalability
- Readability
- Security
- Performance
- Accessibility
- Developer experience
- Modularity

## Operating Rules

- Prefer simple, explicit designs.
- Avoid speculative abstractions.
- Keep files focused.
- Keep responsibilities separated.
- Preserve module context in repository documentation.
- Avoid circular dependencies.
- Avoid magic values.
- Document architectural decisions.
- Verify changes with the strongest available check.

## Dependency Rule

No dependency should be added unless it belongs to the official runtime stack in `docs/architecture/runtime/` or has an approved ADR with documented rationale.
