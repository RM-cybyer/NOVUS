# AI Registry

## Purpose

Design the AI Registry that manages every model available to NOVUS and provides controlled model selection for workflows.

## Responsibilities

- Register available models.
- Categorize models by capability, provider and operational profile.
- Describe model strengths, limits and safety constraints.
- Select models for workflows using documented policies.
- Support provider swapping and fallback.
- Track future provider additions.

## Inputs

- Provider definitions.
- Model metadata.
- Capability requirements from workflows.
- User, privacy or region constraints.
- Cost, latency and quality preferences.
- Fallback policy.

## Outputs

- Selected model alias.
- Provider adapter target.
- Fallback chain.
- Model capability summary.
- Selection rationale for auditing.

## Interactions with Other Modules

- Workflow Engine requests a model category.
- Decision Engine may request high-reasoning or domain-suitable models.
- Prompt Engine receives selected model constraints.
- Provider Layer receives provider and model target.
- Security module can block models for sensitive contexts.
- QA can evaluate model selection quality.

## How Models Are Registered

Each model should be registered with:

- NOVUS model alias.
- Provider identity.
- Provider model identifier.
- Capability tags.
- Context window category.
- Latency category.
- Cost category.
- Tool-calling support.
- Structured-output support.
- Safety and privacy notes.
- Fallback eligibility.
- Deprecation status.

## How Models Are Categorized

Recommended categories:

- Reasoning.
- Fast response.
- Long context.
- Structured extraction.
- Embeddings.
- Tool orchestration.
- Domain analysis.
- Private or local execution.

## How Capabilities Are Described

Capabilities should describe what the model is trusted to do, where it is weak and what verification is required.

Capability descriptions should avoid marketing terms. They should be operational:

- Suitable for multi-step trade-off analysis.
- Suitable for quick summarization.
- Not suitable for sensitive financial decisions without evaluation.
- Requires structured-output validation.

## How Models Are Selected

Selection should consider:

- Workflow type.
- Required reasoning depth.
- Sensitivity of context.
- Required response format.
- Tool use.
- Latency target.
- Cost budget.
- Fallback availability.

## How Providers Are Swapped

Provider swapping should happen through registry metadata and provider adapters. Decision, memory, recommendation and prompt modules should not change when a provider changes.

## How Fallback Models Work

Fallback should be explicit:

- Primary model fails or is unavailable.
- Provider rate limit occurs.
- Safety policy blocks provider use.
- Response quality evaluation fails.
- Latency threshold is exceeded.

Fallback chains should preserve capability requirements. A weak model should not replace a high-reasoning model unless the workflow can safely degrade.

## How Future Providers Are Added

Adding a provider requires:

- Provider adapter design.
- Registry metadata.
- Security review.
- Cost and reliability review.
- Evaluation plan.
- Documentation update.

## Future Scalability

The Registry should evolve into a policy engine for model routing, evaluation history, provider health and cost-aware selection.

## AI Ownership

- Owning AI agent: Codex.
- Collaborating AI agents: Fable, QA, Claude.

## Engineering Considerations

- Registry records should be versioned or auditable.
- Runtime selection should be deterministic when policies match.
- Registry changes should be reviewed like architecture changes.
- No provider credentials belong in registry documentation or source files.

## Example Registry Decision

A long, sensitive financial planning conversation may require:

- Long-context reasoning model.
- Provider approved for sensitive context.
- Structured output support.
- Financial reasoning evaluation.
- Conservative fallback chain.

