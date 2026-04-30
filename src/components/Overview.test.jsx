import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import { TripProvider } from "../state";
import Overview from "./Overview";

function TestApp(props) {
  return (
    <TripProvider>
      {props.children}
    </TripProvider>
  );
}

describe("Overview", () => {
  it("renders the hero heading", () => {
    const { getByText } = render(() => (
      <TestApp>
        <Overview onNavigate={() => {}} />
      </TestApp>
    ));
    expect(getByText(/Your trip plan/)).toBeTruthy();
  });

  it("renders surface cards", () => {
    const { getByText } = render(() => (
      <TestApp>
        <Overview onNavigate={() => {}} />
      </TestApp>
    ));
    expect(getByText("Drop intake")).toBeTruthy();
    expect(getByText("Plan & build")).toBeTruthy();
    expect(getByText("Fix & escalate")).toBeTruthy();
  });

  it("renders CTA buttons that call onNavigate", () => {
    let navigated = null;
    const onNavigate = (s) => { navigated = s; };
    const { getByText } = render(() => (
      <TestApp>
        <Overview onNavigate={onNavigate} />
      </TestApp>
    ));
    getByText("Drop research").click();
    expect(navigated).toBe("explore");
  });

  it("renders how-it-works steps", () => {
    const { getByText } = render(() => (
      <TestApp>
        <Overview onNavigate={() => {}} />
      </TestApp>
    ));
    expect(getByText("Drop anything")).toBeTruthy();
    expect(getByText("Orbit builds your trip")).toBeTruthy();
    expect(getByText("Humans step in when it counts")).toBeTruthy();
  });

  it("renders stats section", () => {
    const { getByText } = render(() => (
      <TestApp>
        <Overview onNavigate={() => {}} />
      </TestApp>
    ));
    expect(getByText("Average response time")).toBeTruthy();
  });
});
