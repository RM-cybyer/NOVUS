# Response Processing

## Purpose

Define how NOVUS validates and shapes AI responses before they reach users or downstream modules.

## Responsibilities

- Validate provider response structure.
- Check response against user context.
- Detect hallucinated actions.
- Confirm memory consistency.
- Support recommendation generation.
- Normalize structured outputs.
- Decide whether retry, fallback or clarification is needed.

## Inputs

- AI provider response.
- Prompt expectations.
- Context packet.
- Tool execution results.
- Decision Flow output.
- Security policy.

## Outputs

- Validated response.
- Rejection or retry decision.
- Structured output payload.
- Recommendation input.
- ResponseValidated event.

## Runtime Interactions

- Provider Routing supplies raw provider output.
- Tool Execution may provide tool results.
- Recommendation Generation consumes validated response content.
- Memory Update uses only evaluated outputs.
- Observability records validation failures.

## Future Scalability

Response Processing should support schema validation, safety classifiers, hallucination checks, response scoring, streaming validation and domain-specific evaluators.

## AI Ownership

- Owning AI agent: Codex.
- Collaborating AI agents: QA, Fable, Claude.

## Engineering Considerations

- Raw model output should not be trusted.
- Responses must respect user context.
- Responses must not claim actions were performed unless runtime executed them.
- Structured output should be validated before use.
- Failed validation should produce a recoverable workflow state.

## Required Response Properties

- Context-aware.
- Memory-consistent.
- No hallucinated actions.
- Recommendation-compatible.
- Structurally valid when structured output is requested.

