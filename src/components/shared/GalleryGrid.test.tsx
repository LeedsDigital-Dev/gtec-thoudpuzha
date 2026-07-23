import { describe, expect, test, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { GalleryGrid } from "./GalleryGrid";
import type { PublicGalleryCategory } from "@/lib/gallery";

vi.mock("next/image", () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean; priority?: boolean }) => {
    const { fill, priority, ...rest } = props;
    return <img {...rest} data-fill={fill ? "true" : undefined} data-priority={priority ? "true" : undefined} />;
  },
}));

const imageItems = [
  {
    id: "i1",
    mediaType: "IMAGE" as const,
    url: "gallery/photo1.jpg",
    captionEn: "First photo",
    captionMl: null,
    sortOrder: 0,
  },
  {
    id: "i2",
    mediaType: "IMAGE" as const,
    url: "gallery/photo2.jpg",
    captionEn: "Second photo",
    captionMl: null,
    sortOrder: 1,
  },
  {
    id: "i3",
    mediaType: "IMAGE" as const,
    url: "gallery/photo3.jpg",
    captionEn: "Third photo",
    captionMl: null,
    sortOrder: 2,
  },
];

const categories: PublicGalleryCategory[] = [
  {
    id: "cat1",
    slug: "events",
    nameEn: "Events",
    nameMl: null,
    sortOrder: 0,
    items: imageItems,
  },
  {
    id: "cat2",
    slug: "classroom",
    nameEn: "Classroom",
    nameMl: null,
    sortOrder: 1,
    items: [],
  },
  {
    id: "cat3",
    slug: "placements",
    nameEn: "Placements",
    nameMl: null,
    sortOrder: 2,
    items: [
      {
        id: "i4",
        mediaType: "IMAGE" as const,
        url: "gallery/placement.jpg",
        captionEn: "Placement drive",
        captionMl: null,
        sortOrder: 0,
      },
    ],
  },
];

const emptyCategories: PublicGalleryCategory[] = [];

describe("GalleryGrid", () => {
  test("1. renders a tab per GalleryCategory in sortOrder", () => {
    render(<GalleryGrid categories={categories} />);

    const tabs = screen.getAllByRole("tab");
    expect(tabs).toHaveLength(3);
    expect(tabs[0]).toHaveTextContent("Events");
    expect(tabs[1]).toHaveTextContent("Classroom");
    expect(tabs[2]).toHaveTextContent("Placements");
  });

  test("2. clicking an image thumbnail opens the lightbox showing that image", () => {
    render(<GalleryGrid categories={categories} />);

    // First tab (Events) is active by default — it has 3 images
    const thumbnails = screen.getAllByRole("button", {
      name: /View image: .*/,
    });
    expect(thumbnails).toHaveLength(3);

    // Click the first image
    fireEvent.click(thumbnails[0]);

    // Lightbox should be open (role="dialog", aria-modal="true")
    const lightbox = screen.getByRole("dialog");
    expect(lightbox).toBeInTheDocument();
  });

  test("3. lightbox next/prev navigation moves correctly between items within the same category", () => {
    render(<GalleryGrid categories={categories} />);

    // Open lightbox on first image
    const thumbnails = screen.getAllByRole("button", {
      name: /View image: .*/,
    });
    fireEvent.click(thumbnails[0]);

    // Lightbox shows big caption overlay; thumbnail also has caption text
    const firstMatches = screen.getAllByText("First photo");
    expect(firstMatches.length).toBeGreaterThanOrEqual(2);

    // Click Next
    const nextButton = screen.getByLabelText("Next image");
    fireEvent.click(nextButton);

    // Should now show second image caption in lightbox
    const secondMatches = screen.getAllByText("Second photo");
    expect(secondMatches.length).toBeGreaterThanOrEqual(2);

    // Click Prev to go back
    const prevButton = screen.getByLabelText("Previous image");
    fireEvent.click(prevButton);

    // Back to first image
    const backToFirst = screen.getAllByText("First photo");
    expect(backToFirst.length).toBeGreaterThanOrEqual(2);

    // Navigate forward twice — should reach third
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);

    const thirdMatches = screen.getAllByText("Third photo");
    expect(thirdMatches.length).toBeGreaterThanOrEqual(2);
  });

  test("4. a category with zero items shows the empty state", () => {
    render(<GalleryGrid categories={categories} />);

    // Click Classroom tab (has 0 items)
    const classroomTab = screen.getByRole("tab", { name: "Classroom" });
    fireEvent.click(classroomTab);

    expect(screen.getByText("No photos yet.")).toBeInTheDocument();
  });

  test("a category list with zero categories shows no-categories state", () => {
    render(<GalleryGrid categories={emptyCategories} />);

    expect(screen.getByText("No gallery categories yet.")).toBeInTheDocument();
  });

  test("lightbox closes on Escape key", () => {
    render(<GalleryGrid categories={categories} />);

    const thumbnails = screen.getAllByRole("button", {
      name: /View image: .*/,
    });
    fireEvent.click(thumbnails[0]);

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
