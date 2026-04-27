import { createContext, createSignal, createMemo, useContext, batch } from "solid-js";
import { createStore, produce } from "solid-js/store";

const SEED_TRIPS = [
  { id: "iberia", name: "Iberia, late August", status: "active", dates: "Aug 22–28", nights: 6 },
  { id: "tokyo", name: "Tokyo with Sam, October", status: "held", dates: "Oct 4–14", nights: 10 },
  { id: "norway", name: "Norwegian fjords, someday", status: "idea", dates: "—", nights: null },
];

const SEED_ITEMS = [
  {
    id: 1,
    tripId: "iberia",
    source: "airbnb.com",
    time: "just now",
    raw: "I think this one — airbnb.com/rooms/48720193 · Casa do Vale, Douro Valley",
    kind: "stay",
    kindLabel: "Stay · Casa do Vale",
    kindIcon: "bed",
    detail: "Douro Valley · 22 Aug → 24 Aug",
    detailIcon: "pin",
    badge: "€220 / night",
    badgeIcon: null,
    primary: "Slot into Iberia draft",
    auto: true,
    tags: [],
    parseStatus: "parsed",
  },
  {
    id: 2,
    tripId: "iberia",
    source: "british-airways.com",
    time: "2 min ago",
    raw: "Forwarded from flights@ba.com",
    kind: "flight",
    kindLabel: "Flight · BA 502",
    kindIcon: "plane",
    detail: "LHR → LIS · 22 Aug · 22:40",
    detailIcon: "clock",
    badge: "Confirmed · seats 14E, 14F",
    badgeIcon: "check",
    primary: "Pinned to Day 1 of Iberia",
    auto: true,
    tags: [],
    parseStatus: "confirmed",
  },
  {
    id: 3,
    tripId: "iberia",
    source: "screenshot",
    time: "5 min ago",
    raw: null,
    shot: {
      file: "screenshot.png",
      time: "2:14 AM",
      h: "Tasca Lisboeta",
      sub: "Lisbon · seafood · open until 02:00",
    },
    kind: "food",
    kindLabel: "Restaurant",
    kindIcon: "food",
    badge: null,
    badgeIcon: null,
    primary: "Add to Day 1",
    auto: false,
    tags: [{ label: "Confirming opening hours…", pending: true, ico: null }],
    parseStatus: "partial",
  },
  {
    id: 4,
    tripId: "iberia",
    source: "instagram.com",
    time: "yesterday",
    raw: "instagram.com/p/Cz9X-2vMqAa",
    kind: "activity",
    kindLabel: "Activity · vineyard walk",
    kindIcon: "hike",
    detail: "Pinhão · best at sunrise",
    detailIcon: "pin",
    badge: null,
    badgeIcon: null,
    primary: "Suggest for Day 2 morning",
    auto: false,
    tags: [],
    parseStatus: "parsed",
  },
  {
    id: 5,
    tripId: null,
    source: "you wrote",
    time: "yesterday",
    raw: "Sam doesn't like early flights. Prefers aisle. Budget €800 pp for the whole trip.",
    kind: "note",
    kindLabel: "Trip preference · saved",
    kindIcon: "check",
    badge: null,
    badgeIcon: null,
    primary: null,
    auto: false,
    tags: [{ label: "Applied to Iberia + Tokyo", pending: false, ico: null }],
    parseStatus: "parsed",
  },
];

const TripContext = createContext();

export function TripProvider(props) {
  const [trips, setTrips] = createStore(SEED_TRIPS);
  const [items, setItems] = createStore(SEED_ITEMS);
  const [activeTripId, _setActiveTripId] = createSignal("iberia");
  const [toast, setToast] = createSignal(null);
  const [walkthrough, setWalkthrough] = createSignal({ mode: "manual", step: 0 });

  const parseTimers = new Map();

  const activeTrip = createMemo(() => trips.find((t) => t.id === activeTripId()) || null);

  const tripStream = createMemo(() => items.filter((i) => i.tripId === activeTripId()));

  const allItems = createMemo(() => items);

  function setActiveTrip(id) {
    if (!trips.find((t) => t.id === id)) return;
    _setActiveTripId(id);
  }

  function slotItemToTrip(itemId, tripId) {
    const idx = items.findIndex((i) => i.id === itemId);
    if (idx === -1) return;
    setItems(
      idx,
      produce((it) => {
        it.tripId = tripId;
        it.parseStatus = "confirmed";
      }),
    );
    showToast({
      message: `Pinned to ${trips.find((t) => t.id === tripId)?.name || "trip"}`,
      undo: () =>
        setItems(
          idx,
          produce((it) => {
            it.tripId = null;
            it.parseStatus = "parsed";
          }),
        ),
    });
  }

  function addItem(item) {
    const id = Math.max(0, ...items.map((i) => i.id)) + 1;
    const draft = {
      id,
      tripId: item.tripId ?? activeTripId(),
      parseStatus: "parsing",
      source: "paste",
      time: "just now",
      raw: item.raw ?? "",
      kind: null,
      kindLabel: null,
      kindIcon: null,
      detail: null,
      detailIcon: null,
      badge: null,
      badgeIcon: null,
      primary: null,
      auto: false,
      tags: [],
      ...item,
    };
    setItems(items.length, draft);
    const timer = setTimeout(() => {
      const targetTrip = draft.tripId;
      const cur = items.find((i) => i.id === id);
      if (!cur || cur.tripId !== targetTrip) return;
      const i2 = items.findIndex((i) => i.id === id);
      if (i2 === -1) return;
      setItems(
        i2,
        produce((it) => {
          it.parseStatus = item.simulateFail ? "failed" : "parsed";
          if (!item.simulateFail) {
            it.kind = it.kind || "note";
            it.kindLabel = it.kindLabel || "Parsed";
            it.kindIcon = it.kindIcon || "check";
          }
        }),
      );
      parseTimers.delete(id);
    }, item.parseDelay ?? 1400);
    parseTimers.set(id, timer);
    return id;
  }

  function deleteItem(itemId) {
    const t = parseTimers.get(itemId);
    if (t) {
      clearTimeout(t);
      parseTimers.delete(itemId);
    }
    setItems(items.filter((i) => i.id !== itemId));
  }

  function clearItemParse(itemId) {
    const t = parseTimers.get(itemId);
    if (t) {
      clearTimeout(t);
      parseTimers.delete(itemId);
    }
  }

  function showToast({ message, undo }) {
    const id = Date.now();
    setToast({ id, message, undo });
    setTimeout(() => setToast((t) => (t && t.id === id ? null : t)), 4000);
  }

  function dismissToast() {
    setToast(null);
  }

  return (
    <TripContext.Provider
      value={{
        trips,
        items,
        activeTripId,
        activeTrip,
        tripStream,
        allItems,
        setActiveTrip,
        slotItemToTrip,
        addItem,
        deleteItem,
        clearItemParse,
        toast,
        showToast,
        dismissToast,
        walkthrough,
        setWalkthrough,
      }}
    >
      {props.children}
    </TripContext.Provider>
  );
}

export function useTrip() {
  const ctx = useContext(TripContext);
  if (!ctx) throw new Error("useTrip must be used within <TripProvider>");
  return ctx;
}

export function safeHref(raw) {
  if (typeof raw !== "string") return null;
  try {
    const u = new URL(raw);
    if (u.protocol === "https:" || u.protocol === "http:") return u.href;
    return null;
  } catch {
    return null;
  }
}

export function matchesFilter(item, { kinds, assignment, query }, activeTripId) {
  if (kinds && kinds.length && !kinds.includes(item.kind)) return false;
  if (assignment === "this" && item.tripId !== activeTripId) return false;
  if (assignment === "unsorted" && item.tripId != null) return false;
  if (query) {
    const q = query.toLowerCase();
    const hay = [
      item.raw ?? "",
      item.kindLabel ?? "",
      item.detail ?? "",
      item.shot?.h ?? "",
      item.shot?.sub ?? "",
    ]
      .join(" ")
      .toLowerCase();
    if (!hay.includes(q)) return false;
  }
  return true;
}
