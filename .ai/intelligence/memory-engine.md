# Memory Engine

## Purpose

Define how NOVUS remembers, retrieves, evolves and protects user context over time.

## Responsibilities

- Manage short-term memory.
- Manage long-term memory.
- Represent user profile, goals, projects, business, finances, relationships, habits, knowledge, preferences, decisions and patterns.
- Retrieve relevant context for workflows.
- Update memory after meaningful events.
- Support memory review, correction and deletion.

## Inputs

- Conversation events.
- Explicit user facts.
- User preferences.
- Decisions and outcomes.
- Projects and goals.
- Financial and business context when approved.
- Relationship and habit signals.
- Knowledge graph updates.

## Outputs

- Retrieved memory set.
- Memory relevance scores.
- Memory update candidates.
- Memory conflict alerts.
- Memory summaries.
- Deletion or correction requests.

## Interactions with Other Modules

- Context Builder requests relevant memory.
- Knowledge Graph links memory to entities.
- Decision Engine uses memory for personalization.
- Recommendation Engine uses preferences and patterns.
- Security module governs sensitive memory.
- Conversation Lifecycle determines when memory should update.

## Future Scalability

The Memory Engine should support:

- User-controlled memory visibility.
- Memory decay and reinforcement.
- Domain-specific memory stores.
- Conflict resolution.
- Versioned memory history.
- Cross-device continuity.
- Privacy-preserving retrieval.

## AI Ownership

- Owning AI agent: Codex.
- Collaborating AI agents: Claude, Fable, QA.

## Engineering Considerations

- Memory writes should be explicit and auditable.
- Sensitive memories require stronger controls.
- Not every conversation detail should become long-term memory.
- Memory retrieval should be relevance-based, not exhaustive.
- User correction must override inferred memory.

## Memory Categories

- Short-term memory: Current conversation and active workflow state.
- Long-term memory: Durable facts, preferences, decisions and patterns.
- User profile: Identity-level preferences and stable context.
- Goals: Desired outcomes and priorities.
- Projects: Active commitments and workstreams.
- Business: Companies, clients, revenue, operations and strategy.
- Finances: Expenses, investments, budgets and financial goals.
- Relationships: People and connection context.
- Habits: Repeated behaviors and routines.
- Knowledge: User-specific facts and learned context.
- Preferences: Communication, planning and decision preferences.
- Decisions: Past choices, rationale and outcomes.
- Patterns: Repeated behaviors, risks and opportunities.

## Memory Evolution

Memory should evolve through:

- Capture.
- Classification.
- Relevance scoring.
- Consolidation.
- Conflict detection.
- User correction.
- Decay or archival.

