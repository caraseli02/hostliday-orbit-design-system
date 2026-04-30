import { Show, For } from "solid-js";
import Icon from "./Icon";
import { useTrip } from "../state";

const STEPS = [
  {
    num: "01",
    icon: "paste",
    title: "Drop anything",
    desc: "Paste links, forward emails, drop screenshots.",
  },
  {
    num: "02",
    icon: "spark",
    title: "Orbit builds your trip",
    desc: "AI parses, deduplicates, and suggests a timeline.",
  },
  {
    num: "03",
    icon: "user",
    title: "Humans step in when it counts",
    desc: "Real concierges for disruptions and decisions.",
  },
];

const SURFACES = [
  {
    id: "explore",
    accent: "explore",
    eye: "Explore",
    name: "Drop intake",
    cta: "Drop research",
    icon: "paste",
    blurb:
      "Paste a link, forward an email, drop a screenshot. We parse, dedupe, slot it into the right trip.",
    preview: "explore",
  },
  {
    id: "compose",
    accent: "compose",
    eye: "Compose",
    name: "Plan & build",
    cta: "Plan the trip",
    icon: "calendar",
    blurb: "Day-by-day timeline. Slot in bookings. Hold options. Reasoning trace from Orbit.",
    preview: "compose",
  },
  {
    id: "recover",
    accent: "recover",
    eye: "Recover",
    name: "Fix & escalate",
    cta: "See an incident",
    icon: "shield",
    blurb: "Live disruption response. Three backups held. Refund filed. Sara R. on call in 38 sec.",
    preview: "recover",
  },
];

const STATS = [
  { value: "38s", label: "Average response time" },
  { value: "3", label: "Humans on call" },
];

export default function Overview(props) {
  const { activeTrip } = useTrip();
  const primaryLabel = () => (activeTrip() ? `Resume ${activeTrip().name}` : "Start a trip");
  const primarySurface = () => (activeTrip() ? "compose" : "explore");

  return (
    <div class="home">
      {/* Hero */}
      <div class="home-header">
        <img src="/assets/logos/hostliday-wordmark.svg" alt="Hostliday" />
        <span class="home-crumb">Pre-seed demo · April 2026</span>
      </div>

      <h1>
        Your trip plan,<br />
        before you finish researching.
      </h1>
      <p class="home-lead">
        Paste a link or forward an email. Orbit turns it into a day-by-day plan in seconds.
        When a flight cancels or a hotel overbooks, a real concierge picks up — not a chatbot.
      </p>

      <div class="home-cta-row">
        <button
          type="button"
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

      {/* How it works */}
      <div class="home-steps" aria-label="How it works">
        <For each={STEPS}>
          {(step) => (
            <div class="home-step">
              <div class="home-step-num" aria-hidden="true">{step.num}</div>
              <div class="home-step-icon">
                <Icon name={step.icon} size={20} />
              </div>
              <div class="home-step-copy">
                <div class="home-step-title">{step.title}</div>
                <div class="home-step-desc">{step.desc}</div>
              </div>
            </div>
          )}
        </For>
      </div>

      {/* Surface cards */}
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
              <button
                type="button"
                class={`overview-surface overview-surface-${s.accent}`}
                onClick={() => props.onNavigate(s.id)}
              >
                <div class="os-top">
                  <div class="os-eye">{s.eye}</div>
                  <div class="os-name">{s.name}</div>
                  <p class="os-blurb">{s.blurb}</p>
                </div>

                <div class={`os-preview os-preview-${s.preview}`}>
                  <Show when={s.preview === "explore"}>
                    <div class="prev-stream">
                      <div class="prev-item">
                        <span class="prev-icon prev-icon-link">
                          <Icon name="link" size={12} />
                        </span>
                        <span class="prev-text">airbnb.com/rooms/4872…</span>
                        <span class="prev-badge">Parsed</span>
                      </div>
                      <div class="prev-item">
                        <span class="prev-icon prev-icon-mail">
                          <Icon name="mail" size={12} />
                        </span>
                        <span class="prev-text">BA 502 · LHR → LIS</span>
                        <span class="prev-badge prev-badge-confirmed">Confirmed</span>
                      </div>
                      <div class="prev-item">
                        <span class="prev-icon prev-icon-img">
                          <Icon name="image" size={12} />
                        </span>
                        <span class="prev-text">Tasca Lisboeta</span>
                        <span class="prev-badge">Pending</span>
                      </div>
                    </div>
                  </Show>

                  <Show when={s.preview === "compose"}>
                    <div class="prev-timeline">
                      <div class="prev-day">
                        <span class="prev-day-label">Day 1</span>
                        <div class="prev-tl-row">
                          <span class="prev-tl-dot prev-tl-confirmed" aria-hidden="true" />
                          <span class="prev-tl-text">BA 502 · 22:40</span>
                        </div>
                        <div class="prev-tl-row">
                          <span class="prev-tl-dot prev-tl-held" aria-hidden="true" />
                          <span class="prev-tl-text">Casa do Vale · Douro</span>
                        </div>
                      </div>
                      <div class="prev-tl-line" />
                      <div class="prev-day">
                        <span class="prev-day-label">Day 2</span>
                        <div class="prev-tl-row">
                          <span class="prev-tl-dot prev-tl-empty" aria-hidden="true" />
                          <span class="prev-tl-text prev-tl-muted">Open slot</span>
                        </div>
                        <div class="prev-tl-row">
                          <span class="prev-tl-dot prev-tl-confirmed" aria-hidden="true" />
                          <span class="prev-tl-text">Wine tasting · 14:00</span>
                        </div>
                      </div>
                    </div>
                  </Show>

                  <Show when={s.preview === "recover"}>
                    <div class="prev-alert">
                      <div class="prev-alert-header">
                        <span class="prev-alert-icon">
                          <Icon name="alertTriangle" size={14} />
                        </span>
                        <span class="prev-alert-title">Flight BA 502 delayed 3h</span>
                      </div>
                      <div class="prev-alert-body">
                        <div class="prev-alert-row">
                          <span class="prev-alert-label">Response</span>
                          <span class="prev-alert-value prev-alert-live">
                            <span class="prev-alert-dot" aria-hidden="true" /> Sara R. · 38s
                          </span>
                        </div>
                        <div class="prev-alert-row">
                          <span class="prev-alert-label">Action</span>
                          <span class="prev-alert-value">Backup seat held on TAP 1093</span>
                        </div>
                      </div>
                    </div>
                  </Show>
                </div>

                <span class="os-cta">
                  {s.cta} <span aria-hidden="true">→</span>
                </span>
              </button>
            )}
          </For>
        </div>
      </div>

      {/* Stats / Trust bar */}
      <dl class="home-stats" aria-label="Key metrics">
        <For each={STATS}>
          {(stat) => (
            <div class="home-stat">
              <dd class="home-stat-value">{stat.value}</dd>
              <dt class="home-stat-label">{stat.label}</dt>
            </div>
          )}
        </For>
        <div class="home-stat home-stat-motto">
          AI for the boring parts. Humans when it matters.
        </div>
      </dl>
    </div>
  );
}
