# Runtime Operating System

Documentation for the runtime stages that exist in code.

The Intelligence Layer explains how NOVUS thinks. This folder explains how
a request actually moves through the system today.

## Scope

This folder documents implemented behaviour only. Stages that are planned
but not built belong in a blueprint under `blueprints/`.

## Document map

| Document | Implemented by |
|---|---|
| `model-selection.md` | `RoutingEngine.select` in `services/ai/routing.ts` |
| `provider-routing.md` | `services/ai/index.ts`, `services/ai/routing.ts` |
| `error-handling.md` | `services/ai/errors.ts` |

## Known gaps in the implementation

These are real defects in the code this folder documents, recorded so the
documentation does not overstate what works:

- `streamWithFallback` in `services/ai/routing.ts` ignores the fallback
  chain and delegates straight to the primary model. Streaming has no
  fallback even though the routing decision computes one.
- `executeWithFallback` retries against the same adapter with a different
  alias, so a fallback to a different provider cannot work.
- No telemetry. Latency and token counts are computed per request and
  then discarded.

## Not built

Workflow orchestration, an event system, background jobs, a scheduler,
observability and tool execution are product goals, not code.

## AI placement contract

- What belongs here: documentation of runtime code that exists, and
  honest records of where it falls short.
- What never belongs here: application code, framework files, provider SDK
  code, secrets, or specifications for unbuilt stages.
- Owning AI agent: Codex. Collaborating: Claude, Fable.
- Governing docs: `.ai/shared/ai-first-philosophy.md`,
  `docs/decisions/0004-runtime-operating-system.md`.
