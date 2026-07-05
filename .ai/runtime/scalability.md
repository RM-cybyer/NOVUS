# Scalability

## Purpose

Define how the NOVUS runtime can scale over time from early implementation to multi-user, multi-provider and enterprise use.

## Responsibilities

- Identify future scaling dimensions.
- Preserve modular runtime boundaries.
- Support multi-user isolation.
- Support multi-provider AI routing.
- Prepare for future plugins and marketplace workflows.
- Support future multi-agent execution.

## Inputs

- User growth.
- Workflow volume.
- Provider volume and reliability.
- Memory and graph growth.
- Background job load.
- Enterprise requirements.

## Outputs

- Scalability requirements.
- Partitioning candidates.
- Runtime boundary decisions.
- Future ADR needs.
- Capacity planning inputs.

## Runtime Interactions

- Event System supports decoupling.
- Background Jobs and Scheduler support async scaling.
- Provider Routing supports multi-provider execution.
- Observability supplies capacity signals.
- Security Runtime enforces tenant and user isolation.

## Future Scalability

The runtime should support:

- Multi-user architecture.
- Future cloud deployment.
- Multi-provider AI.
- Future multi-agent support.
- Future enterprise version.
- Future plugins.
- Future marketplace.

## AI Ownership

- Owning AI agent: Codex.
- Collaborating AI agents: Claude, Fable, QA.

## Engineering Considerations

- User data isolation is a first-order architecture requirement.
- Event schemas should be versioned before external integrations.
- Provider routing should not assume one vendor.
- Plugin architecture should require permission and sandboxing.
- Enterprise features should not compromise core user privacy.

## Example Scaling Questions

- How does each user get isolated memory and graph state?
- Which runtime stages can run asynchronously?
- Which workflows need priority queues?
- How do plugins register tools safely?
- How are provider outages isolated?

