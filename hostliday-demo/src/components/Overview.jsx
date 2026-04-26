export default function Overview(props) {
  return (
    <div class="home">
      <div class="home-header">
        <img src="/assets/logos/hostliday-wordmark.svg" alt="Hostliday" />
        <span class="home-crumb">Design System · v1</span>
      </div>

      <h1>Hostliday Orbit</h1>
      <p class="home-lead">
        Four product surfaces for <b>AI-powered travel coordination</b>.
        Explore, plan, navigate, and recover — each with its own voice,
        palette, and interaction model.
      </p>
      <div class="swatch-row">
        <div class="swatch" style="background:var(--hostliday-red-bright)"></div>
        <div class="swatch" style="background:var(--hostliday-red-500)"></div>
        <div class="swatch" style="background:var(--hostliday-red-800)"></div>
        <span class="lbl">Brand reds</span>
        <div class="swatch" style="background:var(--status-confirmed)"></div>
        <div class="swatch" style="background:var(--status-held)"></div>
        <div class="swatch" style="background:var(--status-live)"></div>
        <span class="lbl">Status</span>
      </div>

      <div class="section">
        <div class="section-head">
          <h2>Four surfaces</h2>
          <p class="section-desc">Click any card to explore that surface.</p>
        </div>
        <div class="surface-grid stagger">
          <div class="surface-card explore featured" onclick={() => props.onNavigate('explore')}>
            <div class="card-photo" style="background:linear-gradient(135deg, #E8D5B7 0%, #D4A574 40%, #B8864A 100%)"></div>
            <div class="card-body">
              <div class="eye">Explore</div>
              <div class="name">Research & save</div>
              <p>Warm photo-led discovery. Save anything to a trip board.</p>
            </div>
          </div>
          <div class="surface-card compose" onclick={() => props.onNavigate('compose')}>
            <div class="eye">Compose</div>
            <div class="name">Plan & build</div>
            <p>Day-by-day timeline with Orbit chat. Slot in bookings, compare, hold options.</p>
            <div class="card-mini-tl">
              <span class="tl-dot confirmed"></span>
              <span class="tl-line"></span>
              <span class="tl-dot held"></span>
              <span class="tl-line"></span>
              <span class="tl-dot empty"></span>
            </div>
            <span class="arrow">Open surface &rarr;</span>
          </div>
          <div class="surface-card navigate dark" onclick={() => props.onNavigate('navigate')}>
            <div class="eye">Navigate</div>
            <div class="name">Live trip</div>
            <p>Dark, map-first chrome. Glass panels, mono times, breathing pulse.</p>
            <div class="card-mono">LIS → OPR · <span class="live-dot-sm"></span> 14 min</div>
            <span class="arrow">Open surface &rarr;</span>
          </div>
          <div class="surface-card recover" onclick={() => props.onNavigate('recover')}>
            <div class="eye">Recover</div>
            <div class="name">Fix & escalate</div>
            <p>Incident-first layout. Alternatives held, action log, human escalation.</p>
            <span class="arrow">Open surface &rarr;</span>
          </div>
        </div>
      </div>
    </div>
  )
}
