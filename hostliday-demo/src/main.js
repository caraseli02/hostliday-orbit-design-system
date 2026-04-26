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
  
  // Setup navigation
  setupNavigation()
  
  // Show home by default
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
      const surface = e.target.dataset.surface
      showSurface(surface)
    })
  })
  
  // Card click handlers
  document.querySelectorAll('.card[data-surface]').forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault()
      const surface = card.dataset.surface
      showSurface(surface)
    })
  })
}

function showSurface(surface) {
  currentSurface = surface
  
  // Update nav tabs
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.surface === surface)
  })
  
  // Update surfaces
  document.querySelectorAll('.surface').forEach(surf => {
    surf.classList.toggle('active', surf.id === surface)
  })
}

// Home/Overview
function renderHome() {
  return `
    <div id="home" class="surface home">
      <header>
        <img src="/assets/logos/hostliday-isotype.svg" alt="Hostliday" />
        <span class="crumb">Design System · Orbit</span>
      </header>

      <h1>The trip-coordination layer for Hostliday.</h1>
      <p class="lead">Hostliday Orbit is a single design system with <b>four product surfaces</b> — Explore, Compose, Navigate, Recover — each with its own register but sharing one set of color, type, and motion tokens.</p>
      <p class="meta">Hostliday red · Montserrat + Inter · 4-surface system</p>

      <div class="pricks">
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
        <h2>Four surfaces</h2>
        <div class="desc">Click any card to explore that surface.</div>
        <div class="grid">
          <div class="card explore" data-surface="explore">
            <div class="eye">Explore</div>
            <div class="name">Research & save</div>
            <p>Warm photo-led discovery. Save anything to a trip board. Hero gradient and large display type.</p>
            <div class="arrow">Open surface →</div>
          </div>
          <div class="card compose" data-surface="compose">
            <div class="eye">Compose</div>
            <div class="name">Plan & build</div>
            <p>Day-by-day timeline with Orbit chat alongside. Slot in existing bookings, compare candidates, hold options.</p>
            <div class="arrow">Open surface →</div>
          </div>
          <div class="card navigate" data-surface="navigate">
            <div class="eye">Navigate</div>
            <div class="name">Live trip</div>
            <p>Dark, map-first chrome. Translucent glass panels, mono times, breathing live dot. Terse, time-stamped voice.</p>
            <div class="arrow">Open surface →</div>
          </div>
          <div class="card recover" data-surface="recover">
            <div class="eye">Recover</div>
            <div class="name">When plans change</div>
            <p>Incident view: what broke, what Orbit's already done, three held options, one tap to switch. Humans on call.</p>
            <div class="arrow">Open surface →</div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2>Foundations</h2>
        <div class="desc">Single source of truth: <code style="font-family:var(--font-mono);font-size:12px;background:var(--neutral-100);padding:2px 6px;border-radius:4px;">colors_and_type.css</code>. All tokens are CSS custom properties.</div>
        <div class="pricks">
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
      <div style="position: relative; height: 60vh; min-height: 480px; background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,.55) 100%), url('/assets/imagery/mountain-bedroom-hero.png') center/cover;">
        <div style="position: absolute; bottom: 0; left: 0; right: 0; padding: var(--gutter-desktop); color: var(--fg-on-dark);">
          <div style="max-width: 720px;">
            <h1 class="t-display" style="color: var(--fg-on-dark); margin-bottom: var(--sp-4);">Trips that hold their shape — and stretch when yours doesn't.</h1>
            <p class="t-body" style="color: rgba(255,255,255,.9); font-size: var(--fs-18); margin-bottom: var(--sp-6);">Research, save, and build trips around what you already have. Orbit keeps everything coordinated.</p>
            <div style="display: flex; gap: var(--sp-3);">
              <button class="btn btn-primary">Start exploring</button>
              <button class="btn btn-ghost" style="color: var(--fg-on-dark); border-color: rgba(255,255,255,.3);">Learn more</button>
            </div>
          </div>
        </div>
      </div>
      
      <div style="max-width: 1200px; margin: 0 auto; padding: var(--sp-14) var(--gutter-app);">
        <div style="margin-bottom: var(--sp-8);">
          <h2 class="t-h2">Saved to your trip</h2>
          <p class="t-body-sm">5 places, ready when you are</p>
        </div>
        
        <div class="grid">
          ${renderDestinationCard('Casa do Vale', 'Douro Valley, Portugal', 'stays from €180 / night', '#1F7A4D')}
          ${renderDestinationCard('Sunset Kayaking', 'Lagos, Portugal', '€45 per person', '#2E5C8A')}
          ${renderDestinationCard('Quinta da Pacheca', 'Douro Valley, Portugal', 'Wine tasting · €35', '#B6822E')}
          ${renderDestinationCard('Porto Walking Tour', 'Porto, Portugal', 'Free · 2.5 hours', '#1F7A4D')}
        </div>
      </div>
    </div>
  `
}

function renderDestinationCard(title, location, price, accentColor) {
  return `
    <div class="card" style="border-left-color: ${accentColor};">
      <div style="aspect-ratio: 16/10; background: var(--neutral-200); border-radius: var(--r-input); margin-bottom: var(--sp-3);"></div>
      <h3 class="t-h4" style="margin-bottom: var(--sp-1);">${title}</h3>
      <p class="t-caption" style="margin-bottom: var(--sp-2);">${location}</p>
      <p class="t-body-sm" style="color: var(--fg-1); font-weight: 600;">${price}</p>
    </div>
  `
}

// Compose Surface
function renderCompose() {
  return `
    <div id="compose" class="surface">
      <div style="max-width: 1400px; margin: 0 auto; padding: var(--sp-10) var(--gutter-app); display: grid; grid-template-columns: 1fr 380px; gap: var(--sp-6);">
        <div>
          <div style="margin-bottom: var(--sp-6);">
            <h1 class="t-h1">Porto & Douro Valley</h1>
            <p class="t-body-sm">May 12–19, 2026 · 7 nights · 2 travelers</p>
          </div>
          
          <div style="background: var(--bg-surface); border-radius: var(--r-card); padding: var(--sp-6); box-shadow: var(--shadow-card);">
            <h3 class="t-h3" style="margin-bottom: var(--sp-4);">Day-by-day timeline</h3>
            
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
        
        <div>
          <div style="background: var(--bg-surface); border-radius: var(--r-card); padding: var(--sp-5); box-shadow: var(--shadow-card); position: sticky; top: calc(var(--topbar-h) + var(--sp-6));">
            <h3 class="t-h4" style="margin-bottom: var(--sp-4);">Orbit chat</h3>
            
            <div style="display: flex; flex-direction: column; gap: var(--sp-4); margin-bottom: var(--sp-5); max-height: 400px; overflow-y: auto;">
              ${renderChatMessage('orbit', 'I noticed your flight lands at 14:30. Two of the stays you saved have late check-in. Pin one?')}
              ${renderChatMessage('user', 'Show me the Porto options')}
              ${renderChatMessage('orbit', 'Porto Boutique Hotel is €120/night, 12min from airport. Casa do Norte is €95/night, 18min. Both have 24h check-in.')}
            </div>
            
            <input type="text" class="input" placeholder="Ask Orbit anything..." />
          </div>
        </div>
      </div>
    </div>
  `
}

function renderTimelineDay(date, title, items) {
  return `
    <div style="margin-bottom: var(--sp-6);">
      <div style="display: flex; align-items: baseline; gap: var(--sp-3); margin-bottom: var(--sp-3);">
        <span class="t-eyebrow">${date}</span>
        <span class="t-body-sm">${title}</span>
      </div>
      <div style="display: flex; flex-direction: column; gap: var(--sp-3); padding-left: var(--sp-6); border-left: 2px solid var(--border-1);">
        ${items.map(item => `
          <div style="display: flex; gap: var(--sp-4); align-items: start;">
            <span class="t-mono" style="color: var(--fg-3); min-width: 48px;">${item.time}</span>
            <div style="flex: 1;">
              <div style="display: flex; align-items: center; gap: var(--sp-2);">
                <span class="t-body" style="font-weight: 600;">${item.title}</span>
                <span style="width: 6px; height: 6px; border-radius: 50%; background: ${getStatusColor(item.status)};"></span>
              </div>
              <p class="t-caption">${item.subtitle}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `
}

function renderChatMessage(sender, text) {
  const isOrbit = sender === 'orbit'
  return `
    <div style="display: flex; gap: var(--sp-2); ${isOrbit ? '' : 'flex-direction: row-reverse;'}">
      <div style="width: 32px; height: 32px; border-radius: 50%; background: ${isOrbit ? 'var(--hostliday-red-500)' : 'var(--neutral-300)'}; flex-shrink: 0;"></div>
      <div style="background: ${isOrbit ? 'var(--neutral-100)' : 'var(--hostliday-red-50)'}; padding: var(--sp-3); border-radius: var(--r-input); max-width: 80%;">
        <p class="t-body-sm">${text}</p>
      </div>
    </div>
  `
}

function getStatusColor(status) {
  const colors = {
    confirmed: 'var(--status-confirmed)',
    held: 'var(--status-held)',
    planned: 'var(--neutral-400)',
    live: 'var(--status-live)'
  }
  return colors[status] || 'var(--neutral-400)'
}

// Navigate Surface
function renderNavigate() {
  return `
    <div id="navigate" class="surface orbit-dark" style="background: var(--bg-canvas); min-height: calc(100vh - var(--topbar-h));">
      <div style="position: relative; height: calc(100vh - var(--topbar-h)); background: #1a1d24;">
        <!-- Map placeholder -->
        <div style="position: absolute; inset: 0; background: linear-gradient(135deg, #0E1117 0%, #1B1F27 100%); display: flex; align-items: center; justify-content: center;">
          <p class="t-caption" style="color: var(--fg-3);">Map view (Mapbox integration)</p>
        </div>
        
        <!-- Live location panel -->
        <div class="glass" style="position: absolute; top: var(--sp-6); left: var(--sp-6); right: var(--sp-6); max-width: 420px; padding: var(--sp-5); border-radius: var(--r-card);">
          <div style="display: flex; align-items: center; gap: var(--sp-3); margin-bottom: var(--sp-4);">
            <div style="width: 12px; height: 12px; border-radius: 50%; background: var(--status-live); position: relative;">
              <div class="orbit-breathe" style="position: absolute; inset: -4px; border-radius: 50%; background: var(--status-live);"></div>
            </div>
            <span class="t-eyebrow" style="color: var(--status-live);">Live</span>
          </div>
          
          <h2 class="t-h3" style="margin-bottom: var(--sp-2);">Your driver is 4 minutes away</h2>
          <p class="t-body-sm" style="margin-bottom: var(--sp-4);">Black Skoda · 22-AB-94</p>
          
          <div style="display: flex; gap: var(--sp-3);">
            <button class="btn btn-primary">Call driver</button>
            <button class="btn btn-ghost" style="color: var(--fg-1); border-color: var(--border-1);">Cancel ride</button>
          </div>
        </div>
        
        <!-- Next leg panel -->
        <div class="glass" style="position: absolute; bottom: var(--sp-6); left: var(--sp-6); right: var(--sp-6); padding: var(--sp-5); border-radius: var(--r-card);">
          <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: var(--sp-4);">
            <div>
              <span class="t-eyebrow">Next</span>
              <h3 class="t-h3" style="margin-top: var(--sp-1);">Train to Coimbra</h3>
            </div>
            <span class="t-time">14:08</span>
          </div>
          
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--sp-4); padding: var(--sp-4); background: var(--bg-surface-alt); border-radius: var(--r-input);">
            <div>
              <p class="t-caption">Platform</p>
              <p class="t-mono" style="font-size: var(--fs-20); margin-top: var(--sp-1);">6</p>
            </div>
            <div>
              <p class="t-caption">Walk time</p>
              <p class="t-mono" style="font-size: var(--fs-20); margin-top: var(--sp-1);">12 min</p>
            </div>
            <div>
              <p class="t-caption">Seat</p>
              <p class="t-mono" style="font-size: var(--fs-20); margin-top: var(--sp-1);">24A</p>
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
      <div style="background: var(--status-critical-bg); padding: var(--sp-10) var(--gutter-app); border-bottom: 1px solid var(--hostliday-red-200);">
        <div style="max-width: 800px; margin: 0 auto;">
          <div style="display: flex; align-items: center; gap: var(--sp-2); margin-bottom: var(--sp-3);">
            <span style="width: 8px; height: 8px; border-radius: 50%; background: var(--status-critical);"></span>
            <span class="t-eyebrow" style="color: var(--status-critical);">Incident</span>
          </div>
          <h1 class="t-display" style="font-size: var(--fs-48); margin-bottom: var(--sp-4);">Your flight is delayed 2 hours</h1>
          <p class="t-body" style="font-size: var(--fs-18);">TAP TP1234 · Porto → Lisbon · Now departing 16:30</p>
        </div>
      </div>
      
      <div style="max-width: 1000px; margin: 0 auto; padding: var(--sp-10) var(--gutter-app);">
        <div style="margin-bottom: var(--sp-8);">
          <h2 class="t-h2" style="margin-bottom: var(--sp-3);">What Orbit's already done</h2>
          <div style="background: var(--bg-surface); border-radius: var(--r-card); padding: var(--sp-5); box-shadow: var(--shadow-card);">
            ${renderActionLog([
              { time: '14:12', action: 'Detected delay', status: 'Monitoring TAP TP1234' },
              { time: '14:14', action: 'Held backup options', status: '3 alternative flights' },
              { time: '14:15', action: 'Contacted hotel', status: 'Late check-in confirmed' },
              { time: '14:16', action: 'Refund initiated', status: '€45 compensation in flight' }
            ])}
          </div>
        </div>
        
        <div style="margin-bottom: var(--sp-8);">
          <h2 class="t-h2" style="margin-bottom: var(--sp-3);">Three options held for you</h2>
          <div style="display: grid; gap: var(--sp-4);">
            ${renderRecoveryOption('Wait for your flight', '16:30 departure · Arrives 17:45', 'No extra cost · Hotel notified', true)}
            ${renderRecoveryOption('Switch to earlier flight', '15:20 departure · Arrives 16:35', '+€35 · Seats available', false)}
            ${renderRecoveryOption('Train instead', '15:45 departure · Arrives 19:20', '+€28 · Scenic route', false)}
          </div>
        </div>
        
        <div style="background: var(--status-held-bg); border: 1px solid var(--status-held); border-radius: var(--r-card); padding: var(--sp-5);">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <h3 class="t-h4" style="margin-bottom: var(--sp-1);">Need to talk to a human?</h3>
              <p class="t-body-sm">Our team is standing by · Average wait: 2 minutes</p>
            </div>
            <button class="btn btn-primary">Call now</button>
          </div>
        </div>
      </div>
    </div>
  `
}

function renderActionLog(actions) {
  return `
    <div style="display: flex; flex-direction: column; gap: var(--sp-3);">
      ${actions.map(action => `
        <div style="display: flex; gap: var(--sp-4); align-items: start;">
          <span class="t-mono" style="color: var(--fg-3); min-width: 48px;">${action.time}</span>
          <div style="flex: 1;">
            <p class="t-body" style="font-weight: 600; margin-bottom: var(--sp-1);">${action.action}</p>
            <p class="t-caption">${action.status}</p>
          </div>
          <span style="color: var(--status-confirmed);">✓</span>
        </div>
      `).join('')}
    </div>
  `
}

function renderRecoveryOption(title, time, cost, recommended) {
  return `
    <div class="card" style="border-left-color: ${recommended ? 'var(--status-confirmed)' : 'var(--neutral-300)'}; cursor: pointer;">
      ${recommended ? '<div class="eye" style="color: var(--status-confirmed);">Recommended</div>' : ''}
      <h3 class="t-h3" style="margin-bottom: var(--sp-2);">${title}</h3>
      <p class="t-body-sm" style="margin-bottom: var(--sp-1);">${time}</p>
      <p class="t-caption">${cost}</p>
      <div style="margin-top: var(--sp-4);">
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
      <h1 class="t-display" style="margin-bottom: var(--sp-10);">Component Library</h1>
      
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
        <div class="type-sample">
          <h1 class="t-display">Display heading</h1>
        </div>
        <div class="type-sample">
          <h2 class="t-h2">Heading 2</h2>
        </div>
        <div class="type-sample">
          <h3 class="t-h3">Heading 3</h3>
        </div>
        <div class="type-sample">
          <p class="t-body">Body text — Inter Regular 16px. The quick brown fox jumps over the lazy dog.</p>
        </div>
        <div class="type-sample">
          <p class="t-body-sm">Body small — Inter Regular 14px. Secondary information and descriptions.</p>
        </div>
        <div class="type-sample">
          <p class="t-caption">Caption — Inter Medium 12px. Tertiary information and metadata.</p>
        </div>
        <div class="type-sample">
          <p class="t-eyebrow">Eyebrow</p>
        </div>
        <div class="type-sample">
          <p class="t-mono">14:08 · Platform 6 · Seat 24A</p>
        </div>
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
        <div style="max-width: 400px;">
          <input type="text" class="input" placeholder="Enter destination..." />
        </div>
      </div>
      
      <div class="showcase-section">
        <h2>Cards</h2>
        <div class="grid">
          <div class="card explore">
            <div class="eye">Explore</div>
            <div class="name">Card title</div>
            <p>Card description with some details about the content.</p>
          </div>
          <div class="card compose">
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
    <div class="color-swatch" style="background: ${color};">
      <div class="label">${label}</div>
    </div>
  `
}

// Start the app
init()
