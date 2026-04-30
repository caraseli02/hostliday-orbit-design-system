import { createSignal, Show, ErrorBoundary, createEffect } from "solid-js";
import { TripProvider } from "./state";
import Shell from "./components/Shell";
import Footer from "./components/Footer";
import Toast from "./components/Toast";
import Walkthrough from "./components/Walkthrough";
import Overview from "./components/Overview";
import Explore from "./components/Explore";
import Compose from "./components/Compose";
import Navigate from "./components/Navigate";
import Recover from "./components/Recover";
import Components from "./components/Components";

const FULL_VIEWPORT = new Set(["navigate"]);

function getSurfaceFromHash() {
  const hash = window.location.hash.slice(1); // remove #
  if (!hash || hash === "/") return "overview";
  return hash.replace(/^\//, "");
}

function SurfaceError(props) {
  return (
    <div class="surface-error" role="alert">
      <h2>Something went wrong in {props.name}</h2>
      <pre>{props.error.message}</pre>
      <button type="button" onClick={() => window.location.reload()}>Reload</button>
    </div>
  );
}

export default function App() {
  const [surface, setSurface] = createSignal(getSurfaceFromHash());

  // Listen for hash changes (browser back/forward)
  const onHashChange = () => {
    const s = getSurfaceFromHash();
    if (s !== surface()) setSurface(s);
  };
  window.addEventListener("hashchange", onHashChange);

  // Navigate to surface (updates signal + URL hash)
  const navigateToSurface = (s) => {
    setSurface(s);
    const hash = s === "overview" ? "" : s;
    window.location.hash = hash ? `#${hash}` : "";
    if (!hash) {
      // Clear the hash completely
      history.pushState(null, "", window.location.pathname);
    }
  };

  // Focus management: move focus to main on surface change
  createEffect(() => {
    surface(); // track
    requestAnimationFrame(() => {
      const main = document.getElementById("shell-main");
      if (main) main.focus();
    });
  });

  const isFullViewport = () => FULL_VIEWPORT.has(surface());
  const showShell = () => !isFullViewport() && surface() !== "components";

  return (
    <TripProvider>
      <Walkthrough surface={surface} onSurface={navigateToSurface} />

      <Show when={showShell()}>
        <Shell surface={surface()} onSurface={navigateToSurface} />
      </Show>

      <main id="shell-main" class={`main ${isFullViewport() ? "full-viewport" : ""}`} tabindex="-1">
        <ErrorBoundary fallback={(err) => <SurfaceError name="Overview" error={err} />}>
          <Show when={surface() === "overview"}>
            <div class="surface-enter">
              <Overview onNavigate={navigateToSurface} />
            </div>
          </Show>
        </ErrorBoundary>

        <ErrorBoundary fallback={(err) => <SurfaceError name="Explore" error={err} />}>
          <Show when={surface() === "explore"}>
            <div class="surface-enter">
              <Explore onNavigate={navigateToSurface} />
            </div>
          </Show>
        </ErrorBoundary>

        <ErrorBoundary fallback={(err) => <SurfaceError name="Compose" error={err} />}>
          <Show when={surface() === "compose"}>
            <div class="surface-enter">
              <Compose />
            </div>
          </Show>
        </ErrorBoundary>

        <ErrorBoundary fallback={(err) => <SurfaceError name="Navigate" error={err} />}>
          <Show when={surface() === "navigate"}>
            <Navigate onExit={() => navigateToSurface("overview")} />
          </Show>
        </ErrorBoundary>

        <ErrorBoundary fallback={(err) => <SurfaceError name="Recover" error={err} />}>
          <Show when={surface() === "recover"}>
            <div class="surface-enter">
              <Recover />
            </div>
          </Show>
        </ErrorBoundary>

        <ErrorBoundary fallback={(err) => <SurfaceError name="Components" error={err} />}>
          <Show when={surface() === "components"}>
            <div class="surface-enter">
              <Components onExit={() => navigateToSurface("overview")} />
            </div>
          </Show>
        </ErrorBoundary>
      </main>

      <Show when={showShell()}>
        <Footer onSurface={navigateToSurface} />
      </Show>

      <Toast />
    </TripProvider>
  );
}
