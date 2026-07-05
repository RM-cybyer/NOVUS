# Tool Execution

## Purpose

Define how NOVUS executes tools safely.

The AI never performs actions directly. The AI requests tools. NOVUS validates them, executes them and records the results.

## Responsibilities

- Receive tool requests.
- Validate tool identity, permissions and inputs.
- Require user confirmation for sensitive or mutating actions.
- Execute tools through approved runtime boundaries.
- Record tool results and failures.
- Return validated tool output to the workflow.

## Inputs

- Tool request.
- Workflow context.
- User permission state.
- Tool registry metadata.
- Security policy.
- Confirmation status.

## Outputs

- Tool execution decision.
- Tool result.
- Tool failure category.
- Audit record when required.
- ToolExecuted event.

## Runtime Interactions

- Prompt Engine exposes available tools.
- AI Provider may return tool requests.
- Workflow Orchestrator gates execution.
- Security Runtime validates permissions.
- Response Processing checks tool results before user delivery.
- Observability records duration and failures.

## Future Scalability

Tool Execution should support read-only tools, write tools, confirmation flows, enterprise permissions, tool sandboxing and plugin-provided tools.

## AI Ownership

- Owning AI agent: Codex.
- Collaborating AI agents: Fable, QA.

## Engineering Considerations

- Tool inputs and outputs must be validated.
- Tool output should be treated as untrusted until checked.
- Irreversible actions require confirmation.
- Tool calls should be idempotent when retried.
- Tool execution records should not expose secrets.

## Example Tool Flow

```text
Model requests tool
  -> NOVUS validates tool and input
  -> NOVUS checks permission
  -> NOVUS requests confirmation if needed
  -> NOVUS executes tool
  -> NOVUS records result
  -> Workflow continues
```

