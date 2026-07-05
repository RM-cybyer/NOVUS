# ADR 0003: Intelligence Layer Architecture

## Status

Accepted

## Context

NOVUS OS is not a chatbot and not an AI wrapper. Its objective is helping users make better decisions across life, business and financial domains.

The repository needs a definitive architecture for how NOVUS thinks, remembers, reasons, selects models, calls providers, evaluates decisions and produces recommendations before any implementation begins.

## Decision

Create `.ai/intelligence/` as the executable architecture context for the NOVUS Intelligence Layer.

The Intelligence Layer defines:

- Provider abstraction.
- AI Registry.
- Model categories and capabilities.
- Workflow orchestration.
- Context construction.
- Reasoning, decision, recommendation and planning engines.
- Memory and knowledge graph architecture.
- Tool-calling governance.
- Prompt governance.
- Embedding architecture.
- Conversation lifecycle.
- Intelligence security.
- Future roadmap.

NOVUS owns the reasoning process. External AI models are provider-neutral reasoning engines that NOVUS orchestrates.

## AI Context Impact

Future AI agents must read `.ai/intelligence/` before designing or implementing AI behavior.

No future implementation should call OpenAI, Anthropic, NVIDIA, Google, OpenRouter, xAI or another provider directly. Provider communication must go through the AI Provider Layer and model selection must go through the AI Registry.

## Alternatives Considered

- Implement provider-specific AI features first. Rejected because it would couple NOVUS to providers before architecture exists.
- Store intelligence docs in `docs/architecture/`. Rejected because `.ai/intelligence/` is executable context for AI agents and should be read as part of the AI operating system.
- Keep AI architecture implicit in prompts. Rejected because hidden context is not maintainable for multi-agent collaboration.

## Consequences

- AI implementation is blocked until provider, runtime, persistence and test decisions are documented.
- Future intelligence modules have a clear architecture source of truth.
- Provider lock-in is reduced.
- Memory, graph and recommendation behavior can be reviewed before code exists.

## Follow-up

- Create provider abstraction ADR before implementation.
- Create memory and knowledge graph persistence ADRs.
- Create model evaluation and safety test strategy.
- Create an implementation blueprint for the first intelligence slice.

