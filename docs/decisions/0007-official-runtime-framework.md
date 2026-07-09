# ADR 0007: Official Runtime Framework

## Status

Accepted

## Context

NOVUS has approved repository, Intelligence Layer, Runtime Layer, GitHub-first agent workflow and Fable Design Operating System documentation. Implementation is blocked until the official runtime and technology architecture is documented.

The selected stack must support:

- AI-first collaboration.
- Next-generation product UI.
- Provider-neutral AI orchestration.
- Secure user identity.
- Durable memory and knowledge graph persistence.
- Runtime workflow execution.
- Long-term scalability.

## Decision

Adopt the official NOVUS runtime stack documented in `docs/architecture/runtime/`.

The official stack is:

- Frontend: Next.js App Router, React, TypeScript, Tailwind CSS, Framer Motion / Motion for React, shadcn/ui, Radix UI, Lucide Icons.
- Forms and validation: React Hook Form and Zod.
- State: TanStack Query for server state and Zustand for local client state.
- Backend: Next.js Server Actions on Node.js LTS, with route handlers only where appropriate.
- Database: PostgreSQL on Supabase.
- ORM: Drizzle ORM.
- Authentication: Supabase Auth.
- Storage: Supabase Storage, with Cloudflare R2 as a future-ready storage option.
- Deployment: Vercel.
- Package manager: pnpm.
- Testing and quality: Vitest, Playwright, ESLint, Prettier.
- Accessibility: WCAG AA.
- AI: Provider-neutral AI Provider Layer.

## Why These Technologies

Next.js App Router gives NOVUS a modern React runtime with server/client composition and strong Vercel alignment.

TypeScript supports strict contracts across runtime, services, validation, AI adapters and persistence.

Tailwind CSS aligns with the existing token foundation and enables consistent, utility-based UI implementation.

Framer Motion / Motion for React supports purposeful UI transitions while remaining governed by the Fable Motion System.

shadcn/ui and Radix UI provide a customizable component foundation with accessible primitives and repository-owned component code.

Lucide Icons provide consistent React icon components.

React Hook Form and Zod separate form state from runtime validation and support typed input contracts.

TanStack Query is selected for client-side server state that needs caching, refetching or mutation state.

Zustand is selected for small local UI state and must not duplicate server state.

Next.js Server Actions keep mutation flows close to the runtime while preserving server-side validation and authorization.

Node.js LTS reduces compatibility risk for database drivers, AI provider SDKs, testing tools and server execution.

PostgreSQL and Supabase provide durable relational data, managed operations, Auth, Storage and RLS support.

Drizzle ORM provides TypeScript-friendly schema and query safety without hiding SQL.

Vercel provides first-class Next.js deployment and GitHub-centered preview and production workflows.

pnpm provides efficient, strict dependency management and future workspace support.

Vitest and Playwright cover unit, integration and end-to-end testing.

ESLint and Prettier enforce static quality and consistent formatting.

The AI Provider Layer preserves provider neutrality across OpenAI, Anthropic, Google Gemini, NVIDIA NIM, Groq, OpenRouter and future providers.

## AI Context Impact

Future agents must treat `docs/architecture/runtime/` as the official source for technology choices.

Fable may implement against this stack after any required blueprint is approved. Codex must continue to guard boundaries and prevent provider or dependency drift.

## Alternatives Considered

- Keep runtime undecided. Rejected because implementation is now blocked on runtime decisions.
- Use a separate backend service immediately. Rejected because Next.js Server Actions and service boundaries are sufficient for the first implementation phase and reduce operational complexity.
- Use a provider-specific AI SDK directly in product code. Rejected because NOVUS must remain provider-neutral.
- Use npm or yarn. Rejected in favor of pnpm for strict dependency behavior and workspace readiness.
- Use Prisma. Rejected in favor of Drizzle for SQL-aligned, TypeScript-friendly schema and query control.

## Consequences

- Runtime and package manager debt is resolved at the architecture level.
- Implementation remains blocked until package files and framework initialization are introduced in a focused implementation commit.
- Dependencies are approved conceptually but not installed.
- AI provider integrations must use adapters.
- Edge runtime, Cloudflare R2 adoption, queue workers and plugin systems require future ADRs or blueprints.

## Follow-up

- Create a blueprint for the first implementation slice.
- Initialize Next.js, TypeScript and pnpm in a focused implementation commit.
- Add package manager metadata and lockfile.
- Add environment variable documentation with safe placeholders.
- Add CI commands after package scripts exist.
- Add provider-neutral TypeScript interfaces before any provider SDK.
- Add database schema and migration ADRs before persistence implementation.
- Add auth flow blueprint before user accounts are implemented.
