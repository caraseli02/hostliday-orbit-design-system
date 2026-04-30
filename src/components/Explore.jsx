import { For, Show, createSignal, createMemo, onCleanup } from "solid-js";
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

const KIND_ICONS = {
  stay: "bed",
  flight: "plane",
  food: "food",
  activity: "hike",
  note: "check",
};

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

/* Auto-detect kind from content */
function detectKind(raw) {
  if (!raw) return "note";
  const lower = raw.toLowerCase();
  if (/airbnb|booking\.com|vrbo|hotel|hostel|apartment|stay/.test(lower)) return "stay";
  if (/flight|ryanair|easyjet|lufthansa|ba\.com|british-airways/.test(lower)) return "flight";
  if (/restaurant|cafe|bar|taverna|tasca|food|dinner|lunch|breakfast|menu/.test(lower)) return "food";
  if (/hike|walk|tour|museum|activity|beach|vineyard|experience/.test(lower)) return "activity";
  if (/instagram\.com|google\.com\/maps|tripadvisor|yelp/.test(lower)) return "activity";
  return "note";
}

const KIND_LABELS = {
  stay: "Stay",
  flight: "Flight",
  food: "Restaurant",
  activity: "Activity",
  note: "Note",
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
  const [expanded, setExpanded] = createSignal(false);
  const [slotting, setSlotting] = createSignal(false);

  const firstLine = () => {
    const raw = item().raw || "";
    const idx = raw.indexOf("\n");
    return idx > -1 ? raw.slice(0, idx) : raw;
  };

  let slotTimer;
  const handleSlot = () => {
    setSlotting(true);
    slotTimer = setTimeout(() => {
      slotItemToTrip(item().id, activeTripId());
      setSlotting(false);
    }, 400);
  };
  onCleanup(() => { if (slotTimer) clearTimeout(slotTimer); });

  const isMatch = () => {
    if (!props.query) return false;
    const q = props.query.toLowerCase();
    const hay = [
      item().raw ?? "",
      item().kindLabel ?? "",
      item().detail ?? "",
    ].join(" ").toLowerCase();
    return hay.includes(q);
  };

  return (
    <div
      class={`stream-item parse-${item().parseStatus || "parsed"} ${expanded() ? "expanded" : ""} ${slotting() ? "slotting" : ""} ${isMatch() ? "search-match" : ""}`}
      data-type={item().source}
    >
      <div class="item-header" onClick={() => setExpanded(!expanded())} role="button" tabindex="0" aria-expanded={expanded()} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setExpanded(!expanded()); } }}>
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
        <Show when={!expanded()}>
          <div class="item-raw item-raw-collapsed">{firstLine()}</div>
        </Show>
        <span class={`expand-chevron ${expanded() ? "open" : ""}`}>
          <Icon name="arrow" size={12} />
        </span>
      </div>

      <div class={`item-details ${expanded() ? "open" : ""}`}>
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

        <Show when={item().kind || item().badge || (item().tags && item().tags.length)}>
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
            <button type="button" class={`act-btn primary ${slotting() ? "slotting-btn" : ""}`} onClick={handleSlot}>
              <Icon name="check" size={12} /> {slotting() ? "Slotting…" : slotLabel()}
            </button>
          </Show>
          <Show when={inActive() && item().parseStatus === "confirmed"}>
            <span class="act-pinned">
              <Icon name="check" size={12} /> Pinned to {activeTrip()?.name}
            </span>
          </Show>
          <Show when={item().parseStatus === "failed"}>
            <button type="button" class="act-btn">
              <Icon name="arrow" size={12} /> Try again
            </button>
          </Show>
          <div class="item-actions">
            <button type="button" class="act-btn" aria-label="Edit (coming soon)" disabled title="Edit · coming soon">
              <Icon name="edit" size={12} />
            </button>
            <button type="button" class="act-btn" aria-label="Delete" onClick={() => deleteItem(item().id)}>
              <Icon name="trash" size={12} />
            </button>
          </div>
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
          {(c) => {
            const count = () => props.items.filter((i) => i.kind === c.id).length;
            return (
              <button type="button"
                class={`filter-chip ${props.kinds().includes(c.id) ? "on" : ""}`}
                aria-pressed={props.kinds().includes(c.id)}
                onClick={() => props.toggleKind(c.id)}
              >
                <Icon name={c.icon} size={11} /> {c.label}{" "}
                <Show when={count() > 0}><span class="chip-count">{count()}</span></Show>
              </button>
            );
          }}
        </For>
      </div>
      <div class="filter-toggle" role="group" aria-label="Filter by assignment">
        <button type="button"
          class={`filter-tog ${props.assignment() === "this" ? "on" : ""}`}
          aria-pressed={props.assignment() === "this"}
          onClick={() => props.setAssignment(props.assignment() === "this" ? null : "this")}
        >
          This trip
        </button>
        <button type="button"
          class={`filter-tog ${props.assignment() === "unsorted" ? "on" : ""}`}
          aria-pressed={props.assignment() === "unsorted"}
          onClick={() => props.setAssignment(props.assignment() === "unsorted" ? null : "unsorted")}
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
          onInput={(e) => props.setQuery(e.currentTarget.value)}
          aria-label="Search intake"
        />
        <Show when={props.query()}>
          <button type="button" class="search-clear" onClick={() => props.setQuery("")} aria-label="Clear search">
            <Icon name="x" size={12} />
          </button>
        </Show>
      </div>
    </div>
  );
}

export default function Explore(props) {
  const { trips, activeTripId, activeTrip, setActiveTrip, items, addItem, showToast } = useTrip();
  const tripCount = (id) => items.filter((i) => i.tripId === id).length;

  const [kinds, setKinds] = createSignal([]);
  const [assignment, setAssignment] = createSignal("this");
  const [query, setQuery] = createSignal("");
  const [dropText, setDropText] = createSignal("");
  const [parsing, setParsing] = createSignal(false);
  const [parseProgress, setParseProgress] = createSignal(0);
  const [dropActive, setDropActive] = createSignal(false);
  const [dropDragOver, setDropDragOver] = createSignal(false);

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

  const unfilteredCount = createMemo(() => items.length);

  /* Track timers for cleanup */
  let activeInterval = null;
  let activeTimeout = null;
  onCleanup(() => {
    if (activeInterval) clearInterval(activeInterval);
    if (activeTimeout) clearTimeout(activeTimeout);
  });

  const onPaste = (raw) => {
    if (!raw || !raw.trim()) return;

    /* Start parsing animation */
    setParsing(true);
    setParseProgress(0);

    const kind = detectKind(raw);
    const kindLabel = KIND_LABELS[kind] || "Note";
    const kindIcon = KIND_ICONS[kind] || "check";

    /* Animate progress bar over 1.4s */
    let progress = 0;
    activeInterval = setInterval(() => {
      progress += 2;
      if (progress >= 100) {
        progress = 100;
        clearInterval(activeInterval);
        activeInterval = null;
      }
      setParseProgress(progress);
    }, 28);

    /* After animation, add item and show toast */
    activeTimeout = setTimeout(() => {
      clearInterval(activeInterval);
      activeInterval = null;
      activeTimeout = null;
      setParseProgress(100);
      addItem({ raw: raw.trim(), source: "paste", tripId: activeTripId(), kind, kindLabel, kindIcon });
      setParsing(false);
      setParseProgress(0);
      showToast({ message: `Parsed as ${kindLabel}` });
    }, 1400);
  };

  let dropInputRef = undefined;
  const handleSubmit = () => {
    const v = dropInputRef?.value;
    if (dropInputRef) dropInputRef.value = "";
    setDropText("");
    onPaste(v);
  };

  const handleInputChange = (e) => {
    setDropText(e.currentTarget.value);
  };

  /* Drag and drop handlers */
  const handleDragOver = (e) => {
    e.preventDefault();
    setDropDragOver(true);
  };
  const handleDragLeave = () => {
    setDropDragOver(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setDropDragOver(false);
    const text = e.dataTransfer?.getData("text/plain") || e.dataTransfer?.getData("text");
    if (text) {
      onPaste(text);
    }
  };

  return (
    <div class="explore-wrap">
      <main class="explore-layout">
        <section class="explore-hero-section">
          <div class="intake-eye">
            <span class="dot-live" />
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

          <div class={`drop ${dropActive() ? "drop-focused" : ""} ${dropDragOver() ? "drop-dragover" : ""} ${parsing() ? "drop-parsing" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div class="drop-row">
              <Icon name="paste" size={20} />
              <input
                ref={dropInputRef}
                class="drop-input"
                placeholder="Paste a link, a confirmation email, or just type a note…"
                value={dropText()}
                onInput={handleInputChange}
                onFocus={() => setDropActive(true)}
                onBlur={() => setDropActive(false)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSubmit();
                }}
                disabled={parsing()}
              />
              <button class="drop-paste-btn" onClick={handleSubmit} disabled={parsing()}>
                {parsing() ? "Parsing…" : `Drop into ${activeTrip()?.name || "trip"}`}
                <Show when={!parsing()}>
                  <span style={{"opacity":".6","font-size":"11px","font-family":"var(--font-mono)","padding":"2px 5px","background":"rgba(255,255,255,.15)","border-radius":"4px","margin-left":"2px"}}>
                    ↵
                  </span>
                </Show>
              </button>
            </div>

            {/* Parsing progress bar */}
            <Show when={parsing()}>
              <div class="parse-progress-bar">
                <div class="parse-progress-fill" style={{ width: `${parseProgress()}%` }} />
              </div>
            </Show>

            {/* Drop zone overlay hint */}
            <Show when={dropDragOver()}>
              <div class="drop-zone-overlay">
                <Icon name="paste" size={28} />
                <span>Drop here to add to trip</span>
              </div>
            </Show>

            <div class="drop-meta">
              <span class="drop-channel">
                <Icon name="link" size={14} style={{"margin-right":"4px"}} />
                Any link · <b>airbnb, booking, instagram, blog post, google maps…</b>
              </span>
              <span class="drop-channel">
                <Icon name="image" size={14} style={{"margin-right":"4px"}} />
                Any screenshot
              </span>
              <span class="drop-channel">
                <Icon name="mail" size={14} style={{"margin-right":"4px"}} />
                Forward to <b>plan@hostliday.com</b>
              </span>
            </div>

            {/* Drag-and-drop hint */}
            <div class="drop-dnd-hint">
              <Icon name="folder" size={12} /> You can also drag & drop text or links here
            </div>
          </div>

          <div class="tripstrip" role="radiogroup" aria-label="Switch active trip">
            <For each={trips}>
              {(t) => (
                <button
                  class={`trip-card ${t.id === activeTripId() ? "on" : ""}`}
                  role="radio"
                  aria-checked={t.id === activeTripId()}
                  onClick={() => setActiveTrip(t.id)}
                >
                  <div class="trip-eye">
                    <span class={`dot ${TRIP_STATUS_DOT[t.status]}`} />
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
                  <Show when={t.id !== activeTripId() && tripCount(t.id) > 0}>
                    <div class="trip-badge">{tripCount(t.id)} items</div>
                  </Show>
                </button>
              )}
            </For>
          </div>
        </section>

        <aside class="stream">
          <div class="stream-head">
            <div class="stream-eye">
              <div class="stream-eye-row">
                <span class="lab">Intake stream</span>
                <span class="live">
                  <span class="d" />parsing live
                </span>
              </div>
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
            items={items}
          />

          <div class="stream-list" aria-live="polite">
            <Show
              when={filtered().length > 0 || unfilteredCount() === 0}
              fallback={
                <div class="stream-empty">
                  <Icon name="paste" size={20} />
                  <div class="se-h">No matches for current filters</div>
                  <div class="se-sub">
                    <Show when={query()} fallback={"Try removing some filters to see more items."}>
                      No items match "<b>{query()}</b>". Try a different search or clear filters.
                    </Show>
                  </div>
                  <button type="button" class="clear-filters-btn" onClick={() => { setKinds([]); setAssignment(null); setQuery(""); }}>
                    Clear all filters
                  </button>
                </div>
              }
            >
              <Show
                when={filtered().length > 0}
                fallback={
                  <div class="stream-empty">
                    <Icon name="paste" size={20} />
                    <div class="se-h">Nothing here yet</div>
                    <div class="se-sub">Paste a link, forward an email, or just type a note.</div>
                  </div>
                }
              >
                <For each={filtered()}>{(it) => <StreamItem item={it} query={query()} />}</For>
              </Show>
            </Show>
          </div>

          <div class="stream-foot">
            <span class="lh">Drop more anywhere on this page</span>
            <button type="button"
              class="compose-btn"
              onClick={() => props.onNavigate && props.onNavigate("compose")}
            >
              Open in Compose <Icon name="arrow" size={12} />
            </button>
          </div>
        </aside>
      </main>
    </div>
  );
}
