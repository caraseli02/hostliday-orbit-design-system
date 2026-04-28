import { createSignal, Show } from "solid-js";
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
        <div class={`surface ${surface() === "overview" ? "active" : ""}`}>
          <Overview onNavigate={setSurface} />
        </div>
        <div class={`surface ${surface() === "explore" ? "active" : ""}`}>
          <Explore onNavigate={setSurface} />
        </div>
        <div class={`surface ${surface() === "compose" ? "active" : ""}`}>
          <Compose />
        </div>
        <div class={`surface ${surface() === "navigate" ? "active" : ""}`}>
          <Navigate onExit={() => setSurface("overview")} />
        </div>
        <div class={`surface ${surface() === "recover" ? "active" : ""}`}>
          <Recover />
        </div>
        <div class={`surface ${surface() === "components" ? "active" : ""}`}>
          <Components onExit={() => setSurface("overview")} />
        </div>
      </main>

      <Show when={showShell()}>
        <Footer onSurface={setSurface} />
      </Show>

      <Toast />
    </TripProvider>
  );
}
