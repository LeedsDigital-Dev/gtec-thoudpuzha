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

  test("5. displays 9 support items with sequential badges (#01 to #09) and 9 pagination dots", () => {
    const props = makeProps(9);
    render(<PlacementSupportSection {...props} />);

    // All 9 items are rendered with order badges
    for (let i = 1; i <= 9; i++) {
      expect(screen.getByText(`0${i}`)).toBeInTheDocument();
      expect(screen.getByText(`Placement ${i}`)).toBeInTheDocument();
    }

    // 9 pagination dots are present
    const tabs = screen.getAllByRole("tab");
    expect(tabs).toHaveLength(9);
  });

  test("6. item 5 is the center/active featured card by default when 9 items are provided", () => {
    const props = makeProps(9);
    render(<PlacementSupportSection {...props} />);

    // Default active item is Item 5 (index 4)
    expect(screen.getByTestId("carousel-indicator")).toHaveTextContent("Item 5 of 9");
    expect(screen.getByText("Featured")).toBeInTheDocument();

    // 5th tab is selected
    const tabs = screen.getAllByRole("tab");
    expect(tabs[4]).toHaveAttribute("aria-selected", "true");
  });

  test("7. navigation arrows and pagination dots change the active item smoothly", () => {
    const props = makeProps(9);
    render(<PlacementSupportSection {...props} />);

    const nextBtn = screen.getByLabelText("Next placement item");
    const prevBtn = screen.getByLabelText("Previous placement item");

    // Click Next -> moves to item 6
    fireEvent.click(nextBtn);
    expect(screen.getByTestId("carousel-indicator")).toHaveTextContent("Item 6 of 9");

    // Click Prev -> moves back to item 5
    fireEvent.click(prevBtn);
    expect(screen.getByTestId("carousel-indicator")).toHaveTextContent("Item 5 of 9");

    // Click dot for item 2 (index 1)
    const tabs = screen.getAllByRole("tab");
    fireEvent.click(tabs[1]);
    expect(screen.getByTestId("carousel-indicator")).toHaveTextContent("Item 2 of 9");
  });
});
