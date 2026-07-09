# Official Technology Stack

## Purpose

Define the official NOVUS technology stack for implementation after architecture approval.

## Stack Summary

| Area | Official Choice |
| --- | --- |
| Runtime framework | Next.js App Router |
| Language | TypeScript |
| UI runtime | React |
| Styling | Tailwind CSS |
| Motion | Framer Motion / Motion for React |
| Component foundation | shadcn/ui, Radix UI |
| Icons | Lucide Icons |
| Forms | React Hook Form |
| Validation | Zod |
| Server state | TanStack Query |
| Local client state | Zustand |
| Backend boundary | Next.js Server Actions, with route handlers only when required |
| Server runtime | Node.js LTS |
| Database | PostgreSQL through Supabase |
| ORM | Drizzle ORM |
| Authentication | Supabase Auth |
| Storage | Supabase Storage; Cloudflare R2 future-ready |
| Deployment | Vercel |
| Package manager | pnpm |
| Unit and integration tests | Vitest |
| End-to-end tests | Playwright |
| Linting | ESLint |
| Formatting | Prettier |
| Accessibility target | WCAG AA |
| AI integration | Provider-neutral AI Provider Layer |

## Responsibilities

- Provide a single reference for implementation technology choices.
- Keep package, framework and provider decisions centralized.
- Prevent future agents from selecting competing stacks without an ADR.

## Engineering Decisions

- Next.js App Router is the official application runtime.
- TypeScript is mandatory for application code.
- Server Actions are the primary mutation and command boundary.
- Supabase provides hosted PostgreSQL, Auth and Storage.
- Drizzle ORM provides schema and query typing.
- Vercel is the primary deployment platform.
- pnpm is the official package manager.
- The AI layer remains provider-neutral and must not hardcode any AI provider.

## Provider-Neutral AI Support

NOVUS must support AI providers through adapters only:

- OpenAI.
- Anthropic.
- Google Gemini.
- NVIDIA NIM.
- Groq.
- OpenRouter.
- Future providers.

Provider usage is controlled by the Provider Registry, Model Registry, Routing Engine and Fallback Engine documented in `ai-provider-layer.md`.

## Official References Reviewed

- Next.js App Router and Server Functions: `https://nextjs.org/docs/app`
- Supabase database, Auth and Storage docs: `https://supabase.com/docs`
- Drizzle PostgreSQL docs: `https://orm.drizzle.team/docs/get-started-postgresql`
- Vercel Next.js docs: `https://vercel.com/docs/frameworks/full-stack/nextjs`
- pnpm docs: `https://pnpm.io/`
- Tailwind CSS docs: `https://tailwindcss.com/`
- Motion docs: `https://motion.dev/docs`
- shadcn/ui docs: `https://ui.shadcn.com/`
- Radix UI docs: `https://www.radix-ui.com/`
- React Hook Form docs: `https://react-hook-form.com/docs`
- Zod docs: `https://zod.dev/`
- TanStack Query docs: `https://tanstack.com/query/latest`
- Zustand docs: `https://zustand.docs.pmnd.rs/`
- Lucide React docs: `https://lucide.dev/guide/react`
- Vitest docs: `https://vitest.dev/`
- Playwright docs: `https://playwright.dev/docs`
- ESLint docs: `https://eslint.org/docs/latest/`
- Prettier docs: `https://prettier.io/docs`

## Non-Goals

- No dependencies are installed by this document.
- No framework files are created by this document.
- No provider SDKs are selected by this document.
- No application code is implemented by this document.
