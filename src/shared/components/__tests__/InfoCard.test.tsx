import { render, screen } from "@testing-library/react";
import { InfoCard } from "../InfoCard";
import { describe, it } from "node:test";


describe("InfoCard", () => {
  it("renders title correctly", () => {
    render(
      <InfoCard
        title="Test Card"
        rows={[{ label: "Airport", value: "Darwin" }]}
      />
    );

    expect(screen.getByText("Test Card")).toBeInTheDocument();
  });

  it("renders rows correctly", () => {
    render(
      <InfoCard
        title="Departure"
        rows={[
          { label: "Airport", value: "Darwin" },
          { label: "Terminal", value: "T1" },
        ]}
      />
    );

    expect(screen.getByText("Airport")).toBeInTheDocument();
    expect(screen.getByText("Darwin")).toBeInTheDocument();
    expect(screen.getByText("Terminal")).toBeInTheDocument();
    expect(screen.getByText("T1")).toBeInTheDocument();
  });

  it("renders fallback dash when value is missing", () => {
    render(
      <InfoCard
        title="Test"
        rows={[{ label: "Gate" }]}
      />
    );

    expect(screen.getByText("—")).toBeInTheDocument();
  });
});
function expect(arg0: any) {
    throw new Error("Function not implemented.");
}

