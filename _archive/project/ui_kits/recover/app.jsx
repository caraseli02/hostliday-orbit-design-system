function RecIcon({ name, size=16 }) {
  const p = {
    train: <><rect x="6" y="3" width="12" height="14" rx="3"/><path d="M9 17l-2 4M15 17l2 4"/></>,
    bus:   <><rect x="4" y="4" width="16" height="14" rx="2"/><path d="M4 14h16M9 18v2M15 18v2"/></>,
    plane: <path d="M21 12L4 5l3 7-3 7z"/>,
    msg:   <path d="M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z"/>,
    phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.2 4.3 2 2 0 0 1 4.2 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.7.6 2.5a2 2 0 0 1-.5 2L8 9.6a16 16 0 0 0 6 6l1.4-1.4a2 2 0 0 1 2.1-.5c.8.3 1.6.5 2.5.6a2 2 0 0 1 1.7 2z"/>,
    spark: <path d="M12 3l1.7 4.6L18 9.5l-4.3 1.9L12 16l-1.7-4.6L6 9.5l4.3-1.9z"/>,
  };
  return <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{p[name]}</svg>;
}

function App() {
  return (
    <div className="shell">
      <header className="bar">
        <img src="../../assets/logos/hostliday-wordmark.svg"/>
        <div className="crumb">Trips · <b>Iberia, late August</b> · <span style={{color:"var(--fg-3)"}}>Day 3</span></div>
        <div className="grow"></div>
        <div className="status-pill"><span className="dot"></span>Action needed</div>
      </header>

      <section className="incident">
        <div className="incident-eye">Incident · 14:02 · just now</div>
        <h1 className="incident-title">Your train to Porto is cancelled. I'm holding three backup options.</h1>
        <p className="incident-sub">CP Alfa Pendular #221 (Lisbon Oriente → Porto Campanhã, 14:08) was cancelled by the operator due to a track issue near Coimbra. A refund is in flight; you don't need to do anything to claim it. Pick a backup below — I've held all three for 30 minutes.</p>
        <div className="incident-meta">
          <div className="im"><span className="k">Original</span><span className="v">14:08 → 17:01</span></div>
          <div className="im"><span className="k">Reference</span><span className="v">CP-AP221</span></div>
          <div className="im"><span className="k">Refund</span><span className="v l" style={{color:"var(--status-confirmed)"}}>In flight · €82</span></div>
          <div className="im"><span className="k">Hold expires</span><span className="v">14:32</span></div>
        </div>
      </section>

      <section className="sec">
        <div className="sec-head">
          <div>
            <h2 className="sec-title">Three backup options, all held</h2>
            <div className="sec-sub">One tap to switch. No new charge — Orbit will reconcile the refund.</div>
          </div>
        </div>
        <div className="opts">
          <article className="opt suggested">
            <div className="recommend">Suggested</div>
            <div className="o-eye"><RecIcon name="train" size={12} style={{verticalAlign:"middle"}}/> Train · CP IC 522</div>
            <div className="o-name">Lisbon → Porto</div>
            <div style={{fontSize:13, color:"var(--fg-2)", lineHeight:1.5}}>Only +1h later. Same station. 1st class · seats 11A & 11B together.</div>
            <div className="o-stats">
              <div><div className="lbl">Departs</div><div className="val">15:12</div></div>
              <div><div className="lbl">Arrives</div><div className="val">18:32</div></div>
              <div><div className="lbl">Coach · seat</div><div className="val">B · 11A</div></div>
              <div><div className="lbl">Cost</div><div className="val l" style={{color:"var(--status-confirmed)"}}>Same</div></div>
            </div>
            <div className="o-cta">
              <button className="primary">Switch · one tap</button>
              <button className="ghost">Details</button>
            </div>
          </article>

          <article className="opt">
            <div className="o-eye"><RecIcon name="train" size={12}/> Train · CP IC 524</div>
            <div className="o-name">Lisbon → Porto</div>
            <div style={{fontSize:13, color:"var(--fg-2)", lineHeight:1.5}}>Earlier alternative if you want to skip the wait. Stops in Coimbra & Aveiro.</div>
            <div className="o-stats">
              <div><div className="lbl">Departs</div><div className="val">14:42</div></div>
              <div><div className="lbl">Arrives</div><div className="val">18:08</div></div>
              <div><div className="lbl">Class</div><div className="val l">2nd</div></div>
              <div><div className="lbl">Cost</div><div className="val l" style={{color:"var(--status-confirmed)"}}>Same</div></div>
            </div>
            <div className="o-cta">
              <button className="primary">Switch</button>
              <button className="ghost">Details</button>
            </div>
          </article>

          <article className="opt">
            <div className="o-eye"><RecIcon name="bus" size={12}/> Bus · FlixBus 7711</div>
            <div className="o-name">Sete Rios → Campanhã</div>
            <div style={{fontSize:13, color:"var(--fg-2)", lineHeight:1.5}}>Slower, but leaves now. Direct, no stops.</div>
            <div className="o-stats">
              <div><div className="lbl">Departs</div><div className="val">14:25</div></div>
              <div><div className="lbl">Arrives</div><div className="val">18:55</div></div>
              <div><div className="lbl">Seat</div><div className="val l">12A · window</div></div>
              <div><div className="lbl">Diff</div><div className="val l" style={{color:"var(--status-held)"}}>+€8</div></div>
            </div>
            <div className="o-cta">
              <button className="primary">Switch</button>
              <button className="ghost">Details</button>
            </div>
          </article>
        </div>
      </section>

      <section className="sec">
        <div className="sec-head">
          <h2 className="sec-title">What I've done in the last 4 minutes</h2>
        </div>
        <div className="actions-tl">
          <div className="act">
            <div className="time">14:02</div>
            <div className="marker"><div className="d crit"></div></div>
            <div className="body">
              <div className="ttl">Cancellation detected from operator feed</div>
              <div className="det">CP Alfa Pendular 221 marked cancelled by Comboios de Portugal at 14:01:48.</div>
              <div className="by"><span className="av"><RecIcon name="spark" size={10}/></span>Orbit</div>
            </div>
          </div>
          <div className="act">
            <div className="time">14:03</div>
            <div className="marker"><div className="d done"></div></div>
            <div className="body">
              <div className="ttl">Refund request filed</div>
              <div className="det">Filed via CP's API. Reference R-882019. ETA 5–7 business days.</div>
              <div className="by"><span className="av"><RecIcon name="spark" size={10}/></span>Orbit</div>
            </div>
          </div>
          <div className="act">
            <div className="time">14:04</div>
            <div className="marker"><div className="d done"></div></div>
            <div className="body">
              <div className="ttl">Three alternatives held for 30 minutes</div>
              <div className="det">Two trains and one bus — all on hold under your name. No charge yet.</div>
              <div className="by"><span className="av"><RecIcon name="spark" size={10}/></span>Orbit</div>
            </div>
          </div>
          <div className="act">
            <div className="time">14:04</div>
            <div className="marker"><div className="d done"></div></div>
            <div className="body">
              <div className="ttl">Casa do Vale notified of late check-in</div>
              <div className="det">Reception holding the room. Confirmed by Inês at 14:04:12.</div>
              <div className="by"><span className="av"><RecIcon name="spark" size={10}/></span>Orbit</div>
            </div>
          </div>
          <div className="act">
            <div className="time">Now</div>
            <div className="marker"><div className="d live"></div></div>
            <div className="body">
              <div className="ttl">Waiting for you to pick a backup</div>
              <div className="det">Hold expires 14:32. If nothing's chosen, I'll auto-confirm the suggested option and you can change it later.</div>
              <div className="by"><span className="av h">SR</span>Standing by · Sara R., on-call concierge</div>
            </div>
          </div>
        </div>
      </section>

      <div className="escalate">
        <div className="agents">
          <div className="av">SR</div>
          <div className="av">JM</div>
          <div className="av">AT</div>
        </div>
        <div className="e-msg"><b>3 humans on call right now</b> · avg pickup 38 sec · all speak EN/PT</div>
        <button className="chat"><RecIcon name="msg" size={14}/> Chat with Sara</button>
        <button className="call"><RecIcon name="phone" size={14}/> Call now</button>
      </div>
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("app")).render(<App/>);
