import { Show, For } from "solid-js";
import { useTrip } from "../state";

const SURFACES = [
  {
    id: "explore",
    accent: "explore",
    eye: "Explore",
    name: "Drop intake",
    cta: "Drop research",
    blurb:
      "Paste a link, forward an email, drop a screenshot. We parse, dedupe, slot it into the right trip.",
  },
  {
    id: "compose",
    accent: "compose",
    eye: "Compose",
    name: "Plan & build",
    cta: "Plan the trip",
    blurb: "Day-by-day timeline. Slot in bookings. Hold options. Reasoning trace from Orbit.",
  },
  {
    id: "recover",
    accent: "recover",
    eye: "Recover",
    name: "Fix & escalate",
    cta: "See an incident",
    blurb: "Live disruption response. Three backups held. Refund filed. Sara R. on call in 38 sec.",
  },
];

export default function Overview(props) {
  const { activeTrip } = useTrip();
  const primaryLabel = () => (activeTrip() ? `Resume ${activeTrip().name}` : "Start a trip");
  const primarySurface = () => (activeTrip() ? "compose" : "explore");

  return (
    <div class="home">
      <div class="home-header">
        <img src="/assets/logos/hostliday-wordmark.svg" alt="Hostliday" />
        <span class="home-crumb">Pre-seed demo · April 2026</span>
      </div>

      <h1>Travel coordination, finally end-to-end.</h1>
      <p class="home-lead">
        Paste anything — links, emails, screenshots — Orbit parses it into a trip. When something
        breaks, a real concierge picks up in 38 seconds.
        <b> AI for the boring parts. Humans when it matters.</b>
      </p>

      <div class="home-cta-row">
        <button type="button"
          class="home-cta home-cta-primary"
          onClick={() => props.onNavigate(primarySurface())}
        >
          {primaryLabel()}
          <span class="home-cta-arrow">→</span>
        </button>
        <Show when={activeTrip()}>
          <span class="home-cta-meta">
            <span class={`home-cta-dot ${activeTrip().status}`} />
            {activeTrip().dates}
            {activeTrip().nights ? ` · ${activeTrip().nights} nights` : ""}
          </span>
        </Show>
      </div>

      <div class="section">
        <div class="section-head">
          <h2>Three surfaces, one trip</h2>
          <p class="section-desc">
            Each surface handles one phase. Same trip context across all of them.
          </p>
        </div>
        <div class="overview-surfaces">
          <For each={SURFACES}>
            {(s) => (
              <button type="button"
                class={`overview-surface overview-surface-${s.accent}`}
                onClick={() => props.onNavigate(s.id)}
              >
                <div class="os-eye">{s.eye}</div>
                <div class="os-name">{s.name}</div>
                <p class="os-blurb">{s.blurb}</p>
                <span class="os-cta">
                  {s.cta} <span aria-hidden="true">→</span>
                </span>
              </button>
            )}
          </For>
        </div>
      </div>
    </div>
  );
}
