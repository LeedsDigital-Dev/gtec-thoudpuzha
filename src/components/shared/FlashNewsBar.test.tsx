import { describe, expect, test, vi, beforeEach } from "vitest";
import { renderToString } from "react-dom/server";
import { FlashNewsBar } from "./FlashNewsBar";

const mockFindMany = vi.hoisted(() => vi.fn());
const mockGetLocale = vi.hoisted(() => vi.fn());

vi.mock("@/lib/db", () => ({
  prisma: {
    flashNewsItem: {
      findMany: mockFindMany,
    },
  },
}));

vi.mock("next-intl/server", () => ({
  getLocale: mockGetLocale,
}));

describe("FlashNewsBar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFindMany.mockReset();
    mockGetLocale.mockReset();
    mockGetLocale.mockResolvedValue("en");
  });

  test("only renders items where active=true and expiresAt is null or in the future", async () => {
    const now = new Date();
    const future = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    mockFindMany.mockResolvedValue([
      {
        id: "active_no_expiry",
        textEn: "Active no expiry",
        textMl: null,
        link: null,
        active: true,
        expiresAt: null,
        sortOrder: 1,
      },
      {
        id: "active_future",
        textEn: "Active future",
        textMl: null,
        link: null,
        active: true,
        expiresAt: future,
        sortOrder: 2,
      },
    ]);

    const element = await FlashNewsBar();
    const html = renderToString(element);

    expect(mockFindMany).toHaveBeenCalledWith({
      where: {
        active: true,
        OR: [{ expiresAt: null }, { expiresAt: { gt: expect.any(Date) } }],
      },
      orderBy: { sortOrder: "asc" },
    });

    expect(html).toContain("Active no expiry");
    expect(html).toContain("Active future");
  });

  test("renders nothing when zero qualifying items", async () => {
    mockFindMany.mockResolvedValue([]);

    const element = await FlashNewsBar();

    expect(element).toBeNull();
  });
});
