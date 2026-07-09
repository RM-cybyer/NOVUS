# AI Provider Layer

## Purpose

Define the provider-neutral AI architecture that connects the official runtime stack to the approved Intelligence Layer.

## Core Rule

No AI provider may be hardcoded into product logic. All providers connect through the AI Provider Layer.

## Supported Provider Families

The architecture must support adapters for:

- OpenAI.
- Anthropic.
- Google Gemini.
- NVIDIA NIM.
- Groq.
- OpenRouter.
- Future providers.

## Provider Registry

The Provider Registry stores provider metadata:

- Provider ID.
- Adapter type.
- Supported capabilities.
- Supported model categories.
- Regions and data handling notes.
- Credential requirements.
- Availability status.
- Security restrictions.

## Model Registry

The Model Registry stores model metadata:

- NOVUS model alias.
- Provider model identifier.
- Capability tags.
- Context window category.
- Latency and cost category.
- Tool support.
- Structured output support.
- Embedding support.
- Fallback eligibility.
- Safety restrictions.

## Routing Engine

The Routing Engine selects provider and model candidates from:

- Workflow type.
- Required reasoning depth.
- Context size.
- Data sensitivity.
- Tool requirements.
- Cost and latency targets.
- Provider health.

## Fallback Engine

The Fallback Engine handles:

- Provider outage.
- Rate limit.
- Timeout.
- Validation failure.
- Security policy block.

Fallback must preserve capability requirements. High-stakes financial or life reasoning must not silently fall back to weaker reasoning without workflow approval.

## Intelligence Modules

Provider execution supports but does not own:

- Context Builder.
- Prompt Engine.
- Tool Calling.
- Memory Engine.
- Knowledge Graph.
- Reasoning Engine.
- Decision Engine.
- Recommendation Engine.

These modules remain NOVUS-owned architecture, not provider-owned behavior.

## Runtime Flow

```text
Runtime Orchestrator
  -> Context Builder
  -> Prompt Engine
  -> Model Registry
  -> Provider Registry
  -> Routing Engine
  -> AI Provider Adapter
  -> Response Processing
  -> Decision or Recommendation modules
```

## Security Rules

- Provider credentials must stay in platform secrets.
- Provider adapters must not log sensitive prompts or responses by default.
- Sensitive workflows may restrict provider choice.
- Every provider response is untrusted until validated.

## Non-Goals

- No provider SDK is installed here.
- No provider adapter is implemented here.
- No API key or model ID is committed here.

