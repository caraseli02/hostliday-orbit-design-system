import { createSignal } from 'solid-js'
import Icon from './Icon'

const KIND_ICONS = { flight: 'plane', stay: 'bed', train: 'train', food: 'food', car: 'car' }

function Slot({ kind, status, time, name, sub }) {
  return (
    <div class={`comp-slot ${status || ''}`}>
      <div class="slot-ico"><Icon name={KIND_ICONS[kind]} /></div>
      <div class="slot-body">
        <div class="slot-name">{name}</div>
        <div class="slot-sub">{sub}</div>
      </div>
      {time && <div class="slot-time">{time}</div>}
      {status === 'confirmed' && <span class="badge b-confirmed">Confirmed</span>}
      {status === 'held' && <span class="badge b-held">Held · 23h</span>}
    </div>
  )
}

function Gap({ label }) {
  return (
    <div class="comp-gap">
      <span class="plus-ico"><Icon name="plus" size={14} /></span>
      {label}
    </div>
  )
}

export default function Compose() {
  const [tab, setTab] = createSignal('orbit')

  return (
    <div class="comp-shell">
      <header class="comp-bar">
        <img src="/assets/logos/hostliday-wordmark.svg" />
        <div class="comp-crumb">Trips · <b>Iberia, late August</b></div>
        <div class="grow"></div>
        <button class="comp-save">Save draft</button>
        <button class="comp-ship">Hold all options</button>
      </header>
      <main class="comp-timeline">
        <div class="tl-head">
          <h1 class="tl-title">Iberia, late August</h1>
          <div class="tl-meta">22 — 28 Aug · 6 nights · 2 travelers</div>
        </div>

        <section class="comp-day">
          <div class="day-head">
            <span class="day-num">22</span>
            <span class="day-date">Fri · Aug</span>
            <span class="day-line"></span>
            <span class="day-temp">31° / warm</span>
          </div>
          <Slot kind="flight" status="confirmed" time="22:40" name="TAP Air Portugal TP1234" sub="LIS → OPO · Terminal 2" />
          <Slot kind="stay" status="confirmed" time="00:30" name="Casa do Vale" sub="Douro Valley · 2 nights · €220" />
          <Gap label="Add activity for Day 1" />
        </section>

        <section class="comp-day">
          <div class="day-head">
            <span class="day-num">23</span>
            <span class="day-date">Sat · Aug</span>
            <span class="day-line"></span>
            <span class="day-temp">29° / clear</span>
          </div>
          <Slot kind="food" status="confirmed" time="09:00" name="Douro vineyard walk" sub="Quinta do Vallado · 3hr guided" />
          <Slot kind="food" status="held" time="20:00" name="Tasca da Sé" sub="Porto old town · traditional" />
          <Gap label="Add activity" />
        </section>

        <section class="comp-day">
          <div class="day-head">
            <span class="day-num">24</span>
            <span class="day-date">Sun · Aug</span>
            <span class="day-line"></span>
            <span class="day-temp">29° / breezy</span>
          </div>
          <Slot kind="train" status="confirmed" time="14:08" name="Lisbon → Porto · CP Alfa Pendular" sub="Compose this leg" />
        </section>
      </main>

      <aside class="comp-pane">
        <div class="comp-tabs">
          <div class={`comp-tab ${tab() === 'orbit' ? 'on' : ''}`} onclick={() => setTab('orbit')}>Orbit</div>
          <div class={`comp-tab ${tab() === 'compare' ? 'on' : ''}`} onclick={() => setTab('compare')}>Compare</div>
          <div class={`comp-tab ${tab() === 'docs' ? 'on' : ''}`} onclick={() => setTab('docs')}>Docs</div>
        </div>
        <div class="comp-chat">
          <div class="comp-msg">
            <div class="comp-av"><Icon name="spark" size={14} /></div>
            <div class="comp-bubble">I noticed your flight lands at 22:40. Two of the stays you saved have late check-in. I've already pinned Casa do Vale.</div>
          </div>
          <div class="comp-msg">
            <div class="comp-av"><Icon name="spark" size={14} /></div>
            <div class="comp-bubble">The Douro vineyard walk you saved has 3 time slots. The 9am one pairs best with your dinner reservation.</div>
          </div>
          <div class="comp-msg">
            <div class="comp-av"><Icon name="spark" size={14} /></div>
            <div class="comp-bubble">Want me to look at trains too? There's a sleeper to Porto on the 23rd.</div>
          </div>
        </div>
        <div class="comp-composer">
          <div class="comp-field">
            <input placeholder="Ask Orbit anything about this trip…" />
            <button><Icon name="send" size={14} /></button>
          </div>
        </div>
      </aside>
    </div>
  )
}
