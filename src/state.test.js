import { describe, it, expect } from "vitest";
import { safeHref, matchesFilter } from "./state.jsx";

describe("safeHref", () => {
  it("returns href for https URL", () => {
    expect(safeHref("https://example.com/path?q=1")).toBe("https://example.com/path?q=1");
  });

  it("returns href for http URL", () => {
    expect(safeHref("http://example.com/")).toBe("http://example.com/");
  });

  it("rejects javascript: scheme", () => {
    expect(safeHref("javascript:alert(1)")).toBeNull();
  });

  it("rejects data: URLs", () => {
    expect(safeHref("data:text/html,<script>alert(1)</script>")).toBeNull();
  });

  it("rejects non-string", () => {
    expect(safeHref(null)).toBeNull();
    expect(safeHref(undefined)).toBeNull();
    expect(safeHref(123)).toBeNull();
  });

  it("rejects malformed input", () => {
    expect(safeHref("not a url")).toBeNull();
    expect(safeHref("")).toBeNull();
  });
});

describe("matchesFilter", () => {
  const item = (overrides) => ({
    id: 1,
    tripId: "iberia",
    kind: "stay",
    kindLabel: "Stay · Casa do Vale",
    raw: "airbnb.com/rooms/123 · Casa do Vale",
    detail: "Douro Valley",
    ...overrides,
  });

  it("passes when no filters set", () => {
    expect(matchesFilter(item(), { kinds: [], assignment: null, query: "" }, "iberia")).toBe(true);
  });

  it("filters by assignment=this — matches active trip", () => {
    expect(
      matchesFilter(
        item({ tripId: "iberia" }),
        { kinds: [], assignment: "this", query: "" },
        "iberia",
      ),
    ).toBe(true);
    expect(
      matchesFilter(
        item({ tripId: "tokyo" }),
        { kinds: [], assignment: "this", query: "" },
        "iberia",
      ),
    ).toBe(false);
  });

  it("filters by assignment=unsorted — matches null tripId only", () => {
    expect(
      matchesFilter(
        item({ tripId: null }),
        { kinds: [], assignment: "unsorted", query: "" },
        "iberia",
      ),
    ).toBe(true);
    expect(
      matchesFilter(
        item({ tripId: "iberia" }),
        { kinds: [], assignment: "unsorted", query: "" },
        "iberia",
      ),
    ).toBe(false);
  });

  it("filters by kind chips", () => {
    expect(
      matchesFilter(
        item({ kind: "stay" }),
        { kinds: ["stay"], assignment: null, query: "" },
        "iberia",
      ),
    ).toBe(true);
    expect(
      matchesFilter(
        item({ kind: "flight" }),
        { kinds: ["stay"], assignment: null, query: "" },
        "iberia",
      ),
    ).toBe(false);
    expect(
      matchesFilter(
        item({ kind: "flight" }),
        { kinds: ["stay", "flight"], assignment: null, query: "" },
        "iberia",
      ),
    ).toBe(true);
  });

  it("filters by query — matches raw + detail + kindLabel + shot text", () => {
    expect(matchesFilter(item(), { kinds: [], assignment: null, query: "douro" }, "iberia")).toBe(
      true,
    );
    expect(matchesFilter(item(), { kinds: [], assignment: null, query: "CASA" }, "iberia")).toBe(
      true,
    );
    expect(matchesFilter(item(), { kinds: [], assignment: null, query: "tokyo" }, "iberia")).toBe(
      false,
    );
  });

  it("combines kind + assignment + query", () => {
    const it1 = item({ kind: "stay", tripId: "iberia", raw: "Casa" });
    const it2 = item({ kind: "flight", tripId: "iberia", raw: "Casa" });
    const it3 = item({ kind: "stay", tripId: null, raw: "Casa" });
    const filter = { kinds: ["stay"], assignment: "this", query: "casa" };
    expect(matchesFilter(it1, filter, "iberia")).toBe(true);
    expect(matchesFilter(it2, filter, "iberia")).toBe(false);
    expect(matchesFilter(it3, filter, "iberia")).toBe(false);
  });

  it("handles missing fields gracefully", () => {
    const sparse = { id: 1, tripId: null, kind: null };
    expect(matchesFilter(sparse, { kinds: [], assignment: null, query: "nothing" }, "iberia")).toBe(
      false,
    );
    expect(matchesFilter(sparse, { kinds: [], assignment: null, query: "" }, "iberia")).toBe(true);
  });
});
