# Hostliday Orbit Demo - QA Checklist

**Test Date:** 2026-04-26  
**Target URL:** http://localhost:5173/  
**Tester:** _____________

## Pre-Test Setup

- [ ] Dev server is running (`vp dev` in hostliday-demo/)
- [ ] Browser DevTools open (F12)
- [ ] Console tab visible for error monitoring

---

## 1. Overview Page (Home)

### Visual Elements
- [ ] Hostliday logo displays in header
- [ ] "Design System · Orbit" breadcrumb visible
- [ ] Main heading renders: "The trip-coordination layer for Hostliday."
- [ ] Lead paragraph with bold "four product surfaces" displays
- [ ] Color palette swatches (7 colors) render correctly
- [ ] Status color swatches (4 colors) render correctly

### Navigation
- [ ] Top navigation bar is fixed/sticky
- [ ] All 6 tabs visible: Overview, Explore, Compose, Navigate, Recover, Components
- [ ] "Overview" tab is active (highlighted in red)

### Four Surface Cards
- [ ] **Explore card** - red left border, displays correctly
- [ ] **Compose card** - green left border, displays correctly
- [ ] **Navigate card** - blue left border, displays correctly
- [ ] **Recover card** - amber left border, displays correctly
- [ ] Hover effect works (card lifts, shadow increases)
- [ ] Click any card navigates to that surface

### Console Check
- [ ] No JavaScript errors
- [ ] No 404s for assets
- [ ] Fonts load (check Network tab for .woff2 files)

---

## 2. Explore Surface

### Hero Section
- [ ] Full-bleed hero image loads (mountain bedroom)
- [ ] Gradient overlay visible (dark at bottom)
- [ ] Headline readable: "Trips that hold their shape..."
- [ ] Body text readable on dark background
- [ ] "Start exploring" button (red) visible
- [ ] "Learn more" button (ghost/outline) visible
- [ ] Both buttons have hover effects

### Destination Cards Grid
- [ ] Grid displays 4 cards (2x2 on desktop)
- [ ] Each card has:
  - [ ] Gray placeholder image (aspect ratio 16:10)
  - [ ] Title (h4 style)
  - [ ] Location (caption style)
  - [ ] Price (body-sm, bold)
  - [ ] Colored left border (varies by card)
- [ ] Cards have hover effect (lift + shadow)

### Typography
- [ ] Display heading uses Montserrat (bold, large)
- [ ] Body text uses Inter
- [ ] Text is readable on all backgrounds

### Console Check
- [ ] No new errors when navigating to Explore
- [ ] No layout shift (CLS)

---

## 3. Compose Surface

### Layout
- [ ] Two-column layout: Timeline (left) + Chat (right)
- [ ] Timeline column is wider
- [ ] Chat sidebar is sticky (stays visible on scroll)

### Trip Header
- [ ] Trip title: "Porto & Douro Valley"
- [ ] Trip details: dates, nights, travelers

### Timeline
- [ ] Three days displayed (May 12, 13, 14)
- [ ] Each day has:
  - [ ] Date label (eyebrow style, uppercase)
  - [ ] Day title
  - [ ] Timeline items with times (monospace)
  - [ ] Status dots (colored: green/amber/gray)
- [ ] Left border connects timeline items
- [ ] Times align consistently

### Orbit Chat
- [ ] Chat panel has white background
- [ ] "Orbit chat" heading visible
- [ ] 3 chat messages display:
  - [ ] Orbit messages (left-aligned, gray background)
  - [ ] User messages (right-aligned, red tint background)
  - [ ] Avatar circles show (red for Orbit, gray for user)
- [ ] Input field at bottom
- [ ] Placeholder text: "Ask Orbit anything..."

### Interactions
- [ ] Input field is focusable
- [ ] Input has focus ring (red)
- [ ] Scrolling works if content overflows

### Console Check
- [ ] No errors on Compose surface

---

## 4. Navigate Surface (Dark Mode)

### Dark Theme
- [ ] Background is dark (#0E1117 or similar)
- [ ] Text is light/white
- [ ] Proper contrast throughout

### Live Location Panel (Top)
- [ ] Glass panel visible (translucent, blurred background)
- [ ] Live dot (blue) with breathing animation
  - [ ] Animation pulses smoothly (2.4s cycle)
  - [ ] Dot scales and fades
- [ ] "LIVE" label in blue
- [ ] Heading: "Your driver is 4 minutes away"
- [ ] Car details: "Black Skoda · 22-AB-94"
- [ ] Two buttons: "Call driver" (red), "Cancel ride" (ghost)

### Next Leg Panel (Bottom)
- [ ] Glass panel visible
- [ ] "NEXT" eyebrow label
- [ ] Heading: "Train to Coimbra"
- [ ] Time display: "14:08" (monospace, large)
- [ ] Info grid with 3 columns:
  - [ ] Platform: 6
  - [ ] Walk time: 12 min
  - [ ] Seat: 24A
- [ ] All times/codes use monospace font (JetBrains Mono)

### Glass Morphism
- [ ] Panels are semi-transparent
- [ ] Background blur effect visible
- [ ] Border is subtle (rgba white)

### Console Check
- [ ] No errors on Navigate surface
- [ ] Animation runs smoothly (check Performance tab if needed)

---

## 5. Recover Surface

### Incident Alert Banner
- [ ] Red/pink background (#FBEAEA or similar)
- [ ] Red dot indicator
- [ ] "INCIDENT" label in red
- [ ] Large heading: "Your flight is delayed 2 hours"
- [ ] Flight details: "TAP TP1234 · Porto → Lisbon · Now departing 16:30"

### Action Log
- [ ] White card with shadow
- [ ] Heading: "What Orbit's already done"
- [ ] 4 timeline entries:
  - [ ] Time (monospace, gray)
  - [ ] Action (bold)
  - [ ] Status (caption)
  - [ ] Checkmark (green)
- [ ] Times align vertically

### Recovery Options
- [ ] Heading: "Three options held for you"
- [ ] 3 option cards displayed:
  - [ ] **Option 1** (recommended) - green border, "RECOMMENDED" label
  - [ ] **Option 2** - neutral border
  - [ ] **Option 3** - neutral border
- [ ] Each card shows:
  - [ ] Title
  - [ ] Time details
  - [ ] Cost info
  - [ ] Button (primary for recommended, secondary for others)

### Human Escalation Panel
- [ ] Amber/yellow background
- [ ] Amber border
- [ ] Heading: "Need to talk to a human?"
- [ ] Wait time info
- [ ] "Call now" button (red)

### Console Check
- [ ] No errors on Recover surface

---

## 6. Components Library

### Colors Section
- [ ] **Brand colors** - 3 swatches (red gradient)
- [ ] **Neutrals** - 8 swatches (white to black)
- [ ] **Status colors** - 4 swatches (green, amber, blue, red)
- [ ] Each swatch shows color code label
- [ ] Swatches have rounded corners

### Typography Section
- [ ] Display heading sample (Montserrat, very large)
- [ ] H2 sample (Montserrat, large)
- [ ] H3 sample (Inter, medium)
- [ ] Body text sample (Inter, 16px)
- [ ] Body small sample (Inter, 14px)
- [ ] Caption sample (Inter, 12px)
- [ ] Eyebrow sample (uppercase, wide spacing)
- [ ] Monospace sample (JetBrains Mono, tabular numbers)

### Buttons Section
- [ ] Primary button (red background)
- [ ] Secondary button (gray background)
- [ ] Ghost button (transparent, border)
- [ ] All buttons have hover effects

### Form Inputs Section
- [ ] Text input field
- [ ] Placeholder text visible
- [ ] Focus state works (red border + shadow)

### Cards Section
- [ ] 2 example cards (Explore and Compose variants)
- [ ] Cards have colored left borders
- [ ] Hover effects work

### Console Check
- [ ] No errors on Components page

---

## 7. Cross-Surface Tests

### Navigation Between Surfaces
- [ ] Click each tab in sequence
- [ ] Each surface loads correctly
- [ ] Active tab updates (red background)
- [ ] No flash of unstyled content
- [ ] Smooth transitions

### Back/Forward Browser Buttons
- [ ] Browser back button works
- [ ] Browser forward button works
- [ ] URL doesn't change (single-page app)

### Console Monitoring
- [ ] Check console after visiting all surfaces
- [ ] Total error count: _____
- [ ] Any 404s: _____
- [ ] Any warnings: _____

---

## 8. Responsive Design

### Desktop (1920x1080)
- [ ] All surfaces render correctly
- [ ] Grid layouts use 2 columns where appropriate
- [ ] No horizontal scrolling
- [ ] Typography is readable

### Tablet (768px width)
- [ ] Resize browser to 768px wide
- [ ] Grids adapt (may go to 1 column)
- [ ] Navigation remains usable
- [ ] Text remains readable
- [ ] No content cutoff

### Mobile (375px width)
- [ ] Resize browser to 375px wide
- [ ] All grids are single column
- [ ] Navigation tabs may wrap or scroll
- [ ] Buttons are touch-friendly (min 44px)
- [ ] Text is readable (no tiny fonts)

---

## 9. Performance

### Page Load
- [ ] Initial load time: _____ seconds
- [ ] Time to interactive: _____ seconds
- [ ] No long tasks blocking main thread

### Assets
- [ ] Fonts load quickly (check Network tab)
- [ ] Images load (only 1 hero image)
- [ ] No unnecessary requests
- [ ] Total page weight: _____ KB

### Animations
- [ ] Breathing animation on Navigate is smooth (60fps)
- [ ] Hover transitions are smooth
- [ ] No jank or stuttering

---

## 10. Accessibility (Quick Check)

### Keyboard Navigation
- [ ] Tab key moves through interactive elements
- [ ] Focus indicators visible
- [ ] Can navigate entire site with keyboard
- [ ] Enter/Space activates buttons

### Color Contrast
- [ ] Text on light backgrounds is readable
- [ ] Text on dark backgrounds (Navigate) is readable
- [ ] Status colors are distinguishable

### Semantic HTML
- [ ] Headings use proper hierarchy (h1, h2, h3)
- [ ] Buttons are `<button>` elements
- [ ] Links are `<a>` elements

---

## Issues Found

### Critical (Blocks core functionality)
1. _____________________________________________
2. _____________________________________________

### High (Major visual/functional issues)
1. _____________________________________________
2. _____________________________________________

### Medium (Minor issues, workarounds exist)
1. _____________________________________________
2. _____________________________________________

### Low (Cosmetic, nice-to-have fixes)
1. _____________________________________________
2. _____________________________________________

---

## Summary

**Total Issues:** _____  
**Critical:** _____  
**High:** _____  
**Medium:** _____  
**Low:** _____  

**Health Score:** _____ / 100

**Recommendation:**
- [ ] Ready to ship
- [ ] Fix critical issues first
- [ ] Needs more work

**Notes:**
_____________________________________________
_____________________________________________
_____________________________________________

---

## Sign-off

**Tester:** _____________  
**Date:** _____________  
**Time Spent:** _____ minutes
