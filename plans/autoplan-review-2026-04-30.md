# Autoplan Review — Hostliday Orbit Design System

**Date:** 2026-04-30
**Branch:** feat/autoplan-review
**Codebase:** ~7,300 lines (JSX + CSS + JS)
**Stack:** SolidJS · Vite · CSS Custom Properties · Vitest

---

## Executive Summary

Hostliday Orbit is a well-crafted design system demo for an AI travel coordination product. It demonstrates four distinct product surfaces (Explore, Compose, Navigate, Recover) with strong visual identity, thoughtful token architecture, and realistic interactive state. The codebase is clean, consistent, and purpose-built.

**Key strengths:** Token system is excellent, surface differentiation is clear, state management is practical, and the brand personality is well-expressed.

**Key gaps:** Test coverage is minimal, no routing/URL state, CSS is monolithic per surface, accessibility has gaps, and the design system lacks reusable component abstractions.

---

## CEO Review — Strategic & Product

### Premises Check

| Premise | Assessment |
|---------|-----------|
| Four distinct surfaces with different registers | ✅ Strong — clearly differentiated visually and tonally |
| AI-first travel coordination (paste → parse → plan) | ✅ Compelling — the Compose stream demonstrates this well |
| Human concierge fallback for disruptions | ⚠️ Shown in Recover but not deeply demonstrated |
| Design system as product artifact | ✅ Appropriate for pre-seed demo stage |

### Opportunities

1. **Interactive demo as sales tool** — This demo is more powerful than a pitch deck. Consider making it the primary investor-facing artifact. Add guided walkthrough mode with annotations.

2. **Token export** — The token system (`colors_and_type.css`) is well-structured enough to become a standalone npm package. Figma sync would be a natural next step.

3. **Surface API contract** — Each surface currently takes different props with no shared interface. Defining a `Surface` contract (onNavigate, onExit, tripContext) would make the system composable for real product integration.

4. **Missing Navigate surface as hero** — Navigate (live map, dark mode) is the most visually distinct surface but underrepresented in the Overview. This is the "wow" moment — elevate it.

### Risks

- **Demo rot** — Without real data integration, the seed data will feel stale. Consider a data refresh mechanism or randomization.
- **Scope creep risk** — The design system is ambitious for 4 surfaces. Resist adding features before the token system is locked.

---

## Eng Review — Architecture & Code Quality

### Architecture Assessment: **B+**

**What works well:**
- Clean separation: components / styles / state / tokens
- SolidJS reactive primitives used correctly (`createSignal`, `createMemo`, `createStore`, `produce`)
- `TripProvider` context pattern is well-implemented with proper cleanup (`onCleanup` for timers)
- Error boundaries per surface — smart defensive pattern
- `safeHref` utility properly sanitizes URLs
- Filter logic (`matchesFilter`) is clean and composable

**Issues found:**

#### P1 — No routing or URL state
- Surface navigation is purely signal-based (`surface()` signal in App.jsx)
- No URL reflects current surface — users can't deep-link, bookmark, or share
- Browser back button doesn't work
- **Recommendation:** Add `@solidjs/router` or hash-based routing

#### P2 — State not persisted
- All state is in-memory — refreshing loses everything
- `SEED_TRIPS` and `SEED_ITEMS` are hardcoded in state.jsx
- **Recommendation:** Add `localStorage` persistence for trip data, or a simple save/load mechanism

#### P3 — CSS architecture is monolithic
- Single CSS file per surface (e.g., `explore.css` is 1,171 lines)
- No CSS modules, no scoping — all class names are global
- Risk of class name collisions as the project grows
- **Recommendation:** Consider CSS Modules (built into Vite) or at minimum a BEM-like naming convention with surface prefixes

#### P4 — Icon system relies on external CDN
- `--icon-base` points to `unpkg.com/lucide-static@0.460.0`
- The `Icon` component fetches SVGs at runtime via fetch()
- **Recommendation:** Bundle icons at build time (vite-plugin-solid-svg or similar)

#### P5 — Test coverage is minimal
- Only `state.test.js` exists (13 tests, covering `safeHref` and `matchesFilter`)
- No component tests, no integration tests, no visual regression
- **Recommendation:** Add `@solidjs/testing-library` for component tests. Priority: Shell, Overview, Compose

#### P6 — No TypeScript
- Pure JS/JSX — no type safety
- Acceptable for a demo, but will hurt at production scale
- **Recommendation:** Migrate to TS once token system is locked

### Code Quality Details

| Metric | Score | Notes |
|--------|-------|-------|
| Consistency | A | Uniform patterns, naming, structure |
| Readability | A- | Good naming, clear JSX structure |
| Reactivity | A | SolidJS patterns used correctly |
| Error handling | B | Error boundaries good, but no API error states |
| State management | B+ | Clean but in-memory only |
| Security | B+ | URL sanitization present, but no CSP or SRI |

---

## Design Review — Visual & UX

### Visual Assessment: **A-**

**What's excellent:**
- Token system is thorough and well-organized (429 lines, every token needed)
- Dark mode (`.orbit-dark`) for Navigate is properly implemented with full semantic variable remapping
- Brand gradient system is restrained and effective
- Typography scale is well-calibrated with proper `clamp()` for fluid sizing
- `orbit-breathe` animation and `prefers-reduced-motion` support show attention to detail
- Glass panel effect (`backdrop-filter: blur(18px)`) is well-executed for Navigate
- Protection gradients for photo overlays are production-quality

**Issues found:**

#### D1 — Overview hero section could be more impactful
- Hero text is strong but the wordmark + crumb feel sparse
- Consider adding a subtle background element (gradient wash, ambient animation)
- The "Pre-seed demo · April 2026" crumb is honest but undersells the product

#### D2 — Surface transitions are abrupt
- No animation between surface switches (just show/hide via `<Show>`)
- Users lose spatial orientation
- **Recommendation:** Add slide/fade transitions using SolidJS `<Transition>` or CSS animations

#### D3 — Responsive CSS exists but is thin
- `responsive.css` is only 130 lines
- No mobile-specific navigation patterns (hamburger, bottom sheet)
- The app is responsive-ish but not truly mobile-optimized
- **Recommendation:** Add mobile-first breakpoint testing, especially for Compose and Navigate

#### D4 — Accessibility gaps
- No skip-to-content link
- Surface navigation (Shell tabs) lacks proper ARIA (`role="tablist"`, `role="tab"`, `aria-selected`)
- Color contrast not verified for all text/background combinations
- No focus management on surface transitions
- Toast disappears after 4s with no way to review dismissed toasts
- **Recommendation:** Full WCAG 2.1 AA audit. Priority: keyboard navigation, ARIA roles, focus management

#### D5 — Components showcase is light
- `Components.jsx` (138 lines) shows buttons and inputs but misses key patterns
- No card variants, no modal/dialog, no sheet/bottom drawer
- These are needed before the design system can be adopted

### Surface-Specific Notes

| Surface | Visual Score | Key Note |
|---------|-------------|----------|
| Overview | A- | Strong hero, clear CTA hierarchy, could use more visual drama |
| Explore | A | Photography-led, stream feels real, good parse status indicators |
| Compose | A- | Timeline is clear, AI sidebar is promising, needs day reordering UX |
| Navigate | A | Dark mode is polished, glass panels look premium, map placeholder is clear |
| Recover | B+ | Alert hierarchy works, but escalation flow needs more depth |

---

## DX Review — Developer Experience

### DX Assessment: **B+**

**What works well:**
- `pnpm` with lockfile — fast, reproducible installs
- Vite dev server on port 3000 — instant HMR with SolidJS
- ESLint with Solid plugin — proper linting
- Vitest configured — ready for tests
- Clear project structure — easy to find things
- PRODUCT.md and README.md provide good context

**Issues found:**

#### X1 — No CLAUDE.md at repo root
- Claude Code / AI agents have no project-specific instructions
- PRODUCT.md exists but isn't in the expected location for AI tooling
- **Recommendation:** Create CLAUDE.md with build commands, test commands, and key patterns

#### X2 — No CI/CD pipeline
- No GitHub Actions, no lint-on-push, no test-on-PR
- **Recommendation:** Add basic CI: lint + test + build check

#### X3 — No storybook or component isolation
- Components can only be seen in context of surfaces
- No way to develop or test components in isolation
- **Recommendation:** Add Storybook for SolidJS or at minimum a dedicated component playground

#### X4 — Build output not optimized
- No code splitting (all surfaces bundled together)
- No lazy loading for surface components
- Vite config is minimal — no PWA plugin, no compression plugin
- **Recommendation:** Add `lazy()` for surface components, enable gzip/brotli in build

#### X5 — Version is 0.0.0
- `package.json` version hasn't been touched
- No changelog, no release process
- **Recommendation:** Start at 0.1.0, use conventional commits, add changelog generation

---

## Prioritized Recommendations

### Must Fix (Before showing to investors/users)

| # | Item | Effort | Impact |
|---|------|--------|--------|
| 1 | Add URL routing for surfaces | S | High — deep linking, shareability |
| 2 | Fix accessibility (ARIA tabs, skip link, focus management) | M | High — inclusive design signal |
| 3 | Add surface transition animations | S | Medium — polish perception |
| 4 | Add CLAUDE.md for AI-assisted development | S | Medium — DX for AI workflows |

### Should Fix (Before production use)

| # | Item | Effort | Impact |
|---|------|--------|--------|
| 5 | Expand test coverage (components + integration) | M | High — confidence in changes |
| 6 | Add localStorage persistence | S | Medium — user retention |
| 7 | Bundle icons at build time | S | Medium — offline support, perf |
| 8 | Add CI pipeline (lint + test + build) | S | High — safety net |
| 9 | Responsive audit for mobile | M | High — mobile-first product |
| 10 | CSS scoping strategy (Modules or BEM) | M | Medium — scalability |

### Nice to Have (Design system maturity)

| # | Item | Effort | Impact |
|---|------|--------|--------|
| 11 | TypeScript migration | L | High — long-term maintainability |
| 12 | Storybook / component playground | M | Medium — documentation |
| 13 | Token package extraction (npm) | M | Medium — cross-platform sync |
| 14 | Lazy loading / code splitting | S | Low — perf (small app) |
| 15 | Build optimization (compression, PWA) | S | Low — nice to have |

---

## Next Steps

1. **Immediate:** Commit this review, create GitHub issues for must-fix items
2. **Short-term (this week):** Implement routing (#1), accessibility fixes (#2), surface transitions (#3)
3. **Medium-term (next sprint):** Test coverage (#5), localStorage (#6), CI pipeline (#8)
4. **Long-term:** TypeScript (#11), Storybook (#12), token extraction (#13)

---

*Generated by gstack /autoplan — Rudic (OpenClaw) on 2026-04-30*
