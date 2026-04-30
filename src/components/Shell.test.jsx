import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Shell from "./Shell";
import { TripProvider } from "../state";

function TestApp(props) {
  return (
    <TripProvider>
      {props.children}
    </TripProvider>
  );
}

describe("Shell", () => {
  it("renders surface tabs", () => {
    const { getByText } = render(() => (
      <TestApp>
        <Shell surface="explore" onSurface={() => {}} />
      </TestApp>
    ));
    expect(getByText("Explore")).toBeTruthy();
    expect(getByText("Compose")).toBeTruthy();
    expect(getByText("Recover")).toBeTruthy();
  });

  it("highlights the active tab", () => {
    const { getByText } = render(() => (
      <TestApp>
        <Shell surface="compose" onSurface={() => {}} />
      </TestApp>
    ));
    const tab = getByText("Compose");
    expect(tab.classList.contains("on")).toBe(true);
  });

  it("has a skip-to-content link", () => {
    const { getByText } = render(() => (
      <TestApp>
        <Shell surface="explore" onSurface={() => {}} />
      </TestApp>
    ));
    const skip = getByText("Skip to content");
    expect(skip.getAttribute("href")).toBe("#shell-main");
  });

  it("uses tablist ARIA role on nav", () => {
    const { container } = render(() => (
      <TestApp>
        <Shell surface="explore" onSurface={() => {}} />
      </TestApp>
    ));
    const tablist = container.querySelector('[role="tablist"]');
    expect(tablist).toBeTruthy();
  });

  it("sets aria-selected on active tab", () => {
    const { getByText } = render(() => (
      <TestApp>
        <Shell surface="explore" onSurface={() => {}} />
      </TestApp>
    ));
    const tab = getByText("Explore");
    expect(tab.getAttribute("aria-selected")).toBe("true");
  });

  it("calls onSurface when tab clicked", () => {
    let navigated = null;
    const onSurface = (s) => { navigated = s; };
    const { getByText } = render(() => (
      <TestApp>
        <Shell surface="explore" onSurface={onSurface} />
      </TestApp>
    ));
    getByText("Compose").click();
    expect(navigated).toBe("compose");
  });
});
