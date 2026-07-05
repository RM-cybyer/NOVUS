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

No dependency should be added until the repository has a runtime decision, package manager decision and documented rationale for that dependency.
