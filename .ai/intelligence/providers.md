# AI Provider Layer

## Purpose

Define the provider abstraction that prevents NOVUS from depending directly on any AI company or model host.

NOVUS must never couple product logic directly to OpenAI, Anthropic, NVIDIA, Google, OpenRouter, xAI or any future provider.

## Responsibilities

- Normalize provider communication behind a stable NOVUS boundary.
- Hide provider-specific request and response formats.
- Support provider swapping without changing reasoning, decision or memory modules.
- Expose provider capabilities to the AI Registry.
- Enforce security and privacy requirements before provider execution.

## Inputs

- Provider-neutral model request from the Prompt Engine.
- Selected model identity from the AI Registry.
- Capability requirements.
- Safety and privacy constraints.
- Tool policy and response format requirements.

## Outputs

- Provider-neutral model response.
- Execution metadata.
- Error category.
- Token, latency and cost metadata when available.
- Fallback eligibility signal.

## Interactions with Other Modules

- AI Registry selects model and provider.
- Prompt Engine creates provider-neutral prompts.
- Tool Calling defines allowed tool use.
- Security module applies data minimization and policy checks.
- Response Evaluation validates provider output before it reaches user-facing workflows.

## Future Scalability

The Provider Layer should support:

- Multiple providers.
- Local and hosted models.
- Provider-specific feature differences.
- Streaming and non-streaming responses.
- Retry and fallback policies.
- Cost-aware routing.
- Region-aware routing when privacy or compliance requires it.

## AI Ownership

- Owning AI agent: Codex.
- Collaborating AI agents: Fable for implementation, QA for reliability validation, Claude for strategic provider policy.

## Engineering Considerations

- No application module should import provider SDKs directly.
- Provider adapters should be replaceable.
- Provider errors should be normalized into stable categories.
- Provider credentials must never appear in repository files.
- Provider-specific prompts should be avoided unless documented by model capability needs.

## Example Provider Categories

- General reasoning provider.
- Long-context provider.
- Code reasoning provider.
- Embedding provider.
- Low-latency provider.
- Cost-optimized provider.
- Local/private provider.

