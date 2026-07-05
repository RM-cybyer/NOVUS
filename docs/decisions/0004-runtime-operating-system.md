# ADR 0004: Runtime Operating System

## Status

Accepted

## Context

The Intelligence Layer defines how NOVUS thinks, remembers, reasons and recommends. NOVUS also needs a definitive execution specification that explains how work moves through validation, context loading, memory retrieval, reasoning, decisions, provider routing, tools, updates, jobs, events and user-facing responses.

NOVUS is not an AI chatbot. NOVUS owns execution. External AI models are reasoning engines called by NOVUS through controlled runtime paths.

## Decision

Create `.ai/runtime/` as the executable architecture context for the NOVUS Runtime Operating System.

The Runtime Layer defines:

- Runtime overview and execution pipeline.
- Message lifecycle.
- Workflow orchestration.
- Context loading and memory retrieval.
- Reasoning pipeline and decision flow.
- Provider routing and model selection.
- Tool execution.
- Response processing.
- Memory, knowledge, goal and task updates.
- Event system.
- Background jobs and scheduler.
- Notifications.
- Observability and telemetry.
- Runtime security.
- Error handling.
- Performance, scalability and future runtime roadmap.

## AI Context Impact

Future AI agents must read `.ai/runtime/` before designing or implementing execution behavior.

No future implementation should allow UI, APIs, tools, providers, memory writes, graph updates or notifications to bypass the Workflow Orchestrator and runtime validation path.

## Alternatives Considered

- Let runtime behavior emerge during implementation. Rejected because hidden runtime behavior is unsafe for an AI-first multi-agent repository.
- Put runtime documentation only in `docs/architecture/`. Rejected because `.ai/runtime/` is executable context for AI agents and must be read with the AI operating system.
- Couple runtime flow directly to a framework. Rejected because no framework has been selected and runtime architecture should remain framework-neutral.

## Consequences

- Runtime implementation is blocked until framework, persistence, event system and testing ADRs exist.
- Every future execution path has a documentation source of truth.
- Tool execution, provider calls and memory writes require NOVUS-controlled validation.
- Event-driven architecture becomes the default runtime communication model.

## Follow-up

- Create runtime framework ADR.
- Create persistence ADR for runtime state, jobs, memory and graph updates.
- Create event system ADR.
- Create background job and scheduler ADR.
- Create runtime test strategy and failure-mode fixtures.
- Create an implementation blueprint for the first executable workflow slice.

