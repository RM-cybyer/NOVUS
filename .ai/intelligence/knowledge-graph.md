# Knowledge Graph

## Purpose

Define how NOVUS connects people, companies, projects, goals, finances, ideas, documents, tasks, meetings, assets, habits and decisions into an interconnected intelligence graph.

## Responsibilities

- Represent entities and relationships.
- Link memories to entities.
- Support context retrieval.
- Reveal dependencies and patterns.
- Help decision and recommendation modules reason across domains.

## Inputs

- User-created entities.
- Extracted entities from conversations and documents.
- Memory records.
- Tool results.
- Task, project, meeting and financial records once implemented.
- User-confirmed relationship updates.

## Outputs

- Entity records.
- Relationship records.
- Related context sets.
- Graph traversal results.
- Relationship confidence.
- Conflict or duplicate alerts.

## Interactions with Other Modules

- Context Builder retrieves graph context.
- Memory Engine stores entity-linked memory.
- Decision Engine evaluates connected consequences.
- Recommendation Engine identifies relevant opportunities and risks.
- Planning Engine maps goals to tasks and dependencies.
- Security module protects sensitive relationships.

## Future Scalability

The Knowledge Graph should support:

- Typed entities and relationships.
- Confidence scoring.
- Temporal relationships.
- Cross-domain reasoning.
- Duplicate resolution.
- User review and correction.
- Graph-based recommendations.

## AI Ownership

- Owning AI agent: Codex.
- Collaborating AI agents: Fable, QA, Claude.

## Engineering Considerations

- Graph edges should have provenance.
- Inferred relationships should be distinguishable from user-confirmed relationships.
- Sensitive relationships require access controls.
- The graph should support deletion and correction.
- Avoid creating entities from low-confidence extraction without review.

## Example Entities

- People.
- Companies.
- Projects.
- Goals.
- Expenses.
- Investments.
- Ideas.
- Documents.
- Tasks.
- Meetings.
- Assets.
- Habits.

## Example Relationships

- Person works at company.
- Goal depends on project.
- Expense affects budget.
- Investment supports financial goal.
- Meeting produced decision.
- Habit influences goal.
- Document references asset.
- Task advances project.

