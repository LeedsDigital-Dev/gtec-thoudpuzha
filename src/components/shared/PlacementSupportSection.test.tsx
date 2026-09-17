/* eslint-disable @next/next/no-img-element, jsx-a11y/alt-text */
import { describe, expect, test, vi } from "vitest";
import { renderToString } from "react-dom/server";
import { render, screen, fireEvent } from "@testing-library/react";
import { PlacementSupportSection } from "./PlacementSupportSection";

vi.mock("next/image", () => ({
  default: (
    props: React.ImgHTMLAttributes<HTMLImageElement> & {
      fill?: boolean;
      priority?: boolean;
      unoptimized?: boolean;
    },
  ) => {
    const { fill, priority, unoptimized: _unoptimized, ...rest } = props;
    return (
      <img
        {...rest}
        data-fill={fill ? "true" : undefined}
        data-priority={priority ? "true" : undefined}
      />
    );
  },
}));

function makeProps(itemsCount: number) {
  const items = Array.from({ length: itemsCount }, (_, i) => ({
    id: `pi${i + 1}`,
    mediaType: "IMAGE" as const,
    url: `gallery/placed${i + 1}.jpg`,
    captionEn: `Placement ${i + 1}`,
    captionMl: null,
    sortOrder: i,
  }));

  return {
    data: { slug: "placement-support", items },
    heading: "Placement & Support",
    viewFullGallery: "View full gallery →",
    ctaHeading: "Ready to take the next step?",
    ctaText: "Explore current job openings or let employers find you.",
    viewVacancies: "View current vacancies →",
    hiringCta: "Are you hiring? Post a vacancy →",
  };
}

describe("PlacementSupportSection", () => {
  test("1. renders items from the correct category only, not items from other categories", () => {
    const props = makeProps(3);
    const html = renderToString(<PlacementSupportSection {...props} />);

    expect(html).toContain("Placement 1");
    expect(html).toContain("Placement 2");
    expect(html).toContain("Placement 3");
    expect(html).not.toContain("Placement 9");
  });

  test("2. limits to the configured item count even if the category has more items", () => {
    const props = makeProps(6);
    const html = renderToString(<PlacementSupportSection {...props} />);

    expect(html).toContain("Placement 1");
    expect(html).toContain("Placement 6");
    expect(html).not.toContain("Placement 7");
  });

  test("3. 'View full gallery' link deep-links to /gallery pre-filtered to Placement category", () => {
    const props = makeProps(3);
    const html = renderToString(<PlacementSupportSection {...props} />);

    expect(html).toContain('href="/gallery?category=placement-support"');
  });

  test("4. CTA banner links point to correct portal routes", () => {
    const props = makeProps(3);
    const html = renderToString(<PlacementSupportSection {...props} />);

    expect(html).toContain('href="/portal/jobs"');
    expect(html).toContain('href="/portal/employer/register"');
  });

  test("5. displays 9 support items with captions and 9 pagination dots without number badges", () => {
    const props = makeProps(9);
    render(<PlacementSupportSection {...props} />);

    // All 9 item captions are rendered
    for (let i = 1; i <= 9; i++) {
      expect(screen.getByText(`Placement ${i}`)).toBeInTheDocument();
    }

    // Number badges like #01, #02 should not be attached
    expect(screen.queryByText("#")).not.toBeInTheDocument();
    expect(screen.queryByText("01")).not.toBeInTheDocument();

    // 9 pagination dots are present
    const tabs = screen.getAllByRole("tab");
    expect(tabs).toHaveLength(9);
  });

  test("6. item 5 is the center/active featured card by default when 9 items are provided", () => {
    const props = makeProps(9);
    render(<PlacementSupportSection {...props} />);

    expect(screen.getByText("Featured")).toBeInTheDocument();

    // 5th tab is selected (item 5 / index 4)
    const tabs = screen.getAllByRole("tab");
    expect(tabs[4]).toHaveAttribute("aria-selected", "true");
  });

  test("7. navigation arrows and pagination dots change the active item smoothly", () => {
    const props = makeProps(9);
    render(<PlacementSupportSection {...props} />);

    const nextBtn = screen.getByLabelText("Next placement item");
    const prevBtn = screen.getByLabelText("Previous placement item");
    const tabs = screen.getAllByRole("tab");

    // Click Next -> moves to item 6 (index 5)
    fireEvent.click(nextBtn);
    expect(tabs[5]).toHaveAttribute("aria-selected", "true");

    // Click Prev -> moves back to item 5 (index 4)
    fireEvent.click(prevBtn);
    expect(tabs[4]).toHaveAttribute("aria-selected", "true");

    // Click dot for item 2 (index 1)
    fireEvent.click(tabs[1]);
    expect(tabs[1]).toHaveAttribute("aria-selected", "true");
  });

  test("8. auto-scroll play/pause toggle toggles playback state", () => {
    const props = makeProps(9);
    render(<PlacementSupportSection {...props} />);

    const toggleBtn = screen.getByRole("button", { name: /pause auto scrolling/i });
    expect(toggleBtn).toBeInTheDocument();
    expect(toggleBtn).toHaveTextContent("Auto-scroll on");

    // Click to pause
    fireEvent.click(toggleBtn);
    expect(screen.getByRole("button", { name: /play auto scrolling/i })).toHaveTextContent("Paused");

    // Click to resume
    fireEvent.click(screen.getByRole("button", { name: /play auto scrolling/i }));
    expect(screen.getByRole("button", { name: /pause auto scrolling/i })).toHaveTextContent("Auto-scroll on");
  });
});
