# Coding Standards

No application code exists yet. These standards define the baseline for future implementation.

## Baseline

- Use strict TypeScript when TypeScript is introduced.
- Keep files focused.
- Avoid duplicated code.
- Avoid circular dependencies.
- Prefer composition.
- Prefer clean interfaces.
- Validate inputs at trust boundaries.
- Keep secrets out of source control.

## File Ownership

- Routes belong in `app/`.
- Reusable UI belongs in `components/`.
- Shared helpers belong in `lib/`.
- External service adapters belong in `services/`.
- Persistence definitions belong in `database/`.

## Future Tooling

Linting, formatting, type checking and test tooling should be selected through ADRs after the runtime decision.

