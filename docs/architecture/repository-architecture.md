# Repository Architecture

This document defines the baseline NOVUS OS repository structure. It should be updated whenever top-level ownership or folder responsibilities change.

NOVUS OS is AI-first. The repository structure must be readable by humans and by autonomous AI agents.

## Root Layout

```text
NOVUS/
  .ai/
    agents/
  .github/
  app/
  components/
  lib/
  services/
  database/
  hooks/
  providers/
  context/
  store/
  styles/
  assets/
  public/
  scripts/
  tests/
  docs/
  blueprints/
```

## Folder Responsibilities

| Folder | Responsibility |
| --- | --- |
| `.ai/` | Permanent AI-agent context, shared instructions, GitHub-first agent manuals and agent-specific operating notes. |
| `.github/` | GitHub workflows, pull request templates and issue templates. |
| `app/` | Application routes only after a framework is selected. |
| `components/` | Reusable UI components after UI implementation begins. |
| `lib/` | Shared utilities, configuration, constants, validation, logging and common helpers. |
| `services/` | External service integrations such as auth, email, storage, notifications, calendar, AI APIs and third-party APIs. |
| `database/` | Schema, policies, functions, seeds and migrations. |
| `hooks/` | Reusable client hooks after a frontend runtime exists. |
| `providers/` | Application-level providers and dependency wiring. |
| `context/` | Shared application context modules. |
| `store/` | Client or server state stores after state strategy is documented. |
| `styles/` | Global styles, design tokens and style utilities. |
| `assets/` | Source assets managed with the codebase. |
| `public/` | Static public assets served directly by the runtime. |
| `scripts/` | Developer, CI, maintenance and release scripts. |
| `tests/` | Automated tests, fixtures and test utilities. |
| `docs/` | Engineering documentation, architecture notes and runbooks. |
| `blueprints/` | Design and implementation blueprints for large features or architectural changes. |

## Documentation Requirement

Every folder must include a README explaining:

- Why the folder exists.
- What belongs there.
- What does not belong there.
- Which AI agent owns it.
- Which AI agents collaborate with it.
- Which docs or templates govern future work.
- When documentation or an ADR is required.

## Change Policy

- Add new top-level folders only when an existing responsibility does not fit.
- Document top-level structure changes in this file.
- Record boundary-changing decisions in `docs/decisions/`.
- Keep route, UI, shared utility, integration, persistence and documentation responsibilities separated.
- Preserve AI-readable context in each new module.
- Prefer project-local conventions over new abstractions unless they reduce real complexity.
