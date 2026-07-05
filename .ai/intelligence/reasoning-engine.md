# Reasoning Engine

## Purpose

Define how NOVUS organizes reasoning before, during and after provider execution.

NOVUS owns reasoning orchestration. External models assist with reasoning, but they do not own the decision process.

## Responsibilities

- Identify reasoning mode.
- Break complex requests into reasoning steps.
- Request model assistance when needed.
- Evaluate provider output against context and policy.
- Produce concise reasoning summaries suitable for audit and user explanation.

## Inputs

- Intent.
- Context packet.
- Knowledge graph relationships.
- Memory signals.
- Decision criteria.
- Model capability constraints.
- Safety policy.

## Outputs

- Reasoning plan.
- Key assumptions.
- Trade-off frame.
- Risk and opportunity candidates.
- Evaluated reasoning summary.
- Follow-up questions when context is insufficient.

## Interactions with Other Modules

- Workflow Engine selects reasoning path.
- Context Builder supplies context.
- Decision Engine uses reasoning outputs.
- Prompt Engine translates reasoning needs into provider requests.
- Recommendation Engine uses evaluated reasoning.
- Memory Engine may store important reasoning outcomes.

## Future Scalability

The Reasoning Engine should support:

- Domain-specific reasoning modes.
- Multi-model reasoning workflows.
- Self-evaluation and critique.
- Confidence scoring.
- Long-term reasoning across goals and projects.
- Auditable reasoning summaries.

## AI Ownership

- Owning AI agent: Codex.
- Collaborating AI agents: Claude, Fable, QA.

## Engineering Considerations

- Do not store hidden chain-of-thought as product data.
- Store useful reasoning summaries, assumptions and decisions.
- Ask clarifying questions when decision quality depends on missing context.
- Reasoning quality should be evaluated before recommendations are shown.

## Example Reasoning Modes

- Trade-off analysis.
- Risk analysis.
- Opportunity analysis.
- Financial reasoning.
- Business reasoning.
- Life planning.
- Goal decomposition.
- Decision comparison.

