function Ic({ name, size=16 }) {
  const p = {
    paste:    <><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></>,
    link:     <><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/></>,
    image:    <><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-5-5L5 21"/></>,
    mail:     <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></>,
    note:     <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></>,
    bed:      <><path d="M19 14V8a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v6"/><rect x="3" y="14" width="18" height="6" rx="1"/><path d="M7 14v3M17 14v3"/></>,
    plane:    <path d="M21 12L4 5l3 7-3 7z"/>,
    food:     <><path d="M3 4v8a4 4 0 0 0 4 4v6"/><path d="M7 4v8M11 4v8"/><path d="M17 4c-1.5 2-2 4-2 6s.5 4 2 4v6"/></>,
    hike:     <path d="M3 21l4-7 3 4 4-9 7 12"/>,
    plus:     <><path d="M12 5v14"/><path d="M5 12h14"/></>,
    arrow:    <><path d="M5 12h14"/><path d="M13 5l7 7-7 7"/></>,
    sparkles: <path d="M12 3l1.7 4.6L18 9.5l-4.3 1.9L12 16l-1.7-4.6L6 9.5l4.3-1.9z"/>,
    bell:     <><path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 21a2 2 0 0 0 4 0"/></>,
    folder:   <><path d="M3 7a2 2 0 0 1 2-2h4l2 3h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></>,
    check:    <path d="M5 12l5 5 9-12"/>,
    forward:  <path d="M3 21v-7a4 4 0 0 1 4-4h13M16 6l5 4-5 4"/>,
    pin:      <><path d="M12 22s7-7 7-12a7 7 0 0 0-14 0c0 5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></>,
    clock:    <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    edit:     <><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></>,
    trash:    <><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></>,
    grid:     <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
  };
  return <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{p[name]}</svg>;
}

function TopBar() {
  return (
    <header className="topbar">
      <div className="brand">
        <img src="../../assets/logos/hostliday-wordmark.svg" alt="Hostliday"/>
        <span className="div"></span>
        <span className="crumb">Orbit</span>
      </div>
      <nav className="nav">
        <a href="#" className="active">Explore</a>
        <a href="#">Compose</a>
        <a href="#">Navigate</a>
        <a href="#">Trips</a>
      </nav>
      <div className="actions">
        <button className="ghost"><Ic name="bell" size={16}/></button>
        <button className="ghost"><Ic name="folder" size={16}/> Inbox <span className="count">12</span></button>
        <div className="avatar">MC</div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section>
      <div className="intake-eye"><span className="pulse"></span>Drop intake · open</div>
      <h1 className="intake-h">
        You've already done<br/>the research.<br/>
        <em>Hand it to me.</em>
      </h1>
      <p className="intake-sub">
        Paste the link your friend sent. Forward the hotel confirmation. Drag in the screenshot you took at 2am.
        I'll <b>parse, dedupe, and slot it</b> into the right trip — no rebuilding, no re-typing.
      </p>

      <div className="drop">
        <div className="drop-row">
          <Ic name="paste" size={20}/>
          <input className="drop-input" placeholder="Paste a link, a confirmation email, or just type a note…" />
          <button className="drop-paste-btn">
            Paste from clipboard
            <span style={{opacity:.6, fontSize:11, fontFamily:"var(--font-mono)", padding:"2px 5px", background:"rgba(255,255,255,.15)", borderRadius:4, marginLeft:2}}>⌘V</span>
          </button>
        </div>
        <div className="drop-meta">
          <span className="drop-channel"><Ic name="link" size={14} className="ico"/>Any link · <b>airbnb, booking, instagram, blog post, google maps…</b></span>
          <span className="drop-channel"><Ic name="image" size={14} className="ico"/>Any screenshot</span>
          <span className="drop-channel"><Ic name="mail" size={14} className="ico"/>Forward to <b>plan@hostliday.com</b></span>
        </div>
      </div>

      <div className="eats">
        <span style={{fontSize:12, color:"var(--fg-3)", marginRight:4, fontWeight:500}}>Try with:</span>
        <span className="eat"><Ic name="link" size={12} className="ico"/>airbnb.com/rooms/…</span>
        <span className="eat"><Ic name="link" size={12} className="ico"/>instagram.com/p/…</span>
        <span className="eat"><Ic name="mail" size={12} className="ico"/>booking confirmation</span>
        <span className="eat"><Ic name="image" size={12} className="ico"/>screenshot of a NYT article</span>
        <span className="eat"><Ic name="note" size={12} className="ico"/>plain text note</span>
      </div>

      <div className="tripstrip">
        <div className="trip-card">
          <div className="trip-eye"><span className="dot active"></span>Active draft</div>
          <div className="trip-name">Iberia, late August</div>
          <div className="trip-meta"><span><b>14</b> items</span><span><b>6</b> nights</span><span>Aug 22–28</span></div>
        </div>
        <div className="trip-card">
          <div className="trip-eye"><span className="dot draft"></span>Held</div>
          <div className="trip-name">Tokyo with Sam, October</div>
          <div className="trip-meta"><span><b>9</b> items</span><span><b>10</b> nights</span><span>Oct 4–14</span></div>
        </div>
        <div className="trip-card">
          <div className="trip-eye"><span className="dot idea"></span>Just ideas</div>
          <div className="trip-name">Norwegian fjords, someday</div>
          <div className="trip-meta"><span><b>6</b> items</span><span>—</span></div>
        </div>
        <div className="trip-card new">
          <div className="plus"><Ic name="plus" size={18}/></div>
          <div className="lbl">Start new trip</div>
        </div>
      </div>

      <div className="signoff">
        <span>You're signed in as <em>Mariana C.</em></span>
        <span className="line"></span>
        <span>14 things this week · 4 trips active</span>
      </div>
    </section>
  );
}

/* INTAKE STREAM ITEMS */
const ITEMS = [
  {
    id:1, src:"url", source:"airbnb.com", time:"just now",
    raw:<>I think this one — <span className="url-text">airbnb.com/rooms/48720193 · Casa do Vale, Douro Valley</span></>,
    tags:[
      {kind:"stay", label:"Stay · Casa do Vale", ico:"bed"},
      {kind:null,  label:"Douro Valley · 22 Aug → 24 Aug", ico:"pin"},
      {kind:null,  label:"€220 / night", ico:null},
    ],
    primary: "Slot into Iberia draft",
  },
  {
    id:2, src:"email", source:"british-airways.com", time:"2 min ago",
    raw:<>Forwarded from <b>flights@ba.com</b> — "Booking confirmation BA-G7XQ91 · LHR → LIS · 22 Aug 22:40"</>,
    tags:[
      {kind:"flight", label:"Flight · BA 502", ico:"plane"},
      {kind:null,    label:"LHR → LIS · 22 Aug · 22:40", ico:"clock"},
      {kind:null,    label:"Confirmed · seats 14E, 14F", ico:"check"},
    ],
    primary: "Pinned to Day 1 of Iberia",
    auto: true,
  },
  {
    id:3, src:"shot", source:"screenshot", time:"5 min ago",
    raw:<>Screenshot · "Tasca Lisboeta — best late-night seafood in Lisbon" — saved 2:14 AM</>,
    shot:{ h:"Tasca Lisboeta", sub:"Lisbon · seafood · open until 02:00" },
    tags:[
      {kind:"food", label:"Restaurant", ico:"food"},
      {kind:"pending", label:"Confirming opening hours…"},
    ],
    primary: "Add to Day 1",
  },
  {
    id:4, src:"url", source:"instagram.com", time:"yesterday",
    raw:<><span className="url-text">instagram.com/p/Cz9X-2vMqAa</span> · "@vinoportugal — sunrise vineyard walk in Pinhão"</>,
    tags:[
      {kind:"activity", label:"Activity · vineyard walk", ico:"hike"},
      {kind:null,      label:"Pinhão · best at sunrise", ico:"pin"},
    ],
    primary: "Suggest for Day 2 morning",
  },
  {
    id:5, src:"note", source:"you wrote", time:"yesterday",
    raw:<>"Sam doesn't eat shellfish. Also no early flights — anything before 9am is a no."</>,
    tags:[
      {kind:"note", label:"Trip preference · saved", ico:"check"},
    ],
    primary: "Applied to Iberia + Tokyo",
    auto: true,
  },
];

function Item({ item }) {
  return (
    <div className="item">
      <div className={`src-ico ${item.src}`}>
        <Ic name={{url:"link", email:"mail", shot:"image", note:"note"}[item.src]} size={13}/>
      </div>
      <div className="item-body">
        <div className="item-meta"><span className="src">{item.source}</span><span>·</span><span>{item.time}</span></div>
        <div className="item-raw">{item.raw}</div>
        {item.shot && (
          <div className="item-shot">
            <div className="shot-overlay">
              <div className="top"><span style={{opacity:.6}}>screenshot.png</span><span style={{opacity:.6}}>2:14 AM</span></div>
              <div><div className="h">{item.shot.h}</div><div style={{opacity:.7, marginTop:2}}>{item.shot.sub}</div></div>
            </div>
          </div>
        )}
        <div className="item-tags">
          {item.tags.map((t,i) => {
            if (t.kind === "pending") return <span key={i} className="tag tag-pending"><span className="spin"></span>{t.label}</span>;
            if (t.kind) return <span key={i} className={`tag kind ${t.kind}`}>{t.ico && <span className="ico"><Ic name={t.ico} size={11}/></span>}{t.label}</span>;
            return <span key={i} className="tag">{t.ico && <span className="ico"><Ic name={t.ico} size={11}/></span>}{t.label}</span>;
          })}
        </div>
        <div className="item-row">
          <button className="act-btn primary">{item.auto ? <><Ic name="check" size={12}/> {item.primary}</> : <><Ic name="arrow" size={12}/> {item.primary}</>}</button>
          <div className="item-actions">
            <button className="act-btn"><Ic name="edit" size={12}/></button>
            <button className="act-btn"><Ic name="trash" size={12}/></button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stream() {
  return (
    <aside className="stream">
      <div className="stream-head">
        <div className="stream-eye">
          <span className="lab">Intake stream</span>
          <span className="live"><span className="d"></span>parsing live</span>
        </div>
        <div className="stream-trip">Iberia, late August</div>
        <div className="stream-bar">
          <span><b>5</b> new today</span><span>·</span><span><b>14</b> in trip</span><span>·</span><span>last <b>2 min</b> ago</span>
        </div>
      </div>
      <div className="stream-list">
        {ITEMS.map(it => <Item key={it.id} item={it}/>)}
      </div>
      <div className="stream-foot">
        <span className="lh">Drop more anywhere on this page</span>
        <button className="compose-btn">Open in Compose <Ic name="arrow" size={12}/></button>
      </div>
    </aside>
  );
}

function App() {
  return (
    <>
      <TopBar/>
      <main className="layout">
        <Hero/>
        <Stream/>
      </main>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(<App/>);
