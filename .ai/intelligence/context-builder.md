# Context Builder

## Purpose

Define how NOVUS assembles the right context for reasoning without overloading models or leaking unnecessary user data.

## Responsibilities

- Build workflow-specific context packets.
- Retrieve relevant memory and graph entities.
- Include user goals, preferences and constraints.
- Exclude irrelevant or sensitive data.
- Preserve source attribution for context items.

## Inputs

- User message.
- Conversation state.
- Intent and workflow type.
- Memory retrieval results.
- Knowledge graph entities.
- User profile.
- Tool results.
- Security policy.

## Outputs

- Context packet.
- Context source list.
- Relevance rationale.
- Omitted-context notes when needed.
- Sensitivity classification.

## Interactions with Other Modules

- Workflow Engine requests context.
- Memory Engine provides relevant memory.
- Knowledge Graph provides entities and relationships.
- Security module applies minimization.
- Prompt Engine receives final context packet.
- Decision Engine uses context for trade-off analysis.

## Future Scalability

The Context Builder should support:

- Domain-specific context policies.
- Retrieval scoring.
- Context compression.
- Source citations.
- Multi-turn continuity.
- Context budgets by model capability.
- User-controlled memory inclusion.

## AI Ownership

- Owning AI agent: Codex.
- Collaborating AI agents: Fable, QA, Claude.

## Engineering Considerations

- Context should be structured before it reaches prompts.
- Context should include provenance.
- Sensitive data should be minimized.
- Irrelevant memory should be excluded even when available.
- Context construction should be testable with fixtures.

## Example Context Packet Contents

- Current user request.
- Current goal.
- Relevant project.
- Relevant people or companies.
- Recent decisions.
- Financial constraints if needed.
- User preferences.
- Applicable safety limits.

