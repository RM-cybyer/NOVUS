# Dashboard Data Layer

Typed contracts (`types.ts`) and the local snapshot provider (`demo-data.ts`) for the Dashboard module.

- The UI depends only on `DashboardSnapshot` and `getDashboardSnapshot()`.
- Backend integration (Supabase + runtime engines) replaces the provider body keeping the signature - no UI changes required.
- Never place UI components or provider SDK calls here.
