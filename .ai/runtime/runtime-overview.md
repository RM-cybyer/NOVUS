# Runtime Overview

## Purpose

Define the runtime boundary for NOVUS: how work enters the system, moves through execution stages and exits as a response, update, event or scheduled action.

## Responsibilities

- Establish runtime ownership of execution.
- Separate execution from reasoning.
- Define the runtime modules that future code must map to.
- Prevent direct model, tool or persistence calls from bypassing the orchestrator.

## Inputs

- User messages.
- Scheduled triggers.
- Background job triggers.
- Tool results.
- Provider responses.
- Runtime events.

## Outputs

- UI responses.
- Memory updates.
- Knowledge updates.
- Goal and task updates.
- Notifications.
- Observability and telemetry signals.

## Runtime Interactions

- Intelligence modules define what to reason about.
- Runtime modules decide when and how each stage executes.
- Provider routing calls the Intelligence Layer AI Registry.
- Event system connects runtime stages without hidden coupling.

## Future Scalability

The overview should scale from a single-process runtime to distributed execution with event queues, workers, scheduling, provider pools and enterprise controls.

## AI Ownership

- Owning AI agent: Codex.
- Collaborating AI agents: Claude, Fable, QA.

## Engineering Considerations

- The runtime should be framework-neutral until a runtime ADR exists.
- Every stage should be independently observable.
- Execution state should be recoverable after interruption.
- Runtime modules should not contain provider-specific logic.

## Runtime Philosophy

NOVUS owns execution. AI models can propose reasoning or structured content, but NOVUS validates context, selects models, executes tools, records events and decides what becomes persistent state.

