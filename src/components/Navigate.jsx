import { createSignal, Show, For, onMount } from "solid-js";
import Icon from "./Icon";
import { useTrip } from "../state";

const DEFAULT_VIEWBOX = { x: 0, y: 0, w: 1280, h: 720 };
const ZOOM_STEP = 120;
const MIN_W = 400;
const MAX_W = 2000;

function MapStage(props) {
  return (
    <svg
      class="map-svg"
      viewBox={`${props.vb.x} ${props.vb.y} ${props.vb.w} ${props.vb.h}`}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Map showing route from Lisbon to Douro Valley"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    >
      <defs>
        <filter id="route-glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path class="map-park" d="M0 520 Q 200 460 380 500 T 720 540 L 720 720 L 0 720 Z" />
      <path
        class="map-water"
        d="M820 0 Q 880 120 940 220 Q 1000 340 1100 380 Q 1200 420 1280 410 L 1280 0 Z"
        opacity=".6"
      />
      <path class="map-water" d="M0 0 Q 80 60 180 80 Q 260 100 280 60 L 280 0 Z" opacity=".5" />
      <g class="map-roads">
        <path class="major" d="M-20 380 Q 320 360 640 400 T 1300 360" />
        <path class="major" d="M-20 540 Q 280 520 540 540 T 1300 520" />
        <path d="M-20 200 Q 360 220 720 220 T 1300 240" />
        <path d="M-20 100 Q 200 120 400 100 T 760 110 T 1300 110" />
        <path d="M-20 640 Q 380 660 720 650 T 1300 660" />
        <path class="major" d="M280 -20 Q 280 200 320 380 T 380 740" />
        <path class="major" d="M740 -20 Q 720 200 700 400 T 660 740" />
        <path d="M120 -20 Q 100 280 140 540 T 160 740" />
        <path d="M520 -20 Q 540 200 540 380 T 520 740" />
        <path d="M920 -20 Q 940 200 920 380 T 940 740" />
        <path d="M1100 -20 Q 1080 240 1100 460 T 1100 740" />
      </g>
      <path class="route-done" d="M120 600 Q 240 540 320 480 T 480 340" />
      <path
        ref={routeRef}
        class="route route-animated"
        d="M480 340 Q 580 290 660 280 T 820 220 L 920 180 L 980 130"
      />
      <g transform="translate(120 600)" opacity=".55">
        <circle r="8" class="pin-ring" />
        <circle r="3" class="pin" />
      </g>
      <g transform="translate(480 340)" opacity=".55">
        <circle r="8" class="pin-ring" />
        <circle r="3" class="pin" />
      </g>
      <g transform="translate(980 130)">
        <circle r="14" class="dest-ring" />
        <circle r="9" class="dest-dot" />
        <circle r="3" class="dest-center" />
      </g>
      <g transform="translate(680 270)">
        <circle r="22" class="live-pulse" />
        <circle r="10" class="live-dot-bg" />
        <circle r="7" class="live-dot" />
      </g>
      <g style={{ "font-family": "var(--font-body)", "font-size": "11px", fill: "rgba(255,255,255,.72)", "letter-spacing": ".06em", "text-transform": "uppercase", "font-weight": 600 }}>
        <text x="120" y="624" text-anchor="middle">
          Lisbon
        </text>
        <text x="480" y="364" text-anchor="middle">
          Coimbra
        </text>
        <text x="990" y="118" text-anchor="start">
          Douro Valley
        </text>
      </g>
    </svg>
  );
}

const UPCOMING = [
  { icon: "bed", name: "Casa do Vale · check-in", time: "Day 1 · 02:30" },
  { icon: "hike", name: "Douro vineyard walk", time: "Day 2 · 09:00" },
  { icon: "food", name: "Tasca dinner · Lisbon", time: "Day 3 · 22:30" },
  { icon: "car", name: "Train · Lisbon → Porto", time: "Day 3 · 14:08" },
];

export default function Navigate(props) {
  const { showToast } = useTrip();

  const [vb, setVb] = createSignal({ ...DEFAULT_VIEWBOX });
  const [sheetExpanded, setSheetExpanded] = createSignal(false);
  let sheetRef = undefined;
  let routeRef = undefined;
  let dragStartY = 0;
  let dragDelta = 0;

  onMount(() => {
    if (routeRef) {
      const len = routeRef.getTotalLength();
      routeRef.style.strokeDasharray = len;
      routeRef.style.strokeDashoffset = len;
      // Force reflow then animate
      routeRef.getBoundingClientRect();
      routeRef.style.transition = "stroke-dashoffset 2.4s cubic-bezier(0.4, 0, 0.2, 1)";
      routeRef.style.strokeDashoffset = "0";
    }
  });

  function zoomIn() {
    setVb((prev) => {
      const w = Math.max(MIN_W, prev.w - ZOOM_STEP);
      const h = w * (720 / 1280);
      return { x: prev.x + (prev.w - w) / 2, y: prev.y + (prev.h - h) / 2, w, h };
    });
  }

  function zoomOut() {
    setVb((prev) => {
      const w = Math.min(MAX_W, prev.w + ZOOM_STEP);
      const h = w * (720 / 1280);
      return { x: prev.x + (prev.w - w) / 2, y: prev.y + (prev.h - h) / 2, w, h };
    });
  }

  function reCenter() {
    setVb({ ...DEFAULT_VIEWBOX });
  }

  function onSheetPointerDown(e) {
    if (!sheetRef) return;
    dragStartY = e.clientY;
    dragDelta = 0;
    const onMove = (ev) => {
      dragDelta = ev.clientY - dragStartY;
    };
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      // Swipe up → expand, swipe down → collapse
      if (dragDelta < -40) setSheetExpanded(true);
      else if (dragDelta > 40) setSheetExpanded(false);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  }

  function toggleSheet() {
    setSheetExpanded((prev) => !prev);
  }

  function handleMessage() {
    showToast({ message: "Opening chat with Henrique…" });
  }

  function handleMaps() {
    showToast({ message: "Opening route in Maps…" });
  }

  return (
    <div class="nav-shell orbit-dark">
      <div class="nav-map">
        <MapStage vb={vb()} />
      </div>

      <div class="nav-topbar">
        <button type="button" class="glass brand-pill" onClick={() => props.onExit()} aria-label="Back to product">
          <img src="/assets/logos/hostliday-wordmark-white.svg" alt="Hostliday" />
        </button>
        <div class="glass nav-crumb">
          <div class="lbl">Day 1 · in transit</div>
          <div class="ttl">
            <span class="dot-live" />LIS Airport → Casa do Vale, Douro Valley
          </div>
          <div class="meta">Driver Henrique · Black Skoda · 22-AB-94 · ETA 02:14</div>
        </div>
        <div class="glass help-btn">
          <Icon name="help" /> Help
        </div>
      </div>

      <div class="nav-fab">
        <button type="button" title="Re-center" aria-label="Re-center map" onClick={reCenter}>
          <Icon name="locate" />
        </button>
        <button type="button" title="Zoom in" aria-label="Zoom in" onClick={zoomIn}>
          <Icon name="plus" />
        </button>
        <button type="button" title="Zoom out" aria-label="Zoom out" onClick={zoomOut}>
          <Icon name="minus" />
        </button>
      </div>

      <div
        ref={sheetRef}
        classList={{ "glass nav-sheet": true, "sheet-expanded": sheetExpanded(), "sheet-peek": !sheetExpanded() }}
        role="region"
        aria-label="Current trip leg details"
      >
        <div class="sheet-handle" onPointerDown={onSheetPointerDown} onClick={toggleSheet}>
          <span class="handle-bar" />
        </div>

        <div class="sheet-grid">
          <div>
            <div class="leg-eye">
              <span class="dot-live" />Live · arriving in 14 min
            </div>
            <h2 class="leg-title">Your driver is 4 minutes away.</h2>
            <div class="leg-meta">
              <div class="lm">
                <span class="k">ETA</span>
                <span class="v lg">02:14</span>
              </div>
              <div class="lm">
                <span class="k">Distance</span>
                <span class="v">12.4 km</span>
              </div>
              <div class="lm">
                <span class="k">Vehicle</span>
                <span class="v">22-AB-94</span>
              </div>
              <div class="lm">
                <span class="k">Driver</span>
                <span class="v">Henrique</span>
              </div>
            </div>
          </div>
          <div class="leg-actions">
            <button type="button" class="btn-pri" aria-label="Message driver Henrique" onClick={handleMessage}>
              <Icon name="msg" size={16} /> Message driver
            </button>
            <button type="button" class="btn-sec" aria-label="Open route in Maps" onClick={handleMaps}>
              <Icon name="nav" size={14} /> Open in Maps
            </button>
          </div>
        </div>

        <Show when={sheetExpanded()}>
          <div class="upnext">
            <For each={UPCOMING}>
              {(item) => (
                <div class="up-item" tabindex="0" role="listitem">
                  <div class="ico">
                    <Icon name={item.icon} size={16} />
                  </div>
                  <div class="body">
                    <div class="nm">{item.name}</div>
                    <div class="tm">{item.time}</div>
                  </div>
                </div>
              )}
            </For>
          </div>
        </Show>
      </div>
    </div>
  );
}
