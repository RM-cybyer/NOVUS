# Telemetry

## Purpose

Define anonymous product analytics for understanding runtime usage and product health.

## Responsibilities

- Track feature usage.
- Track workflow frequency.
- Track recommendation acceptance.
- Track goal completion.
- Track memory growth.
- Track context retrieval efficiency.
- Preserve privacy by default.

## Inputs

- Anonymized runtime events.
- User-consented analytics signals.
- Workflow completion events.
- Recommendation interaction events.
- Goal state changes.

## Outputs

- Anonymous product analytics events.
- Usage summaries.
- Workflow frequency reports.
- Recommendation quality indicators.

## Runtime Interactions

- Event System routes anonymized product events.
- Observability remains operational and debugging focused.
- Telemetry remains product analytics focused.
- Security Runtime enforces privacy boundaries.

## Future Scalability

Telemetry should support privacy-preserving analytics, aggregation, cohort analysis, enterprise opt-out and experimentation governance.

## AI Ownership

- Owning AI agent: Codex.
- Collaborating AI agents: Claude, QA, Fable.

## Engineering Considerations

- Telemetry must not collect raw sensitive content.
- Analytics should be anonymous or consent-based.
- Operational logs and product telemetry should remain separate.
- Recommendation acceptance should not become coercive optimization.

## Example Telemetry Categories

- Feature usage.
- Workflow frequency.
- Recommendation acceptance.
- Goal completion.
- Memory growth.
- Context retrieval efficiency.

