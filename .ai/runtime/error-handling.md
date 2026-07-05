# Error Handling

## Purpose

Define how NOVUS handles runtime failures without losing execution context or user trust.

## Responsibilities

- Classify runtime errors.
- Decide retry, fallback or abort behavior.
- Preserve recoverable execution context.
- Emit failure events.
- Produce safe user-facing explanations.

## Inputs

- Stage failure.
- Provider error.
- Tool error.
- Memory or graph update error.
- Scheduler or background job error.
- Timeout.

## Outputs

- Error category.
- Retry decision.
- Fallback decision.
- User-facing failure response.
- Failure event.
- Observability signal.

## Runtime Interactions

- Workflow Orchestrator coordinates recovery.
- Provider Routing handles provider fallback.
- Tool Execution records tool failures.
- Observability tracks failures.
- Event System routes failure events.

## Future Scalability

Error Handling should support dead-letter queues, workflow replay, distributed retries, circuit breakers and enterprise incident reporting.

## AI Ownership

- Owning AI agent: Codex.
- Collaborating AI agents: QA, Fable.

## Engineering Considerations

- Retry only idempotent operations or guarded actions.
- User-facing errors should not expose secrets or internals.
- Partial failures should not corrupt memory or graph state.
- Provider fallback should preserve capability requirements.

## Example Error Categories

- ValidationError.
- ProviderUnavailable.
- ProviderRateLimited.
- ToolPermissionDenied.
- ToolExecutionFailed.
- MemoryUpdateFailed.
- KnowledgeUpdateFailed.
- WorkflowTimeout.

