# CLAUDE.md — Hostliday Orbit Design System

## Project

AI travel coordination product demo with 4 surfaces: Overview, Explore, Compose, Navigate, Recover.
Stack: SolidJS, Vite, CSS Custom Properties, Vitest. Package manager: pnpm.

## Commands

- `pnpm dev` — dev server on port 3000
- `pnpm build` — production build (esnext target)
- `pnpm test` / `pnpm test:watch` — Vitest
- `pnpm lint` / `pnpm lint:fix` — ESLint

## Architecture

```
src/
  main.jsx              Entry point (HashRouter wrapper)
  App.jsx               Surface router + layout shell
  state.jsx             TripProvider context, store, persistence
  colors_and_type.css   Design tokens (single source of truth)
  style.css             CSS imports (order matters)
  styles/               Per-surface CSS + shared styles
  components/
    Shell.jsx           App chrome (header + tabs)
    Footer.jsx          Footer with nav links
    Toast.jsx           Toast notification
    Walkthrough.jsx     Auto-play walkthrough mode
    Icon.jsx            Inline SVG icon system (bundled, no CDN)
    Overview.jsx        Landing / pitch surface
    Explore.jsx         Drop intake + stream
    Compose.jsx         Timeline + AI sidebar
    Navigate.jsx        Live map (dark mode, full viewport)
    Recover.jsx         Disruption + concierge
```

## Key Patterns

- **Routing:** Hash-based via `@solidjs/router` (HashRouter). Surface synced to URL.
- **State:** `TripProvider` context with SolidJS `createStore`. localStorage auto-persisted.
- **Navigation:** `navigateToSurface(surfaceId)` in App.jsx updates signal + URL.
- **CSS:** Global CSS with per-surface files. Naming convention: `{surface-prefix}-{element}` (e.g., `comp-slot`, `nav-sheet`, `shell-tab`).
- **Dark mode:** `.orbit-dark` class on container remaps semantic CSS vars.
- **Icons:** Inline SVGs in `Icon.jsx` — no runtime fetch, no CDN dependency.
- **Error boundaries:** Per-surface `ErrorBoundary` wrappers in App.jsx.
- **Tests:** Vitest + jsdom. `@solidjs/testing-library` for component tests.

## CSS Naming Convention

Each surface uses a 2-4 letter prefix for its class names:
- `shell-*` — App chrome (header, tabs, trip switcher)
- `home-*` / `overview-*` — Overview surface
- `exp-*` / `explore-*` — Explore surface
- `comp-*` — Compose surface
- `nav-*` — Navigate surface
- `rec-*` / `recover-*` — Recover surface
- `wt-*` — Walkthrough overlay
