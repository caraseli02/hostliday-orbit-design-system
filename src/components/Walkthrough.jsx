import { createSignal, createEffect, onCleanup, onMount, Show } from "solid-js";

const STEPS = ["overview", "explore", "compose", "recover"];
const STEP_LABEL = {
  overview: "Overview · the pitch",
  explore: "Explore · paste-everything intake",
  compose: "Compose · plan + reasoning",
  recover: "Recover · disruption + concierge",
};
const AUTO_MS = 8000;

export default function Walkthrough(props) {
  const [active, setActive] = createSignal(false);
  const [paused, setPaused] = createSignal(false);
  const [tickProgress, setTickProgress] = createSignal(0);

  const currentIndex = () =>
    STEPS.indexOf(props.surface()) === -1 ? 0 : STEPS.indexOf(props.surface());

  const advance = () => {
    const next = STEPS[currentIndex() + 1];
    if (next) props.onSurface(next);
    else stop();
  };

  const back = () => {
    const prev = STEPS[currentIndex() - 1];
    if (prev) props.onSurface(prev);
  };

  const start = () => {
    setActive(true);
    setPaused(false);
    if (!STEPS.includes(props.surface())) props.onSurface("overview");
  };

  const stop = () => {
    setActive(false);
    setPaused(false);
  };

  const onKey = (e) => {
    if (!active()) return;
    if (e.key === "Escape") {
      stop();
      return;
    }
    if (e.key === "ArrowRight" || e.key === " ") {
      e.preventDefault();
      advance();
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      back();
    }
    if (e.key === "p" || e.key === "P") setPaused((p) => !p);
  };

  onMount(() => {
    const params = new URLSearchParams(window.location.search);
    const demo = params.get("demo");
    if (demo === "walkthrough") start();
    if (demo === "incident") {
      props.onSurface("compose");
      const t = setTimeout(() => props.onSurface("recover"), 30000);
      onCleanup(() => clearTimeout(t));
    }
    window.addEventListener("keydown", onKey);
    onCleanup(() => window.removeEventListener("keydown", onKey));
  });

  createEffect(() => {
    if (!active() || paused()) return;
    setTickProgress(0);
    const startTime = Date.now();
    const interval = setInterval(() => {
      const pct = Math.min(100, ((Date.now() - startTime) / AUTO_MS) * 100);
      setTickProgress(pct);
    }, 80);
    const t = setTimeout(advance, AUTO_MS);
    onCleanup(() => {
      clearTimeout(t);
      clearInterval(interval);
    });
  });

  return (
    <Show when={active()}>
      <div class="walkthrough-bar" role="region" aria-label="Walkthrough controls">
        <div class="wt-progress" aria-hidden="true">
          <div class="wt-progress-bar" style={`width:${paused() ? 0 : tickProgress()}%`}></div>
        </div>
        <div class="wt-row">
          <span class="wt-eye">Walkthrough</span>
          <span class="wt-step">
            {currentIndex() + 1} / {STEPS.length}
          </span>
          <span class="wt-label">{STEP_LABEL[props.surface()] || ""}</span>
          <div class="wt-spacer"></div>
          <button
            class="wt-btn"
            onclick={back}
            disabled={currentIndex() === 0}
            aria-label="Previous step"
          >
            ←
          </button>
          <button
            class="wt-btn wt-btn-pause"
            onclick={() => setPaused((p) => !p)}
            aria-label={paused() ? "Resume" : "Pause"}
          >
            {paused() ? "▶" : "❚❚"}
          </button>
          <button class="wt-btn" onclick={advance} aria-label="Next step">
            →
          </button>
          <button class="wt-btn wt-btn-exit" onclick={stop} aria-label="Exit walkthrough">
            Esc
          </button>
        </div>
      </div>
    </Show>
  );
}
