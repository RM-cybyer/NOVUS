# Frontend Architecture

## Purpose

Define the official frontend architecture for NOVUS.

## Decisions

- React with TypeScript is the UI implementation layer.
- Next.js App Router is the routing layer.
- Tailwind CSS consumes repository design tokens.
- shadcn/ui and Radix UI provide component foundations.
- Lucide Icons provide iconography.
- Framer Motion / Motion for React provides approved motion primitives.
- React Hook Form and Zod govern forms and validation.
- TanStack Query manages server state where client-side cache is required.
- Zustand manages small local client state only when React state is insufficient.

## Responsibilities

- Keep UI implementation aligned with the Fable Design Operating System.
- Separate routes, components, hooks, context and stores.
- Preserve accessibility and responsive behavior.
- Keep design tokens as the source of visual values.

## Module Boundaries

- `app/`: route entry points and route-level composition.
- `components/primitives/`: low-level reusable UI primitives.
- `components/composition/`: reusable composed UI patterns.
- `components/layouts/`: reusable layout structures.
- `components/domain/`: domain-specific presentation components.
- `hooks/`: reusable client hooks.
- `context/`: narrow context providers.
- `store/`: local state stores.
- `styles/tokens/`: design tokens.

## Data Rules

- Server state should remain server-owned.
- TanStack Query is used only when client-side cache, refetching or mutation state is needed.
- Zustand must not duplicate server state.
- Forms use React Hook Form for form state and Zod for validation contracts.

## Accessibility

- WCAG AA is the baseline.
- Radix primitives should be preferred where accessibility behavior is complex.
- Motion must respect reduced-motion preferences.
- Components must document loading, error, empty, disabled and focus states.

## Non-Goals

- No components are implemented here.
- No Tailwind config is created here.
- No shadcn/ui components are generated here.
