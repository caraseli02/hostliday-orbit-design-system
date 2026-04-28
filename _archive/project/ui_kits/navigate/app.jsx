function NavIcon({ name, size=18 }) {
  const p = {
    car:  <><path d="M5 17h14"/><path d="M5 17l1-5h12l1 5"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></>,
    msg:  <path d="M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z"/>,
    nav:  <path d="M3 11l18-8-8 18-2-8z"/>,
    plus: <><path d="M12 5v14"/><path d="M5 12h14"/></>,
    minus:<path d="M5 12h14"/>,
    locate:<><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></>,
    bed:  <><path d="M19 14V8a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v6"/><rect x="3" y="14" width="18" height="6" rx="1"/></>,
    food: <><path d="M3 4v8a4 4 0 0 0 4 4v6"/><path d="M7 4v8M11 4v8"/><path d="M17 4c-1.5 2-2 4-2 6s.5 4 2 4v6"/></>,
    hike: <><path d="M3 21l4-7 3 4 4-9 7 12"/></>,
    help: <><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 4"/><circle cx="12" cy="17" r=".7" fill="currentColor"/></>,
  };
  return <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{p[name]}</svg>;
}

function MapStage() {
  return (
    <svg className="map-svg" viewBox="0 0 1280 720" preserveAspectRatio="xMidYMid slice"
         style={{position:"absolute", inset:0, width:"100%", height:"100%"}}>
      {/* Park / water blobs */}
      <path className="map-park" d="M0 520 Q 200 460 380 500 T 720 540 L 720 720 L 0 720 Z" />
      <path className="map-water" d="M820 0 Q 880 120 940 220 Q 1000 340 1100 380 Q 1200 420 1280 410 L 1280 0 Z" opacity=".6" />
      <path className="map-water" d="M0 0 Q 80 60 180 80 Q 260 100 280 60 L 280 0 Z" opacity=".5"/>

      {/* roads grid */}
      <g className="map-roads">
        <path className="major" d="M-20 380 Q 320 360 640 400 T 1300 360" />
        <path className="major" d="M-20 540 Q 280 520 540 540 T 1300 520" />
        <path d="M-20 200 Q 360 220 720 220 T 1300 240"/>
        <path d="M-20 100 Q 200 120 400 100 T 760 110 T 1300 110"/>
        <path d="M-20 640 Q 380 660 720 650 T 1300 660"/>

        <path className="major" d="M280 -20 Q 280 200 320 380 T 380 740" />
        <path className="major" d="M740 -20 Q 720 200 700 400 T 660 740" />
        <path d="M120 -20 Q 100 280 140 540 T 160 740"/>
        <path d="M520 -20 Q 540 200 540 380 T 520 740"/>
        <path d="M920 -20 Q 940 200 920 380 T 940 740"/>
        <path d="M1100 -20 Q 1080 240 1100 460 T 1100 740"/>
      </g>

      {/* completed route */}
      <path className="route-done" d="M120 600 Q 240 540 320 480 T 480 340" />
      {/* current route */}
      <path className="route" d="M480 340 Q 580 290 660 280 T 820 220 L 920 180 L 980 130" />

      {/* Past pins (faded) */}
      <g transform="translate(120 600)" opacity=".55">
        <circle r="8" className="pin-ring" />
        <circle r="3" className="pin" />
      </g>
      <g transform="translate(480 340)" opacity=".55">
        <circle r="8" className="pin-ring" />
        <circle r="3" className="pin" />
      </g>
      {/* Destination pin */}
      <g transform="translate(980 130)">
        <circle r="14" fill="#DA0000" opacity=".25" />
        <circle r="9" fill="#DA0000" />
        <circle r="3" fill="#fff" />
      </g>

      {/* Live position */}
      <g transform="translate(680 270)">
        <circle r="22" className="live-pulse" />
        <circle r="10" fill="#0E1117" />
        <circle r="7" className="live-dot" />
      </g>

      {/* Place labels */}
      <g style={{fontFamily:"Inter, sans-serif", fontSize:11, fill:"rgba(255,255,255,.55)", letterSpacing:".06em", textTransform:"uppercase", fontWeight:600}}>
        <text x="120" y="624" textAnchor="middle">Lisbon</text>
        <text x="480" y="364" textAnchor="middle">Coimbra</text>
        <text x="990" y="118" textAnchor="start">Douro Valley</text>
      </g>
    </svg>
  );
}

function App() {
  return (
    <div className="shell">
      <div className="map"><MapStage/></div>

      <div className="topbar">
        <div className="glass brand-pill"><img src="../../assets/logos/hostliday-wordmark-white.svg"/></div>
        <div className="glass crumb">
          <div className="lbl">Day 1 · in transit</div>
          <div className="ttl"><span className="dot"></span>LIS Airport → Casa do Vale, Douro Valley</div>
          <div className="meta">Driver Henrique · Black Skoda · 22-AB-94 · ETA 02:14</div>
        </div>
        <div className="glass help-btn"><NavIcon name="help"/> Help</div>
      </div>

      <div className="fab">
        <button title="Re-center"><NavIcon name="locate"/></button>
        <button title="Zoom in"><NavIcon name="plus"/></button>
        <button title="Zoom out"><NavIcon name="minus"/></button>
      </div>

      <div className="glass sheet">
        <div className="sheet-grid">
          <div>
            <div className="leg-eye"><span className="dot"></span>Live · arriving in 14 min</div>
            <h2 className="leg-title">Your driver is 4 minutes away.</h2>
            <div className="leg-meta">
              <div className="lm"><span className="k">ETA</span><span className="v lg">02:14</span></div>
              <div className="lm"><span className="k">Distance</span><span className="v">12.4 km</span></div>
              <div className="lm"><span className="k">Vehicle</span><span className="v">22-AB-94</span></div>
              <div className="lm"><span className="k">Driver</span><span className="v">Henrique</span></div>
            </div>
          </div>
          <div className="leg-actions">
            <button className="btn-pri"><NavIcon name="msg" size={16}/> Message driver</button>
            <button className="btn-sec"><NavIcon name="nav" size={14}/> Open in Maps</button>
          </div>
        </div>
        <div className="upnext">
          <div className="up-item">
            <div className="ico"><NavIcon name="bed" size={16}/></div>
            <div className="body"><div className="nm">Casa do Vale · check-in</div><div className="tm">Day 1 · 02:30</div></div>
          </div>
          <div className="up-item">
            <div className="ico"><NavIcon name="hike" size={16}/></div>
            <div className="body"><div className="nm">Douro vineyard walk</div><div className="tm">Day 2 · 09:00</div></div>
          </div>
          <div className="up-item">
            <div className="ico"><NavIcon name="food" size={16}/></div>
            <div className="body"><div className="nm">Tasca dinner · Lisbon</div><div className="tm">Day 3 · 22:30</div></div>
          </div>
          <div className="up-item">
            <div className="ico"><NavIcon name="car" size={16}/></div>
            <div className="body"><div className="nm">Train · Lisbon → Porto</div><div className="tm">Day 3 · 14:08</div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("app")).render(<App/>);
