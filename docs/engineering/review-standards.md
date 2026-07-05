# Review Standards

Reviews should protect long-term repository health.

## Review Focus

- AI readability.
- Human readability.
- Correct responsibility boundaries.
- Missing documentation.
- Unclear naming.
- Duplication.
- Security and privacy risk.
- Testability.
- Scalability and maintainability.
- Unnecessary dependencies.
- Hidden context risk.

## Required Checks

- Does every new folder have a README?
- Does every major folder declare owner and collaborators?
- Can a future agent understand the change without chat history?
- Does the change require an ADR?
- Does the change require a blueprint?
- Does documentation match repository reality?
- Were secrets or private values introduced?
