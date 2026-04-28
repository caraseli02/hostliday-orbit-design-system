import { createSignal, Show, ErrorBoundary } from "solid-js";
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

function SurfaceError({ name, error }) {
  return (
    <div class="surface-error" role="alert">
      <h2>Something went wrong in {name}</h2>
      <pre>{error.message}</pre>
      <button onclick={() => window.location.reload()}>Reload</button>
    </div>
  );
}

export default function App() {
  const [surface, setSurface] = createSignal("overview");

  const isFullViewport = () => FULL_VIEWPORT.has(surface());
  const showShell = () => !isFullViewport() && surface() !== "components";

  return (
    <TripProvider>
      <Walkthrough surface={surface} onSurface={setSurface} />

      <Show when={showShell()}>
        <Shell surface={surface()} onSurface={setSurface} />
      </Show>

      <main id="shell-main" class={`main ${isFullViewport() ? "full-viewport" : ""}`} tabindex="-1">
        <ErrorBoundary fallback={(err) => <SurfaceError name="Overview" error={err} />}>
          <Show when={surface() === "overview"}>
            <Overview onNavigate={setSurface} />
          </Show>
        </ErrorBoundary>

        <ErrorBoundary fallback={(err) => <SurfaceError name="Explore" error={err} />}>
          <Show when={surface() === "explore"}>
            <Explore onNavigate={setSurface} />
          </Show>
        </ErrorBoundary>

        <ErrorBoundary fallback={(err) => <SurfaceError name="Compose" error={err} />}>
          <Show when={surface() === "compose"}>
            <Compose />
          </Show>
        </ErrorBoundary>

        <ErrorBoundary fallback={(err) => <SurfaceError name="Navigate" error={err} />}>
          <Show when={surface() === "navigate"}>
            <Navigate onExit={() => setSurface("overview")} />
          </Show>
        </ErrorBoundary>

        <ErrorBoundary fallback={(err) => <SurfaceError name="Recover" error={err} />}>
          <Show when={surface() === "recover"}>
            <Recover />
          </Show>
        </ErrorBoundary>

        <ErrorBoundary fallback={(err) => <SurfaceError name="Components" error={err} />}>
          <Show when={surface() === "components"}>
            <Components onExit={() => setSurface("overview")} />
          </Show>
        </ErrorBoundary>
      </main>

      <Show when={showShell()}>
        <Footer onSurface={setSurface} />
      </Show>

      <Toast />
    </TripProvider>
  );
}
