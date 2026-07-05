# Intelligence Layer

The Intelligence Layer is the architectural brain of NOVUS OS.

NOVUS is not an AI wrapper. NOVUS owns the reasoning process, memory model, decision workflow and recommendation philosophy. External AI models are reasoning engines that NOVUS orchestrates through documented provider boundaries.

## Purpose

Define how NOVUS thinks, remembers, reasons, plans, recommends and evaluates decisions across life, business and financial contexts.

## Responsibilities

- Define the AI operating layer before implementation.
- Describe the provider abstraction and model registry.
- Document memory, knowledge graph, context, reasoning and decision workflows.
- Preserve AI-readable architecture for future autonomous agents.
- Prevent direct product coupling to any single model provider.

## Inputs

- User messages and explicit user goals.
- User profile and preferences.
- Short-term and long-term memory.
- Knowledge graph entities and relationships.
- Documents, tasks, projects, financial records and business context once implemented.
- Tool results and external service outputs once approved.

## Outputs

- Context packets for reasoning.
- Prompt plans for provider execution.
- Decision records and recommendation candidates.
- Memory updates.
- Knowledge graph updates.
- Evaluated user-facing responses.

## Interactions with Other Modules

- `.ai/shared/`: Shared AI operating principles.
- `.ai/codex/`: Repository Guardian review and architecture enforcement.
- `services/ai/`: Future implementation boundary for provider adapters.
- `lib/`: Future shared utilities for validation, configuration, logging and evaluation.
- `database/`: Future persistence for memories, graph entities and decisions.
- `docs/security/`: Security and privacy governance.

## Future Scalability

The Intelligence Layer should support:

- Multiple providers.
- Multiple model categories.
- Model fallback chains.
- User-specific memory evolution.
- Multi-step workflows.
- Domain-specific reasoning engines.
- Auditable decision and recommendation trails.

## AI Ownership

- Owning AI agent: Codex.
- Collaborating AI agents: Claude for strategic product direction, Fable for future implementation, QA for validation and safety checks.

## Engineering Considerations

- No direct dependency on OpenAI, Anthropic, NVIDIA, Google, OpenRouter, xAI or any future provider.
- Provider communication must go through the AI Provider Layer.
- No business logic is implemented in this phase.
- Documentation is executable context for future AI agents.
- Every future implementation module must map back to one of these architecture documents.

## Document Map

- `architecture.md`: System architecture and boundaries.
- `providers.md`: AI Provider Layer abstraction.
- `models.md`: Model categories and model capabilities.
- `registry.md`: AI Registry design.
- `workflow-engine.md`: Workflow orchestration.
- `context-builder.md`: Context assembly.
- `reasoning-engine.md`: Reasoning process.
- `decision-engine.md`: Decision logic architecture.
- `memory-engine.md`: Memory architecture.
- `knowledge-graph.md`: Entity and relationship model.
- `recommendation-engine.md`: Recommendation philosophy.
- `planning-engine.md`: Plans, goals and execution paths.
- `tool-calling.md`: Tool boundary and tool governance.
- `prompt-engine.md`: Prompt construction and governance.
- `embeddings.md`: Embedding architecture.
- `conversation-lifecycle.md`: End-to-end conversation flow.
- `security.md`: AI safety, privacy and data protection.
- `future-roadmap.md`: Phased evolution.

## AI Placement Contract

- Why this folder exists: Define the AI operating layer that future agents and engineers must follow before implementing intelligence features.
- What belongs here: Architecture, responsibilities, workflows, safety rules and future implementation contracts for NOVUS intelligence.
- What never belongs here: Provider SDK code, application code, UI, API handlers, secrets, prompts containing real user data or business logic implementation.
- Owning AI agent: Codex.
- Collaborating AI agents: Claude, Fable, QA.
- Governing docs: `.ai/shared/ai-first-philosophy.md`, `docs/architecture/ai-collaboration-architecture.md` and `docs/decisions/0003-intelligence-layer-architecture.md`.

