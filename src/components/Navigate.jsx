import Icon from "./Icon";

function MapStage() {
  return (
    <svg
      class="map-svg"
      viewBox="0 0 1280 720"
      preserveAspectRatio="xMidYMid slice"
      style={{"position":"absolute","inset":"0","width":"100%","height":"100%"}}
    >
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
      <path class="route" d="M480 340 Q 580 290 660 280 T 820 220 L 920 180 L 980 130" />
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
      <g style={{"font-family":"var(--font-body)","font-size":"11px","fill":"rgba(255,255,255,.55)","letter-spacing":".06em","text-transform":"uppercase","font-weight":"600"}}>
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

export default function Navigate(props) {
  return (
    <div class="nav-shell orbit-dark">
      <div class="nav-map">
        <MapStage />
      </div>

      <div class="nav-topbar">
        <div class="glass brand-pill" onClick={() => props.onExit()} style={{"cursor":"pointer"}}>
          <img src="/assets/logos/hostliday-wordmark-white.svg" />
        </div>
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
        <button title="Re-center">
          <Icon name="locate" />
        </button>
        <button title="Zoom in">
          <Icon name="plus" />
        </button>
        <button title="Zoom out">
          <Icon name="minus" />
        </button>
      </div>

      <div class="glass nav-sheet">
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
            <button class="btn-pri">
              <Icon name="msg" size={16} /> Message driver
            </button>
            <button class="btn-sec">
              <Icon name="nav" size={14} /> Open in Maps
            </button>
          </div>
        </div>
        <div class="upnext">
          <div class="up-item">
            <div class="ico">
              <Icon name="bed" size={16} />
            </div>
            <div class="body">
              <div class="nm">Casa do Vale · check-in</div>
              <div class="tm">Day 1 · 02:30</div>
            </div>
          </div>
          <div class="up-item">
            <div class="ico">
              <Icon name="hike" size={16} />
            </div>
            <div class="body">
              <div class="nm">Douro vineyard walk</div>
              <div class="tm">Day 2 · 09:00</div>
            </div>
          </div>
          <div class="up-item">
            <div class="ico">
              <Icon name="food" size={16} />
            </div>
            <div class="body">
              <div class="nm">Tasca dinner · Lisbon</div>
              <div class="tm">Day 3 · 22:30</div>
            </div>
          </div>
          <div class="up-item">
            <div class="ico">
              <Icon name="car" size={16} />
            </div>
            <div class="body">
              <div class="nm">Train · Lisbon → Porto</div>
              <div class="tm">Day 3 · 14:08</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
