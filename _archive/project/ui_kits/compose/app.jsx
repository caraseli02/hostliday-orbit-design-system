function ComposeIcon({ name, size=16 }) {
  const p = {
    plane: <path d="M21 12L4 5l3 7-3 7z"/>,
    bed:   <><path d="M19 14V8a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v6"/><rect x="3" y="14" width="18" height="6" rx="1"/><path d="M7 14v3M17 14v3"/></>,
    train: <><rect x="6" y="3" width="12" height="14" rx="3"/><path d="M9 17l-2 4M15 17l2 4M9 8h6"/></>,
    food:  <><path d="M3 4v8a4 4 0 0 0 4 4v6"/><path d="M7 4v8M11 4v8"/><path d="M17 4c-1.5 2-2 4-2 6s.5 4 2 4v6"/></>,
    plus:  <><path d="M12 5v14"/><path d="M5 12h14"/></>,
    spark: <path d="M12 3l1.7 4.6L18 9.5l-4.3 1.9L12 16l-1.7-4.6L6 9.5l4.3-1.9z"/>,
    send:  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/>,
    car:   <><path d="M5 17h14"/><path d="M5 17l1-5h12l1 5"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></>,
  };
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{p[name]}</svg>
  );
}

function Slot({ kind, status, time, name, sub, children }) {
  const ic = {flight:"plane", stay:"bed", train:"train", food:"food", car:"car"}[kind];
  return (
    <div className={`slot ${status||""}`}>
      <div className="ico"><ComposeIcon name={ic} /></div>
      <div className="body">
        <div className="name">{name}</div>
        <div className="sub">{sub}{children}</div>
      </div>
      {time && <div className="time">{time}</div>}
      {status === "confirmed" && <span className="badge b-confirmed">Confirmed</span>}
      {status === "held" && <span className="badge b-held">Held · 23h</span>}
    </div>
  );
}

function Gap({ label, onAdd }) {
  return (
    <div className="gap" onClick={onAdd}>
      <span className="plus"><ComposeIcon name="plus" size={14}/></span>
      {label}
    </div>
  );
}

function App() {
  const [tab, setTab] = React.useState("orbit");
  const [tray, setTray] = React.useState(true);
  return (
    <div className="shell">
      <header className="bar">
        <img src="../../assets/logos/hostliday-wordmark.svg" />
        <div className="crumb">Trips · <b>Iberia, late August</b></div>
        <div className="grow"></div>
        <button className="save">Save draft</button>
        <button className="ship">Hold all options</button>
      </header>
      <main className="timeline">
        <div className="tl-head">
          <h1 className="tl-title">Iberia, late August</h1>
          <div className="tl-meta">22 — 28 Aug · 6 nights · 2 travelers</div>
        </div>

        <section className="day">
          <div className="day-head">
            <span className="day-num">22</span>
            <span className="day-date">Fri · Aug</span>
            <span className="day-line"></span>
            <span className="day-temp">28° / clear</span>
          </div>
          <Slot kind="flight" status="confirmed" time="22:40" name="LHR → LIS · BA 502"
                sub="London Heathrow → Lisbon · 2h 50m · seat 14F" />
          <Gap label="Add a transfer to your stay (Orbit suggested a private car)" />
          <Slot kind="stay" status="held" time="late" name="Casa do Vale · Douro Valley"
                sub="Late check-in confirmed · €220 / night" />
        </section>

        <section className="day">
          <div className="day-head">
            <span className="day-num">23</span>
            <span className="day-date">Sat · Aug</span>
            <span className="day-line"></span>
            <span className="day-temp">31° / sun</span>
          </div>
          <Slot kind="food" name="Tasca Lisboeta · late seating" sub="22:30 · 2 covers · holds 30 min for late arrivals" />
          <Gap label="Add an experience for the afternoon" />
        </section>

        <section className="day">
          <div className="day-head">
            <span className="day-num">24</span>
            <span className="day-date">Sun · Aug</span>
            <span className="day-line"></span>
            <span className="day-temp">29° / breezy</span>
          </div>
          <Slot kind="train" name="Lisbon → Porto · CP Alfa Pendular" sub="Compose this leg" time="14:08" />
        </section>
      </main>

      <aside className="pane">
        <div className="tabs">
          <div className={`tab ${tab==="orbit"?"on":""}`} onClick={()=>setTab("orbit")}>Orbit</div>
          <div className={`tab ${tab==="compare"?"on":""}`} onClick={()=>setTab("compare")}>Compare</div>
          <div className={`tab ${tab==="docs"?"on":""}`} onClick={()=>setTab("docs")}>Docs</div>
        </div>
        <div className="chat">
          <div className="msg">
            <div className="av"><ComposeIcon name="spark" size={14}/></div>
            <div className="bubble">I noticed your flight lands at 22:40. Two of the stays you saved have late check-in. I've already pinned Casa do Vale.</div>
          </div>
          <div className="msg me">
            <div className="bubble">Perfect. Add a car from Lisbon airport up to the Douro?</div>
            <div className="av me">MC</div>
          </div>
          <div className="msg">
            <div className="av"><ComposeIcon name="spark" size={14}/></div>
            <div className="bubble">Two private transfer options for arrival 22:40:</div>
          </div>
          <div className="suggest">
            <div className="stitle"><span className="pill">Suggested</span> Private transfer · LIS → Casa do Vale</div>
            <div style={{fontSize:13, color:"var(--fg-2)", lineHeight:1.5}}>
              <b>3h 30m</b> · meet inside terminal · electric Mercedes E-class · €280 fixed
            </div>
            <div className="row">
              <button className="primary">Hold for 24h</button>
              <button>See cheaper · €210</button>
            </div>
          </div>
          <div className="msg">
            <div className="av"><ComposeIcon name="spark" size={14}/></div>
            <div className="bubble">Want me to look at trains too? There's a sleeper to Porto on the 23rd.</div>
          </div>
        </div>
        <div className="composer">
          <div className="field">
            <input placeholder="Ask Orbit anything about this trip…" />
            <button><ComposeIcon name="send" size={14}/></button>
          </div>
        </div>
      </aside>

      {tray && (
        <div className="tray">
          <span className="lab">Comparing 3 stays</span>
          <div className="opt"><b>Casa do Vale</b><span>· €220 · late check-in</span></div>
          <div className="opt"><b>Quinta Aveleda</b><span>· €310 · pool</span></div>
          <div className="opt"><b>Hotel Tivoli</b><span>· €180 · city</span></div>
          <div className="pick">Pick winner</div>
        </div>
      )}
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("app")).render(<App/>);
