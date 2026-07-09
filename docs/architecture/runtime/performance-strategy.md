# Performance Strategy

## Purpose

Define runtime performance strategy before implementation.

## Responsibilities

- Keep first user-facing experiences responsive.
- Control AI latency through routing, streaming and fallback.
- Optimize context loading, memory retrieval and provider calls.
- Prevent client bundles from growing without review.

## Strategy

- Use Server Components where appropriate to reduce client-side JavaScript.
- Use Client Components only for interactive UI.
- Use TanStack Query only for client-side server state that needs caching or refetching.
- Use lazy loading for heavy UI and optional workflows.
- Use parallel context loading where Runtime dependencies allow.
- Use provider routing to choose appropriate latency and quality trade-offs.
- Use context compression before provider calls when safe.

## Performance Budgets

Exact budgets require implementation and measurement, but future work should define:

- Initial route load target.
- Interaction latency target.
- AI response latency target by workflow type.
- Memory retrieval latency target.
- Provider timeout and fallback thresholds.
- Bundle size thresholds.

## AI Performance

AI workflows should track:

- Prompt construction time.
- Context retrieval time.
- Provider latency.
- Model latency.
- Response validation time.
- Tool execution time.
- End-to-end workflow duration.

## Non-Goals

- No optimization code is implemented here.
- No performance tooling is installed here.

