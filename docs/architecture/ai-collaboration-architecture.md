# AI Collaboration Architecture

NOVUS OS is designed for autonomous collaboration between multiple AI agents and human reviewers.

## Objective

The repository should explain itself well enough that a future agent can:

- Identify the correct owner for a file.
- Understand what belongs in a folder.
- Avoid placing code in the wrong layer.
- Find the relevant blueprint, ADR or template.
- Continue work without previous chat context.

## Agent Ownership Matrix

| Area | Owning Agent | Collaborating Agents |
| --- | --- | --- |
| `.ai/` | Codex | Claude, Fable, QA |
| `.ai/agents/` | Codex | Claude, Fable, QA, future AI agents |
| `.ai/handoffs/` | Codex | Claude, Fable, QA, future AI agents |
| `.ai/intelligence/` | Codex | Claude, Fable, QA |
| `.ai/runtime/` | Codex | Claude, Fable, QA |
| `.github/` | Codex | QA, Fable |
| `app/` | Fable | Codex, QA, Claude |
| `components/` | Fable | Codex, QA |
| `lib/` | Codex | Fable, QA |
| `services/` | Fable | Codex, QA, Claude |
| `database/` | Codex | Fable, QA, Claude |
| `hooks/` | Fable | Codex, QA |
| `providers/` | Fable | Codex, QA |
| `context/` | Fable | Codex, QA |
| `store/` | Fable | Codex, QA |
| `styles/` | Fable | Codex, QA |
| `assets/` | Fable | Codex, Claude |
| `public/` | Fable | Codex, QA |
| `scripts/` | Codex | Fable, QA |
| `tests/` | QA | Codex, Fable |
| `docs/` | Codex | Claude, Fable, QA |
| `blueprints/` | Codex | Claude, Fable, QA |

## AI Readability Standard

Every major folder README should answer:

- Why this folder exists.
- What belongs here.
- What should never be placed here.
- Owning AI agent.
- Collaborating AI agents.
- Which docs or templates govern future work?

## Subfolder Inheritance Rule

Subfolders inherit the owning agent and collaborating agents from their nearest major parent unless their README explicitly overrides that ownership.

For example:

- `components/primitives/` inherits ownership from `components/`.
- `docs/security/` inherits ownership from `docs/`.
- `services/ai/` inherits ownership from `services/`.

Subfolder READMEs should still explain purpose, allowed contents and disallowed contents.

## Hidden Context Rule

If a module cannot be understood without chat history, update repository documentation before or during the change.

## GitHub-First Collaboration Rule

GitHub is the single source of truth for every AI agent. Agent-local state, prior chat context and unpushed local changes are not authoritative.

Every agent must:

- Pull latest changes before work.
- Read new ADRs, docs, blueprints and handoffs.
- Work within its documented responsibility.
- Commit and push completed work.
- Verify GitHub reflects the latest state.
- Leave a handoff for the next agent.
