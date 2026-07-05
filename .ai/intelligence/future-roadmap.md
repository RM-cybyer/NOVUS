# Intelligence Layer Future Roadmap

## Purpose

Define the recommended evolution of the NOVUS Intelligence Layer before implementation begins.

## Responsibilities

- Sequence future architecture work.
- Identify decisions required before code.
- Keep implementation aligned with the AI-first repository model.
- Prevent premature provider or framework coupling.

## Inputs

- Product strategy from Claude.
- Repository architecture from Codex.
- Implementation needs from Fable.
- Validation findings from QA.
- Security and privacy requirements.

## Outputs

- Implementation readiness checklist.
- Future ADR list.
- Future blueprint list.
- Evaluation needs.
- Risk register candidates.

## Interactions with Other Modules

- `blueprints/` should capture implementation plans.
- `docs/decisions/` should capture runtime, provider and persistence decisions.
- `services/ai/` should eventually contain provider adapter implementation.
- `database/` should eventually define memory and graph persistence.
- `tests/` should eventually validate workflows, retrieval and safety behavior.

## Future Scalability

The roadmap should evolve as NOVUS adds:

- Provider adapters.
- Model registry persistence.
- Memory persistence.
- Knowledge graph persistence.
- Workflow evaluation.
- Recommendation feedback loops.
- Domain-specific intelligence modules.

## AI Ownership

- Owning AI agent: Codex.
- Collaborating AI agents: Claude, Fable, QA.

## Engineering Considerations

- Do not implement before runtime and persistence decisions are documented.
- Do not select providers before provider abstraction and security review.
- Do not store memory before privacy controls exist.
- Do not expose recommendations before evaluation and trade-off rules exist.

## Suggested Phases

1. Approve Intelligence Layer architecture.
2. Create ADRs for runtime, persistence, provider abstraction and test strategy.
3. Create a blueprint for the first intelligence implementation slice.
4. Define evaluation fixtures and safety tests.
5. Implement provider-neutral interfaces.
6. Add first provider adapter behind the Provider Layer.
7. Add memory and graph persistence with user controls.
8. Add recommendation evaluation and feedback loops.

