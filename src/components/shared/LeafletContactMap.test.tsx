import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import LeafletContactMap from "./LeafletContactMap";

describe("LeafletContactMap", () => {
  test("renders map container with data-testid and fallback structure", () => {
    render(
      <LeafletContactMap
        lat={9.8965}
        lng={76.7185}
        title="G-TEC Education Thodupuzha"
        address="Temple Bypass Road, Thodupuzha"
      />
    );

    const mapContainer = screen.getByTestId("leaflet-map-container");
    expect(mapContainer).toBeInTheDocument();
  });
});
