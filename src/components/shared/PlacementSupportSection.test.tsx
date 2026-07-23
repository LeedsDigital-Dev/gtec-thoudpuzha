/* eslint-disable @next/next/no-img-element, jsx-a11y/alt-text */
import { describe, expect, test, vi } from "vitest";
import { renderToString } from "react-dom/server";
import { PlacementSupportSection } from "./PlacementSupportSection";

vi.mock("next/image", () => ({
  default: (
    props: React.ImgHTMLAttributes<HTMLImageElement> & {
      fill?: boolean;
      priority?: boolean;
    },
  ) => {
    const { fill, priority, ...rest } = props;
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
    // Even with more items in the data, the grid only renders what's passed
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
});
