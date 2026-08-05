# Intelligence Layer

Documentation for the AI layer that NOVUS actually runs.

NOVUS is not an AI wrapper. It owns the reasoning process and calls
external models through a documented provider boundary, so no product
code depends on NVIDIA, OpenAI, Anthropic or any other vendor directly.

## Scope

This folder documents implemented behaviour only. Design notes for
capabilities that do not exist yet belong in a blueprint under
`blueprints/`. A document that describes a system which was never built
reads to both agents and humans as if it were real, and that is how the
repository ended up with more specification than code.

## Document map

| Document | Implemented by |
|---|---|
| `registry.md` | `services/ai/registry.ts` |
| `providers.md` | `services/ai/providers/` |
| `models.md` | the model records in `services/ai/registry.ts` |

## Current state

The layer provides a provider-neutral request contract, a model registry
carrying capability and sensitivity metadata, a routing engine, normalized
provider errors and a NVIDIA NIM adapter with SSE streaming.

It has never served a live request. `AIService` is currently constructed
in the browser by the chat view and no API key reaches it, so any call
would be unauthenticated. Moving execution to a server route is the first
task of the MVP work.

## Not built

Memory, knowledge graph, embeddings, tool calling, planning, decision and
recommendation engines are product goals, not code. They are tracked in
the roadmap and specified in a blueprint when the work starts.

## AI placement contract

- What belongs here: documentation of the intelligence code that exists.
- What never belongs here: provider SDK code, application code, UI, API
  handlers, secrets, or specifications for unbuilt systems.
- Owning AI agent: Codex. Collaborating: Claude, Fable.
- Governing docs: `.ai/shared/ai-first-philosophy.md`,
  `docs/decisions/0003-intelligence-layer-architecture.md`.
