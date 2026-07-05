# Repository Governance

NOVUS OS uses documentation-first governance until product implementation begins.

## Change Categories

| Change | Requirement |
| --- | --- |
| New top-level folder | Update repository architecture docs and add README with AI ownership metadata. |
| New runtime or framework | ADR required. |
| New dependency | ADR or blueprint rationale required. |
| Major feature | Blueprint required before implementation. |
| Security-sensitive area | Security review and documentation required. |
| CI or release workflow | Operations or engineering docs update required. |
| New module | Must be understandable without previous conversation context. |
| Agent workflow change | Update `.ai/agents/` and relevant governance docs. |

## Ownership

- Codex: Repository health, maintainability, architecture discipline.
- Claude: Vision, roadmap, product strategy, high-level direction.
- Fable: Product implementation.
- QA: Validation, regression, accessibility and consistency.

## GitHub-First Governance

GitHub is the single source of truth for every AI agent. Local folders are working copies only.

Before every work session:

1. Pull latest changes.
2. Verify branch.
3. Read new ADRs.
4. Read updated documentation.
5. Read updated blueprints.
6. Review previous handoff.
7. Confirm ownership.

After every work session:

1. Run repository verification.
2. Review modified files.
3. Commit.
4. Push.
5. Verify GitHub updated.
6. Generate handoff.
7. Leave repository clean or document why it is not clean.

## Enforcement

The repository health workflow validates required foundation files and folders. Human and AI reviewers enforce higher-level architecture and documentation quality.

AI readability is a review requirement. If future agents cannot infer ownership, purpose and placement rules from the repository itself, the change is incomplete.
