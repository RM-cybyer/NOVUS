# Workflow Engine

## Purpose

Define how NOVUS orchestrates the intelligence lifecycle from user input to evaluated response and memory update.

## Responsibilities

- Detect workflow type and intent.
- Coordinate context, memory, graph, reasoning, decision, prompt, provider and recommendation modules.
- Maintain workflow state.
- Enforce safety and evaluation checkpoints.
- Prevent provider output from bypassing NOVUS reasoning ownership.

## Inputs

- User message.
- Conversation state.
- User profile.
- Available workflows.
- Tool availability.
- Model registry capabilities.
- Security policy.

## Outputs

- Workflow plan.
- Ordered execution steps.
- Model selection request.
- Tool-use request when appropriate.
- Response evaluation request.
- Memory and graph update request.
- Final response package.

## Interactions with Other Modules

- Intent Detection identifies workflow category.
- Context Builder assembles relevant context.
- Memory Engine retrieves and updates memory.
- Knowledge Graph resolves entities and relationships.
- Decision Engine evaluates choices.
- Prompt Engine prepares model instructions.
- AI Provider Layer executes model calls.
- Recommendation Engine shapes trade-off-aware guidance.

## Future Scalability

The Workflow Engine should support:

- Multi-step workflows.
- Background workflows.
- Scheduled reviews.
- Human confirmation gates.
- Domain-specific workflow templates.
- Parallel context retrieval.
- Workflow audit records.

## AI Ownership

- Owning AI agent: Codex.
- Collaborating AI agents: Fable for implementation, QA for workflow validation, Claude for product workflow direction.

## Engineering Considerations

- Workflows should be explicit and inspectable.
- Long-running workflows should be resumable.
- Every workflow should define failure states.
- Sensitive workflows should include confirmation and evaluation checkpoints.
- The engine should not contain provider-specific logic.

## Example Conversation Lifecycle

```text
User
  -> Intent Detection
  -> Context Builder
  -> Memory Retrieval
  -> Knowledge Graph
  -> Decision Engine
  -> Prompt Engine
  -> AI Provider
  -> Response Evaluation
  -> Recommendation Engine
  -> Memory Update
  -> UI Response
```

