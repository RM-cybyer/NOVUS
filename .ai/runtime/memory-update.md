# Memory Update

## Purpose

Define how runtime writes or revises memory after a workflow completes enough evaluation.

## Responsibilities

- Identify memory update candidates.
- Classify memory type.
- Check sensitivity and user control policy.
- Detect conflicts with existing memory.
- Write, revise, archive or reject memory updates.
- Emit memory update events.

## Inputs

- Validated response.
- Conversation summary.
- User-confirmed facts.
- Decision Flow output.
- Tool results.
- Existing memory.
- Security policy.

## Outputs

- Memory update decision.
- Memory write record.
- Memory conflict alert.
- MemoryUpdated event.
- MemoryUpdateSkipped event.

## Runtime Interactions

- Response Processing must complete before memory update.
- Memory Engine defines memory categories.
- Knowledge Update may link new memory to graph entities.
- Security Runtime restricts sensitive writes.
- Observability records memory update duration and failures.

## Future Scalability

Memory updates should support user review, automatic consolidation, conflict resolution, decay, archival and memory export or deletion.

## AI Ownership

- Owning AI agent: Codex.
- Collaborating AI agents: Fable, QA, Claude.

## Engineering Considerations

- Not every conversation detail belongs in memory.
- User correction overrides inferred memory.
- Sensitive memories require stronger policy controls.
- Memory writes should be auditable.
- Failed memory updates should not block the UI response unless required by workflow integrity.

## Example Memory Update Types

- User preference.
- Goal change.
- Project update.
- Decision made.
- Financial constraint.
- Relationship context.
- Habit pattern.

