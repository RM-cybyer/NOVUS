# Assets

The `assets/` folder stores source assets managed with the codebase.

## Responsibility

- Keep product-owned source assets organized.
- Separate source assets from public runtime assets.

## Subfolders

- `brand/`: Brand source assets.
- `fonts/`: Font source files when licensing permits.
- `icons/`: Source icons.
- `images/`: Source images.

## Rules

- Do not commit assets with unclear licensing.
- Prefer optimized public assets in `public/` only when runtime serving is needed.

## AI Placement Contract

- Why this folder exists: Preserve source assets separately from runtime-served assets.
- What belongs here: Source brand, icon, image and font assets with clear licensing.
- What never belongs here: Secrets, private user files, unlicensed assets, generated build output or runtime-only files.
- Owning AI agent: Fable.
- Collaborating AI agents: Codex, Claude.
- Governing docs: `docs/security/security-baseline.md` and future brand or asset ADRs.
