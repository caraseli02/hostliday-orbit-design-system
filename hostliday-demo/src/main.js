import './colors_and_type.css'
import './style.css'

// Router state
let currentSurface = 'home'

// Initialize app
function init() {
  const app = document.querySelector('#app')
  app.innerHTML = `
    ${renderNav()}
    <main class="main">
      ${renderHome()}
      ${renderExplore()}
      ${renderCompose()}
      ${renderNavigate()}
      ${renderRecover()}
      ${renderComponents()}
    </main>
  `

  setupNavigation()
  showSurface('home')
}

// Navigation
function renderNav() {
  return `
    <nav class="nav">
      <img src="/assets/logos/hostliday-wordmark.svg" alt="Hostliday" class="nav-logo" />
      <div class="nav-tabs">
        <button class="nav-tab" data-surface="home">Overview</button>
        <button class="nav-tab" data-surface="explore">Explore</button>
        <button class="nav-tab" data-surface="compose">Compose</button>
        <button class="nav-tab" data-surface="navigate">Navigate</button>
        <button class="nav-tab" data-surface="recover">Recover</button>
        <button class="nav-tab" data-surface="components">Components</button>
      </div>
    </nav>
  `
}

function setupNavigation() {
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      showSurface(e.target.dataset.surface)
    })
  })

  document.querySelectorAll('[data-surface]').forEach(el => {
    if (el.classList.contains('nav-tab')) return
    el.addEventListener('click', (e) => {
      e.preventDefault()
      const surface = el.dataset.surface
      showSurface(surface)
    })
  })
}

function showSurface(surface) {
  currentSurface = surface

  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.surface === surface)
  })

  document.querySelectorAll('.surface').forEach(surf => {
    const isActive = surf.id === surface
    if (isActive) {
      surf.style.display = 'block'
      // Trigger reflow for animation
      surf.offsetHeight
      surf.classList.add('active')
    } else {
      surf.classList.remove('active')
      // Wait for fade out, then hide
      setTimeout(() => {
        if (!surf.classList.contains('active')) {
          surf.style.display = 'none'
        }
      }, 360)
    }
  })
}

// Home/Overview
function renderHome() {
  return `
    <div id="home" class="surface home">
      <header class="home-header">
        <img src="/assets/logos/hostliday-isotype.svg" alt="Hostliday" />
        <span class="home-crumb">Design System · Orbit</span>
      </header>

      <h1>The trip-coordination layer for Hostliday.</h1>
      <p class="home-lead">Hostliday Orbit is a single design system with <b>four product surfaces</b> — Explore, Compose, Navigate, Recover — each with its own register but sharing one set of color, type, and motion tokens.</p>
      <p class="home-meta">Hostliday red · Montserrat + Inter · 4-surface system</p>

      <div class="swatch-row">
        <span class="lbl">Palette</span>
        <span class="swatch" style="background:#DA0000"></span>
        <span class="swatch" style="background:#BE0000"></span>
        <span class="swatch" style="background:#810000"></span>
        <span class="swatch" style="background:#000000"></span>
        <span class="swatch" style="background:#A3A2A2"></span>
        <span class="swatch" style="background:#E1DFDD"></span>
        <span class="swatch" style="background:#FAF8F6"></span>
      </div>

      <section class="section">
        <div class="section-head">
          <h2>Four surfaces</h2>
          <p class="section-desc">Click any card to explore that surface.</p>
        </div>
        <div class="grid stagger">
          <div class="surface-card explore" data-surface="explore">
            <div class="eye">Explore</div>
            <div class="name">Research & save</div>
            <p>Warm photo-led discovery. Save anything to a trip board. Hero gradient and large display type.</p>
            <span class="arrow">Open surface &rarr;</span>
          </div>
          <div class="surface-card compose" data-surface="compose">
            <div class="eye">Compose</div>
            <div class="name">Plan & build</div>
            <p>Day-by-day timeline with Orbit chat alongside. Slot in existing bookings, compare candidates, hold options.</p>
            <span class="arrow">Open surface &rarr;</span>
          </div>
          <div class="surface-card navigate" data-surface="navigate">
            <div class="eye">Navigate</div>
            <div class="name">Live trip</div>
            <p>Dark, map-first chrome. Translucent glass panels, mono times, breathing live dot. Terse, time-stamped voice.</p>
            <span class="arrow">Open surface &rarr;</span>
          </div>
          <div class="surface-card recover" data-surface="recover">
            <div class="eye">Recover</div>
            <div class="name">When plans change</div>
            <p>Incident view: what broke, what Orbit's already done, three held options, one tap to switch. Humans on call.</p>
            <span class="arrow">Open surface &rarr;</span>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-head">
          <h2>Foundations</h2>
          <p class="section-desc">Single source of truth: <code style="font-family:var(--font-mono);font-size:12px;background:var(--neutral-100);padding:2px 6px;border-radius:4px;">colors_and_type.css</code>. All tokens are CSS custom properties.</p>
        </div>
        <div class="swatch-row">
          <span class="lbl">Status</span>
          <span class="swatch" style="background:#1F7A4D" title="Confirmed"></span>
          <span class="swatch" style="background:#B6822E" title="Held"></span>
          <span class="swatch" style="background:#BE0000" title="Critical"></span>
          <span class="swatch" style="background:#2E5C8A" title="Live"></span>
        </div>
      </section>
    </div>
  `
}

// Explore Surface
function renderExplore() {
  return `
    <div id="explore" class="surface">
      <div class="explore-hero">
        <div class="explore-hero-content">
          <div class="explore-hero-inner">
            <h1 class="t-display">Trips that hold their shape — and stretch when yours doesn't.</h1>
            <p class="explore-hero-body">Research, save, and build trips around what you already have. Orbit keeps everything coordinated.</p>
            <div class="explore-actions">
              <button class="btn btn-primary">Start exploring</button>
              <button class="btn btn-ghost" style="color:var(--fg-on-dark);border-color:rgba(255,255,255,.3);">Learn more</button>
            </div>
          </div>
        </div>
      </div>

      <div class="explore-saved">
        <div class="explore-saved-header">
          <h2 class="t-h2">Saved to your trip</h2>
          <p class="t-body-sm">5 places, ready when you are</p>
        </div>

        <div class="grid stagger">
          ${renderDestCard('Casa do Vale', 'Douro Valley, Portugal', 'stays from €180 / night', '#1F7A4D', 'Saved')}
          ${renderDestCard('Sunset Kayaking', 'Lagos, Portugal', '€45 per person', '#2E5C8A', 'Activity')}
          ${renderDestCard('Quinta da Pacheca', 'Douro Valley, Portugal', 'Wine tasting · €35', '#B6822E', 'Held')}
          ${renderDestCard('Porto Walking Tour', 'Porto, Portugal', 'Free · 2.5 hours', '#1F7A4D', 'Saved')}
        </div>
      </div>
    </div>
  `
}

function renderDestCard(title, location, price, accentColor, tag) {
  return `
    <div class="dest-card">
      <div class="dest-card-image" style="background:var(--neutral-150);">
        <span class="accent-tag" style="background:${accentColor};">${tag}</span>
      </div>
      <div class="dest-card-body">
        <h3>${title}</h3>
        <p class="location">${location}</p>
        <p class="price">${price}</p>
      </div>
    </div>
  `
}

// Compose Surface
function renderCompose() {
  return `
    <div id="compose" class="surface">
      <div class="compose-layout">
        <div>
          <div class="compose-header">
            <h1 class="t-h1">Porto & Douro Valley</h1>
            <p class="trip-meta">May 12–19, 2026 · 7 nights · 2 travelers</p>
          </div>

          <div class="compose-timeline stagger">
            <h3 class="t-h3" style="margin-bottom:var(--sp-6);">Day-by-day timeline</h3>

            ${renderTimelineDay('May 12', 'Arrival in Porto', [
              { time: '14:30', title: 'Flight lands', subtitle: 'TAP Air Portugal · TP1234', status: 'confirmed' },
              { time: '16:00', title: 'Check-in', subtitle: 'Porto Boutique Hotel', status: 'confirmed' }
            ])}

            ${renderTimelineDay('May 13', 'Porto exploration', [
              { time: '10:00', title: 'Walking tour', subtitle: 'Historic center · 2.5h', status: 'held' },
              { time: '19:30', title: 'Dinner reservation', subtitle: 'Casa Guedes', status: 'confirmed' }
            ])}

            ${renderTimelineDay('May 14', 'Douro Valley', [
              { time: '09:00', title: 'Drive to Douro', subtitle: '1h 30min', status: 'planned' },
              { time: '11:00', title: 'Wine tasting', subtitle: 'Quinta da Pacheca', status: 'held' }
            ])}
          </div>
        </div>

        <div class="chat-panel">
          <h3 class="t-h4" style="margin-bottom:var(--sp-4);">Orbit chat</h3>

          <div class="chat-messages stagger">
            ${renderChatMsg('orbit', 'I noticed your flight lands at 14:30. Two of the stays you saved have late check-in. Pin one?')}
            ${renderChatMsg('user', 'Show me the Porto options')}
            ${renderChatMsg('orbit', 'Porto Boutique Hotel is €120/night, 12min from airport. Casa do Norte is €95/night, 18min. Both have 24h check-in.')}
          </div>

          <input type="text" class="input" placeholder="Ask Orbit anything..." />
        </div>
      </div>
    </div>
  `
}

function renderTimelineDay(date, title, items) {
  return `
    <div class="timeline-day">
      <div class="timeline-day-header">
        <span class="t-eyebrow">${date}</span>
        <span class="t-body-sm">${title}</span>
      </div>
      <div class="timeline-items">
        ${items.map(item => `
          <div class="timeline-item" data-status="${item.status}">
            <span class="timeline-item-time">${item.time}</span>
            <div class="timeline-item-content">
              <div class="timeline-item-title">${item.title}</div>
              <div class="timeline-item-sub">${item.subtitle}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `
}

function renderChatMsg(sender, text) {
  const isOrbit = sender === 'orbit'
  return `
    <div class="chat-msg ${sender}">
      <div class="chat-avatar ${isOrbit ? 'orbit' : 'user'}">${isOrbit ? 'O' : 'You'}</div>
      <div class="chat-bubble">${text}</div>
    </div>
  `
}

// Navigate Surface
function renderNavigate() {
  return `
    <div id="navigate" class="surface orbit-dark navigate-surface">
      <div class="navigate-map">
        <div class="navigate-map-placeholder">
          <span class="t-caption" style="color:var(--fg-4);">Map view · Mapbox integration</span>
        </div>

        <div class="glass-panel live-panel stagger">
          <div class="live-header">
            <div class="live-dot-wrapper">
              <div class="live-dot"></div>
              <div class="live-dot-ring"></div>
            </div>
            <span class="t-eyebrow" style="color:var(--status-live);">Live</span>
          </div>

          <h2 class="t-h3" style="margin-bottom:var(--sp-2);">Your driver is 4 minutes away</h2>
          <p class="t-body-sm" style="margin-bottom:var(--sp-5);">Black Skoda · 22-AB-94</p>

          <div class="navigate-actions">
            <button class="btn btn-primary">Call driver</button>
            <button class="btn btn-ghost-on-dark">Cancel ride</button>
          </div>
        </div>

        <div class="glass-panel next-panel">
          <div class="next-header">
            <div>
              <span class="t-eyebrow">Next</span>
              <h3 class="t-h3" style="margin-top:var(--sp-1);">Train to Coimbra</h3>
            </div>
            <span class="t-time">14:08</span>
          </div>

          <div class="next-stats">
            <div>
              <p class="next-stat-label">Platform</p>
              <p class="next-stat-value">6</p>
            </div>
            <div>
              <p class="next-stat-label">Walk time</p>
              <p class="next-stat-value">12 min</p>
            </div>
            <div>
              <p class="next-stat-label">Seat</p>
              <p class="next-stat-value">24A</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
}

// Recover Surface
function renderRecover() {
  return `
    <div id="recover" class="surface">
      <div class="recover-alert">
        <div class="recover-alert-inner">
          <div class="recover-incident-label">
            <span class="recover-incident-dot"></span>
            <span class="t-eyebrow" style="color:var(--status-critical);">Incident</span>
          </div>
          <h1 class="t-display" style="font-size:var(--fs-48);margin-bottom:var(--sp-4);">Your flight is delayed 2 hours</h1>
          <p class="t-body" style="font-size:var(--fs-18);">TAP TP1234 · Porto → Lisbon · Now departing 16:30</p>
        </div>
      </div>

      <div class="recover-content">
        <div style="margin-bottom:var(--sp-8);">
          <h2 class="t-h2" style="margin-bottom:var(--sp-4);">What Orbit's already done</h2>
          <div class="action-log stagger">
            ${renderActionItem('14:12', 'Detected delay', 'Monitoring TAP TP1234')}
            ${renderActionItem('14:14', 'Held backup options', '3 alternative flights')}
            ${renderActionItem('14:15', 'Contacted hotel', 'Late check-in confirmed')}
            ${renderActionItem('14:16', 'Refund initiated', '€45 compensation in flight')}
          </div>
        </div>

        <div style="margin-bottom:var(--sp-8);">
          <h2 class="t-h2" style="margin-bottom:var(--sp-4);">Three options held for you</h2>
          <div class="stagger" style="display:grid;gap:var(--sp-4);">
            ${renderRecoveryOption('Wait for your flight', '16:30 departure · Arrives 17:45', 'No extra cost · Hotel notified', true)}
            ${renderRecoveryOption('Switch to earlier flight', '15:20 departure · Arrives 16:35', '+€35 · Seats available', false)}
            ${renderRecoveryOption('Train instead', '15:45 departure · Arrives 19:20', '+€28 · Scenic route', false)}
          </div>
        </div>

        <div class="escalation-panel">
          <div class="escalation-inner">
            <div>
              <h3 class="t-h4" style="margin-bottom:var(--sp-1);">Need to talk to a human?</h3>
              <p class="t-body-sm">Our team is standing by · Average wait: 2 minutes</p>
            </div>
            <button class="btn btn-primary">Call now</button>
          </div>
        </div>
      </div>
    </div>
  `
}

function renderActionItem(time, action, detail) {
  return `
    <div class="action-log-item">
      <span class="action-log-time">${time}</span>
      <div class="action-log-text">
        <p class="action-log-action">${action}</p>
        <p class="action-log-detail">${detail}</p>
      </div>
    </div>
  `
}

function renderRecoveryOption(title, detail, cost, recommended) {
  return `
    <div class="recovery-option ${recommended ? 'recommended' : ''}">
      ${recommended ? '<span class="badge">Recommended</span>' : ''}
      <h3 class="t-h3">${title}</h3>
      <p class="option-detail">${detail}</p>
      <p class="option-cost">${cost}</p>
      <div class="option-action">
        <button class="btn ${recommended ? 'btn-primary' : 'btn-secondary'}">
          ${recommended ? 'Confirm · one tap' : 'Switch to this'}
        </button>
      </div>
    </div>
  `
}

// Components showcase
function renderComponents() {
  return `
    <div id="components" class="surface showcase">
      <h1 class="t-display" style="margin-bottom:var(--sp-10);">Component Library</h1>

      <div class="showcase-section">
        <h2>Colors</h2>
        <h3>Brand</h3>
        <div class="color-grid">
          ${renderColorSwatch('#DA0000', 'red-bright')}
          ${renderColorSwatch('#BE0000', 'red')}
          ${renderColorSwatch('#810000', 'red-deep')}
        </div>

        <h3>Neutrals</h3>
        <div class="color-grid">
          ${renderColorSwatch('#FFFFFF', 'neutral-0')}
          ${renderColorSwatch('#FAF8F6', 'neutral-50')}
          ${renderColorSwatch('#F4F1ED', 'neutral-100')}
          ${renderColorSwatch('#E1DFDD', 'neutral-200')}
          ${renderColorSwatch('#A3A2A2', 'neutral-400')}
          ${renderColorSwatch('#5E5D5C', 'neutral-600')}
          ${renderColorSwatch('#232221', 'neutral-800')}
          ${renderColorSwatch('#000000', 'neutral-1000')}
        </div>

        <h3>Status</h3>
        <div class="color-grid">
          ${renderColorSwatch('#1F7A4D', 'confirmed')}
          ${renderColorSwatch('#B6822E', 'held')}
          ${renderColorSwatch('#2E5C8A', 'live')}
          ${renderColorSwatch('#BE0000', 'critical')}
        </div>
      </div>

      <div class="showcase-section">
        <h2>Typography</h2>
        <div class="type-sample"><h1 class="t-display">Display heading</h1></div>
        <div class="type-sample"><h2 class="t-h2">Heading 2</h2></div>
        <div class="type-sample"><h3 class="t-h3">Heading 3</h3></div>
        <div class="type-sample"><p class="t-body">Body text — Inter Regular 16px. The quick brown fox jumps over the lazy dog.</p></div>
        <div class="type-sample"><p class="t-body-sm">Body small — Inter Regular 14px. Secondary information and descriptions.</p></div>
        <div class="type-sample"><p class="t-caption">Caption — Inter Medium 12px. Tertiary information and metadata.</p></div>
        <div class="type-sample"><p class="t-eyebrow">Eyebrow</p></div>
        <div class="type-sample"><p class="t-mono">14:08 · Platform 6 · Seat 24A</p></div>
      </div>

      <div class="showcase-section">
        <h2>Buttons</h2>
        <div class="button-group">
          <button class="btn btn-primary">Primary button</button>
          <button class="btn btn-secondary">Secondary button</button>
          <button class="btn btn-ghost">Ghost button</button>
        </div>
      </div>

      <div class="showcase-section">
        <h2>Form inputs</h2>
        <div style="max-width:400px;">
          <input type="text" class="input" placeholder="Enter destination..." />
        </div>
      </div>

      <div class="showcase-section">
        <h2>Cards</h2>
        <div class="grid">
          <div class="surface-card explore">
            <div class="eye">Explore</div>
            <div class="name">Card title</div>
            <p>Card description with some details about the content.</p>
          </div>
          <div class="surface-card compose">
            <div class="eye">Compose</div>
            <div class="name">Card title</div>
            <p>Card description with some details about the content.</p>
          </div>
        </div>
      </div>
    </div>
  `
}

function renderColorSwatch(color, label) {
  return `
    <div class="color-swatch" style="background:${color};">
      <div class="label">${label}</div>
    </div>
  `
}

// Start the app
init()
