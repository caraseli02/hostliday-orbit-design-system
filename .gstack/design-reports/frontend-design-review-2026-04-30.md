# Frontend Design Review — Hostliday Orbit

**Date**: 2026-04-30
**Reviewer**: Frontend Design skill (vision + code analysis)
**URL**: http://localhost:3000
**Branch**: caraseli02/design-review-qa

---

## Executive Summary

Hostliday Orbit is a **warm, restrained, photography-led travel design system** built around four distinct surface registers. It avoids nearly every AI-slop cliché — no gradient text, no cyan-on-dark, no neon accents, no `border-left` decorations. The typography uses Montserrat for display and Inter for body (Inter is technically on the "banned" list for new projects but already entrenched here). The warm neutral canvas (`#f4f1ed`) and brand red (`#be0000`) create a cohesive, quiet identity.

**Overall grade: B+**

The system's strength is its restraint and surface differentiation. Its weakness is a recurring pattern of **timid hierarchy below H1** — everything flattens into the same visual weight, critical metadata disappears, and interactive elements lack sufficient affordance.

---

## Design System Audit

### Typography

| Element | Token | Assessment |
|---|---|---|
| H1 (Overview) | `clamp(40px, 6vw, 72px)`, Montserrat 700 | **Strong.** Properly dominant. Line-height 1.15 is correct. |
| H2 (Section heads) | ~20px, Inter 600 | **Weak.** Too similar to body weight. No visual step between H1 and everything else. |
| Body | 14-15px, Inter 400 | Adequate but flat. |
| Metadata (`--fg-3`) | 12-13px, Inter 400, light gray | **Failing.** Used for text users actually need to read (dates, times, trip details). Disappears on tinted surfaces. |
| Labels/Eyes | 11px, uppercase, tracked 0.06-0.14em | Scannable but often triple-muted (small + light + tracked). |

**Problem**: The type scale has no intermediate sizes between the hero H1 and the 20px H2. This creates a cliff — H1 dominates, then everything else feels the same weight.

### Color

| Token | Value | Assessment |
|---|---|---|
| Brand red | `#be0000` | Distinctive, warm, not the typical AI purple/blue. Correctly used on CTAs only. |
| Canvas | `#f4f1ed` | Warm parchment tone. Distinctive without being obvious. |
| `--fg-1` | Near-black | Good. |
| `--fg-2` | Mid-gray | Acceptable for secondary labels. |
| `--fg-3` | Light gray | **Too light.** Fails on tinted surfaces. Used for important context. |
| Confirmed | `#1f7a4d` | Green. Correct. |
| Held | `#b6822e` | Amber. Correct. |
| Navigate dark | `#0e1117` | Deep navy-black. Good for map context. |

**Problem**: `--fg-3` is the single most problematic token. It's used for trip metadata, timestamps, and secondary info that users genuinely need — but it's too close to the background on any non-white surface.

### Spacing & Layout

- Base unit: 4px (`--sp-1`)
- Scale: 4–120px
- Gutter: `var(--gutter-app)`
- Radii: 4px (chip) → 8px (input) → 12px (card) → 20px (sheet)
- Shadow tiers: flat → card → pop → modal

**Assessment**: Spacing system is well-structured and consistently applied. No random values found.

### Motion

- Easing: `cubic-bezier(.2, .7, .2, 1)` ("orbit-ease") — used everywhere
- Durations: 140ms (micro) → 2400ms (entrance)
- Breathing pulse: limited to live indicators only
- `prefers-reduced-motion`: respected

**Assessment**: Motion is restrained and purposeful. No gratuitous animation.

---

## Surface-by-Surface Review

### 1. Overview (Home)

**Grade: B+**

**What works:**
- H1 at clamp scale is genuinely impressive — large without being shouty
- Warm canvas with brand-tinted neutrals feels cohesive
- Surface accent strips via `::before` (top 3px bar) — correct alternative to banned `border-left` pattern
- CTA button with arrow is clear and well-weighted
- Footer is minimal, not distracting

**Issues:**

| ID | Severity | Finding | Detail |
|---|---|---|---|
| O-01 | Medium | Surface cards lack visual differentiation | Three cards (Explore, Compose, Recover) share identical structure: eye label + title + description + CTA arrow. The 3px top stripe is too subtle to scan quickly. They read as three identical blocks with different text. |
| O-02 | Medium | Card backgrounds too similar in value | Green and amber tints are close in perceived lightness. No photography or icon differentiation. |
| O-03 | Low | `.home-lead b` at font-weight 600 reads same as surrounding 400 | Bold doesn't pop enough for "AI for the boring parts. Humans when it matters." |
| O-04 | Low | No visual hooks between cards | Users must read text to differentiate. A small icon, photo thumbnail, or distinct background would help. |

**Recommendation:** Give each surface card a distinctive visual element — icon, photo thumbnail, or distinct background pattern. Text-only differentiation is the biggest AI tell on this surface.

---

### 2. Explore (Intake)

**Grade: B**

**What works:**
- Drop zone with dashed border — clear affordance for paste/drop
- Warm parchment tone (`#f5f0e8`) — distinct from other surfaces
- Tag chips for channels — progressive disclosure done right
- Intake stream with parsed items — good information density
- Status pills (PARSED, IN TRIP, PARTIAL) — scannable

**Issues:**

| ID | Severity | Finding | Detail |
|---|---|---|---|
| E-01 | **High** | Input field has no visible border or background | `background: transparent; border: none` — the primary interaction point looks like plain text. Only visual cue is the dashed outer container. Too recessive. |
| E-02 | Medium | Right panel (intake stream) feels disconnected from drop zone | Two-column layout reads as two separate features. No visual connector or shared background. |
| E-03 | Low | `.explore-crumb` triple-muted | `letter-spacing: 0.14em` + uppercase + `color: var(--fg-3)` — too hard to read for navigation context. |

**Recommendation:** Give the input a subtle bottom border or light background tint. This is the primary action on the surface — it should invite interaction.

---

### 3. Compose (Timeline + Orbit)

**Grade: B**

**What works:**
- Two-column layout with clear visual separation
- Timeline day sections with day-num, date, temp — rich but structured
- Slot components with kind-specific icons — scannable
- "Why?" disclosure on Orbit messages — transparency pattern, well executed
- "Confirm next held" CTA with brand gradient — prominent and clear

**Issues:**

| ID | Severity | Finding | Detail |
|---|---|---|---|
| C-01 | Medium | Timeline column feels squeezed vs Orbit panel | Right panel takes ~40% of width. Timeline gets compressed. |
| C-02 | **High** | `.tl-meta` at `font-size: 13px; color: var(--fg-3)` | Trip metadata (dates, nights) nearly invisible on white bg. Critical context should be `--fg-2` minimum. |
| C-03 | Low | Disabled tabs provide no hover feedback | Users may click Compare/Docs repeatedly. Add `cursor: not-allowed` + tooltip. |
| C-04 | Low | `comp-confirm-meta` (23h left) inside button | Small text inside CTA is hard to scan. Consider pulling it outside or making it larger. |

**Recommendation:** Boost timeline metadata to `--fg-2`. The timeline is the user's primary mental model of their trip — it shouldn't feel secondary to the AI panel.

---

### 4. Recover (Incident)

**Grade: B**

**What works:**
- Incident header is properly alarming — red dot, "just now" timestamp, clear statement
- Three backup options with "Suggested" badge — good triage hierarchy
- Action timeline with "Why?" disclosures — Orbit accountability
- Concierge strip with real human names + response time — trust-building
- `role="status" aria-live="polite"` on escalate bar — a11y correct

**Issues:**

| ID | Severity | Finding | Detail |
|---|---|---|---|
| R-01 | **High** | All three option cards at same visual weight | Despite "Suggested" badge, cards are identical in size, padding, border. The suggested option should be visually dominant. Under stress, users won't differentiate. |
| R-02 | Medium | Action timeline language is system-facing | "Cancellation detected from operator feed" and "Filed via CP's API" expose internal process. Users under stress need outcomes, not process logs. |
| R-03 | **High** | Concierge strip at bottom of long page | Critical escape hatch is unreachable without scrolling past all options and timeline. Should be sticky or duplicated near top. |
| R-04 | Medium | `.incident-sub` at `color: var(--fg-2)` | Paragraph-length text should use `--fg-1`. `--fg-2` is for labels, not body copy. |

**Recommendation:** Make the suggested option visually dominant (larger, elevated, or full-width). Make concierge strip sticky. Simplify action timeline to outcomes, not API logs.

---

### 5. Navigate (Transit)

**Grade: B+**

**What works:**
- Dark theme `#0e1117` — correct for real-time map context
- Glass overlays with `backdrop-filter: blur(18px)` — purposeful glassmorphism, not decorative
- SVG map with route lines, city labels, live pulse — distinctive and functional
- Bottom sheet with dense but scannable data
- Live pulse animation limited to current position — correct restraint
- Brand gradient on "Message driver" CTA — strong affordance

**Issues:**

| ID | Severity | Finding | Detail |
|---|---|---|---|
| N-01 | Medium | `.nav-crumb .ttl` at `rgba(255,255,255,0.8)` over glass | With complex map backgrounds, this can fail WCAG AA. Needs `rgba(255,255,255,0.92)`. |
| N-02 | Medium | Bottom sheet "Up next" items have no interactivity | Four upcoming items listed but none are tappable. Users expect to interact. |
| N-03 | Low | FABs at 40x40px on dark map | Could disappear against dark map areas. Consider subtle white border. |
| N-04 | Low | Help button text low affordance | In a stress context, help should be more prominent. |
| N-05 | Low | City labels on map barely legible | White text at small size with low opacity against dark map. |

**Recommendation:** Increase text contrast on glass overlays. Make "Up next" items clearly informational or tappable. Boost city label contrast.

---

## Mobile Responsiveness

**Grade: C+**

The app appears to be desktop-first with limited mobile optimization.

| Issue | Detail |
|---|---|
| Overview cards don't stack | Three surface cards remain in a row on 390px viewport |
| Shell tabs too tight | Four tabs (Explore, Compose, Recover) plus branding compress poorly |
| Compose two-column breaks | Timeline and Orbit panel don't collapse gracefully |
| Navigate bottom sheet covers 40%+ of screen | Map barely visible on mobile |
| Touch targets inconsistent | Some buttons meet 44px, others (Help icon, FABs) fall short |
| Text wrapping issues | Long route names and metadata overflow on narrow screens |

---

## Cross-Surface Patterns

### Positive Patterns (Keep)

1. **Orbit-ease** (`cubic-bezier(.2, .7, .2, 1)`) — consistent everywhere
2. **Brand gradient** — CTAs only, never decorative
3. **No banned patterns** — zero `border-left` accents, zero gradient text, no neon
4. **Surface-specific registers** — each surface has distinct bg, typography tone, interaction density
5. **Warm neutral tinting** — `#f4f1ed` carries brand warmth subtly
6. **"Why?" disclosure** — consistent across Compose and Recover
7. **Status color coding** — Confirmed/Held/Live system is consistent
8. **Icon system** — 26 icons, consistent sizing, purposeful

### Problematic Patterns (Fix)

| Pattern | Where | Issue |
|---|---|---|
| `--fg-3` for important text | All surfaces | Too light for text users read. Reserve for truly decorative text. |
| Flat hierarchy below H1 | Overview, Recover | Strong H1 then everything at similar weight. No intermediate heading sizes. |
| Cards without visual hooks | Overview, Recover | Text-only differentiation. Need icon, photo, or color variation. |
| Desktop-first responsive | All surfaces | Limited mobile optimization. Two-column layouts don't collapse. |
| Subtle disabled states | Compose tabs | Disabled elements look almost identical to enabled ones. |

---

## AI Slop Test

**Would someone believe AI made this?**

**Mostly no.** The design is restrained, uses warm neutrals (not cyan-on-dark), and avoids all banned patterns. The biggest AI tell is **grid uniformity** — three identical overview cards, three identical recover options, symmetrical layouts everywhere. AI defaults to balanced grids. A human designer would break the grid for emphasis.

**Score: A-** (passes the test, minor tells in grid uniformity)

---

## Priority Fixes

| Priority | ID | Action | Effort |
|---|---|---|---|
| **P0** | E-01 | Give drop input a visible border/background | Small CSS |
| **P0** | R-01 | Make suggested recovery option visually dominant | Medium CSS |
| **P0** | R-03 | Make concierge strip sticky or duplicate near top | Small CSS |
| **P1** | C-02 | Boost timeline metadata to `--fg-2` | Small CSS |
| **P1** | O-01 | Add visual differentiation to surface cards | Medium |
| **P1** | N-01 | Increase glass overlay text contrast | Small CSS |
| **P2** | R-04 | Incident description text → `--fg-1` | Small CSS |
| **P2** | R-02 | Collapse action timeline default view | Medium |
| **P2** | E-03 | Crumb text contrast boost | Small CSS |
| **P2** | N-05 | Boost city label contrast on map | Small CSS |
| **P3** | — | Mobile responsive breakpoints for all surfaces | Large |
| **P3** | N-02 | Make "Up next" items tappable | Medium |

---

*Screenshots at `/tmp/audit/`.*
*Design tokens at `src/styles/colors_and_type.css`.*
*Previous audit at `.gstack/design-reports/impeccable-audit-2026-04-29.md`.*
