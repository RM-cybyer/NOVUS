# Memory Retrieval

## Purpose

Define the runtime stage that retrieves relevant memory before reasoning and decision execution.

## Responsibilities

- Retrieve short-term and long-term memory.
- Filter memory by relevance, permission and sensitivity.
- Attach provenance and confidence.
- Avoid irrelevant memory injection.
- Provide memory results to context and reasoning stages.

## Inputs

- User identity.
- Workflow type.
- Current message.
- Context loading output.
- Memory retrieval policy.
- Sensitivity classification.

## Outputs

- Relevant memory set.
- Retrieval rationale.
- Memory confidence.
- Omitted-memory notes.
- MemoryRetrieved event.

## Runtime Interactions

- Context Loading supplies domain hints.
- Memory Engine defines memory categories and retrieval rules.
- Context Builder receives retrieved memory.
- Security Runtime filters sensitive memory.
- Observability records retrieval timing.

## Future Scalability

Memory retrieval should support semantic search, graph-assisted retrieval, caching, memory compression, user controls and multi-tenant isolation.

## AI Ownership

- Owning AI agent: Codex.
- Collaborating AI agents: Fable, QA.

## Engineering Considerations

- Retrieval must be explainable.
- User-corrected memory should override inferred memory.
- Sensitive memories should require explicit policy approval.
- Retrieval results should not be written back without evaluation.

## Example Events

- MemoryRetrievalStarted.
- MemoryRetrieved.
- MemoryRetrievalSkipped.
- MemoryRetrievalFailed.

