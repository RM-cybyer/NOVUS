# Prompt Engine

## Purpose

Define how NOVUS constructs prompts as controlled reasoning instructions rather than scattered strings.

## Responsibilities

- Convert workflow requirements into provider-neutral prompt plans.
- Insert context packets safely.
- Apply model constraints.
- Specify desired response structure.
- Separate system, developer, task and context instructions when implementation supports them.
- Avoid hidden or undocumented prompt behavior.

## Inputs

- Workflow plan.
- Context packet.
- Reasoning mode.
- Decision criteria.
- Model capability constraints.
- Tool policy.
- Security policy.

## Outputs

- Provider-neutral prompt plan.
- Response format expectations.
- Tool instructions when allowed.
- Safety instructions.
- Evaluation criteria.

## Interactions with Other Modules

- Workflow Engine requests prompt creation.
- Context Builder supplies context.
- AI Registry supplies model constraints.
- Provider Layer translates or sends prompt instructions.
- Response Evaluation checks output against prompt expectations.

## Future Scalability

The Prompt Engine should support:

- Versioned prompt templates.
- Domain-specific prompt policies.
- A/B evaluation of prompt strategies.
- Structured output contracts.
- Localization.
- User preference adaptation.
- Prompt safety review.

## AI Ownership

- Owning AI agent: Codex.
- Collaborating AI agents: Fable, QA, Claude.

## Engineering Considerations

- Prompts should be treated as product-critical architecture.
- Prompt changes should be reviewable.
- Sensitive user context should be minimized.
- Provider-specific prompt differences should be documented.
- Prompt output should be evaluated before use.

## Example Prompt Plan Contents

- Task objective.
- User context summary.
- Relevant memory.
- Decision criteria.
- Tool permissions.
- Output structure.
- Safety limits.
- Evaluation rubric.

