# AI Models

## Purpose

Define how NOVUS describes AI models as capability-bearing reasoning engines rather than hard-coded product dependencies.

## Responsibilities

- Categorize models by capability.
- Document model metadata needed for selection.
- Define model suitability for reasoning tasks.
- Separate model identity from provider implementation.

## Inputs

- Provider-reported model availability.
- NOVUS-defined capability tags.
- Cost, latency and context window expectations.
- Safety profile and data handling constraints.
- Domain suitability notes.

## Outputs

- Model capability records.
- Model category definitions.
- Selection hints for the AI Registry.
- Constraints for prompt and workflow planning.

## Interactions with Other Modules

- AI Registry stores model records.
- Decision Engine requests model capabilities through the registry.
- Prompt Engine adapts prompts to selected model constraints.
- Provider Layer executes the selected model.
- Security module restricts model use based on data sensitivity.

## Future Scalability

The model system should support:

- Multiple models per provider.
- Specialized domain models.
- Local models.
- Fine-tuned or user-specific models if approved later.
- Deprecation and migration policies.
- Model evaluation history.

## AI Ownership

- Owning AI agent: Codex.
- Collaborating AI agents: Claude, Fable, QA.

## Engineering Considerations

- Model selection should be policy-driven, not scattered across product code.
- Model records should include limitations, not only strengths.
- Model naming should distinguish NOVUS internal aliases from provider model IDs.
- Changes to production model routing should be auditable.

## Example Model Capabilities

- General reasoning.
- Long-context synthesis.
- Structured extraction.
- Financial analysis support.
- Planning support.
- Code reasoning.
- Tool-use reliability.
- Embedding generation.
- Low-latency response.

