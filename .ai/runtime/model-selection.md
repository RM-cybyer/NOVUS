# Model Selection

## Purpose

Define how runtime chooses a model for a workflow without hard-coding provider-specific decisions.

## Responsibilities

- Translate workflow needs into model capability requirements.
- Query the AI Registry.
- Select model aliases.
- Provide fallback chains.
- Produce model selection rationale.

## Inputs

- Workflow type.
- Reasoning depth.
- Context size.
- Tool requirements.
- Structured output requirements.
- Sensitivity classification.
- Cost and latency targets.

## Outputs

- Selected model alias.
- Capability match.
- Fallback chain.
- Model constraints.
- ModelSelected event.

## Runtime Interactions

- Workflow Orchestrator requests model selection.
- AI Registry provides model metadata.
- Provider Routing uses selected model and fallback chain.
- Prompt Engine adapts to model constraints.
- Observability records model latency and failure rate.

## Future Scalability

Model selection should support dynamic routing, evaluation-informed routing, user-tier policies, enterprise routing and offline or private model options.

## AI Ownership

- Owning AI agent: Codex.
- Collaborating AI agents: Fable, QA, Claude.

## Engineering Considerations

- Model selection should be deterministic under the same policy inputs.
- Sensitive workflows should prefer approved providers and models.
- Fallback should not silently degrade high-stakes reasoning.
- Selection rationale should be auditable.

## Example Selection Criteria

- Long context required.
- High reasoning required.
- Low latency required.
- Structured response required.
- Sensitive data restriction active.

