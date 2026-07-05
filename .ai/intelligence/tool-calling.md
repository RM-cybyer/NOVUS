# Tool Calling

## Purpose

Define how NOVUS should govern tool use by AI workflows without implementing tools in this phase.

## Responsibilities

- Define tool eligibility.
- Control tool permissions.
- Keep tools behind explicit boundaries.
- Validate tool inputs and outputs.
- Prevent models from performing unsafe actions directly.
- Record tool use for audit when needed.

## Inputs

- Workflow intent.
- User permission.
- Available tool registry.
- Context packet.
- Security policy.
- Model tool-use capability.

## Outputs

- Tool call plan.
- Tool permission decision.
- Tool result.
- Tool error category.
- Audit event when required.

## Interactions with Other Modules

- Workflow Engine decides whether tools are needed.
- Prompt Engine communicates tool availability to models.
- AI Provider Layer executes model tool-use protocols when supported.
- Security module gates sensitive actions.
- Decision Engine uses tool results after validation.

## Future Scalability

Tool Calling should support:

- Read-only tools.
- Write tools with confirmation.
- Financial data tools.
- Business system tools.
- Calendar and task tools.
- Document search tools.
- Tool sandboxing.
- Audit trails.

## AI Ownership

- Owning AI agent: Codex.
- Collaborating AI agents: Fable, QA.

## Engineering Considerations

- Models should never execute irreversible actions without user confirmation.
- Tool schemas should be validated.
- Tool outputs should be treated as untrusted until checked.
- Tool access should be scoped to the workflow.
- Sensitive tools require stronger logging and permission controls.

## Example Tool Categories

- Search.
- Retrieval.
- Calendar read.
- Task read.
- Financial data read.
- Document analysis.
- Notification draft.
- Action tools requiring confirmation.

