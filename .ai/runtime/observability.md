# Observability

## Purpose

Define how NOVUS observes runtime execution through logs, metrics and traces.

## Responsibilities

- Record runtime logs.
- Collect execution metrics.
- Trace workflows across modules.
- Track provider latency.
- Track tool execution time.
- Track memory retrieval time.
- Track failures and retries.

## Inputs

- Runtime events.
- Stage timings.
- Provider metadata.
- Tool execution metadata.
- Error records.
- Workflow correlation identifiers.

## Outputs

- Logs.
- Metrics.
- Execution traces.
- Failure dashboards when implemented.
- Reliability reports.

## Runtime Interactions

- Workflow Orchestrator emits trace boundaries.
- Event System provides stage events.
- Provider Routing supplies AI and provider latency.
- Tool Execution supplies tool duration.
- Error Handling supplies failure categories.

## Future Scalability

Observability should support distributed traces, per-tenant metrics, provider reliability dashboards, workflow analytics and alerting.

## AI Ownership

- Owning AI agent: Codex.
- Collaborating AI agents: QA, Fable.

## Engineering Considerations

- Logs must not include secrets or sensitive user content by default.
- Metrics should be actionable.
- Traces should correlate all runtime stages.
- Provider and tool latency should be tracked separately.
- Observability should exist before production runtime launch.

## Required Signals

- AI latency.
- Provider latency.
- Workflow duration.
- Memory retrieval time.
- Tool execution time.
- Failure tracking.
- Retry count.

