# Security Policy

NOVUS OS has no application runtime in this phase, but security expectations start at the repository layer.

## Security Baseline

- Never commit secrets, tokens, keys, credentials or private connection strings.
- Use safe placeholder values in documentation and templates.
- Treat authentication, authorization, privacy and tenant isolation as architecture topics that require blueprints.
- Document security-sensitive decisions in `docs/security/` and `docs/decisions/`.

## Reporting

Until a formal vulnerability disclosure process exists, security issues should be tracked as private engineering work with enough detail to reproduce and verify the issue.

## Future Requirements

Before product code ships, the repository should define:

- Dependency vulnerability checks
- Secret scanning
- Security review requirements
- Authentication and authorization standards
- Data retention and privacy controls

