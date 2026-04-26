import Icon from './Icon'

export default function Recover() {
  return (
    <div class="rec-shell">
      <header class="rec-bar">
        <img src="/assets/logos/hostliday-wordmark.svg" />
        <div class="rec-crumb">Trips · <b>Iberia, late August</b> · <span style="color:var(--fg-3)">Day 3</span></div>
        <div class="grow"></div>
        <div class="rec-status-pill"><span class="dot-blink"></span>Action needed</div>
      </header>

      <section class="incident">
        <div class="incident-eye">Incident · 14:02 · just now</div>
        <h1 class="incident-title">Your train to Porto is cancelled. I'm holding three backup options.</h1>
        <p class="incident-sub">CP Alfa Pendular #221 (Lisbon Oriente → Porto Campanhã, 14:08) was cancelled by the operator due to a track issue near Coimbra. A refund is in flight; you don't need to do anything to claim it. Pick a backup below — I've held all three for 30 minutes.</p>
        <div class="incident-meta">
          <div class="im"><span class="k">Original</span><span class="v">14:08 → 17:01</span></div>
          <div class="im"><span class="k">Reference</span><span class="v">CP-AP221</span></div>
          <div class="im"><span class="k">Refund</span><span class="v l" style="color:var(--status-confirmed)">In flight · €82</span></div>
          <div class="im"><span class="k">Hold expires</span><span class="v">14:32</span></div>
        </div>
      </section>

      <section class="rec-sec">
        <div class="rec-sec-head">
          <div>
            <h2 class="rec-sec-title">Three backup options, all held</h2>
            <div class="rec-sec-sub">One tap to switch. No new charge — Orbit will reconcile the refund.</div>
          </div>
        </div>
        <div class="rec-opts">
          <article class="rec-opt suggested">
            <div class="recommend">Suggested</div>
            <div class="o-eye"><Icon name="train" size={12} style="vertical-align:middle" /> Train · CP IC 522</div>
            <div class="o-name">Lisbon → Porto</div>
            <div style="font-size:13px;color:var(--fg-2);line-height:1.5">Only +1h later. Same station. 1st class · seats 11A & 11B together.</div>
            <div class="o-stats">
              <div><div class="lbl">Departs</div><div class="val">15:12</div></div>
              <div><div class="lbl">Arrives</div><div class="val">18:32</div></div>
              <div><div class="lbl">Coach · seat</div><div class="val">B · 11A</div></div>
              <div><div class="lbl">Cost</div><div class="val l" style="color:var(--status-confirmed)">Same</div></div>
            </div>
            <div class="o-cta">
              <button class="primary">Switch · one tap</button>
              <button class="ghost">Details</button>
            </div>
          </article>

          <article class="rec-opt">
            <div class="o-eye"><Icon name="train" size={12} style="vertical-align:middle" /> Train · CP IC 524</div>
            <div class="o-name">Lisbon → Porto</div>
            <div style="font-size:13px;color:var(--fg-2);line-height:1.5">Earlier alternative if you want to skip the wait. Stops in Coimbra & Aveiro.</div>
            <div class="o-stats">
              <div><div class="lbl">Departs</div><div class="val">14:42</div></div>
              <div><div class="lbl">Arrives</div><div class="val">18:08</div></div>
              <div><div class="lbl">Class</div><div class="val l">2nd</div></div>
              <div><div class="lbl">Cost</div><div class="val l" style="color:var(--status-confirmed)">Same</div></div>
            </div>
            <div class="o-cta">
              <button class="primary">Switch</button>
              <button class="ghost">Details</button>
            </div>
          </article>

          <article class="rec-opt">
            <div class="o-eye"><Icon name="bus" size={12} style="vertical-align:middle" /> Bus · FlixBus 7711</div>
            <div class="o-name">Sete Rios → Campanhã</div>
            <div style="font-size:13px;color:var(--fg-2);line-height:1.5">Slower, but leaves now. Direct, no stops.</div>
            <div class="o-stats">
              <div><div class="lbl">Departs</div><div class="val">14:25</div></div>
              <div><div class="lbl">Arrives</div><div class="val">18:55</div></div>
              <div><div class="lbl">Seat</div><div class="val l">12A · window</div></div>
              <div><div class="lbl">Diff</div><div class="val l" style="color:var(--status-held)">+€8</div></div>
            </div>
            <div class="o-cta">
              <button class="primary">Switch</button>
              <button class="ghost">Details</button>
            </div>
          </article>
        </div>
      </section>

      <section class="rec-sec">
        <div class="rec-sec-head">
          <h2 class="rec-sec-title">What I've done in the last 4 minutes</h2>
        </div>
        <div class="actions-tl">
          <div class="act">
            <div class="time">14:02</div>
            <div class="marker"><div class="d crit"></div></div>
            <div class="body">
              <div class="ttl">Cancellation detected from operator feed</div>
              <div class="det">CP Alfa Pendular 221 marked cancelled by Comboios de Portugal at 14:01:48.</div>
              <div class="by"><span class="av"><Icon name="spark" size={10} /></span>Orbit</div>
            </div>
          </div>
          <div class="act">
            <div class="time">14:03</div>
            <div class="marker"><div class="d done"></div></div>
            <div class="body">
              <div class="ttl">Refund request filed</div>
              <div class="det">Filed via CP's API. Reference R-882019. ETA 5–7 business days.</div>
              <div class="by"><span class="av"><Icon name="spark" size={10} /></span>Orbit</div>
            </div>
          </div>
          <div class="act">
            <div class="time">14:04</div>
            <div class="marker"><div class="d done"></div></div>
            <div class="body">
              <div class="ttl">Three alternatives held for 30 minutes</div>
              <div class="det">Two trains and one bus — all on hold under your name. No charge yet.</div>
              <div class="by"><span class="av"><Icon name="spark" size={10} /></span>Orbit</div>
            </div>
          </div>
          <div class="act">
            <div class="time">14:04</div>
            <div class="marker"><div class="d done"></div></div>
            <div class="body">
              <div class="ttl">Casa do Vale notified of late check-in</div>
              <div class="det">Reception holding the room. Confirmed by Inês at 14:04:12.</div>
              <div class="by"><span class="av"><Icon name="spark" size={10} /></span>Orbit</div>
            </div>
          </div>
          <div class="act">
            <div class="time">Now</div>
            <div class="marker"><div class="d live"></div></div>
            <div class="body">
              <div class="ttl">Waiting for you to pick a backup</div>
              <div class="det">Hold expires 14:32. If nothing's chosen, I'll auto-confirm the suggested option and you can change it later.</div>
              <div class="by"><span class="av h">SR</span>Standing by · Sara R., on-call concierge</div>
            </div>
          </div>
        </div>
      </section>

      <div class="escalate">
        <div class="agents">
          <div class="av">SR</div>
          <div class="av">JM</div>
          <div class="av">AT</div>
        </div>
        <div class="e-msg"><b>3 humans on call right now</b> · avg pickup 38 sec · all speak EN/PT</div>
        <button class="chat"><Icon name="msg" size={14} /> Chat with Sara</button>
        <button class="call"><Icon name="phone" size={14} /> Call now</button>
      </div>
    </div>
  )
}
