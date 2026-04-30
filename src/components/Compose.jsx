import { createSignal, For, Show, onMount, onCleanup } from "solid-js";
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

const DAYS = [
  {
    id: "d1",
    num: 22,
    date: "Fri · Aug",
    temp: "31° / warm",
    slots: [
      { kind: "flight", status: "confirmed", time: "22:40", name: "TAP Air Portugal TP1234", sub: "LIS → OPO · Terminal 2" },
      { kind: "stay", status: "confirmed", time: "00:30", name: "Casa do Vale", sub: "Douro Valley · 2 nights · €220" },
    ],
    gap: "Add activity for Day 1",
  },
  {
    id: "d2",
    num: 23,
    date: "Sat · Aug",
    temp: "29° / clear",
    slots: [
      { kind: "food", status: "confirmed", time: "09:00", name: "Douro vineyard walk", sub: "Quinta do Vallado · 3hr guided" },
      { kind: "food", status: "held", time: "20:00", name: "Tasca da Sé", sub: "Porto old town · traditional" },
    ],
    gap: "Add activity",
  },
  {
    id: "d3",
    num: 24,
    date: "Sun · Aug",
    temp: "29° / breezy",
    slots: [
      { kind: "train", status: "confirmed", time: "14:08", name: "Lisbon → Porto · CP Alfa Pendular", sub: "Compose this leg" },
    ],
    gap: null,
  },
];

function Slot(props) {
  return (
    <div class={`comp-slot ${props.status || ""}`}>
      <div class="slot-ico">
        <Icon name={KIND_ICONS[props.kind]} />
      </div>
      <div class="slot-body">
        <div class="slot-name">{props.name}</div>
        <div class="slot-sub">{props.sub}</div>
      </div>
      {props.time && <div class="slot-time">{props.time}</div>}
      {props.status === "confirmed" && <span class="badge b-confirmed">Confirmed</span>}
      {props.status === "held" && <span class="badge b-held">Held · 23h</span>}
    </div>
  );
}

function Gap(props) {
  return (
    <div class="comp-gap">
      <span class="plus-ico">
        <Icon name="plus" size={14} />
      </span>
      {props.label}
    </div>
  );
}

function OrbitMessage(props) {
  const [open, setOpen] = createSignal(false);
  return (
    <div class="comp-msg" style={{ "animation-delay": `${props.index * 80}ms` }}>
      <div class="comp-av">
        <Icon name="spark" size={14} />
      </div>
      <div class="comp-bubble">
        <div class="comp-bubble-body">{props.msg.body}</div>
        <button type="button" class="comp-why" aria-expanded={open()} onClick={() => setOpen((o) => !o)}>
          {open() ? "Hide reasoning" : "Why?"}
        </button>
        <Show when={open()}>
          <div class="comp-why-body">{props.msg.why}</div>
        </Show>
      </div>
    </div>
  );
}

function ComparePlaceholder() {
  return (
    <div class="comp-compare-empty">
      <div class="comp-compare-illust">
        <Icon name="columns" size={32} />
      </div>
      <h3 class="comp-compare-title">Compare options side-by-side</h3>
      <p class="comp-compare-desc">
        Select multiple stays, flights, or activities to see a detailed comparison with pricing, ratings, and travel times.
      </p>
    </div>
  );
}

export default function Compose() {
  const { activeTrip, showToast } = useTrip();
  const [tab, setTab] = createSignal("orbit");
  const [collapsed, setCollapsed] = createSignal({});
  const [confirmState, setConfirmState] = createSignal("idle"); // idle | holding | confirmed
  const [mounted, setMounted] = createSignal(false);

  onMount(() => {
    requestAnimationFrame(() => setMounted(true));
  });

  const toggleDay = (id) => setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }));

  let confirmTimeout = null;
  onCleanup(() => {
    if (confirmTimeout) clearTimeout(confirmTimeout);
  });

  const handleConfirmPress = () => {
    if (confirmState() !== "idle") return;
    setConfirmState("holding");
    confirmTimeout = setTimeout(() => {
      confirmTimeout = null;
      setConfirmState("confirmed");
      showToast({
        message: "Tasca da Sé confirmed for Day 2 · 20:00",
        undo: () => {
          setConfirmState("idle");
          showToast({ message: "Hold reinstated · 23h remaining" });
        },
      });
    }, 600);
  };

  return (
    <div class="comp-shell">
      <main class="comp-timeline">
        <div class="tl-head">
          <h1 class="tl-title">{activeTrip()?.name || "No trip"}</h1>
          <div class="tl-meta">
            {activeTrip()?.dates}
            {activeTrip()?.nights ? ` · ${activeTrip()?.nights} nights` : ""} · 2 travelers
          </div>
        </div>

        <For each={DAYS}>
          {(day) => (
            <section class="comp-day">
              <button
                type="button"
                class="day-head"
                aria-expanded={!collapsed()[day.id]}
                aria-controls={`day-content-${day.id}`}
                onClick={() => toggleDay(day.id)}
              >
                <span class="day-num">{day.num}</span>
                <span class="day-date">{day.date}</span>
                <span class="day-line" />
                <span class="day-temp">{day.temp}</span>
                <Icon name={collapsed()[day.id] ? "chevron-down" : "chevron-up"} size={16} />
              </button>
              <Show when={!collapsed()[day.id]}>
                <div id={`day-content-${day.id}`} class="day-content">
                  <For each={day.slots}>{(s) => <Slot {...s} />}</For>
                  <Show when={day.gap}>{(g) => <Gap label={g()} />}</Show>
                </div>
              </Show>
            </section>
          )}
        </For>
      </main>

      <aside class="comp-pane">
        <div class="comp-tabs" role="tablist" aria-label="Orbit panel tabs">
          <button
            type="button"
            role="tab"
            aria-selected={tab() === "orbit"}
            class={`comp-tab ${tab() === "orbit" ? "on" : ""}`}
            onClick={() => setTab("orbit")}
          >
            Orbit
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab() === "compare"}
            class={`comp-tab ${tab() === "compare" ? "on" : ""}`}
            onClick={() => setTab("compare")}
          >
            Compare
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab() === "docs"}
            class={`comp-tab ${tab() === "docs" ? "on" : "comp-tab-disabled"}`}
            disabled
            title="Docs · coming soon"
          >
            Docs
          </button>
        </div>

        <Show when={tab() === "orbit"}>
          <div class="comp-primary-cta">
            <button
              type="button"
              class={`comp-confirm-btn ${confirmState()}`}
              onClick={handleConfirmPress}
              disabled={confirmState() === "confirmed"}
            >
              <Show when={confirmState() === "confirmed"}>
                <Icon name="check-circle" size={14} />
              </Show>
              <Show when={confirmState() !== "confirmed"}>
                <Icon name="check" size={14} />
              </Show>
              {confirmState() === "confirmed"
                ? "Confirmed · Tasca da Sé"
                : confirmState() === "holding"
                ? "Confirming…"
                : "Confirm next held · Tasca da Sé"}
              <Show when={confirmState() === "idle"}>
                <span class="comp-confirm-meta">23h left</span>
              </Show>
            </button>
            <div class="comp-cta-sub">
              {confirmState() === "confirmed"
                ? "Done! Check your email for the voucher."
                : "1 held option awaiting confirmation"}
            </div>
          </div>

          <div class={`comp-chat stagger-chat ${mounted() ? "mounted" : ""}`} role="tabpanel">
            <For each={ORBIT_MESSAGES}>{(m, i) => <OrbitMessage msg={m} index={i()} />}</For>
          </div>

          <div class="comp-composer">
            <div class="comp-field">
              <input placeholder="Ask Orbit anything about this trip…" aria-label="Ask Orbit about this trip" />
              <button type="button" aria-label="Send" disabled title="Ask Orbit · coming soon">
                <Icon name="send" size={14} />
              </button>
            </div>
          </div>
        </Show>

        <Show when={tab() === "compare"}>
          <div class="comp-chat" role="tabpanel">
            <ComparePlaceholder />
          </div>
        </Show>
      </aside>
    </div>
  );
}
