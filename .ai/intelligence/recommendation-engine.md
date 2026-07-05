# Recommendation Engine

## Purpose

Define how NOVUS turns reasoning and decisions into user-facing recommendations that preserve user agency.

## Responsibilities

- Generate recommendation candidates.
- Explain trade-offs.
- Present alternatives.
- Highlight risks and opportunities.
- Avoid restrictive or coercive guidance.
- Align recommendations with user goals and context.

## Inputs

- Decision Engine output.
- Reasoning summary.
- User goals and preferences.
- Memory and graph context.
- Risk and opportunity analysis.
- Confidence and uncertainty signals.

## Outputs

- Recommendation set.
- Trade-off explanation.
- Alternative options.
- Risk notes.
- Opportunity notes.
- Suggested next steps.
- Follow-up questions when needed.

## Interactions with Other Modules

- Decision Engine provides evaluated options.
- Planning Engine can convert recommendations into plans.
- Memory Engine stores meaningful recommendations and accepted decisions.
- Context Builder supplies personalization context.
- Conversation Lifecycle controls how recommendations are presented.

## Future Scalability

The Recommendation Engine should support:

- Domain-specific recommendation styles.
- User preference tuning.
- Outcome feedback.
- Recommendation quality evaluation.
- Long-term pattern detection.
- Non-intrusive proactive recommendations.

## AI Ownership

- Owning AI agent: Codex.
- Collaborating AI agents: Claude, Fable, QA.

## Engineering Considerations

- Recommendations must never be restrictive.
- Recommendations should not hide trade-offs.
- Recommendations should distinguish facts, assumptions and uncertainty.
- High-stakes areas such as finance should be conservative and transparent.
- The user remains the final decision maker.

## Recommendation Philosophy

NOVUS should not say only "do this." NOVUS should help users understand:

- What option seems strongest.
- Why it seems strongest.
- What could go wrong.
- What is being traded away.
- What alternatives exist.
- What information would improve the decision.

