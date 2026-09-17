import { describe, expect, test, vi, beforeEach } from "vitest";
import { renderToString } from "react-dom/server";
import {
  createNewsEvent,
  updateNewsEvent,
  deleteNewsEvent,
  togglePublishNewsEvent,
} from "./actions";

const mockAuth = vi.hoisted(() => vi.fn());
const mockCreate = vi.hoisted(() => vi.fn());
const mockUpdate = vi.hoisted(() => vi.fn());
const mockDelete = vi.hoisted(() => vi.fn());
const mockFindMany = vi.hoisted(() => vi.fn());
const mockUserFindUnique = vi.hoisted(() => vi.fn());
const mockAuditCreate = vi.hoisted(() => vi.fn());
const mockRedirect = vi.hoisted(() =>
  vi.fn((url: string) => {
    throw new Error(`redirect:${url}`);
  }),
);
const mockRevalidatePath = vi.hoisted(() => vi.fn());

vi.mock("@clerk/nextjs/server", () => ({
  auth: mockAuth,
}));

vi.mock("@/lib/db", () => ({
  prisma: {
    newsEvent: {
      create: mockCreate,
      update: mockUpdate,
      delete: mockDelete,
      findMany: mockFindMany,
    },
    user: {
      findUnique: mockUserFindUnique,
    },
    auditLogEntry: {
      create: mockAuditCreate,
    },
  },
}));

vi.mock("next/navigation", () => ({
  redirect: mockRedirect,
}));

vi.mock("next/cache", () => ({
  revalidatePath: mockRevalidatePath,
}));

describe("createNewsEvent", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockCreate.mockReset();
    mockUpdate.mockReset();
    mockDelete.mockReset();
    mockAuditCreate.mockReset();
    mockRevalidatePath.mockReset();
    mockUserFindUnique.mockResolvedValue({ deactivatedAt: null });
  });

  test("writes an audit log entry when creating a news item as Super Admin", async () => {
    mockAuth.mockResolvedValue({
      userId: "admin_1",
      sessionClaims: { metadata: { role: "SUPER_ADMIN" } },
    });

    mockCreate.mockResolvedValue({
      id: "ne_1",
      type: "NEWS",
      titleEn: "Test news",
      titleMl: null,
      bodyEn: "Body content",
      bodyMl: null,
      coverImageUrl: null,
      eventDate: null,
      slug: "test-news",
      publishedAt: new Date("2026-07-23"),
    });

    mockAuditCreate.mockResolvedValue({
      id: "audit_1",
      actorUserId: "admin_1",
      actorRole: "SUPER_ADMIN",
      action: "newsEvent.create",
      entityType: "NewsEvent",
      entityId: "ne_1",
    });

    const formData = new FormData();
    formData.append("type", "NEWS");
    formData.append("titleEn", "Test news");
    formData.append("bodyEn", "Body content");
    formData.append("locale", "en");
    formData.append("publishNow", "on");

    await createNewsEvent(formData);

    expect(mockCreate).toHaveBeenCalledTimes(1);
    expect(mockCreate).toHaveBeenCalledWith({
      data: {
        type: "NEWS",
        titleEn: "Test news",
        titleMl: null,
        bodyEn: "Body content",
        bodyMl: null,
        coverImageUrl: null,
        eventDate: null,
        slug: "test-news",
        publishedAt: expect.any(Date),
      },
    });

    expect(mockAuditCreate).toHaveBeenCalledTimes(1);
    expect(mockAuditCreate).toHaveBeenCalledWith({
      data: expect.objectContaining({
        actorUserId: "admin_1",
        actorRole: "SUPER_ADMIN",
        action: "newsEvent.create",
        entityType: "NewsEvent",
        entityId: "ne_1",
        metadata: expect.objectContaining({
          type: "NEWS",
          titleEn: "Test news",
          slug: "test-news",
          published: true,
        }),
      }),
    });

    expect(mockRevalidatePath).toHaveBeenCalledWith("/en/admin/news-events");
  });

  test("non-Super-Admin (CENTRE_STAFF) is denied when creating news or events", async () => {
    mockAuth.mockResolvedValue({
      userId: "staff_1",
      sessionClaims: { metadata: { role: "CENTRE_STAFF" } },
    });

    const formData = new FormData();
    formData.append("type", "NEWS");
    formData.append("titleEn", "Test news");
    formData.append("bodyEn", "Body content");
    formData.append("locale", "en");

    await expect(createNewsEvent(formData)).rejects.toThrow("redirect:/en/forbidden");
  });

  test("publishing a draft as Super Admin makes it immediately visible", async () => {
    mockAuth.mockResolvedValue({
      userId: "admin_1",
      sessionClaims: { metadata: { role: "SUPER_ADMIN" } },
    });

    mockUpdate.mockResolvedValue({
      id: "ne_1",
      type: "NEWS",
      titleEn: "Test news",
      publishedAt: new Date("2026-07-23"),
    });

    mockAuditCreate.mockResolvedValue({
      id: "audit_1",
      actorUserId: "admin_1",
      actorRole: "SUPER_ADMIN",
      action: "newsEvent.publish",
      entityType: "NewsEvent",
      entityId: "ne_1",
    });

    const formData = new FormData();
    formData.append("id", "ne_1");
    formData.append("publish", "true");
    formData.append("locale", "en");

    await togglePublishNewsEvent(formData);

    expect(mockUpdate).toHaveBeenCalledWith({
      where: { id: "ne_1" },
      data: { publishedAt: expect.any(Date) },
    });

    expect(mockRevalidatePath).toHaveBeenCalledWith("/en/admin/news-events");
    expect(mockRevalidatePath).toHaveBeenCalledWith("/en/news");
  });

  test("non-Super-Admin (CENTRE_STAFF) is denied when deleting or updating news/events", async () => {
    mockAuth.mockResolvedValue({
      userId: "staff_1",
      sessionClaims: { metadata: { role: "CENTRE_STAFF" } },
    });

    const formData = new FormData();
    formData.append("id", "ne_1");
    formData.append("locale", "en");

    await expect(deleteNewsEvent(formData)).rejects.toThrow("redirect:/en/forbidden");
    await expect(updateNewsEvent(formData)).rejects.toThrow("redirect:/en/forbidden");
    await expect(togglePublishNewsEvent(formData)).rejects.toThrow("redirect:/en/forbidden");
  });
});

describe("NewsEventsPage permission gate", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockRedirect.mockReset();
    mockRedirect.mockImplementation((url: string) => {
      throw new Error(`redirect:${url}`);
    });
    mockUserFindUnique.mockResolvedValue({ deactivatedAt: null });
    mockFindMany.mockResolvedValue([
      {
        id: "ne_1",
        type: "EVENT",
        titleEn: "Tech Fest 2026",
        titleMl: null,
        bodyEn: "Annual event",
        bodyMl: null,
        coverImageUrl: null,
        eventDate: new Date("2026-09-20"),
        publishedAt: new Date("2026-09-01"),
        createdAt: new Date("2026-09-01"),
      },
    ]);
  });

  test("is denied to a student-role user", async () => {
    mockAuth.mockResolvedValue({
      userId: "student_1",
      sessionClaims: { metadata: { role: "STUDENT" } },
    });

    const { default: NewsEventsPage } = await import("./page");

    await expect(
      NewsEventsPage({ params: Promise.resolve({ locale: "en" }) }),
    ).rejects.toThrow("redirect:/en/forbidden");
  });

  test("renders read-only view for CENTRE_STAFF with create/edit/delete/publish buttons hidden", async () => {
    mockAuth.mockResolvedValue({
      userId: "staff_1",
      sessionClaims: { metadata: { role: "CENTRE_STAFF" } },
    });

    const { default: NewsEventsPage } = await import("./page");
    const pageEl = await NewsEventsPage({ params: Promise.resolve({ locale: "en" }) });
    const html = renderToString(pageEl);

    expect(html).toContain("News &amp; Events");
    expect(html).toContain("Read-only");
    expect(html).toContain("Tech Fest 2026");
    // Mutation controls must NOT be present
    expect(html).not.toContain("Create new item");
    expect(html).not.toContain("Unpublish");
    expect(html).not.toContain("Delete");
    expect(html).not.toContain("Save Changes");
  });

  test("renders full management controls for SUPER_ADMIN", async () => {
    mockAuth.mockResolvedValue({
      userId: "admin_1",
      sessionClaims: { metadata: { role: "SUPER_ADMIN" } },
    });

    const { default: NewsEventsPage } = await import("./page");
    const pageEl = await NewsEventsPage({ params: Promise.resolve({ locale: "en" }) });
    const html = renderToString(pageEl);

    expect(html).toContain("News &amp; Events");
    expect(html).not.toContain("Read-only");
    // Mutation controls must be present
    expect(html).toContain("Create new item");
    expect(html).toContain("Unpublish");
    expect(html).toContain("Delete");
    expect(html).toContain("Save Changes");
  });
});
