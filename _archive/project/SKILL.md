---
name: hostliday-orbit
description: Hostliday Orbit design system — warm-red brand for an AI travel coordination product. Use this when designing for Hostliday or Orbit, or for any travel/concierge product that wants a similar aesthetic. Covers four product surfaces: Explore, Compose, Navigate, Recover.
---

# Hostliday Orbit

Hostliday is a travel company; Orbit is its AI-powered trip-coordination product. The system is organized around four surfaces with distinct registers:

| Surface | Register | When to reach for it |
|---|---|---|
| **Explore** | warm, place-led, evocative | Discovery, browsing, saving inspiration |
| **Compose** | pragmatic, consultative | Trip-planning, comparing, slotting bookings |
| **Navigate** | terse, time-stamped | Live trip — map-first, dark chrome |
| **Recover** | direct, accountable | Things broke; rebooking and human escalation |

## Core tokens

- **Hero color:** Hostliday red `#BE0000`. Signature gradient `#DA0000 → #810000` at 120° — reserved for the wordmark, primary CTAs, and one hero element per surface.
- **Neutrals:** warm-leaning `#000`, `#A3A2A2`, `#E1DFDD`, plus `#FAF8F6` (surface) and `#F4F1ED` (canvas).
- **Status:** `#1F7A4D` (confirmed), `#B6822E` (held / pending), Hostliday red (critical), `#2E5C8A` (live / in-transit).
- **Display type:** Montserrat Black/Bold, tight tracking (-0.02em). For hero numerals and surface titles.
- **Body type:** Inter (400/500/600/700).
- **Mono:** JetBrains Mono — only on Navigate / Recover for times, codes, plates.
- **Radii:** 4 (chips), 8 (inputs), 12 (cards), 20 (sheets), 999 (pills).
- **Shadows:** two-layer light shadows; on dark Navigate use 1px hairline borders instead.
- **Easing:** `cubic-bezier(.2, .7, .2, 1)`. Default 220ms. Fade + 4–8px translate. No springs, no bounces.

All tokens are in `colors_and_type.css` as CSS custom properties (`--hostliday-red-500`, `--font-display`, `--shadow-card`, etc.).

## Voice rules

- Sentence case everywhere except the wordmark.
- Second person to the traveler; Orbit speaks in first person only on Navigate/Recover.
- Numbers as numerals. 24-hour time on operational surfaces.
- Verbs over nouns on action surfaces ("Save", "Hold for 24h", "Switch · one tap").
- No emoji. No hype words ("amazing", "magical"). Quiet competence.

## Imagery & icons

- **Photography is dominant** on Explore. Warm, golden-hour, low-saturation, place-led. Full-bleed, no rounded corners; protection gradient only when type sits on top.
- **Lucide** for UI icons, 1.5px stroke at 24px, currentColor. CDN: `https://unpkg.com/lucide-static@0.460.0/icons/<name>.svg`.
- **Logos** in `assets/logos/` — wordmark (red & white variants), isotype, app icon. The wordmark is a typographic recreation in Montserrat Black; replace with official SVG when available.

## UI kit reference

Each surface in `ui_kits/<surface>/` is a self-contained React + Babel HTML page:

- `ui_kits/explore/` — full-bleed photo hero, save-to-trip, destination grid.
- `ui_kits/compose/` — split timeline + Orbit chat, comparison tray.
- `ui_kits/navigate/` — dark map with floating glass panels, live driver/leg sheet.
- `ui_kits/recover/` — incident hero, three rebooking options, time-stamped action log, human-escalation bar.

Lift components from these files when building new screens. They share `colors_and_type.css`.

## Caveats

- No source codebase or Figma was provided. UI kits interpret the brandbook + product brief.
- Lucide icons are a substitution — swap in Hostliday's own icon family if it exists.
- Status color palette extends beyond the brandbook (which doesn't specify them).
