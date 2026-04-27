import { For, Show, createSignal, createMemo } from "solid-js";
import Icon from "./Icon";
import { useTrip, matchesFilter, safeHref } from "../state";

const TRIP_STATUS_DOT = { active: "active", held: "draft", idea: "idea" };
const TRIP_STATUS_LABEL = { active: "Active draft", held: "Held", idea: "Just ideas" };

const KIND_CHIPS = [
  { id: "stay", label: "Stays", icon: "bed" },
  { id: "flight", label: "Flights", icon: "plane" },
  { id: "food", label: "Restaurants", icon: "food" },
  { id: "activity", label: "Activities", icon: "hike" },
  { id: "note", label: "Notes", icon: "note" },
];

const SOURCE_ICON = {
  screenshot: "image",
  "you wrote": "note",
  "airbnb.com": "link",
  "instagram.com": "link",
  paste: "paste",
};

function sourceIcon(s) {
  return SOURCE_ICON[s] || "mail";
}

const PARSE_PILL = {
  parsing: { label: "Parsing…", cls: "parsing" },
  partial: { label: "Partial", cls: "partial" },
  failed: { label: "Could not parse", cls: "failed" },
  parsed: { label: "Parsed", cls: "parsed" },
  confirmed: { label: "In trip", cls: "confirmed" },
};

function StreamItem(props) {
  const { slotItemToTrip, deleteItem, activeTripId, activeTrip } = useTrip();
  const item = () => props.item;
  const safeRaw = () => safeHref(item().raw);
  const pill = () => PARSE_PILL[item().parseStatus] || null;
  const inActive = () => item().tripId === activeTripId();
  const canSlot = () =>
    item().parseStatus !== "parsing" && item().parseStatus !== "failed" && !inActive();
  const slotLabel = () => `Slot into ${activeTrip()?.name || "trip"}`;

  return (
    <div class={`stream-item parse-${item().parseStatus || "parsed"}`} data-type={item().source}>
      <div class="item-meta">
        <span class="item-src">
          <Icon name={sourceIcon(item().source)} size={10} /> {item().source}
        </span>
        <span class="item-time">{item().time}</span>
        <Show when={pill()}>
          <span class={`parse-pill parse-pill-${pill().cls}`}>
            <Show when={item().parseStatus === "parsing"}>
              <span class="spin">
                <Icon name="clock" size={9} />
              </span>
            </Show>
            {pill().label}
          </span>
        </Show>
      </div>

      <Show when={item().raw}>
        <Show when={safeRaw()} fallback={<div class="item-raw">{item().raw}</div>}>
          <div class="item-raw">
            <a href={safeRaw()} target="_blank" rel="noopener noreferrer nofollow ugc">
              {item().raw}
            </a>
          </div>
        </Show>
      </Show>

      <Show when={item().shot}>
        <div class="item-shot">
          <div class="shot-overlay">
            <span class="top">
              <Icon name="image" size={10} /> {item().shot.file} · {item().shot.time}
            </span>
            <div class="shot-h">{item().shot.h}</div>
            <div class="shot-sub">{item().shot.sub}</div>
          </div>
        </div>
      </Show>

      <Show when={item().kind || item().badge || item().tags?.length}>
        <div class="item-tags">
          <Show when={item().kind}>
            <span class="tag">
              <Icon name={item().kindIcon} size={10} /> {item().kindLabel}
            </span>
          </Show>
          <Show when={item().detail}>
            <span class="tag detail">
              <Icon name={item().detailIcon} size={10} /> {item().detail}
            </span>
          </Show>
          <Show when={item().badge}>
            <span class="tag">
              <Icon name={item().badgeIcon} size={10} /> {item().badge}
            </span>
          </Show>
          <For each={item().tags || []}>
            {(t) => (
              <span class={t.pending ? "tag tag-pending" : "tag"}>
                <Show when={t.pending}>
                  <span class="spin">
                    <Icon name="clock" size={10} />
                  </span>
                </Show>
                <Show when={t.ico}>
                  <Icon name={t.ico} size={10} />
                </Show>
                {t.label}
              </span>
            )}
          </For>
        </div>
      </Show>

      <div class="item-row">
        <Show when={canSlot()}>
          <button class="act-btn primary" onclick={() => slotItemToTrip(item().id, activeTripId())}>
            <Icon name="check" size={12} /> {slotLabel()}
          </button>
        </Show>
        <Show when={inActive() && item().parseStatus === "confirmed"}>
          <span class="act-pinned">
            <Icon name="check" size={12} /> Pinned to {activeTrip()?.name}
          </span>
        </Show>
        <Show when={item().parseStatus === "failed"}>
          <button class="act-btn">
            <Icon name="arrow" size={12} /> Try again
          </button>
        </Show>
        <div class="item-actions">
          <button class="act-btn" aria-label="Edit">
            <Icon name="edit" size={12} />
          </button>
          <button class="act-btn" aria-label="Delete" onclick={() => deleteItem(item().id)}>
            <Icon name="trash" size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}

function Filters(props) {
  return (
    <div class="filters" role="toolbar" aria-label="Filter intake">
      <div class="filter-chips" role="group" aria-label="Filter by kind">
        <For each={KIND_CHIPS}>
          {(c) => (
            <button
              class={`filter-chip ${props.kinds().includes(c.id) ? "on" : ""}`}
              aria-pressed={props.kinds().includes(c.id)}
              onclick={() => props.toggleKind(c.id)}
            >
              <Icon name={c.icon} size={11} /> {c.label}
            </button>
          )}
        </For>
      </div>
      <div class="filter-toggle" role="group" aria-label="Filter by assignment">
        <button
          class={`filter-tog ${props.assignment() === "this" ? "on" : ""}`}
          aria-pressed={props.assignment() === "this"}
          onclick={() => props.setAssignment(props.assignment() === "this" ? null : "this")}
        >
          This trip
        </button>
        <button
          class={`filter-tog ${props.assignment() === "unsorted" ? "on" : ""}`}
          aria-pressed={props.assignment() === "unsorted"}
          onclick={() => props.setAssignment(props.assignment() === "unsorted" ? null : "unsorted")}
        >
          Unsorted
        </button>
      </div>
      <div class="filter-search">
        <Icon name="paste" size={12} />
        <input
          type="search"
          placeholder="Search intake…"
          value={props.query()}
          oninput={(e) => props.setQuery(e.currentTarget.value)}
          aria-label="Search intake"
        />
      </div>
    </div>
  );
}

export default function Explore(props) {
  const { trips, activeTripId, activeTrip, setActiveTrip, items, addItem } = useTrip();
  const tripCount = (id) => items.filter((i) => i.tripId === id).length;

  const [kinds, setKinds] = createSignal([]);
  const [assignment, setAssignment] = createSignal("this");
  const [query, setQuery] = createSignal("");

  const toggleKind = (k) =>
    setKinds((arr) => (arr.includes(k) ? arr.filter((x) => x !== k) : [...arr, k]));

  const filtered = createMemo(() =>
    items.filter((it) =>
      matchesFilter(
        it,
        { kinds: kinds(), assignment: assignment(), query: query() },
        activeTripId(),
      ),
    ),
  );

  const onPaste = (raw) => {
    if (!raw || !raw.trim()) return;
    addItem({ raw: raw.trim(), source: "paste", tripId: activeTripId() });
  };

  let dropInputRef;
  const handleSubmit = () => {
    const v = dropInputRef?.value;
    onPaste(v);
    if (dropInputRef) dropInputRef.value = "";
  };

  return (
    <div class="explore-wrap">
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
          <p class="intake-sub">
            Paste a link, forward an email, drop a screenshot, or just type a note. I'll{" "}
            <b>parse, dedupe, and slot it</b> into the right trip.
          </p>

          <div class="drop">
            <div class="drop-row">
              <Icon name="paste" size={20} />
              <input
                ref={dropInputRef}
                class="drop-input"
                placeholder="Paste a link, a confirmation email, or just type a note…"
                onkeydown={(e) => {
                  if (e.key === "Enter") handleSubmit();
                }}
              />
              <button class="drop-paste-btn" onclick={handleSubmit}>
                Drop into {activeTrip()?.name || "trip"}
                <span style="opacity:.6;font-size:11px;font-family:var(--font-mono);padding:2px 5px;background:rgba(255,255,255,.15);border-radius:4px;margin-left:2px">
                  ↵
                </span>
              </button>
            </div>
            <div class="drop-meta">
              <span class="drop-channel">
                <Icon name="link" size={14} style="margin-right:4px" />
                Any link · <b>airbnb, booking, instagram, blog post, google maps…</b>
              </span>
              <span class="drop-channel">
                <Icon name="image" size={14} style="margin-right:4px" />
                Any screenshot
              </span>
              <span class="drop-channel">
                <Icon name="mail" size={14} style="margin-right:4px" />
                Forward to <b>plan@hostliday.com</b>
              </span>
            </div>
          </div>

          <div class="tripstrip" role="radiogroup" aria-label="Switch active trip">
            <For each={trips}>
              {(t) => (
                <button
                  class={`trip-card ${t.id === activeTripId() ? "on" : ""}`}
                  role="radio"
                  aria-checked={t.id === activeTripId()}
                  onclick={() => setActiveTrip(t.id)}
                >
                  <div class="trip-eye">
                    <span class={`dot ${TRIP_STATUS_DOT[t.status]}`}></span>
                    {TRIP_STATUS_LABEL[t.status]}
                  </div>
                  <div class="trip-name">{t.name}</div>
                  <div class="trip-meta">
                    <span>
                      <b>{tripCount(t.id)}</b> items
                    </span>
                    {t.nights ? (
                      <span>
                        <b>{t.nights}</b> nights
                      </span>
                    ) : null}
                    <span>{t.dates}</span>
                  </div>
                </button>
              )}
            </For>
          </div>
        </section>

        <aside class="stream">
          <div class="stream-head">
            <div class="stream-eye">
              <span class="lab">Intake stream</span>
              <span class="live">
                <span class="d"></span>parsing live
              </span>
            </div>
            <div class="stream-trip">{activeTrip()?.name || "No trip selected"}</div>
            <div class="stream-bar">
              <span>
                <b>{filtered().length}</b> showing
              </span>
              <span>·</span>
              <span>
                <b>{tripCount(activeTripId())}</b> in trip
              </span>
            </div>
          </div>

          <Filters
            kinds={kinds}
            toggleKind={toggleKind}
            assignment={assignment}
            setAssignment={setAssignment}
            query={query}
            setQuery={setQuery}
          />

          <div class="stream-list" aria-live="polite">
            <Show
              when={filtered().length > 0}
              fallback={
                <div class="stream-empty">
                  <Icon name="paste" size={20} />
                  <div class="se-h">Nothing matches yet</div>
                  <div class="se-sub">Paste a link, forward an email, or change the filters.</div>
                </div>
              }
            >
              <For each={filtered()}>{(it) => <StreamItem item={it} />}</For>
            </Show>
          </div>

          <div class="stream-foot">
            <span class="lh">Drop more anywhere on this page</span>
            <button
              class="compose-btn"
              onclick={() => props.onNavigate && props.onNavigate("compose")}
            >
              Open in Compose <Icon name="arrow" size={12} />
            </button>
          </div>
        </aside>
      </main>
    </div>
  );
}
