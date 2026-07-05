# Workflow Orchestrator

## Purpose

Design the Runtime Orchestrator that executes workflows and coordinates all runtime modules.

## Responsibilities

- Execute workflows.
- Handle execution order.
- Coordinate modules.
- Recover from failures.
- Retry operations.
- Emit events.
- Maintain execution context.
- Support future parallel execution.

## Inputs

- Validated message envelope.
- Workflow definition.
- Runtime execution context.
- Event bus.
- Module availability.
- Retry and timeout policy.
- Security policy.

## Outputs

- Workflow result.
- Stage events.
- Retry decisions.
- Failure records.
- Final response package.
- Side-effect requests.

## Runtime Interactions

- Calls Context Loading, Memory Retrieval, Reasoning Pipeline, Decision Flow, Provider Routing, Tool Execution and Response Processing.
- Emits events through the Event System.
- Sends timing and failure data to Observability.
- Receives policies from Security Runtime.

## Future Scalability

The orchestrator should support distributed workers, parallel stage execution, workflow versioning, resumable state and long-running workflows.

## AI Ownership

- Owning AI agent: Codex.
- Collaborating AI agents: Fable, QA, Claude.

## Engineering Considerations

- Orchestration should be declarative enough to inspect.
- Workflow state should be serializable after implementation.
- Retries must be idempotent or explicitly guarded.
- Side effects should be emitted as requests, not hidden actions.
- Failure recovery should preserve user trust.

## Example Orchestrator Duties

- Start workflow.
- Load context in parallel when safe.
- Select model.
- Route provider call.
- Validate response.
- Execute approved tools.
- Commit memory and graph updates.
- Finish conversation.

