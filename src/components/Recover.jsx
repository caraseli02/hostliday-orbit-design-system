import { createSignal, For, Show } from "solid-js";
import Icon from "./Icon";

const ACTIONS = [
  {
    id: "a1",
    time: "14:02",
    dot: "crit",
    title: "Cancellation detected from operator feed",
    detail: "CP Alfa Pendular 221 marked cancelled by Comboios de Portugal at 14:01:48.",
    by: "orbit",
    why: 'Polling CP operator feed every 30s. Status change "RUN → CXL" + reason code TR-12 (track) triggered the disruption playbook for booking CP-AP221.',
  },
  {
    id: "a2",
    time: "14:03",
    dot: "done",
    title: "Refund request filed",
    detail: "Filed via CP's API. Reference R-882019. ETA 5–7 business days.",
    by: "orbit",
    why: "Operator-side cancellation = full refund per CP terms §4.2. Auto-filed using cached payment method. No user action needed.",
  },
  {
    id: "a3",
    time: "14:04",
    dot: "done",
    title: "Three alternatives held for 30 minutes",
    detail: "Two trains and one bus — all on hold under your name. No charge yet.",
    by: "orbit",
    why: "Search radius LIS↔OPO, depart 14:00–16:00, max +1h arrival vs original. 5 candidates → ranked by (cost match × seat availability × reliability). Top 3 placed on inventory hold.",
  },
  {
    id: "a4",
    time: "14:04",
    dot: "done",
    title: "Casa do Vale notified of late check-in",
    detail: "Reception holding the room. Confirmed by Inês at 14:04:12.",
    by: "orbit",
    why: "New ETA range 18:08–18:55 vs original 17:01. Stay policy required notification ≥3h before midnight cutoff. Auto-sent + human confirmed.",
  },
  {
    id: "a5",
    time: "Now",
    dot: "live",
    title: "Waiting for you to pick a backup",
    detail:
      "Hold expires 14:32. If nothing's chosen, I'll auto-confirm the suggested option and you can change it later.",
    by: "sara",
    why: null,
  },
];

function Action(props) {
  const [open, setOpen] = createSignal(false);
  const a = () => props.action;
  return (
    <div class="act">
      <div class="time">{a().time}</div>
      <div class="marker">
        <div class={`d ${a().dot}`}></div>
      </div>
      <div class="body">
        <div class="ttl">{a().title}</div>
        <div class="det">{a().detail}</div>
        <div class="by">
          <Show
            when={a().by === "sara"}
            fallback={
              <>
                <span class="av">
                  <Icon name="spark" size={10} />
                </span>
                Orbit
              </>
            }
          >
            <span class="av h">SR</span>Standing by · Sara R., on-call concierge
          </Show>
          <Show when={a().why}>
            <button class="act-why" aria-expanded={open()} onclick={() => setOpen((o) => !o)}>
              {open() ? "Hide reasoning" : "Why?"}
            </button>
          </Show>
        </div>
        <Show when={open() && a().why}>
          <div class="act-why-body">{a().why}</div>
        </Show>
      </div>
    </div>
  );
}

export default function Recover() {
  const [bioOpen, setBioOpen] = createSignal(false);

  return (
    <div class="rec-shell">
      <div class="concierge-strip">
        <div class="concierge-avatar">SR</div>
        <div class="concierge-body">
          <div class="concierge-line">
            <b>Sara R.</b> · on-call concierge
            <span class="concierge-meta">· 38s avg pickup · EN/PT</span>
          </div>
          <button
            class="concierge-bio-btn"
            aria-expanded={bioOpen()}
            onclick={() => setBioOpen((o) => !o)}
          >
            {bioOpen() ? "Hide bio" : "About Sara"}
          </button>
          <Show when={bioOpen()}>
            <div class="concierge-bio">
              7 years at Belmond Reid's, then Hostliday since launch. Lisbon-based. Handles ~12
              disruptions / day across the Iberia desk. Average resolution: 8 minutes.
            </div>
          </Show>
        </div>
        <button class="concierge-chat">
          <Icon name="msg" size={14} /> Chat
        </button>
        <button class="concierge-call">
          <Icon name="phone" size={14} /> Call
        </button>
      </div>

      <section class="incident">
        <div class="incident-eye">Incident · 14:02 · just now</div>
        <h1 class="incident-title">
          Your train to Porto is cancelled. I'm holding three backup options.
        </h1>
        <p class="incident-sub">
          CP Alfa Pendular #221 (Lisbon Oriente → Porto Campanhã, 14:08) was cancelled by the
          operator due to a track issue near Coimbra. A refund is in flight; you don't need to do
          anything to claim it. Pick a backup below — I've held all three for 30 minutes.
        </p>
        <div class="incident-meta">
          <div class="im">
            <span class="k">Original</span>
            <span class="v">14:08 → 17:01</span>
          </div>
          <div class="im">
            <span class="k">Reference</span>
            <span class="v">CP-AP221</span>
          </div>
          <div class="im">
            <span class="k">Refund</span>
            <span class="v l" style="color:var(--status-confirmed)">
              In flight · €82
            </span>
          </div>
          <div class="im">
            <span class="k">Hold expires</span>
            <span class="v">14:32</span>
          </div>
        </div>
      </section>

      <section class="rec-sec">
        <div class="rec-sec-head">
          <div>
            <h2 class="rec-sec-title">Three backup options, all held</h2>
            <div class="rec-sec-sub">
              One tap to switch. No new charge — Orbit will reconcile the refund.
            </div>
          </div>
        </div>
        <div class="rec-opts">
          <article class="rec-opt suggested">
            <div class="recommend">Suggested</div>
            <div class="o-eye">
              <Icon name="train" size={12} style="vertical-align:middle" /> Train · CP IC 522
            </div>
            <div class="o-name">Lisbon → Porto</div>
            <div style="font-size:13px;color:var(--fg-2);line-height:1.5">
              Only +1h later. Same station. 1st class · seats 11A & 11B together.
            </div>
            <div class="o-stats">
              <div>
                <div class="lbl">Departs</div>
                <div class="val">15:12</div>
              </div>
              <div>
                <div class="lbl">Arrives</div>
                <div class="val">18:32</div>
              </div>
              <div>
                <div class="lbl">Coach · seat</div>
                <div class="val">B · 11A</div>
              </div>
              <div>
                <div class="lbl">Cost</div>
                <div class="val l" style="color:var(--status-confirmed)">
                  Same
                </div>
              </div>
            </div>
            <div class="o-cta">
              <button class="primary">Switch · one tap</button>
              <button class="ghost">Details</button>
            </div>
          </article>

          <article class="rec-opt">
            <div class="o-eye">
              <Icon name="train" size={12} style="vertical-align:middle" /> Train · CP IC 524
            </div>
            <div class="o-name">Lisbon → Porto</div>
            <div style="font-size:13px;color:var(--fg-2);line-height:1.5">
              Earlier alternative if you want to skip the wait. Stops in Coimbra & Aveiro.
            </div>
            <div class="o-stats">
              <div>
                <div class="lbl">Departs</div>
                <div class="val">14:42</div>
              </div>
              <div>
                <div class="lbl">Arrives</div>
                <div class="val">18:08</div>
              </div>
              <div>
                <div class="lbl">Class</div>
                <div class="val l">2nd</div>
              </div>
              <div>
                <div class="lbl">Cost</div>
                <div class="val l" style="color:var(--status-confirmed)">
                  Same
                </div>
              </div>
            </div>
            <div class="o-cta">
              <button class="primary">Switch</button>
              <button class="ghost">Details</button>
            </div>
          </article>

          <article class="rec-opt">
            <div class="o-eye">
              <Icon name="bus" size={12} style="vertical-align:middle" /> Bus · FlixBus 7711
            </div>
            <div class="o-name">Sete Rios → Campanhã</div>
            <div style="font-size:13px;color:var(--fg-2);line-height:1.5">
              Slower, but leaves now. Direct, no stops.
            </div>
            <div class="o-stats">
              <div>
                <div class="lbl">Departs</div>
                <div class="val">14:25</div>
              </div>
              <div>
                <div class="lbl">Arrives</div>
                <div class="val">18:55</div>
              </div>
              <div>
                <div class="lbl">Seat</div>
                <div class="val l">12A · window</div>
              </div>
              <div>
                <div class="lbl">Diff</div>
                <div class="val l" style="color:var(--status-held)">
                  +€8
                </div>
              </div>
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
          <For each={ACTIONS}>{(a) => <Action action={a} />}</For>
        </div>
      </section>

      <div class="escalate">
        <div class="agents">
          <div class="av">SR</div>
          <div class="av">JM</div>
          <div class="av">AT</div>
        </div>
        <div class="e-msg">
          <b>3 humans on call right now</b> · avg pickup 38 sec · all speak EN/PT
        </div>
        <button class="chat">
          <Icon name="msg" size={14} /> Chat with Sara
        </button>
        <button class="call">
          <Icon name="phone" size={14} /> Call now
        </button>
      </div>
    </div>
  );
}
