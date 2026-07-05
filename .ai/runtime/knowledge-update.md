# Knowledge Update

## Purpose

Define how runtime updates the Knowledge Graph after validated workflow results.

## Responsibilities

- Identify entity and relationship update candidates.
- Distinguish inferred and user-confirmed graph updates.
- Detect duplicates and conflicts.
- Attach provenance to graph changes.
- Emit graph update events.

## Inputs

- Validated response.
- Memory update candidates.
- Tool results.
- Conversation summary.
- Existing graph entities.
- User confirmations.

## Outputs

- Entity update decision.
- Relationship update decision.
- Duplicate or conflict alert.
- KnowledgeGraphUpdated event.
- KnowledgeUpdateSkipped event.

## Runtime Interactions

- Memory Update may produce entity-linked records.
- Goal Tracking and Task Generation may add graph relationships.
- Context Loading later retrieves graph updates.
- Security Runtime protects sensitive relationships.

## Future Scalability

Knowledge Update should support graph maintenance jobs, relationship confidence, temporal relationships, user review and cross-domain graph reasoning.

## AI Ownership

- Owning AI agent: Codex.
- Collaborating AI agents: Fable, QA, Claude.

## Engineering Considerations

- Inferred relationships should not be treated as confirmed facts.
- Every graph update should preserve provenance.
- Sensitive entities require access controls.
- Duplicate entities should be resolved before broad graph expansion.

## Example Graph Updates

- Link a meeting to a decision.
- Link a task to a goal.
- Link a company to a project.
- Link an expense to a budget.
- Link a habit to a life goal.

