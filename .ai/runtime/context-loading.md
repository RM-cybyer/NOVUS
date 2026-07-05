# Context Loading

## Purpose

Define how runtime loads the user, profile, goals, business and financial context needed for execution.

## Responsibilities

- Load the minimum required context for the workflow.
- Separate profile, goals, business and financial loading.
- Respect privacy and permissions.
- Provide structured context to the Context Builder and reasoning stages.

## Inputs

- Workflow type.
- User identity.
- Conversation state.
- Requested domain.
- Permission policy.
- Context budget.

## Outputs

- Profile context.
- Goals context.
- Business context.
- Financial context.
- Context availability status.
- Context sensitivity classification.

## Runtime Interactions

- Message Lifecycle triggers context loading after validation.
- Memory Retrieval and Knowledge Graph retrieval enrich context.
- Security Runtime restricts sensitive context.
- Reasoning Pipeline receives loaded context through the context packet.

## Future Scalability

Context loading should support parallel loaders, caching, lazy loading, domain-specific loaders and user-level data isolation.

## AI Ownership

- Owning AI agent: Codex.
- Collaborating AI agents: Fable, QA.

## Engineering Considerations

- Load only context needed for the workflow.
- Financial and business context should require stronger controls.
- Context loaders should produce structured outputs, not prompt strings.
- Missing context should become a workflow signal, not an unhandled failure.

## Example Context Domains

- Profile Loader.
- Goals Loader.
- Business Context Loader.
- Financial Context Loader.
- Relationship Context Loader.
- Project Context Loader.

