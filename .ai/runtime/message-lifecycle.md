# Message Lifecycle

## Purpose

Define what happens when a user sends a message to NOVUS.

## Responsibilities

- Validate user input.
- Create execution context.
- Route the message into the correct workflow.
- Preserve conversation continuity.
- Determine which side effects are allowed.
- Return a validated response.

## Inputs

- Raw user message.
- User session state.
- Conversation history.
- User permissions.
- Runtime configuration.

## Outputs

- Validated message envelope.
- Intent classification.
- Runtime execution context.
- Workflow result.
- UI response payload.
- Conversation completion event.

## Runtime Interactions

- Input validation gates the message.
- Workflow Orchestrator owns message execution.
- Context Loading supplies user state.
- Reasoning Pipeline and Decision Flow process the message.
- Response Processing validates the model and tool outputs.

## Future Scalability

The lifecycle should support streaming, resumable messages, multi-device sessions, offline queues and enterprise audit trails.

## AI Ownership

- Owning AI agent: Codex.
- Collaborating AI agents: Fable, QA.

## Engineering Considerations

- Raw input should not directly reach providers.
- Message state should include correlation identifiers when implemented.
- Runtime should distinguish user-visible response state from internal execution state.
- Failed messages should preserve enough context for retry or explanation.

## Example Stages

- MessageReceived.
- MessageValidated.
- IntentDetected.
- WorkflowStarted.
- ContextBuilt.
- ResponseValidated.
- ConversationFinished.

