# Background Jobs

## Purpose

Define asynchronous runtime jobs that operate outside direct user message handling.

## Responsibilities

- Run non-interactive workflows.
- Maintain memories and knowledge graph quality.
- Generate summaries, reviews and reminders.
- Monitor goals, business and financial signals.
- Prepare future analytics and evaluation datasets.

## Inputs

- Scheduled triggers.
- Runtime events.
- User preferences.
- Goal state.
- Financial and business data when approved.
- Memory and graph maintenance needs.

## Outputs

- Job result events.
- Summaries.
- Review candidates.
- Notification requests.
- Memory optimization proposals.
- Knowledge graph maintenance updates.

## Runtime Interactions

- Scheduler triggers recurring jobs.
- Event System triggers event-driven jobs.
- Notifications may deliver job outputs.
- Memory Update and Knowledge Update apply approved maintenance changes.
- Observability tracks duration and failures.

## Future Scalability

Background Jobs should support worker queues, priority classes, retry policies, dead-letter handling, tenant isolation and enterprise job controls.

## AI Ownership

- Owning AI agent: Codex.
- Collaborating AI agents: Fable, QA, Claude.

## Engineering Considerations

- Jobs should be idempotent.
- Jobs should respect user consent and quiet hours.
- Long-running jobs need cancellation and retry strategy.
- Background reasoning should use the same provider and security boundaries as interactive workflows.

## Example Jobs

- Daily financial summaries.
- Weekly reviews.
- Goal progress checks.
- Investment monitoring.
- Reminder generation.
- Memory optimization.
- Knowledge graph maintenance.
- Analytics generation.
- Future AI fine-tuning dataset preparation.

