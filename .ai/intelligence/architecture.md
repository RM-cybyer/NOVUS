# Intelligence Layer Architecture

## Purpose

Define the system architecture for NOVUS intelligence: how user intent becomes context, reasoning, decisions, recommendations, memory updates and user-facing responses.

## Responsibilities

- Establish intelligence module boundaries.
- Keep NOVUS in control of orchestration and reasoning flow.
- Separate provider execution from NOVUS decision ownership.
- Document the architecture future implementation must follow.

## Inputs

- User input.
- Conversation state.
- Memory records.
- Knowledge graph records.
- Model capability registry.
- Tool availability and tool results.
- Security and privacy constraints.

## Outputs

- Selected workflow path.
- Context packet.
- Provider request plan.
- Reasoning trace summary.
- Decision output.
- Recommendation output.
- Memory and graph update candidates.

## Interactions with Other Modules

- Workflow Engine coordinates the lifecycle.
- Context Builder creates the working context.
- Memory Engine retrieves and updates user memory.
- Knowledge Graph connects entities and relationships.
- Decision Engine evaluates options.
- Prompt Engine prepares provider-facing instructions.
- AI Provider Layer executes model calls.
- Recommendation Engine prepares non-restrictive guidance.

## Future Scalability

The architecture should support multiple specialized engines without collapsing into one large service:

- Domain reasoning for finance, business and life planning.
- Model routing by capability.
- Multi-step tool-assisted workflows.
- Background memory consolidation.
- Auditable decision trails.

## AI Ownership

- Owning AI agent: Codex.
- Collaborating AI agents: Claude, Fable, QA.

## Engineering Considerations

- The Intelligence Layer should be implemented through explicit interfaces after runtime selection.
- Provider output should never be treated as final without NOVUS evaluation.
- Sensitive user data should be minimized before provider execution.
- All persistent memory writes should be intentional, explainable and reversible when required.

## Example Flow

```text
User
  -> Intent Detection
  -> Context Builder
  -> Memory Retrieval
  -> Knowledge Graph
  -> Decision Engine
  -> Prompt Engine
  -> AI Provider Layer
  -> Response Evaluation
  -> Recommendation Engine
  -> Memory Update
  -> UI Response
```

