# NOVUS OS

NOVUS OS is the official repository for the AI Life, Business and Financial Operating System.

This repository currently contains the engineering foundation only. It defines the repository architecture, documentation hierarchy, AI-agent operating model, governance process, templates and repository health workflow that future product work must follow.

No product runtime, UI, API, business logic, framework or dependency has been introduced in this phase.

NOVUS OS is AI-first. The repository is designed as an operating system for an AI software engineering team, with documentation treated as executable context for autonomous agents and human reviewers.

## Repository Contract

- Official repository: `https://github.com/RM-cybyer/NOVUS`
- Default branch: `main`
- Major features start with a blueprint in `blueprints/`.
- Architecture decisions are recorded in `docs/decisions/`.
- Repository architecture is documented in `docs/architecture/repository-architecture.md`.
- AI agents must read `.ai/shared/` and their agent-specific folder before changing files.

## Start Here

- AI context: `.ai/README.md`
- Agent manuals: `.ai/agents/README.md`
- AI-first philosophy: `.ai/shared/ai-first-philosophy.md`
- Intelligence Layer: `.ai/intelligence/README.md`
- Runtime Operating System: `.ai/runtime/README.md`
- AI collaboration architecture: `docs/architecture/ai-collaboration-architecture.md`
- Repository architecture: `docs/architecture/repository-architecture.md`
- Runtime technology architecture: `docs/architecture/runtime/README.md`
- Engineering standards: `docs/engineering/README.md`
- Contribution guide: `CONTRIBUTING.md`
- Security baseline: `SECURITY.md`
- Blueprint template: `blueprints/_template.md`

## Development Status

The official runtime stack is selected in `docs/architecture/runtime/`, but no framework files, package manifest, lockfile, dependencies or application code have been introduced yet.

Until package metadata is added, there are no install, build or test commands to run.

The only automated workflow in this phase is a repository health check that validates documentation and folder structure.

## GitHub-First Collaboration

GitHub is the single source of truth for Codex, Fable, Claude and future AI agents. Each agent must pull latest changes before work, push completed work after verification and leave a handoff documented by the manuals in `.ai/agents/`.
