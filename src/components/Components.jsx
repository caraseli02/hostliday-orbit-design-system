import { For } from "solid-js";

export default function Components(props) {
  const BRAND_COLORS = [
    { hex: "#DA0000", label: "red-bright" },
    { hex: "#BE0000", label: "red" },
    { hex: "#810000", label: "red-deep" },
  ];

  const NEUTRAL_COLORS = [
    { hex: "#FFFFFF", label: "neutral-0" },
    { hex: "#FAF8F6", label: "neutral-50" },
    { hex: "#F4F1ED", label: "neutral-100" },
    { hex: "#E1DFDD", label: "neutral-200" },
    { hex: "#A3A2A2", label: "neutral-400" },
    { hex: "#5E5D5C", label: "neutral-600" },
    { hex: "#232221", label: "neutral-800" },
    { hex: "#000000", label: "neutral-1000" },
  ];

  const STATUS_COLORS = [
    { hex: "#1F7A4D", label: "confirmed" },
    { hex: "#B6822E", label: "held" },
    { hex: "#2E5C8A", label: "live" },
    { hex: "#DA0000", label: "critical" },
  ];

  return (
    <div class="showcase">
      <div class="showcase-back-row">
        <button class="showcase-back" onClick={() => props.onExit && props.onExit()}>
          ← Back to product
        </button>
      </div>
      <h1 style={{"margin-bottom":"var(--sp-10)"}}>Component Library</h1>

      <div class="showcase-section">
        <h2>Colors</h2>
        <h3>Brand</h3>
        <div class="color-grid">
          <For each={BRAND_COLORS}>
            {(c) => (
              <div class="color-swatch" style={`background:${c.hex}`}>
                <span class="label">{c.label}</span>
              </div>
            )}
          </For>
        </div>

        <h3>Neutrals</h3>
        <div class="color-grid">
          <For each={NEUTRAL_COLORS}>
            {(c) => (
              <div class="color-swatch" style={`background:${c.hex}`}>
                <span class="label">{c.label}</span>
              </div>
            )}
          </For>
        </div>

        <h3>Status</h3>
        <div class="color-grid">
          <For each={STATUS_COLORS}>
            {(c) => (
              <div class="color-swatch" style={`background:${c.hex}`}>
                <span class="label">{c.label}</span>
              </div>
            )}
          </For>
        </div>
      </div>

      <div class="showcase-section">
        <h2>Typography</h2>
        <div class="type-sample">
          <div style={{"font-family":"var(--font-display)","font-weight":"900","font-size":"64px","letter-spacing":"-0.03em","line-height":"1.05"}}>
            Display
          </div>
          <div style={{"font-family":"var(--font-display)","font-weight":"700","font-size":"32px","letter-spacing":"-0.02em","margin-top":"12px"}}>
            Heading
          </div>
          <div style={{"font-family":"var(--font-body)","font-weight":"600","font-size":"18px","margin-top":"12px"}}>
            Body large — 18px
          </div>
          <div style={{"font-family":"var(--font-body)","font-weight":"400","font-size":"15px","margin-top":"8px","color":"var(--fg-2)"}}>
            Body regular — 15px. The quick brown fox jumps over the lazy dog.
          </div>
          <div style={{"font-family":"var(--font-mono)","font-weight":"500","font-size":"13px","margin-top":"8px","color":"var(--fg-3)"}}>
            MONO — 13px · CP-AP221 · 14:08 → 17:01
          </div>
        </div>
      </div>

      <div class="showcase-section">
        <h2>Buttons</h2>
        <div class="button-group">
          <button class="btn btn-primary">Primary</button>
          <button class="btn btn-secondary">Secondary</button>
          <button class="btn btn-ghost">Ghost</button>
        </div>
      </div>

      <div class="showcase-section">
        <h2>Form inputs</h2>
        <div style={{"max-width":"400px","display":"flex","flex-direction":"column","gap":"var(--sp-4)"}}>
          <input class="input" placeholder="Placeholder text" />
          <input class="input" value="Focused state" />
        </div>
      </div>

      <div class="showcase-section">
        <h2>Cards</h2>
        <div class="grid" style={{"max-width":"600px"}}>
          <div style={{"background":"var(--bg-surface)","border-radius":"var(--r-card)","padding":"var(--sp-5)","box-shadow":"var(--shadow-card)","border-top":"3px solid var(--hostliday-red-500)"}}>
            <div style={{"font":"700 11px var(--font-body)","letter-spacing":"var(--ls-widest)","text-transform":"uppercase","color":"var(--hostliday-red-700)"}}>
              Explore
            </div>
            <div style={{"font-family":"var(--font-display)","font-weight":"700","font-size":"18px","margin-top":"8px"}}>
              Warm card variant
            </div>
            <p style={{"font-size":"14px","color":"var(--fg-2)","margin-top":"6px"}}>
              With colored top accent bar.
            </p>
          </div>
          <div style={{"background":"var(--bg-surface)","border-radius":"var(--r-card)","padding":"var(--sp-5)","box-shadow":"var(--shadow-card)","border-top":"3px solid var(--status-confirmed)"}}>
            <div style={{"font":"700 11px var(--font-body)","letter-spacing":"var(--ls-widest)","text-transform":"uppercase","color":"var(--status-confirmed)"}}>
              Compose
            </div>
            <div style={{"font-family":"var(--font-display)","font-weight":"700","font-size":"18px","margin-top":"8px"}}>
              Confirmed card variant
            </div>
            <p style={{"font-size":"14px","color":"var(--fg-2)","margin-top":"6px"}}>Green accent bar.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
