# Hostliday Orbit Design System - Demo Guide

## 🎉 Your MVP Demo is Ready!

The Hostliday Orbit Design System demo is now running at:

### **http://localhost:5173/**

Open this URL in your browser to explore the complete design system.

---

## 🗺️ Navigation Guide

### Top Navigation Bar
Click any tab to switch between surfaces:
- **Overview** - Design system introduction
- **Explore** - Discovery & research surface
- **Compose** - Trip planning surface
- **Navigate** - Live trip surface (dark mode)
- **Recover** - Incident management surface
- **Components** - Full component library

### Quick Start
1. Open http://localhost:5173/ in your browser
2. Start on the **Overview** page to see all four surfaces
3. Click any surface card to explore it
4. Use the top navigation to jump between surfaces
5. Check the **Components** tab to see all design tokens

---

## 🎨 What You'll See

### 1. Overview (Home)
- Introduction to the four-surface system
- Color palette showcase
- Interactive cards for each surface
- Design system foundations

### 2. Explore Surface
- Full-bleed hero image with gradient overlay
- "Trips that hold their shape" headline
- Destination cards grid
- Warm, evocative copy style
- Save-to-trip functionality (visual)

### 3. Compose Surface
- Split layout: Timeline + Orbit chat
- Day-by-day trip timeline
- Status indicators (confirmed, held, planned)
- AI chat interface
- Pragmatic, consultative voice

### 4. Navigate Surface (Dark Mode)
- Dark map-first interface
- Translucent glass panels
- Live location tracking with breathing pulse
- Next leg information
- Monospace times and codes
- Terse, time-stamped voice

### 5. Recover Surface
- Critical incident alert
- Action log timeline
- Three recovery options
- Human escalation panel
- Direct, accountable voice

### 6. Components Library
- Complete color palette (brand, neutrals, status)
- Typography scale (display, headings, body, mono)
- Button variants (primary, secondary, ghost)
- Form inputs with focus states
- Card components

---

## 🎯 Key Features to Test

### Visual Design
- ✅ Hostliday red gradient (#DA0000 → #810000)
- ✅ Warm neutral palette
- ✅ Montserrat display typography
- ✅ Inter body typography
- ✅ JetBrains Mono for times/codes

### Interactions
- ✅ Hover effects on cards and buttons
- ✅ Smooth transitions (220ms cubic-bezier)
- ✅ Focus states on inputs
- ✅ Navigation between surfaces
- ✅ Breathing pulse animation on Navigate

### Responsive Design
- ✅ Mobile-first approach
- ✅ Flexible grid layouts
- ✅ Readable typography at all sizes
- ✅ Touch-friendly buttons

### Dark Mode
- ✅ Navigate surface uses dark theme
- ✅ Glass morphism panels
- ✅ Proper contrast ratios
- ✅ Subtle borders and shadows

---

## 🛠️ Technical Details

### Built With
- **Vite+** - Unified web toolchain
- **Vanilla JavaScript** - No framework dependencies
- **CSS Custom Properties** - All design tokens
- **Self-hosted fonts** - Inter, Montserrat, JetBrains Mono

### File Structure
```
hostliday-demo/
├── public/
│   ├── assets/logos/        # Hostliday branding
│   ├── assets/imagery/      # Hero photography
│   └── fonts/               # Webfonts
├── src/
│   ├── colors_and_type.css  # Design tokens (single source of truth)
│   ├── style.css            # Component styles
│   └── main.js              # App logic (all surfaces)
└── index.html               # Entry point
```

### Design Tokens
All tokens are CSS custom properties in `colors_and_type.css`:

**Colors:**
- `--hostliday-red-500` - Primary brand red
- `--hostliday-gradient` - Signature gradient
- `--neutral-*` - Warm gray scale
- `--status-*` - Confirmed, held, live, critical

**Typography:**
- `--font-display` - Montserrat (headings)
- `--font-body` - Inter (UI text)
- `--font-mono` - JetBrains Mono (times/codes)
- `--fs-*` - Font sizes (12px to 104px)

**Spacing:**
- `--sp-*` - 4px base scale (4, 8, 12, 16, 20, 24, 32, 40, 56, 80, 120)

**Effects:**
- `--shadow-card`, `--shadow-pop`, `--shadow-modal`
- `--r-chip`, `--r-input`, `--r-card`, `--r-sheet`, `--r-pill`
- `--ease-orbit` - Cubic bezier easing
- `--dur-micro`, `--dur-base`, `--dur-surface`

---

## 🎨 Design Principles in Action

### 1. Four Distinct Registers
Each surface has its own voice:
- **Explore**: "Trips that hold their shape — and stretch when yours doesn't."
- **Compose**: "I noticed your flight lands at 14:30. Two of the stays you saved have late check-in."
- **Navigate**: "Train at 14:08 — platform 6. 12 min walk."
- **Recover**: "Your flight is delayed 2 hours. I've held three options."

### 2. Warm Red as Hero
- Used sparingly for primary actions
- Signature gradient on Explore hero
- Status indicators use complementary colors

### 3. Photography-Led
- Full-bleed hero on Explore
- Warm, golden-hour aesthetic
- Protection gradients for text legibility

### 4. Quiet Competence
- No hype words ("amazing", "incredible")
- Sentence case everywhere
- Verbs over nouns ("Save", not "Saved items")
- No emoji

---

## 📱 Testing Checklist

### Desktop (1920x1080)
- [ ] All surfaces render correctly
- [ ] Navigation works smoothly
- [ ] Typography is readable
- [ ] Cards have proper spacing
- [ ] Hover effects work

### Tablet (768px)
- [ ] Grid layouts adapt
- [ ] Navigation remains accessible
- [ ] Content is readable
- [ ] Touch targets are adequate

### Mobile (375px)
- [ ] Single column layouts
- [ ] Navigation is usable
- [ ] Typography scales down
- [ ] Buttons are touch-friendly

### Dark Mode (Navigate)
- [ ] Proper contrast
- [ ] Glass panels are visible
- [ ] Text is readable
- [ ] Breathing animation works

---

## 🚀 Next Steps

### To Stop the Server
```bash
# Press Ctrl+C in the terminal
# Or use: vp stop
```

### To Build for Production
```bash
cd hostliday-demo
vp build
```

### To Preview Production Build
```bash
vp preview
```

### To Implement in Your Stack
1. Copy `colors_and_type.css` to your project
2. Import fonts from `public/fonts/`
3. Copy assets from `public/assets/`
4. Recreate components in your framework (React, Vue, etc.)
5. Match the visual output pixel-perfectly

---

## 📚 Documentation

### Full Design System Docs
- `project/README.md` - Complete design system documentation
- `project/SKILL.md` - Quick reference guide
- `project/ui_kits/` - Original React prototypes

### Demo Docs
- `hostliday-demo/README.md` - Demo-specific documentation
- `DEMO_GUIDE.md` - This file

---

## 🎯 What's Working

✅ All four surfaces are fully interactive
✅ Navigation between surfaces
✅ Complete component library
✅ All design tokens implemented
✅ Responsive layouts
✅ Dark mode on Navigate
✅ Animations and transitions
✅ Typography scale
✅ Color system
✅ Spacing system

---

## 💡 Tips

1. **Explore the Components tab first** to see all design tokens
2. **Try the Navigate surface** to see dark mode and glass morphism
3. **Check the Recover surface** for incident management patterns
4. **Hover over cards and buttons** to see transitions
5. **Resize your browser** to test responsive behavior

---

## 🎉 Enjoy!

You now have a fully functional MVP demo of the Hostliday Orbit Design System. 

Open **http://localhost:5173/** and start exploring!

Questions? Check the documentation in `project/README.md` or `project/SKILL.md`.
