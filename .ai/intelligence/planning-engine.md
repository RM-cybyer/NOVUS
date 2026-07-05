# Planning Engine

## Purpose

Define how NOVUS converts goals, decisions and recommendations into structured plans without implementing task logic in this phase.

## Responsibilities

- Break goals into milestones.
- Map decisions to next actions.
- Identify dependencies.
- Sequence work.
- Detect blockers.
- Connect plans to projects, tasks, people and deadlines.

## Inputs

- User goals.
- Decision Engine output.
- Recommendation Engine output.
- Knowledge graph dependencies.
- Memory records.
- Time, budget and priority constraints.

## Outputs

- Plan outline.
- Milestones.
- Dependencies.
- Candidate tasks.
- Risk and blocker list.
- Review cadence.

## Interactions with Other Modules

- Decision Engine defines what should happen.
- Recommendation Engine explains why and what alternatives exist.
- Knowledge Graph maps dependencies.
- Memory Engine stores goals and plan evolution.
- Workflow Engine coordinates planning conversations.

## Future Scalability

The Planning Engine should support:

- Multi-project planning.
- Business planning.
- Financial planning.
- Habit planning.
- Goal tracking.
- Plan revision after new information.
- Calendar and task system integrations.

## AI Ownership

- Owning AI agent: Codex.
- Collaborating AI agents: Claude, Fable, QA.

## Engineering Considerations

- Plans should stay editable by the user.
- Plans should preserve rationale.
- Planning should not assume tasks or calendars exist before integrations are implemented.
- Plans should connect to measurable outcomes when possible.

## Example Plan Structure

- Goal.
- Current state.
- Desired outcome.
- Milestones.
- Dependencies.
- Risks.
- Next actions.
- Review date.

