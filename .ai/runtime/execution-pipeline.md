# Execution Pipeline

## Purpose

Document the complete execution pipeline from user input to final response and side effects.

## Responsibilities

- Define ordered runtime stages.
- Identify stage inputs and outputs.
- Clarify where validation, reasoning, tools, memory and events happen.
- Provide a canonical path for future tests and implementation.

## Inputs

- User input.
- Runtime session state.
- User profile.
- Memory and knowledge graph records.
- Model registry records.
- Tool registry records.
- Security policy.

## Outputs

- Validated UI response.
- Runtime events.
- Tool execution records.
- Memory and knowledge updates.
- Goal and task updates.
- Notification requests.

## Runtime Interactions

- Workflow Orchestrator executes this pipeline.
- Event System emits stage events.
- Intelligence Layer modules provide reasoning and decision contracts.
- Observability records timing, failures and provider latency.

## Future Scalability

Pipeline stages should later support parallel context loading, async tool execution, streaming responses and distributed workers.

## AI Ownership

- Owning AI agent: Codex.
- Collaborating AI agents: Fable, QA, Claude.

## Engineering Considerations

- Stages should be explicit and testable.
- Runtime should support partial failure and retry.
- Tool execution should occur after validation.
- Memory updates should occur after response validation.

## Canonical Execution Path

```text
User
  -> Input Validation
  -> Intent Detection
  -> Context Loader
  -> Memory Retrieval
  -> Knowledge Graph Retrieval
  -> Profile Loader
  -> Goals Loader
  -> Business Context
  -> Financial Context
  -> Reasoning Pipeline
  -> Decision Engine
  -> Recommendation Engine
  -> Prompt Engine
  -> AI Registry
  -> AI Provider
  -> Selected AI Model
  -> AI Response
  -> Response Validator
  -> Tool Execution
  -> Memory Update
  -> Knowledge Graph Update
  -> Goal Update
  -> Task Generator
  -> Notification Engine
  -> UI Response
```

