# Runtime Operating System

The Runtime Operating System defines how NOVUS executes.

The Intelligence Layer explains how NOVUS thinks. The Runtime Layer explains how NOVUS moves work through validation, context, reasoning, decisions, tools, memory, events, background jobs and user-facing responses.

NOVUS is not an AI chatbot. NOVUS owns execution. External AI models are reasoning engines called by NOVUS through controlled runtime paths.

## Purpose

Document the execution kernel of NOVUS before implementation begins.

## Responsibilities

- Define every execution path in the platform.
- Explain how user messages become validated responses, memory updates, knowledge updates, tasks and notifications.
- Define runtime orchestration, event flow, scheduling, background jobs, observability, telemetry, errors, performance and scalability.
- Keep future implementation provider-neutral and framework-neutral.

## Inputs

- User messages.
- Runtime execution context.
- User profile, goals, business context and financial context.
- Memory and knowledge graph retrieval results.
- Intelligence Layer decisions and provider outputs.
- Tool requests and tool results.
- Scheduler events and background job triggers.

## Outputs

- UI response packages.
- Runtime events.
- Validated tool execution results.
- Memory update decisions.
- Knowledge graph update decisions.
- Goal, task and notification updates.
- Observability and telemetry records.

## Runtime Interactions

- `.ai/intelligence/`: Defines reasoning, memory, decisions, recommendations and provider abstraction.
- `services/ai/`: Future provider adapter implementation boundary.
- `database/`: Future persistence boundary for runtime state, memory, graph, events and jobs.
- `tests/`: Future workflow, event and failure-mode validation.
- `docs/security/`: Security and privacy governance.

## Future Scalability

The Runtime Layer should support multi-user execution, background workflows, parallel stages, event-driven modules, multiple providers, enterprise deployment, plugins, marketplace workflows and multi-agent orchestration.

## AI Ownership

- Owning AI agent: Codex.
- Collaborating AI agents: Claude for runtime product direction, Fable for future implementation, QA for validation and reliability checks.

## Engineering Considerations

- No framework, SDK or dependency is introduced in this phase.
- Runtime stages should be explicit, observable and recoverable.
- AI models should never execute actions directly.
- NOVUS must validate, execute and record tool actions.
- Documentation is executable context for future implementation agents.

## Document Map

- `runtime-overview.md`: Runtime purpose and boundaries.
- `execution-pipeline.md`: End-to-end execution pipeline.
- `message-lifecycle.md`: User message lifecycle.
- `workflow-orchestrator.md`: Runtime orchestration.
- `context-loading.md`: Profile, goals, business and financial context loading.
- `memory-retrieval.md`: Memory retrieval stage.
- `reasoning-pipeline.md`: Runtime reasoning execution.
- `decision-flow.md`: Decision execution path.
- `provider-routing.md`: Provider routing stage.
- `model-selection.md`: Model selection stage.
- `tool-execution.md`: Tool validation and execution.
- `response-processing.md`: AI response validation and shaping.
- `memory-update.md`: Memory write execution.
- `knowledge-update.md`: Knowledge graph write execution.
- `recommendation-generation.md`: Runtime recommendation generation.
- `goal-tracking.md`: Goal progress execution.
- `task-generation.md`: Task creation flow.
- `event-system.md`: Event bus architecture.
- `background-jobs.md`: Asynchronous jobs.
- `notifications.md`: Notification execution.
- `scheduler.md`: Recurring execution.
- `observability.md`: Logs, metrics and traces.
- `telemetry.md`: Anonymous product analytics.
- `security-runtime.md`: Runtime security controls.
- `error-handling.md`: Failure and recovery model.
- `performance.md`: Performance architecture.
- `scalability.md`: Scalability architecture.
- `future-runtime.md`: Future roadmap.

## AI Placement Contract

- Why this folder exists: Define the runtime execution specification for NOVUS before any runtime code exists.
- What belongs here: Runtime architecture, execution stages, event contracts, orchestration rules, scheduling design and operational constraints.
- What never belongs here: Application code, framework files, provider SDK code, backend handlers, secrets, business logic implementation or UI implementation.
- Owning AI agent: Codex.
- Collaborating AI agents: Claude, Fable, QA.
- Governing docs: `.ai/shared/ai-first-philosophy.md`, `.ai/intelligence/README.md` and `docs/decisions/0004-runtime-operating-system.md`.

