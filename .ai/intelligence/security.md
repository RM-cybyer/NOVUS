# Intelligence Security

## Purpose

Define security, privacy and safety expectations for the NOVUS Intelligence Layer.

## Responsibilities

- Protect user data before provider execution.
- Minimize sensitive context.
- Govern memory writes and retrieval.
- Control tool use.
- Prevent provider lock-in from becoming a security risk.
- Support auditability for high-stakes decisions.

## Inputs

- User data sensitivity classification.
- Workflow type.
- Context packet.
- Memory records.
- Tool permissions.
- Provider and model policy.
- Security baseline.

## Outputs

- Allowed or blocked provider execution.
- Redacted or minimized context.
- Tool permission decision.
- Memory write policy decision.
- Security audit event when required.
- User-facing safety explanation when needed.

## Interactions with Other Modules

- Context Builder applies minimization.
- Provider Layer enforces provider restrictions.
- AI Registry blocks disallowed models.
- Tool Calling gates sensitive actions.
- Memory Engine protects sensitive memories.
- Decision Engine applies caution in high-stakes areas.
- Recommendation Engine communicates uncertainty.

## Future Scalability

Security should support:

- Data classification.
- Policy-driven provider routing.
- Regional data constraints.
- Audit logs.
- User memory controls.
- Secret scanning.
- Abuse detection.
- Compliance review.

## AI Ownership

- Owning AI agent: Codex.
- Collaborating AI agents: QA, Fable, Claude.

## Engineering Considerations

- Provider credentials must never be committed.
- Sensitive context should be sent only when required.
- Model outputs should be treated as untrusted until evaluated.
- Financial and life decisions should include assumptions and uncertainty.
- Tool actions that mutate external systems require confirmation.
- Users should be able to correct or delete memory.

## Example Sensitive Context

- Personal identity details.
- Financial accounts and transactions.
- Business strategy.
- Relationship information.
- Health-adjacent habits or life details.
- Private documents.
- Authentication tokens or credentials.

