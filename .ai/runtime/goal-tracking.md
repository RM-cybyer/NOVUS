# Goal Tracking

## Purpose

Define how runtime updates and evaluates user goals during workflows.

## Responsibilities

- Load active goals.
- Detect goal relevance.
- Update progress signals.
- Identify blockers.
- Connect decisions, tasks and recommendations to goals.
- Emit goal events.

## Inputs

- User goals.
- Decision Flow output.
- Recommendation output.
- Task Generation output.
- Memory updates.
- Knowledge graph relationships.

## Outputs

- Goal progress update.
- Goal blocker signal.
- Goal relevance map.
- GoalUpdated event.

## Runtime Interactions

- Context Loading loads goals.
- Decision Flow evaluates goal alignment.
- Recommendation Generation suggests goal-related next steps.
- Task Generation creates goal-linked task candidates.
- Memory Update stores meaningful goal changes.

## Future Scalability

Goal Tracking should support goal hierarchies, recurring reviews, progress analytics, shared goals and long-term outcome tracking.

## AI Ownership

- Owning AI agent: Codex.
- Collaborating AI agents: Claude, Fable, QA.

## Engineering Considerations

- Goal updates should not be inferred from weak signals without review.
- Users should control goal changes.
- Goal progress should be explainable.
- Goal history should support reflection and planning.

## Example Goal Signals

- Goal advanced.
- Goal blocked.
- Goal changed.
- Goal completed.
- Goal abandoned.
- New goal candidate detected.

