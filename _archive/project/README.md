# Hostliday Orbit — Design System

**Hostliday** is the company brand. **Orbit** is the product/design language for its AI-powered travel coordination system.

Hostliday Orbit is positioned as a **persistent trip coordination layer** rather than just an itinerary generator. Travelers research, save, compare, and build trips from scratch or around bookings they already hold — then stay supported throughout the journey with live maps, intelligent agents, and human-backed assistance when plans change.

## Four product surfaces

The product (and this design system) is organized around four surfaces. Each has a UI kit in `ui_kits/`.

| Surface | Verb | What it does |
|---|---|---|
| **Explore** | research & save | Discover destinations, stays, experiences. Save anything to a trip board. |
| **Compose** | plan & build | Compare saved items, slot in existing bookings, assemble a coordinated itinerary. |
| **Navigate** | execute | Live map-first interface for the trip in progress. Tickets, directions, real-time updates. |
| **Recover** | escalate | When plans change: agent + human escalation for incidents, rebookings, refunds. |

## Sources

- `uploads/Hostliday Brandbook Oficial.pdf` — official brandbook (17pp). Logo construction, color palette (#DA0000 → #810000 gradient, #BE0000, #000000, #A3A2A2, #E1DFDD), typography (Inter recommended; Montserrat shown as headline). Hero imagery reads warm/aspirational (sunset mountains through floor-to-ceiling windows from a curated stay). No companion codebase or Figma was provided.
- Product description: see top of this file.

> **No codebase or Figma was attached.** This system is built from the brandbook plus the four-surface product brief. Where ambiguity exists, sensible defaults are chosen and flagged below in CAVEATS.

## Index

| File / folder | What's inside |
|---|---|
| `colors_and_type.css` | All design tokens — color, typography, spacing, radii, shadows, motion. Single source of truth. |
| `fonts/` | Self-hosted webfont files (Inter, Montserrat). |
| `assets/logos/` | Hostliday wordmark, isotype, app icon, color/mono variants. |
| `assets/imagery/` | Brand-curated photography (warm, golden-hour, place-led). |
| `assets/icons/` | UI icons (Lucide via CDN — see ICONOGRAPHY). |
| `preview/` | Cards rendered in the Design System tab. |
| `ui_kits/explore/` | Discovery + saved-research surface. |
| `ui_kits/compose/` | Trip-builder + comparison surface. |
| `ui_kits/navigate/` | Live-map trip surface. |
| `ui_kits/recover/` | Agent + human escalation surface. |
| `SKILL.md` | Cross-compatible skill descriptor. |

---

## Content fundamentals

Hostliday's voice is **warm, calm, and concierge-like** — the brandbook's hero imagery (a quiet bedroom looking out at a mountain sunset) sets the emotional register. Orbit, the product layer, adds a second voice: **decisive and operational** — short verbs, time-stamped facts, plain numbers. The system shifts between these registers by surface.

### Voice by surface

| Surface | Register | Example |
|---|---|---|
| Explore | Warm, evocative, place-led | "Cabins above the cloud line in Asturias." |
| Compose | Pragmatic, consultative | "You already have the Lisbon flight. Want me to build around it?" |
| Navigate | Terse, time-stamped, useful | "Train at 14:08 — platform 6. 12 min walk." |
| Recover | Direct, accountable, human | "Your flight is delayed 2h. I've held a backup. Confirm?" |

### Rules

- **Second person, "you"** addressing the traveler. The product can refer to itself as **Orbit** in the first person ("I've held a backup") only on Navigate/Recover where decisiveness matters. Marketing/Explore copy avoids first person.
- **Sentence case for everything** — buttons, headers, nav, cards. No Title Case. No ALL CAPS except the wordmark logo.
- **No emoji.** Use real iconography (Lucide). The brandbook does not employ emoji.
- **Numbers as numerals** ("3 stays", not "three stays"). 24-hour time on Navigate; localized ranges in Explore/Compose.
- **Currencies and prices** always with currency code and short form: `€420` not `EUR 420.00`. Round in marketing, exact in checkout.
- **Verbs over nouns** on action surfaces: "Save", "Add to trip", "Hold for 24h" — not "Saving" or "Saved items".
- **No hype words.** Avoid "amazing", "incredible", "magical". Brand promise is *quiet competence*.
- **Sentence rhythm:** lead short, follow with one supporting clause. "Saved. Five places, ready when you are."

### Sample copy by surface

**Explore (hero):** "Trips that hold their shape — and stretch when yours doesn't."
**Explore (card):** "Casa do Vale · Douro Valley · stays from €180 / night"
**Compose (suggestion):** "I noticed your flight lands at 22:40. Two of the stays you saved have late check-in. Pin one?"
**Navigate (notification):** "Your driver is 4 minutes away. Black Skoda, 22-AB-94."
**Recover (incident):** "Train cancelled. I've held two seats on the 16:12 and a refund is in flight. One tap to switch."

---

## Visual foundations

The visual system is built on three commitments from the brandbook: **warm red as the single hero color**, **aspirational place-led photography**, and **clean Inter/Montserrat typography**. Orbit then adds the operational layer needed for a travel product: a live-map dark mode, status colors, and a soft-card surface system.

### Color

- **Primary** is `Hostliday Red` `#BE0000`, deepened to `#810000` and lifted to `#DA0000`. The signature gradient is **`#DA0000 → #810000` at 120°** (hero) or **90°** (banded sections). This gradient is reserved for the wordmark, primary CTAs, and one hero element per surface. Never use it for backgrounds of arbitrary cards.
- **Neutrals** are warm-leaning grays from the brandbook: `#000000`, `#A3A2A2`, `#E1DFDD`, plus extensions for cards (`#FAF8F6`) and surfaces (`#FFFFFF`).
- **Status** colors are added (not in brandbook): green `#1F7A4D` (confirmed), amber `#B6822E` (held / pending), the Hostliday red doubles as critical/error, and a calm slate-blue `#2E5C8A` for in-transit / live.
- **Imagery is warm:** golden-hour, low-saturation skies, deep greens, never icy. Photos lean to **dawn / dusk / interior-looking-out**, mirroring the brandbook hero.

### Typography

- **Display:** Montserrat (Black, Bold) — reserved for hero numerals, surface titles, and the wordmark. Tight tracking (-0.02em).
- **Body:** Inter — UI, paragraphs, labels. Variable weights 400/500/600/700.
- **Mono:** JetBrains Mono — itinerary times, codes, gates, plate numbers, only on Navigate/Recover.
- Type system uses a 1.25 modular scale, with one extra step at the top for hero numerals.

### Spacing & layout

- 4px base. Spacing tokens at 4, 8, 12, 16, 20, 24, 32, 40, 56, 80, 120.
- Page gutters: 80px on desktop marketing, 24px in app shell, 16px on mobile.
- One **dominant column** per surface. No multi-column dashboards — Orbit defers to the map, the photo, or the timeline.

### Backgrounds & surfaces

- **Marketing / Explore:** off-white `#FAF8F6` with full-bleed hero photography. Photos are unframed, no rounded corners, no overlay tint unless type goes on top — then a `linear-gradient(180deg, transparent, rgba(0,0,0,.55))` protection gradient.
- **App shell:** white cards on `#F4F1ED` canvas. Cards have `12px` radius and a `0 1px 2px rgba(0,0,0,.04), 0 8px 24px -12px rgba(0,0,0,.10)` two-layer shadow.
- **Navigate (live map):** dark `#0E1117` chrome with translucent panels (`rgba(20,22,28,.72)` + `backdrop-filter: blur(18px)`). The map itself is the background. No card shadows here — instead, 1px hairline borders at `rgba(255,255,255,.08)`.
- **No repeating patterns, no grain, no hand-drawn illustrations.** The brandbook does not use any. Photography carries the texture.

### Animation

- Standard easing: `cubic-bezier(.2, .7, .2, 1)` ("orbit-ease"). Default duration 220ms; micro-interactions 140ms; surface transitions 360ms.
- **Fade + 4–8px translate** is the default entrance. No bounces. No springs. No parallax.
- Map and live elements have a slow `breathe` pulse (2.4s) for the user's location and active vehicles — the only ambient motion in the system.
- Hover: 120ms `opacity 1 → .82` on photos and tertiary links. Buttons darken `~6%` and lift `1px`.
- Press: 80ms `scale(.98)` + `~3%` darken. No color shift on press.

### Borders, radii, shadows

- Radii: `4px` (chips), `8px` (inputs), `12px` (cards), `20px` (sheets/modals), `999px` (pills, avatars).
- Borders: 1px `#E1DFDD` in light, `rgba(255,255,255,.08)` in dark. Never thicker.
- Shadow system, light mode:
  - `--shadow-card`: `0 1px 2px rgba(0,0,0,.04), 0 8px 24px -12px rgba(0,0,0,.10)`
  - `--shadow-pop`: `0 8px 16px -4px rgba(0,0,0,.08), 0 24px 48px -16px rgba(0,0,0,.18)`
  - `--shadow-modal`: `0 32px 64px -24px rgba(0,0,0,.30)`
- No inner shadows, no neumorphism.

### Transparency & blur

- Used only on Navigate/Recover where panels float over the map. Translucent panels are always `>= 64%` opaque + `backdrop-filter: blur(16–20px)` for legibility.
- Marketing surfaces never use blur.

### Layout rules

- **Sticky elements:** top app bar (56px), bottom navigate sheet on mobile (peek 96px, expanded 60vh).
- **Fixed safe areas** account for `env(safe-area-inset-*)` on iOS.
- **Hero photography** is full-bleed up to 720px tall on desktop, 56vh on mobile.
- **Cards never sit on photos** unless the photo has a protection gradient applied.

---

## Iconography

- Hostliday's brandbook **does not specify a system icon set**. Orbit adopts **Lucide** (1.5px stroke, 24px grid, rounded line caps) — the closest match in stroke weight and warmth to the wordmark's letterforms. Loaded via CDN: `https://unpkg.com/lucide-static@0.460.0/icons/<name>.svg`.
- Stroke weight: **1.5px** at 24px (1.75 at 32, 1.25 at 16). Always the same color as the surrounding text — icons inherit `currentColor`.
- **Brand assets** (logo, isotype, app icon) live in `assets/logos/` as SVG.
- **No emoji anywhere in product UI.** No unicode glyph icons (★, ✓, ✗) — always a Lucide SVG instead.
- **Photography** is the dominant visual element on Explore and the cover of every saved trip; iconography is functional, not decorative.

> ⚠️ **Substitution flag:** Lucide is a substitution. The brandbook contains no proprietary icon font. If Hostliday already uses a different icon family in production (e.g. a Figma library), drop those SVGs into `assets/icons/` and update `ICON_BASE` in `colors_and_type.css`.

---

## Caveats

- **No codebase or Figma was provided.** UI kits are interpretations of the four surfaces from the product brief, anchored in the brandbook's color/type/photographic style. They are not recreations of an existing UI.
- **Logo files are not present in the brandbook PDF** in extractable form — the wordmark on `assets/logos/` is a typographic recreation in Montserrat Black (matching the brandbook). Replace with the official SVG when available.
- **Lucide icons are a substitution** — see ICONOGRAPHY above.
- **Status colors** (green/amber/blue) are not in the brandbook; added for product needs and tuned to harmonize with the warm red.
- **Photography:** a single hero photo was extractable from the brandbook (mountain bedroom). Other imagery slots use placeholders or that single photo.
