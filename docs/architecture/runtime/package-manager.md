# Package Manager

## Purpose

Define the official package manager for NOVUS.

## Decision

pnpm is the official package manager.

## Responsibilities

- Install and manage dependencies once implementation begins.
- Maintain deterministic dependency resolution through `pnpm-lock.yaml`.
- Support future workspace growth if NOVUS becomes a monorepo.

## Why pnpm

- Efficient disk usage.
- Fast installs.
- Strict dependency resolution that reduces accidental undeclared dependency usage.
- Workspace support for future scalability.

## Rules

- Do not mix npm, yarn, bun or pnpm lockfiles.
- Once package management begins, commit `pnpm-lock.yaml`.
- Use `pnpm` commands in documentation and CI.
- Pin the package manager version in `package.json` when package metadata is introduced.

## Future Commands

Commands will be documented only after `package.json` exists. Until then, this document defines the package manager decision only.

## Non-Goals

- No `package.json` is created here.
- No `pnpm-lock.yaml` is created here.
- No dependencies are installed here.

