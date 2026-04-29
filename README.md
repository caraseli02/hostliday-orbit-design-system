# Hostliday Orbit Design System

Interactive demo of the Hostliday Orbit Design System — four product surfaces with distinct visual voices, unified under one token system.

**Stack:** Vite · SolidJS · CSS custom properties · Vitest

## Quick Start

```bash
pnpm install
pnpm dev          # http://localhost:5173
pnpm build
pnpm test
```

## Surfaces

| Surface | Voice | Description |
|---------|-------|-------------|
| **Explore** | Warm, evocative | Photo-led discovery — hero imagery, destination cards |
| **Compose** | Pragmatic, consultative | Trip planning — day timeline, AI chat sidebar, booking status |
| **Navigate** | Terse, time-stamped | Live trip — dark chrome, glass panels, map-first |
| **Recover** | Direct, accountable | Incident management — critical alerts, action log, escalation |

Plus an **Overview** (home/landing) and **Components** showcase.

## Design Tokens

All tokens in `src/colors_and_type.css` as CSS custom properties:

- **Colors** — `--hostliday-red-*`, `--neutral-*`, `--status-*`
- **Typography** — `--font-display` (Montserrat), `--font-body` (Inter), `--font-mono` (JetBrains Mono)
- **Spacing** — `--sp-1` (4px) through `--sp-30` (120px)
- **Radii** — `--r-chip`, `--r-input`, `--r-card`, `--r-sheet`, `--r-pill`
- **Shadows** — `--shadow-card`, `--shadow-pop`, `--shadow-modal`
- **Motion** — `--ease-orbit`, `--dur-micro`, `--dur-base`, `--dur-surface`

## Project Structure

```
src/
├── colors_and_type.css   # Design tokens (colors, type, spacing, radii, shadows, motion)
├── style.css             # Barrel import → all component styles
├── styles/               # Modular CSS per surface
│   ├── reset.css
│   ├── shell.css         # App chrome (trip switcher, surface tabs)
│   ├── footer.css
│   ├── toast.css
│   ├── layout.css
│   ├── animations.css
│   ├── overview.css
│   ├── explore.css
│   ├── compose.css
│   ├── navigate.css
│   ├── recover.css
│   └── components.css    # Showcase: buttons, inputs, grid, cards
├── fonts/
│   └── Inter-Variable.woff2
├── components/           # SolidJS components
│   ├── Shell.jsx
│   ├── Overview.jsx
│   ├── Explore.jsx
│   ├── Compose.jsx
│   ├── Navigate.jsx
│   ├── Recover.jsx
│   ├── Components.jsx
│   └── ...
├── state.jsx             # Trip context + reactive state
├── state.test.js         # Tests (13 passing)
└── main.jsx              # Entry point
```

## Design Principles

1. **Warm red as hero** — Hostliday gradient (`#DA0000 → #810000`)
2. **Four registers** — Each surface has its own voice and visual accent
3. **Photography-led** — Golden-hour warmth, gradient overlays
4. **Quiet competence** — No hype, no emoji
5. **Sentence case** — Except the wordmark
6. **Verbs over nouns** — Action-oriented language
