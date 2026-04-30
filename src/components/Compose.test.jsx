import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import { TripProvider } from "../state";
import Compose from "./Compose";

function TestApp(props) {
  return (
    <TripProvider>
      {props.children}
    </TripProvider>
  );
}

describe("Compose", () => {
  it("renders the trip title", () => {
    const { getByText } = render(() => (
      <TestApp>
        <Compose />
      </TestApp>
    ));
    expect(getByText(/Iberia/)).toBeTruthy();
  });

  it("renders day sections", () => {
    const { getByText } = render(() => (
      <TestApp>
        <Compose />
      </TestApp>
    ));
    expect(getByText(/Day 1/)).toBeTruthy();
  });

  it("renders Orbit tab by default", () => {
    const { getByText } = render(() => (
      <TestApp>
        <Compose />
      </TestApp>
    ));
    expect(getByText("Orbit")).toBeTruthy();
  });

  it("renders Orbit messages", () => {
    const { container } = render(() => (
      <TestApp>
        <Compose />
      </TestApp>
    ));
    const msgs = container.querySelectorAll(".comp-msg");
    expect(msgs.length).toBeGreaterThan(0);
  });

  it("renders confirm button", () => {
    const { getByText } = render(() => (
      <TestApp>
        <Compose />
      </TestApp>
    ));
    expect(getByText(/Confirm next held/)).toBeTruthy();
  });

  it("renders the composer input", () => {
    const { container } = render(() => (
      <TestApp>
        <Compose />
      </TestApp>
    ));
    const composer = container.querySelector(".comp-composer");
    expect(composer).toBeTruthy();
  });

  it("renders flight slot on Day 1", () => {
    const { getByText } = render(() => (
      <TestApp>
        <Compose />
      </TestApp>
    ));
    expect(getByText(/TAP Air Portugal/)).toBeTruthy();
  });
});
