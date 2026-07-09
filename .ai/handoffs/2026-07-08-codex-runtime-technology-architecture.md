# Handoff: Codex Runtime Technology Architecture

## Session

- Date: 2026-07-08
- Agent: Codex
- Primary commit: `92fb6ae`
- Scope: Phase 4 official runtime and technology architecture.

## What Changed

- Created the official runtime technology architecture section under `docs/architecture/runtime/`.
- Created ADR 0007, accepting the official runtime framework and technology stack.
- Documented frontend, backend, database, authentication, storage, deployment, package manager, dependency, testing, performance, security and AI provider-layer architecture.
- Updated repository architecture, AI collaboration, dependency, testing, operations, contributing and workflow documentation to reference the runtime decision.
- Updated repository health workflow to require the new runtime architecture documentation.
- Marked the design-system runtime blocker as resolved by ADR 0007.

## Why It Changed

Fable's next implementation phases were blocked by unresolved runtime, package manager and deployment decisions. NOVUS now has a documented official technology architecture without introducing application code, dependencies, package metadata or framework files.

## Affected Files

- `docs/architecture/runtime/`
- `docs/decisions/0007-official-runtime-framework.md`
- `docs/architecture/README.md`
- `docs/architecture/repository-architecture.md`
- `docs/architecture/ai-collaboration-architecture.md`
- `docs/architecture/dependency-boundaries.md`
- `docs/testing/test-strategy.md`
- `docs/operations/release-process.md`
- `docs/engineering/workflow-overview.md`
- `docs/contributing/getting-started.md`
- `.ai/shared/engineering-principles.md`
- `.ai/codex/technical-debt-register.md`
- `.github/workflows/repository-health.yml`
- `.github/workflows/README.md`
- `blueprints/design-system-foundation.md`
- `README.md`
- `CHANGELOG.md`

## Official Decisions

- Runtime: Next.js App Router with React and TypeScript.
- Backend boundary: Next.js Server Actions on Node.js LTS.
- Styling and UI: Tailwind CSS, shadcn/ui, Radix UI, Lucide Icons.
- Motion: Framer Motion / Motion for React.
- Forms and validation: React Hook Form and Zod.
- State: TanStack Query for server state and Zustand for local UI state.
- Database: PostgreSQL through Supabase.
- ORM: Drizzle ORM.
- Authentication: Supabase Auth.
- Storage: Supabase Storage with Cloudflare R2 future-ready.
- Deployment: Vercel.
- Package manager: pnpm.
- Testing: Vitest, Playwright, ESLint and Prettier.
- Accessibility: WCAG AA.
- AI layer: provider-neutral architecture through the AI Provider Layer.

## Verification

- Repository structure check passed.
- Required file check passed.
- Confirmed no framework files, package manifests or lockfiles were introduced.
- Confirmed provider-neutral AI architecture names required providers and routing modules.
- Confirmed ASCII-only content across tracked repository files.

## Breaking Changes

None. This session created documentation and governance only.

## Pending Work

- Push the architecture and handoff commits to `origin/main`.
- Initialize Next.js, TypeScript and pnpm only in a future implementation milestone.
- Add package scripts and CI checks after `package.json` exists.
- Create provider-neutral TypeScript interfaces before adding any provider SDK.
- Create database schema and migration ADRs before persistence implementation.
- Create auth flow blueprint before user account implementation.

## Next Recommended Tasks

- Fable can begin a Phase 2 component blueprint using ADR 0007 and `docs/architecture/runtime/`.
- Codex should create an implementation-start blueprint before framework initialization.
- QA should plan repository health expansion for lint, test, accessibility and secret checks after package metadata exists.

## Open Questions

- Should light mode ship at launch or remain token-complete but hidden?
- Which provider-neutral AI interface milestone should precede the first provider SDK?
- Should Cloudflare R2 be deferred until attachment scale requires it, or planned in the first storage blueprint?
