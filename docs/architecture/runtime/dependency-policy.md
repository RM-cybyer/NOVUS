# Dependency Policy

## Purpose

Define how NOVUS approves and manages dependencies.

## Responsibilities

- Prevent unnecessary dependency growth.
- Keep supply-chain risk visible.
- Require rationale for every dependency.
- Preserve architecture boundaries.

## Dependency Approval Rules

Before adding a dependency:

1. Confirm it supports the official runtime stack.
2. Document why native capability is insufficient.
3. Check license compatibility.
4. Check maintenance status.
5. Check security posture.
6. Check bundle or runtime impact.
7. Add or update tests when behavior depends on it.

## Official Dependencies

The stack in `tech-stack.md` is approved for future installation, but packages must still be introduced in a focused implementation commit with lockfile and verification.

## Rejection Criteria

Reject a dependency when:

- It duplicates an approved dependency.
- It bypasses the Runtime or Intelligence Layer.
- It adds provider lock-in where an adapter should exist.
- It lacks maintenance or has unclear licensing.
- It is speculative.

## Supply-Chain Rules

- Use pnpm lockfile once package installation begins.
- Review install scripts and transitive risk for sensitive packages.
- Pin package manager version through `packageManager` once `package.json` exists.
- Do not commit credentials or registry tokens.

## Non-Goals

- No dependencies are installed by this policy.
- No lockfile is created by this policy.

