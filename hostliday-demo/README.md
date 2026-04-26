# Hostliday Orbit Design System - MVP Demo

This is a live, interactive demo of the Hostliday Orbit Design System built with Vite+ and vanilla JavaScript.

## 🚀 Running the Demo

The dev server is already running at: **http://localhost:5173/**

Open this URL in your browser to explore the design system.

## 📱 What's Included

### Four Product Surfaces

1. **Explore** - Warm photo-led discovery interface
   - Hero imagery with gradient overlays
   - Destination cards with save functionality
   - Warm, evocative copy

2. **Compose** - Trip planning interface
   - Day-by-day timeline view
   - Orbit AI chat sidebar
   - Booking status indicators
   - Pragmatic, consultative voice

3. **Navigate** - Live trip interface (dark mode)
   - Map-first dark chrome
   - Translucent glass panels
   - Live location tracking
   - Monospace times and codes
   - Terse, time-stamped voice

4. **Recover** - Incident management
   - Critical status alerts
   - Action log timeline
   - Alternative options
   - Human escalation
   - Direct, accountable voice

### Component Library

- **Colors**: Brand reds, warm neutrals, status colors
- **Typography**: Montserrat (display), Inter (body), JetBrains Mono (monospace)
- **Buttons**: Primary, secondary, ghost variants
- **Form inputs**: Text fields with focus states
- **Cards**: Surface-specific accent colors

## 🎨 Design Tokens

All design tokens are defined in `src/colors_and_type.css` as CSS custom properties:

- Colors: `--hostliday-red-500`, `--neutral-100`, etc.
- Typography: `--font-display`, `--font-body`, `--font-mono`
- Spacing: `--sp-1` through `--sp-30`
- Radii: `--r-chip`, `--r-input`, `--r-card`, `--r-sheet`
- Shadows: `--shadow-card`, `--shadow-pop`, `--shadow-modal`
- Motion: `--ease-orbit`, `--dur-micro`, `--dur-base`

## 🛠️ Development Commands

```bash
# Start dev server (already running)
vp dev

# Build for production
vp build

# Preview production build
vp preview

# Format code
vp fmt

# Lint code
vp lint
```

## 📁 Project Structure

```
hostliday-demo/
├── public/
│   ├── assets/          # Logos, imagery
│   └── fonts/           # Self-hosted webfonts
├── src/
│   ├── colors_and_type.css  # Design tokens
│   ├── style.css            # Component styles
│   └── main.js              # App logic & surfaces
└── index.html
```

## 🎯 Key Features

- **No framework dependencies** - Pure vanilla JavaScript
- **CSS custom properties** - All tokens are CSS variables
- **Responsive design** - Mobile-first approach
- **Dark mode support** - Navigate surface uses `.orbit-dark` class
- **Interactive navigation** - Click cards or tabs to switch surfaces
- **Live animations** - Breathing pulse on Navigate surface

## 📝 Notes

- This is a prototype/demo - not production-ready code
- Designed to showcase the design system visually
- All surfaces are interactive and navigable
- Map integration on Navigate is a placeholder
- Chat functionality on Compose is visual only

## 🔗 Original Design System

See `../project/` for the complete design system documentation:
- `README.md` - Full design system documentation
- `SKILL.md` - Quick reference guide
- `colors_and_type.css` - Token definitions
- `ui_kits/` - Original React prototypes

## 🎨 Design Principles

1. **Warm red as hero color** - Hostliday gradient (#DA0000 → #810000)
2. **Four distinct registers** - Each surface has its own voice
3. **Photography-led** - Warm, golden-hour imagery
4. **Quiet competence** - No hype, no emoji
5. **Sentence case everywhere** - Except the wordmark
6. **Verbs over nouns** - Action-oriented language

Enjoy exploring the Hostliday Orbit Design System! 🚀
