# Recommendation Generation

## Purpose

Define how runtime turns decisions and validated responses into recommendations.

## Responsibilities

- Generate recommendation candidates.
- Preserve trade-off explanations.
- Avoid restrictive recommendations.
- Include alternatives and uncertainty.
- Prepare user-facing recommendation payloads.
- Emit recommendation events.

## Inputs

- Decision Flow output.
- Response Processing output.
- User goals and preferences.
- Memory and graph context.
- Risk and opportunity signals.

## Outputs

- Recommendation set.
- Trade-off summary.
- Alternative options.
- Suggested next steps.
- RecommendationCreated event.

## Runtime Interactions

- Decision Flow provides evaluated options.
- Response Processing validates model contributions.
- Goal Tracking may update progress.
- Task Generation may create follow-up tasks.
- Memory Update may store accepted recommendations or decisions.

## Future Scalability

Recommendation Generation should support outcome feedback, proactive insights, domain-specific recommendation styles and quality scoring.

## AI Ownership

- Owning AI agent: Codex.
- Collaborating AI agents: Claude, Fable, QA.

## Engineering Considerations

- Recommendations must explain trade-offs.
- Recommendations should preserve user choice.
- High-stakes recommendations require caution and assumptions.
- Accepted or rejected recommendations can become feedback signals.

## Example Recommendation Shape

- Recommended option.
- Why it fits.
- What it costs.
- What could go wrong.
- What alternatives exist.
- What to do next.

