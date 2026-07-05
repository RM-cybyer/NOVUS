# Public

The `public/` folder is reserved for static assets served directly by the application runtime.

## Responsibility

- Store public runtime assets after a framework is selected.
- Keep served assets separate from source assets in `assets/`.

## Rules

- Do not place secrets or private files here.
- Do not add public assets before the runtime serving model is known.
- Optimize files before serving them publicly.

## AI Placement Contract

- Why this folder exists: Hold static assets served directly by the application runtime.
- What belongs here: Public runtime assets after serving rules are documented.
- What never belongs here: Secrets, private data, source-only assets, unlicensed files or generated build output.
- Owning AI agent: Fable.
- Collaborating AI agents: Codex, QA.
- Governing docs: `docs/security/security-baseline.md` and future runtime ADRs.
