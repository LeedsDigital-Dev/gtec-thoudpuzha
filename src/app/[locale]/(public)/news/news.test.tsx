import { describe, expect, test, vi } from "vitest";
import { renderToString as _renderToString } from "react-dom/server";

const mockFindMany = vi.hoisted(() => vi.fn());
const mockFindFirst = vi.hoisted(() => vi.fn());

vi.mock("@/lib/db", () => ({
  prisma: {
    newsEvent: {
      findMany: mockFindMany,
      findFirst: mockFindFirst,
    },
  },
}));

describe("/news listing page", () => {
  test("only lists items where publishedAt is not null (query uses not:null filter)", async () => {
    const publishedItems = [
      {
        id: "ne_1",
        type: "NEWS",
        titleEn: "Published news",
        titleMl: null,
        bodyEn: "Body",
        bodyMl: null,
        coverImageUrl: null,
        eventDate: null,
        slug: "published-news",
        publishedAt: new Date("2026-07-22"),
      },
    ];

    mockFindMany.mockResolvedValue(publishedItems);

    const { getPublishedNews } = await import("@/lib/news-events");
    const result = await getPublishedNews();

    expect(mockFindMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { publishedAt: { not: null } },
      }),
    );
    expect(result).toHaveLength(1);
    expect(result[0].slug).toBe("published-news");
  });
});

describe("/news/[slug] detail page", () => {
  test("for an unpublished item returns 404", async () => {
    mockFindFirst.mockResolvedValue(null);

    const { default: NewsDetailPage } = await import(
      "./[slug]/page"
    );

    await expect(
      NewsDetailPage({
        params: Promise.resolve({ locale: "en", slug: "unpublished-draft" }),
      }),
    ).rejects.toThrow("NEXT_HTTP_ERROR_FALLBACK;404");
  });

  test("for a non-existent slug returns 404", async () => {
    mockFindFirst.mockResolvedValue(null);

    const { default: NewsDetailPage } = await import(
      "./[slug]/page"
    );

    await expect(
      NewsDetailPage({
        params: Promise.resolve({ locale: "en", slug: "does-not-exist" }),
      }),
    ).rejects.toThrow("NEXT_HTTP_ERROR_FALLBACK;404");
  });
});

describe("Homepage teaser", () => {
  test("correctly distinguishes NEWS items from the next upcoming EVENT", async () => {
    const newsItems = [
      {
        id: "ne_1",
        type: "NEWS",
        titleEn: "First news",
        titleMl: null,
        slug: "first-news",
        publishedAt: new Date("2026-07-22"),
        eventDate: null,
      },
      {
        id: "ne_2",
        type: "NEWS",
        titleEn: "Second news",
        titleMl: null,
        slug: "second-news",
        publishedAt: new Date("2026-07-21"),
        eventDate: null,
      },
    ];

    const nextEvent = {
      id: "ev_1",
      type: "EVENT",
      titleEn: "Upcoming workshop",
      titleMl: null,
      slug: "upcoming-workshop",
      publishedAt: new Date("2026-07-20"),
      eventDate: new Date("2026-08-15"),
    };

    mockFindMany.mockResolvedValueOnce(newsItems);
    mockFindFirst.mockResolvedValueOnce(nextEvent);

    const { getHomepageTeaser } = await import("@/lib/news-events");
    const result = await getHomepageTeaser();

    expect(result.newsItems).toHaveLength(2);
    expect(result.newsItems.every((i) => i.type === "NEWS")).toBe(true);
    expect(result.nextEvent).not.toBeNull();
    expect(result.nextEvent!.type).toBe("EVENT");
    expect(result.nextEvent!.titleEn).toBe("Upcoming workshop");
  });
});
