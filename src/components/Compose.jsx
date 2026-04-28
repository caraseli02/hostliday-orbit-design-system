import { createSignal, For, Show } from "solid-js";
import Icon from "./Icon";
import { useTrip } from "../state";

const KIND_ICONS = { flight: "plane", stay: "bed", train: "train", food: "food", car: "car" };

const ORBIT_MESSAGES = [
  {
    id: "m1",
    body: "I noticed your flight lands at 22:40. Two of the stays you saved have late check-in. I've already pinned Casa do Vale.",
    why: "Compared 2 saved stays' check-in policies (Casa do Vale: 24h reception; Quinta Nova: cuts off at 22:00). Flight TP1234 lands 22:40, +30min transfer = 23:10 arrival. One stay survives.",
  },
  {
    id: "m2",
    body: "The Douro vineyard walk you saved has 3 time slots. The 9am one pairs best with your dinner reservation.",
    why: "Tasca da Sé booked 20:00 in Porto (1h drive from Quinta do Vallado). 9am walk ends 12:00 → 7h buffer. 14:00 walk ends 17:00 → 1h buffer (tight). 17:00 walk conflicts.",
  },
  {
    id: "m3",
    body: "Want me to look at trains too? There's a sleeper to Porto on the 23rd.",
    why: "Sam's preference 'no early flights' suggests overnight transit acceptable. CP sleeper service 234 departs Lisboa SA 22:30 → Porto Campanhã 06:14. €68pp · 1st class private cabin.",
  },
];

function Slot({ kind, status, time, name, sub }) {
  return (
    <div class={`comp-slot ${status || ""}`}>
      <div class="slot-ico">
        <Icon name={KIND_ICONS[kind]} />
      </div>
      <div class="slot-body">
        <div class="slot-name">{name}</div>
        <div class="slot-sub">{sub}</div>
      </div>
      {time && <div class="slot-time">{time}</div>}
      {status === "confirmed" && <span class="badge b-confirmed">Confirmed</span>}
      {status === "held" && <span class="badge b-held">Held · 23h</span>}
    </div>
  );
}

function Gap({ label }) {
  return (
    <div class="comp-gap">
      <span class="plus-ico">
        <Icon name="plus" size={14} />
      </span>
      {label}
    </div>
  );
}

function OrbitMessage(props) {
  const [open, setOpen] = createSignal(false);
  return (
    <div class="comp-msg">
      <div class="comp-av">
        <Icon name="spark" size={14} />
      </div>
      <div class="comp-bubble">
        <div class="comp-bubble-body">{props.msg.body}</div>
        <button class="comp-why" aria-expanded={open()} onclick={() => setOpen((o) => !o)}>
          {open() ? "Hide reasoning" : "Why?"}
        </button>
        <Show when={open()}>
          <div class="comp-why-body">{props.msg.why}</div>
        </Show>
      </div>
    </div>
  );
}

export default function Compose() {
  const { activeTrip, showToast } = useTrip();

  const onConfirmHeld = () => {
    showToast({
      message: "Tasca da Sé confirmed for Day 2 · 20:00",
      undo: () => showToast({ message: "Hold reinstated · 23h remaining" }),
    });
  };

  return (
    <div class="comp-shell">
      <main class="comp-timeline">
        <div class="tl-head">
          <h1 class="tl-title">{activeTrip()?.name || "No trip"}</h1>
          <div class="tl-meta">
            {activeTrip()?.dates}
            {activeTrip()?.nights ? ` · ${activeTrip().nights} nights` : ""} · 2 travelers
          </div>
        </div>

        <section class="comp-day">
          <div class="day-head">
            <span class="day-num">22</span>
            <span class="day-date">Fri · Aug</span>
            <span class="day-line"></span>
            <span class="day-temp">31° / warm</span>
          </div>
          <Slot
            kind="flight"
            status="confirmed"
            time="22:40"
            name="TAP Air Portugal TP1234"
            sub="LIS → OPO · Terminal 2"
          />
          <Slot
            kind="stay"
            status="confirmed"
            time="00:30"
            name="Casa do Vale"
            sub="Douro Valley · 2 nights · €220"
          />
          <Gap label="Add activity for Day 1" />
        </section>

        <section class="comp-day">
          <div class="day-head">
            <span class="day-num">23</span>
            <span class="day-date">Sat · Aug</span>
            <span class="day-line"></span>
            <span class="day-temp">29° / clear</span>
          </div>
          <Slot
            kind="food"
            status="confirmed"
            time="09:00"
            name="Douro vineyard walk"
            sub="Quinta do Vallado · 3hr guided"
          />
          <Slot
            kind="food"
            status="held"
            time="20:00"
            name="Tasca da Sé"
            sub="Porto old town · traditional"
          />
          <Gap label="Add activity" />
        </section>

        <section class="comp-day">
          <div class="day-head">
            <span class="day-num">24</span>
            <span class="day-date">Sun · Aug</span>
            <span class="day-line"></span>
            <span class="day-temp">29° / breezy</span>
          </div>
          <Slot
            kind="train"
            status="confirmed"
            time="14:08"
            name="Lisbon → Porto · CP Alfa Pendular"
            sub="Compose this leg"
          />
        </section>
      </main>

      <aside class="comp-pane">
        <div class="comp-tabs">
          <button class="comp-tab on">
            Orbit
          </button>
          <button
            class="comp-tab comp-tab-disabled"
            disabled
            title="Compare · coming soon"
          >
            Compare
          </button>
          <button class="comp-tab comp-tab-disabled" disabled title="Docs · coming soon">
            Docs
          </button>
        </div>

        <div class="comp-primary-cta">
          <button class="comp-confirm-btn" onclick={onConfirmHeld}>
            <Icon name="check" size={14} />
            Confirm next held · Tasca da Sé
            <span class="comp-confirm-meta">23h left</span>
          </button>
          <div class="comp-cta-sub">1 held option awaiting confirmation</div>
        </div>

        <div class="comp-chat">
          <For each={ORBIT_MESSAGES}>{(m) => <OrbitMessage msg={m} />}</For>
        </div>

        <div class="comp-composer">
          <div class="comp-field">
            <input placeholder="Ask Orbit anything about this trip…" />
            <button aria-label="Send" disabled title="Ask Orbit · coming soon">
              <Icon name="send" size={14} />
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
