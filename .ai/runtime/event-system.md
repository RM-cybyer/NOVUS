# Event System

## Purpose

Define the Runtime Event Bus used by modules to communicate through explicit events.

Every runtime module communicates through events. Events make execution observable, auditable and extensible.

## Responsibilities

- Define runtime event categories.
- Emit stage events.
- Decouple modules.
- Support async background work.
- Preserve execution traceability.
- Provide future extension points for plugins and enterprise workflows.

## Inputs

- Runtime stage transitions.
- Workflow state changes.
- Tool execution results.
- Memory and graph updates.
- Scheduler triggers.
- Background job results.

## Outputs

- Runtime events.
- Event subscribers notifications.
- Audit records when needed.
- Observability trace links.

## Runtime Interactions

- Workflow Orchestrator emits workflow events.
- Background Jobs consume scheduled or emitted events.
- Notifications may subscribe to task or goal events.
- Observability correlates events into traces.
- Telemetry receives anonymized product events.

## Future Scalability

The Event System should support distributed event queues, replay, dead-letter handling, event versioning, plugin subscribers and enterprise audit streams.

## AI Ownership

- Owning AI agent: Codex.
- Collaborating AI agents: Fable, QA.

## Engineering Considerations

- Events should be named consistently.
- Event payloads should avoid secrets.
- Events should include correlation identifiers when implemented.
- Event schemas should be versioned before production use.
- Event consumers should be idempotent.

## Example Events

- MessageReceived.
- MemoryRetrieved.
- ContextBuilt.
- DecisionGenerated.
- RecommendationCreated.
- ToolExecuted.
- GoalUpdated.
- TaskCreated.
- ConversationFinished.

