# Decision Flow

## Purpose

Define the runtime path that converts reasoning into decision-ready outputs.

## Responsibilities

- Frame the decision.
- Compare options.
- Score priorities.
- Detect risks and opportunities.
- Prepare outputs for recommendation generation.
- Preserve user agency.

## Inputs

- Reasoning Pipeline output.
- User goals.
- Business context.
- Financial context.
- User preferences.
- Knowledge graph relationships.

## Outputs

- Decision frame.
- Option set.
- Trade-off analysis.
- Risk and opportunity signals.
- Priority score.
- DecisionGenerated event.

## Runtime Interactions

- Reasoning Pipeline supplies analysis.
- Recommendation Generation converts decisions into guidance.
- Goal Tracking may update goal state.
- Task Generation may create task candidates.
- Memory Update may persist meaningful decisions.

## Future Scalability

Decision Flow should support domain-specific scoring, scenario comparison, outcome tracking and enterprise decision policies.

## AI Ownership

- Owning AI agent: Codex.
- Collaborating AI agents: Claude, Fable, QA.

## Engineering Considerations

- Decision scoring must be explainable.
- Recommendations must include trade-offs.
- Financial decisions should show assumptions and uncertainty.
- NOVUS should not execute irreversible decisions without user confirmation.

## Example Decision Signals

- Urgency.
- Impact.
- Reversibility.
- Risk.
- Cost.
- Alignment with goals.
- Required follow-up.

