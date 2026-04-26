import Icon from './Icon'

const STREAM = [
  {
    id: 1, source: 'airbnb.com', time: 'just now', raw: 'I think this one — airbnb.com/rooms/48720193 · Casa do Vale, Douro Valley',
    kind: 'stay', kindLabel: 'Stay · Casa do Vale', kindIcon: 'bed',
    detail: 'Douro Valley · 22 Aug → 24 Aug', detailIcon: 'pin',
    badge: '€220 / night', badgeIcon: null,
    primary: 'Slot into Iberia draft', auto: true, tags: []
  },
  {
    id: 2, source: 'british-airways.com', time: '2 min ago', raw: 'Forwarded from flights@ba.com',
    kind: 'flight', kindLabel: 'Flight · BA 502', kindIcon: 'plane',
    detail: 'LHR → LIS · 22 Aug · 22:40', detailIcon: 'clock',
    badge: 'Confirmed · seats 14E, 14F', badgeIcon: 'check',
    primary: 'Pinned to Day 1 of Iberia', auto: true, tags: []
  },
  {
    id: 3, source: 'screenshot', time: '5 min ago', raw: null,
    shot: { file: 'screenshot.png', time: '2:14 AM', h: 'Tasca Lisboeta', sub: 'Lisbon · seafood · open until 02:00' },
    kind: 'food', kindLabel: 'Restaurant', kindIcon: 'food',
    badge: null, badgeIcon: null,
    primary: 'Add to Day 1', auto: false,
    tags: [{ label: 'Confirming opening hours…', pending: true, ico: null }]
  },
  {
    id: 4, source: 'instagram.com', time: 'yesterday', raw: 'instagram.com/p/Cz9X-2vMqAa',
    kind: 'activity', kindLabel: 'Activity · vineyard walk', kindIcon: 'hike',
    detail: 'Pinhão · best at sunrise', detailIcon: 'pin',
    badge: null, badgeIcon: null,
    primary: 'Suggest for Day 2 morning', auto: false, tags: []
  },
  {
    id: 5, source: 'you wrote', time: 'yesterday', raw: "Sam doesn't like early flights. Prefers aisle. Budget €800 pp for the whole trip.",
    kind: 'note', kindLabel: 'Trip preference · saved', kindIcon: 'check',
    badge: null, badgeIcon: null,
    primary: null, auto: false,
    tags: [{ label: 'Applied to Iberia + Tokyo', pending: false, ico: null }]
  },
]

function StreamItem({ item }) {
  return (
    <div class="stream-item" data-type={item.source}>
      <div class="item-meta">
        <span class="item-src"><Icon name={item.source === 'screenshot' ? 'image' : item.source === 'you wrote' ? 'note' : item.source === 'airbnb.com' ? 'link' : item.source === 'instagram.com' ? 'link' : 'mail'} size={10} /> {item.source}</span>
        <span class="item-time">{item.time}</span>
      </div>
      {item.raw && <div class="item-raw">{item.raw}</div>}
      {item.shot && (
        <div class="item-shot">
          <div class="shot-overlay">
            <span class="top"><Icon name="image" size={10} /> {item.shot.file} · {item.shot.time}</span>
            <div class="shot-h">{item.shot.h}</div>
            <div class="shot-sub">{item.shot.sub}</div>
          </div>
        </div>
      )}
      {(item.kind || item.badge) && (
        <div class="item-tags">
          {item.kind && <span class="tag"><Icon name={item.kindIcon} size={10} /> {item.kindLabel}</span>}
          {item.detail && <span class="tag detail"><Icon name={item.detailIcon} size={10} /> {item.detail}</span>}
          {item.badge && <span class="tag"><Icon name={item.badgeIcon} size={10} /> {item.badge}</span>}
          {item.tags && item.tags.map((t, i) => (
            <span class={t.pending ? 'tag tag-pending' : 'tag'}>
              {t.pending && <span class="spin"><Icon name="clock" size={10} /></span>}
              {t.ico && <Icon name={t.ico} size={10} />}
              {t.label}
            </span>
          ))}
        </div>
      )}
      <div class="item-row">
        {item.primary && (
          <button class={`act-btn ${item.auto ? 'primary' : ''}`}>
            {item.auto ? <Icon name="check" size={12} /> : <Icon name="arrow" size={12} />}
            {item.primary}
          </button>
        )}
        <div class="item-actions">
          <button class="act-btn"><Icon name="edit" size={12} /></button>
          <button class="act-btn"><Icon name="trash" size={12} /></button>
        </div>
      </div>
    </div>
  )
}

export default function Explore() {
  return (
    <div class="explore-wrap">
      <header class="explore-topbar">
        <div class="explore-brand">
          <img src="/assets/logos/hostliday-wordmark.svg" alt="Hostliday" />
          <span class="explore-div"></span>
          <span class="explore-crumb">Orbit</span>
        </div>
        <nav class="explore-nav">
          <a href="#" class="active">Explore</a>
          <a href="#">Compose</a>
          <a href="#">Navigate</a>
          <a href="#">Trips</a>
        </nav>
      </header>

      <main class="explore-layout">
        <section class="explore-hero-section">
          <div class="intake-eye">
            <span class="dot-live"></span>
            Drop intake · open
          </div>

          <h1 class="intake-h">
            <span>You've already done </span>
            <span>the research.</span>
            <br />
            <span class="accent">Hand it to me.</span>
          </h1>
          <p class="intake-sub">Paste a link, forward an email, drop a screenshot, or just type a note. I'll <b>parse, dedupe, and slot it</b> into the right trip.</p>

          <div class="drop">
            <div class="drop-row">
              <Icon name="paste" size={20} />
              <input class="drop-input" placeholder="Paste a link, a confirmation email, or just type a note…" />
              <button class="drop-paste-btn">
                Paste from clipboard
                <span style="opacity:.6;font-size:11px;font-family:var(--font-mono);padding:2px 5px;background:rgba(255,255,255,.15);border-radius:4px;margin-left:2px">⌘V</span>
              </button>
            </div>
            <div class="drop-meta">
              <span class="drop-channel"><Icon name="link" size={14} style="margin-right:4px" />Any link · <b>airbnb, booking, instagram, blog post, google maps…</b></span>
              <span class="drop-channel"><Icon name="image" size={14} style="margin-right:4px" />Any screenshot</span>
              <span class="drop-channel"><Icon name="mail" size={14} style="margin-right:4px" />Forward to <b>plan@hostliday.com</b></span>
            </div>
          </div>

          <div class="eats">
            <span style="font-size:12px;color:var(--fg-3);margin-right:4px;font-weight:500">Try with:</span>
            <span class="eat"><Icon name="link" size={12} style="margin-right:3px" />airbnb.com/rooms/…</span>
            <span class="eat"><Icon name="link" size={12} style="margin-right:3px" />instagram.com/p/…</span>
            <span class="eat"><Icon name="mail" size={12} style="margin-right:3px" />booking confirmation</span>
            <span class="eat"><Icon name="image" size={12} style="margin-right:3px" />screenshot of a NYT article</span>
            <span class="eat"><Icon name="note" size={12} style="margin-right:3px" />plain text note</span>
          </div>

          <div class="tripstrip">
            <div class="trip-card">
              <div class="trip-eye"><span class="dot active"></span>Active draft</div>
              <div class="trip-name">Iberia, late August</div>
              <div class="trip-meta"><span><b>14</b> items</span><span><b>6</b> nights</span><span>Aug 22–28</span></div>
            </div>
            <div class="trip-card">
              <div class="trip-eye"><span class="dot draft"></span>Held</div>
              <div class="trip-name">Tokyo with Sam, October</div>
              <div class="trip-meta"><span><b>9</b> items</span><span><b>10</b> nights</span><span>Oct 4–14</span></div>
            </div>
            <div class="trip-card">
              <div class="trip-eye"><span class="dot idea"></span>Just ideas</div>
              <div class="trip-name">Norwegian fjords, someday</div>
              <div class="trip-meta"><span><b>6</b> items</span><span>—</span></div>
            </div>
            <div class="trip-card new">
              <div class="plus-ico"><Icon name="plus" size={18} /></div>
              <div class="lbl">Start new trip</div>
            </div>
          </div>

          <div class="signoff">
            <span>You're signed in as <em>Mariana C.</em></span>
            <span class="signoff-line"></span>
            <span>14 things this week · 4 trips active</span>
          </div>
        </section>

        <aside class="stream">
          <div class="stream-head">
            <div class="stream-eye">
              <span class="lab">Intake stream</span>
              <span class="live"><span class="d"></span>parsing live</span>
            </div>
            <div class="stream-trip">Iberia, late August</div>
            <div class="stream-bar">
              <span><b>5</b> new today</span><span>·</span><span><b>14</b> in trip</span><span>·</span><span>last <b>2 min</b> ago</span>
            </div>
          </div>
          <div class="stream-list">
            {STREAM.map(it => <StreamItem item={it} />)}
          </div>
          <div class="stream-foot">
            <span class="lh">Drop more anywhere on this page</span>
            <button class="compose-btn">Open in Compose <Icon name="arrow" size={12} /></button>
          </div>
        </aside>
      </main>
    </div>
  )
}
