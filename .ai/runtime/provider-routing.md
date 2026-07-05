# Provider Routing

## Purpose

Define the runtime stage that routes model requests to the correct AI provider through the provider abstraction.

## Responsibilities

- Receive provider-neutral model requests.
- Consult Model Selection and AI Registry.
- Route through the AI Provider Layer.
- Apply fallback policy.
- Normalize provider errors.
- Record provider latency and failure metrics.

## Inputs

- Prompt Engine request.
- Selected model alias.
- Provider availability.
- Security constraints.
- Fallback chain.
- Timeout and retry policy.

## Outputs

- AI provider response.
- Provider execution metadata.
- Provider failure category.
- Fallback decision.
- ProviderRouted event.

## Runtime Interactions

- Model Selection chooses the model.
- AI Registry defines provider and fallback options.
- AI Provider Layer executes the provider call.
- Observability records latency, retries and failures.
- Response Processing validates output.

## Future Scalability

Provider routing should support multi-provider routing, region-aware routing, cost-aware routing, private providers and enterprise routing policies.

## AI Ownership

- Owning AI agent: Codex.
- Collaborating AI agents: Fable, QA, Claude.

## Engineering Considerations

- No runtime module should call provider SDKs directly.
- Provider routing should preserve capability requirements during fallback.
- Provider errors should be normalized.
- Sensitive workflows may restrict provider choices.

## Example Routing Outcomes

- Primary provider succeeds.
- Provider rate-limits and fallback provider is selected.
- Security policy blocks provider use.
- Provider output fails validation and retry is requested.

