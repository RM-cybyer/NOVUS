# Conversation Lifecycle

## Purpose

Define the complete lifecycle of a NOVUS conversation from user input to response, evaluation and memory update.

## Responsibilities

- Preserve continuity across turns.
- Route each conversation through intelligence modules.
- Evaluate responses before user delivery.
- Update memory and graph only when appropriate.
- Keep user decisions and preferences visible to future workflows.

## Inputs

- User message.
- Existing conversation state.
- User profile.
- Active goals or projects.
- Memory and graph context.
- Available models and tools.
- Security constraints.

## Outputs

- Intent classification.
- Context packet.
- Reasoning and decision outputs.
- Provider response.
- Evaluated recommendation.
- Memory update decision.
- User-facing response package.

## Interactions with Other Modules

- Workflow Engine coordinates the lifecycle.
- Context Builder prepares context.
- Memory Engine retrieves and updates memory.
- Knowledge Graph resolves related entities.
- Decision Engine frames choices.
- Prompt Engine prepares provider request.
- Provider Layer executes model call.
- Recommendation Engine shapes final guidance.
- Security module gates sensitive operations.

## Future Scalability

The lifecycle should support:

- Multi-turn workflows.
- Background follow-up.
- User approval gates.
- Proactive insights.
- Cross-session continuity.
- Conversation summaries.
- Audit trails for sensitive decisions.

## AI Ownership

- Owning AI agent: Codex.
- Collaborating AI agents: Fable, QA, Claude.

## Engineering Considerations

- The UI should not bypass the lifecycle.
- Memory updates should happen after evaluation, not before.
- Sensitive requests may require reduced context or refusal paths.
- Response quality should be evaluated before recommendations are shown.
- Conversation state should be recoverable after interruption.

## Canonical Lifecycle

```text
User
  -> Intent Detection
  -> Context Builder
  -> Memory Retrieval
  -> Knowledge Graph
  -> Decision Engine
  -> Prompt Engine
  -> AI Provider
  -> Response Evaluation
  -> Recommendation Engine
  -> Memory Update
  -> UI Response
```

