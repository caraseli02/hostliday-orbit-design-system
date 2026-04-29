import { createSignal, createEffect, For, Show, onCleanup } from "solid-js";
import Icon from "./Icon";
import { useTrip } from "../state";

const SURFACES = [
  { id: "explore", label: "Explore", accent: "explore" },
  { id: "compose", label: "Compose", accent: "compose" },
  { id: "recover", label: "Recover", accent: "recover" },
];

const TRIP_STATUS_LABEL = { active: "Active draft", held: "Held", idea: "Just ideas" };

export default function Shell(props) {
  const { trips, activeTripId, activeTrip, setActiveTrip } = useTrip();
  const [open, setOpen] = createSignal(false);

  const closeMenu = () => setOpen(false);

  const closeOnClickAway = (e) => {
    if (!e.target.closest(".shell-trip-switch")) closeMenu();
  };
  createEffect(() => {
    if (open()) {
      document.addEventListener("click", closeOnClickAway);
      document.addEventListener("keydown", onMenuKey);
      onCleanup(() => {
        document.removeEventListener("click", closeOnClickAway);
        document.removeEventListener("keydown", onMenuKey);
      });
    }
  });

  const onMenuKey = (e) => {
    if (e.key === "Escape") closeMenu();
  };

  const accentClass = () =>
    `shell-accent shell-accent-${SURFACES.find((s) => s.id === props.surface)?.accent || "explore"}`;

  return (
    <header class="shell" role="banner">
      <a class="shell-skip" href="#shell-main">
        Skip to content
      </a>
      <div class="shell-row shell-row-trip">
        <a
          class="shell-brand"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            props.onSurface("overview");
          }}
        >
          <img src="/assets/logos/hostliday-wordmark.svg" alt="Hostliday" class="shell-logo" />
        </a>

        <div class="shell-trip-switch">
          <button type="button"
            class="shell-trip-btn"
            aria-haspopup="listbox"
            aria-expanded={open()}
            onClick={(e) => {
              e.stopPropagation();
              setOpen((o) => !o);
            }}
          >
            <span class={`shell-trip-dot ${activeTrip()?.status || ""}`} />
            <span class="shell-trip-name">{activeTrip()?.name || "No trip"}</span>
            <Icon name="arrow" size={12} />
          </button>
          <Show when={open()}>
            <ul class="shell-trip-menu" role="listbox" aria-label="Switch trip">
              <For each={trips}>
                {(t) => (
                  <li>
                    <button type="button"
                      class={`shell-trip-opt ${t.id === activeTripId() ? "on" : ""}`}
                      role="option"
                      aria-selected={t.id === activeTripId()}
                      onClick={() => {
                        setActiveTrip(t.id);
                        setOpen(false);
                      }}
                    >
                      <span class={`shell-trip-dot ${t.status}`} />
                      <div class="shell-trip-opt-body">
                        <div class="shell-trip-opt-name">{t.name}</div>
                        <div class="shell-trip-opt-meta">
                          {TRIP_STATUS_LABEL[t.status]} · {t.dates}
                          {t.nights ? ` · ${t.nights} nights` : ""}
                        </div>
                      </div>
                    </button>
                  </li>
                )}
              </For>
            </ul>
          </Show>
        </div>

        <div class="shell-spacer" />

        <div class="shell-user" aria-label="Signed in as Mariana C.">
          <span class="shell-user-name">Mariana C.</span>
        </div>
      </div>

      <nav class="shell-row shell-row-tabs" role="tablist" aria-label="Surfaces">
        <For each={SURFACES}>
          {(s) => (
            <button type="button"
              class={`shell-tab ${props.surface === s.id ? "on" : ""}`}
              role="tab"
              aria-selected={props.surface === s.id}
              aria-current={props.surface === s.id ? "page" : undefined}
              onClick={() => props.onSurface(s.id)}
            >
              {s.label}
            </button>
          )}
        </For>
        <div class="shell-tab-spacer" />
        <div class={accentClass()} aria-hidden="true" />
      </nav>
    </header>
  );
}
