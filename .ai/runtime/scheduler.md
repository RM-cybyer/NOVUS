# Scheduler

## Purpose

Define recurring execution for planned reviews, summaries and proactive workflows.

## Responsibilities

- Register recurring workflow definitions.
- Trigger jobs at appropriate times.
- Respect user preferences and time zones.
- Emit scheduler events.
- Support future distributed scheduling.

## Inputs

- Schedule definitions.
- User time zone.
- User preferences.
- Runtime availability.
- Job definitions.

## Outputs

- Scheduled trigger event.
- Job execution request.
- Missed-run record.
- Scheduler failure record.

## Runtime Interactions

- Scheduler emits events into the Event System.
- Background Jobs execute scheduled work.
- Notifications may deliver scheduled results.
- Observability tracks scheduler reliability.

## Future Scalability

The Scheduler should support per-user schedules, global schedules, enterprise schedules, distributed locks, missed-run recovery and calendar-aware scheduling.

## AI Ownership

- Owning AI agent: Codex.
- Collaborating AI agents: Fable, QA, Claude.

## Engineering Considerations

- Schedule execution must respect time zones.
- Missed runs should be recoverable.
- Recurring jobs should be idempotent.
- Users should control proactive runtime behavior.

## Example Recurring Workflows

- Morning briefing.
- Evening review.
- Weekly planning.
- Monthly financial analysis.
- Quarterly business review.
- Yearly goal review.

