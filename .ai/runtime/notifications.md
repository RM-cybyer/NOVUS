# Notifications

## Purpose

Define how runtime creates and governs notification requests.

## Responsibilities

- Convert events or scheduled outputs into notification candidates.
- Respect user preferences and quiet hours.
- Avoid notification overload.
- Require confirmation for sensitive or external notifications when needed.
- Track notification outcomes.

## Inputs

- Goal events.
- Task events.
- Scheduler events.
- Background job outputs.
- User notification preferences.
- Sensitivity classification.

## Outputs

- Notification candidate.
- Notification delivery request.
- NotificationSkipped event.
- NotificationSent event when implemented.

## Runtime Interactions

- Scheduler and Background Jobs produce notification candidates.
- Event System routes notification triggers.
- Tool Execution may deliver through external providers in future implementation.
- Telemetry may record anonymous notification engagement.

## Future Scalability

Notifications should support channels, preferences, templates, batching, digesting, enterprise policies and user-controlled suppression.

## AI Ownership

- Owning AI agent: Codex.
- Collaborating AI agents: Fable, QA, Claude.

## Engineering Considerations

- Notifications should be useful, not intrusive.
- Sensitive content should be minimized.
- External delivery providers must be behind service adapters.
- Notification generation should not bypass user preferences.

## Example Notifications

- Morning briefing ready.
- Goal progress review.
- Financial anomaly detected.
- Task follow-up.
- Weekly planning reminder.

