# TASK-03 — Settings module

**Assigned to:** Cursor
**Branch:** `task/03-settings`
**Start:** after TASK-02 is pushed, and only once Claude Code has
confirmed the auth contract exists.
**Read first:** `.ai/tasks/ONBOARDING.md`, then `AGENTS.md`, then this file.

## Blocked until told otherwise

This task touches the user profile, which does not exist until
authentication lands. **Do not start it before Claude Code confirms the
profile contract is on `main`.** Starting early means building against a
shape that will change.

If you have spare capacity before then, the fallback is TASK-04
(Projects), which has no such dependency.

## Scope

The `/ajustes` surface, per `blueprints/mvp-scope.md`: user profile, AI
preferences, API keys, privacy settings, memory settings.

`/ajustes` currently exists as a 20-line placeholder. You are replacing
that page.

## Files you may create or modify

```
app/ajustes/page.tsx                                  (replace: currently a placeholder)
lib/settings/types.ts                                 (create)
lib/settings/demo-data.ts                             (create)
lib/settings/README.md                                (create)
components/domain/settings/settings-nav.tsx           (create)
components/domain/settings/profile-section.tsx        (create)
components/domain/settings/ai-preferences-section.tsx (create)
components/domain/settings/api-keys-section.tsx       (create)
components/domain/settings/privacy-section.tsx        (create)
components/domain/settings/memory-section.tsx         (create)
components/domain/settings/README.md                  (create)
```

Unlike TASK-01 and TASK-02, you **do** author the contract here
(`lib/settings/types.ts`), because no other module consumes it. Keep it
in the same style as `lib/goals/types.ts`: documented types, derived
values as pure functions, no stored duplicates.

## Security rule — read this twice

API keys are secrets. This surface must never become a way to leak one.

- **Never render a stored key in full.** Show a masked form only:
  `nvapi-••••••••3f2a`, last four characters at most.
- **Never log a key**, not even during development.
- **Never place a key in a URL, query string, or `localStorage`.**
- A key input is `type="password"` with `autocomplete="off"`.
- Saving is out of scope for this task — there is no backend for it yet.
  Render the section against seeded masked values and make the save
  control clearly non-functional, or omit the control entirely. Do not
  build a fake save that appears to store a secret.

If a requirement here seems to conflict with these rules, stop and report
rather than resolving it yourself.

## What to build

A settings page with five sections, navigable by an in-page nav
(`settings-nav.tsx`) that scrolls to or switches between them.

### Profile
Name, email, and the user's stated focus — the one-line "what I'm working
on" the assistant already uses in its prompt. Email is displayed, not
editable.

### AI preferences
Response tone (directo / equilibrado / detallado), response language, and
whether the assistant may proactively suggest actions. These are
preferences the assistant will later read; model selection is **not**
here — the AI Router is out of MVP scope for now.

### API keys
Masked list per the security rule above. Show which provider each belongs
to and when it was added.

### Privacy
Which data areas the assistant may read — finances, goals, agenda,
memory — as individual toggles. Copy must state plainly what turning one
off means, e.g. "Novus dejará de usar tus finanzas para responder".

### Memory
What the assistant remembers, with the ability to review entries. Per
`.ai/agents/fable/chat-design.md`, memory must be transparent: the user
should be able to see why an entry exists. Deleting is out of scope;
display and explain only.

## Interaction

Toggles and selects update local state and are visually immediate.
Nothing persists — same rule as the other tasks. Do not fake persistence.

Every toggle needs an accessible name and a state readable without
colour.

## Acceptance criteria

1. `/ajustes` renders all five sections with seeded data.
2. In-page navigation moves between sections and shows which is active.
3. API keys appear masked; no full key exists anywhere in the DOM,
   the source, or the console.
4. No secret is written to `localStorage`, a URL, or a log.
5. Toggles and selects are keyboard operable with visible focus, and
   their state is readable without colour.
6. Every control has an accessible name.
7. Layout works at 375 px and 1280 px.
8. UI copy in Spanish with correct accents; code and comments English.

## Verification required

```bash
pnpm run typecheck
pnpm run lint
pnpm run build
```

Paste the real output. Then `pnpm dev`, open
`http://localhost:3000/ajustes` and confirm, listing what you did:

- all five sections render
- section navigation works
- **inspect the DOM and confirm no full API key is present**
- every toggle is reachable and operable by keyboard alone
- the 375 px viewport

## Out of scope

Database, authentication flows themselves, saving anything, deleting
memory entries, model selection, billing, and any change to the chat, the
AI layer or the dashboard.
