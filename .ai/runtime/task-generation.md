# Task Generation

## Purpose

Define how runtime produces task candidates from decisions, recommendations and plans.

## Responsibilities

- Identify actionable next steps.
- Convert recommendations into task candidates.
- Connect tasks to goals, projects and knowledge graph entities.
- Require user confirmation before creating tasks in external systems.
- Emit task events.

## Inputs

- Recommendation output.
- Planning output.
- Goal context.
- Project context.
- User preferences.
- Tool permissions.

## Outputs

- Task candidate list.
- Task priority signal.
- Task dependency notes.
- TaskCreated event when confirmed and executed.
- TaskGenerationSkipped event.

## Runtime Interactions

- Planning Engine defines task structure.
- Recommendation Generation suggests next steps.
- Tool Execution may create tasks through approved tools.
- Knowledge Update links tasks to graph entities.
- Notifications may remind users about tasks.

## Future Scalability

Task Generation should support task integrations, recurring tasks, project templates, team assignment and enterprise workflow tools.

## AI Ownership

- Owning AI agent: Codex.
- Collaborating AI agents: Fable, QA, Claude.

## Engineering Considerations

- Task candidates are not created tasks until NOVUS executes an approved action.
- Mutating task systems requires confirmation.
- Task generation should avoid overwhelming users.
- Task priority should be explainable.

## Example Task Sources

- Decision follow-up.
- Goal milestone.
- Meeting action item.
- Financial review.
- Business opportunity.
- Habit improvement.

