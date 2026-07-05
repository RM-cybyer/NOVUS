# Performance

## Purpose

Define runtime performance strategies before implementation.

## Responsibilities

- Identify latency-sensitive stages.
- Support caching where safe.
- Support parallel execution where safe.
- Optimize context and memory retrieval.
- Track provider and workflow latency.
- Prepare for distributed execution.

## Inputs

- Workflow duration metrics.
- Provider latency.
- Memory retrieval time.
- Tool execution time.
- Context size.
- Cache eligibility.

## Outputs

- Performance budget candidates.
- Optimization opportunities.
- Cache policy candidates.
- Parallel execution candidates.
- Performance events.

## Runtime Interactions

- Observability measures performance.
- Context Loading and Memory Retrieval are optimization targets.
- Provider Routing can choose lower-latency models when appropriate.
- Workflow Orchestrator can parallelize safe stages.

## Future Scalability

Performance should support caching, parallel execution, lazy loading, provider optimization, context optimization, memory compression and distributed execution.

## AI Ownership

- Owning AI agent: Codex.
- Collaborating AI agents: QA, Fable.

## Engineering Considerations

- Do not optimize before measurement exists.
- Caches must respect user privacy and data isolation.
- Parallel execution should not break dependency order.
- Context compression should not remove decision-critical facts.
- Provider optimization should not silently reduce reasoning quality.

## Example Optimization Areas

- Context caching.
- Parallel loaders.
- Memory compression.
- Provider latency routing.
- Lazy loading of optional context.
- Background precomputation.

