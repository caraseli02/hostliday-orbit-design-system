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
        <div class="swatch" style="background:#DA0000"></div>
        <div class="swatch" style="background:#BE0000"></div>
        <div class="swatch" style="background:#810000"></div>
        <span class="lbl">Brand reds</span>
        <div class="swatch" style="background:#1F7A4D"></div>
        <div class="swatch" style="background:#B6822E"></div>
        <div class="swatch" style="background:#2E5C8A"></div>
        <span class="lbl">Status</span>
      </div>

      <div class="section">
        <div class="section-head">
          <h2>Four surfaces</h2>
          <p class="section-desc">Click any card to explore that surface.</p>
        </div>
        <div class="grid stagger">
          <div class="surface-card explore" onclick={() => props.onNavigate('explore')}>
            <div class="eye">Explore</div>
            <div class="name">Research & save</div>
            <p>Warm photo-led discovery. Save anything to a trip board. Hero gradient and large display type.</p>
            <span class="arrow">Open surface &rarr;</span>
          </div>
          <div class="surface-card compose" onclick={() => props.onNavigate('compose')}>
            <div class="eye">Compose</div>
            <div class="name">Plan & build</div>
            <p>Day-by-day timeline with Orbit chat alongside. Slot in existing bookings, compare candidates, hold options.</p>
            <span class="arrow">Open surface &rarr;</span>
          </div>
          <div class="surface-card navigate" onclick={() => props.onNavigate('navigate')}>
            <div class="eye">Navigate</div>
            <div class="name">Live trip</div>
            <p>Dark, map-first chrome. Translucent glass panels, mono times, breathing pulse. Terse voice.</p>
            <span class="arrow">Open surface &rarr;</span>
          </div>
          <div class="surface-card recover" onclick={() => props.onNavigate('recover')}>
            <div class="eye">Recover</div>
            <div class="name">Fix & escalate</div>
            <p>Incident-first layout. Alternatives held, action log, human escalation bar. Direct voice.</p>
            <span class="arrow">Open surface &rarr;</span>
          </div>
        </div>
      </div>
    </div>
  )
}
