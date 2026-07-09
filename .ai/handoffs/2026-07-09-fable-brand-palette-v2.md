# Handoff: Brand Palette v2

Agent: Fable (single-owner mode)
Branch: main
Latest GitHub commit: recorded at push time
Verification performed: WCAG contrast computation script for every changed pair (documented inline in tokens.css), live browser verification on the running dev server (computed CSS variables confirmed: accent #FFA400, bg #020300, danger #772F1A, text #F7F4F3), visual screenshot of the restyled app, wordmark color inspected (#F7F4F3 confirmed).

## What changed

- Founder delivered the official NOVUS color palette (Coolors): #020300, #F7F4F3, #FFA400, #772F1A - replacing the exploratory lime/coral system.
- `styles/tokens/tokens.css` dark and light schemes rebuilt on the new palette. Derived values (contrast-validated): danger text on dark #D97B54 (6.8:1), accent text on light #A03E00 (6.0:1), dark tertiary text raised to 0.5 alpha (4.7:1 AA body), light tertiary 0.55 (4.6:1). New token: `--color-accent-text` (amber is fill-first; as text it fails on light surfaces at 1.8:1).
- Fixed a token violation in `components/layouts/app-shell.tsx` (hardcoded `bg-white text-black` in the mobile nav active chip -> token-driven).
- The app restyled end to end with zero component changes beyond that fix - the token bridge worked as designed.
- Docs: `styles/tokens/README.md` brand note, `CHANGELOG.md`.

## Pending work

- Figma variable sync: the canonical Figma file still carries lime/coral values. Update the variable collection in the same future session as the Milestone 02 visual repair pass (Figma MCP Starter rate limit permitting).
- The legacy prototype `Downloads/Novus.html` intentionally keeps the old palette (out of repository scope).

## Next recommended tasks

- Module 2 NOVUS Chat (unchanged recommendation; see previous handoff).
- QA: spot-check danger surfaces once a screen renders them (rust family is darker than the old coral; soft/border alphas were raised to compensate).
