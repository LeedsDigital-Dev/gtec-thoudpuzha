// @vitest-environment node

import { describe, expect, test, vi, beforeEach } from "vitest";
import { renderToString } from "react-dom/server";

const mockAuth = vi.hoisted(() => vi.fn());
const mockItemCreate = vi.hoisted(() => vi.fn());
const mockItemUpdate = vi.hoisted(() => vi.fn());
const mockItemAggregate = vi.hoisted(() => vi.fn());
const mockItemDelete = vi.hoisted(() => vi.fn());
const mockItemFindMany = vi.hoisted(() => vi.fn());
const mockCatAggregate = vi.hoisted(() => vi.fn());
const mockCatUpdate = vi.hoisted(() => vi.fn());
const mockCatFindMany = vi.hoisted(() => vi.fn());
const mockAuditCreate = vi.hoisted(() => vi.fn());
const mockUploadFile = vi.hoisted(() => vi.fn());
const mockRedirect = vi.hoisted(() =>
  vi.fn((url: string) => {
    throw new Error(`redirect:${url}`);
  }),
);
const mockRevalidatePath = vi.hoisted(() => vi.fn());

vi.mock("@clerk/nextjs/server", () => ({
  auth: mockAuth,
}));

const mockUserFindUnique = vi.hoisted(() => vi.fn());

vi.mock("@/lib/db", () => ({
  prisma: {
    galleryItem: {
      create: mockItemCreate,
      update: mockItemUpdate,
      aggregate: mockItemAggregate,
      delete: mockItemDelete,
      findMany: mockItemFindMany,
    },
    galleryCategory: {
      aggregate: mockCatAggregate,
      update: mockCatUpdate,
      findMany: mockCatFindMany,
    },
    user: {
      findUnique: mockUserFindUnique,
    },
    auditLogEntry: {
      create: mockAuditCreate,
    },
  },
}));

vi.mock("@/lib/audit", () => ({
  logAdminAction: mockAuditCreate,
}));

vi.mock("@/lib/storage", () => ({
  uploadFile: mockUploadFile,
}));

vi.mock("next/navigation", () => ({
  redirect: mockRedirect,
}));

vi.mock("next/cache", () => ({
  revalidatePath: mockRevalidatePath,
}));

/* ─── Helpers ─── */

function setMockAuth(userId: string, role: string) {
  mockAuth.mockResolvedValue({
    userId,
    sessionClaims: { metadata: { role } },
  });
}

function fakeFile(name: string, type: string): File {
  return new File([Buffer.from("fake-image-data")], name, { type });
}

/* ─── Tests ─── */

describe("uploadGalleryImages", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockItemCreate.mockReset();
    mockItemUpdate.mockReset();
    mockCatUpdate.mockReset();
    mockItemAggregate.mockReset();
    mockCatAggregate.mockReset();
    mockAuditCreate.mockReset();
    mockUploadFile.mockReset();
    mockRevalidatePath.mockReset();
    mockUserFindUnique.mockResolvedValue({ deactivatedAt: null });
  });

  test("1. bulk-uploading 3 images as Super Admin creates 3 GalleryItem rows", async () => {
    setMockAuth("admin_1", "SUPER_ADMIN");

    mockCatAggregate.mockResolvedValue({ _max: { sortOrder: 0 } });
    mockItemAggregate.mockResolvedValue({ _max: { sortOrder: -1 } });

    let callCount = 0;
    mockItemCreate.mockImplementation(
      ({ data }: { data: Record<string, unknown> }) => {
        callCount++;
        return Promise.resolve({
          id: `gi_${callCount}`,
          categoryId: data.categoryId,
          mediaType: data.mediaType,
          url: data.url,
          captionEn: data.captionEn ?? null,
          captionMl: data.captionMl ?? null,
          sortOrder: data.sortOrder,
          createdAt: new Date(),
        });
      },
    );

    mockUploadFile.mockResolvedValue("gallery/12345-img1.png");

    const formData = new FormData();
    formData.append("locale", "en");
    formData.append("categoryId", "cat_1");
    formData.append("files", fakeFile("img1.png", "image/png"));
    formData.append("files", fakeFile("img2.png", "image/png"));
    formData.append("files", fakeFile("img3.png", "image/png"));

    const { uploadGalleryImages } = await import("./actions");
    await uploadGalleryImages(formData);

    expect(mockItemCreate).toHaveBeenCalledTimes(3);
    expect(callCount).toBe(3);

    expect(mockItemCreate).toHaveBeenCalledWith({
      data: expect.objectContaining({
        categoryId: "cat_1",
        mediaType: "IMAGE",
      }),
    });
  });

  test("2. bulk upload writes exactly one audit log entry summarizing the batch", async () => {
    setMockAuth("admin_1", "SUPER_ADMIN");

    mockCatAggregate.mockResolvedValue({ _max: { sortOrder: 0 } });
    mockItemAggregate.mockResolvedValue({ _max: { sortOrder: -1 } });

    mockUploadFile.mockResolvedValue("gallery/12345-img.png");

    let callCount = 0;
    mockItemCreate.mockImplementation(
      ({ data }: { data: Record<string, unknown> }) => {
        callCount++;
        return Promise.resolve({
          id: `gi_${callCount}`,
          categoryId: data.categoryId,
          mediaType: data.mediaType,
          url: data.url,
          captionEn: null,
          captionMl: null,
          sortOrder: data.sortOrder,
          createdAt: new Date(),
        });
      },
    );

    const formData = new FormData();
    formData.append("locale", "en");
    formData.append("categoryId", "cat_1");
    formData.append("files", fakeFile("a.png", "image/png"));
    formData.append("files", fakeFile("b.png", "image/png"));

    const { uploadGalleryImages } = await import("./actions");
    await uploadGalleryImages(formData);

    expect(mockAuditCreate).toHaveBeenCalledTimes(1);
    expect(mockAuditCreate).toHaveBeenCalledWith({
      actorUserId: "admin_1",
      actorRole: "SUPER_ADMIN",
      action: "gallery.bulkUpload",
      entityType: "GalleryItem",
      entityId: "cat_1",
      metadata: expect.objectContaining({
        categoryId: "cat_1",
        count: 2,
        itemIds: ["gi_1", "gi_2"],
      }),
    });
  });

  test("3. non-Super-Admin (CENTRE_STAFF) is denied when uploading gallery images", async () => {
    setMockAuth("staff_1", "CENTRE_STAFF");

    const formData = new FormData();
    formData.append("locale", "en");
    formData.append("categoryId", "cat_1");
    formData.append("files", fakeFile("a.png", "image/png"));

    const { uploadGalleryImages } = await import("./actions");
    await expect(uploadGalleryImages(formData)).rejects.toThrow("redirect:/en/forbidden");
  });
});

describe("addVideoItem", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockItemCreate.mockReset();
    mockItemAggregate.mockReset();
    mockAuditCreate.mockReset();
    mockUploadFile.mockReset();
    mockRevalidatePath.mockReset();
    mockUserFindUnique.mockResolvedValue({ deactivatedAt: null });
  });

  test("4. Super Admin adding a VIDEO-type item stores the external URL", async () => {
    setMockAuth("admin_1", "SUPER_ADMIN");

    mockItemAggregate.mockResolvedValue({ _max: { sortOrder: -1 } });

    mockItemCreate.mockImplementation(
      ({ data }: { data: Record<string, unknown> }) =>
        Promise.resolve({
          id: "gi_video_1",
          categoryId: data.categoryId,
          mediaType: data.mediaType,
          url: data.url,
          captionEn: data.captionEn ?? null,
          captionMl: data.captionMl ?? null,
          sortOrder: data.sortOrder,
          createdAt: new Date(),
        }),
    );

    const formData = new FormData();
    formData.append("locale", "en");
    formData.append("categoryId", "cat_1");
    formData.append("url", "https://www.youtube.com/watch?v=dQw4w9WgXcQ");
    formData.append("captionEn", "A cool video");

    const { addVideoItem } = await import("./actions");
    await addVideoItem(formData);

    expect(mockItemCreate).toHaveBeenCalledWith({
      data: expect.objectContaining({
        categoryId: "cat_1",
        mediaType: "VIDEO",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        captionEn: "A cool video",
      }),
    });

    expect(mockUploadFile).not.toHaveBeenCalled();
    expect(mockAuditCreate).toHaveBeenCalledTimes(1);
    expect(mockAuditCreate).toHaveBeenCalledWith({
      actorUserId: "admin_1",
      actorRole: "SUPER_ADMIN",
      action: "gallery.addVideo",
      entityType: "GalleryItem",
      entityId: "gi_video_1",
      metadata: expect.objectContaining({
        categoryId: "cat_1",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      }),
    });
  });

  test("5. non-Super-Admin (CENTRE_STAFF) is denied when adding video", async () => {
    setMockAuth("staff_1", "CENTRE_STAFF");

    const formData = new FormData();
    formData.append("locale", "en");
    formData.append("categoryId", "cat_1");
    formData.append("url", "https://www.youtube.com/watch?v=dQw4w9WgXcQ");

    const { addVideoItem } = await import("./actions");
    await expect(addVideoItem(formData)).rejects.toThrow("redirect:/en/forbidden");
  });
});

describe("updateCategory and updateGalleryItem actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockCatUpdate.mockReset();
    mockItemUpdate.mockReset();
    mockAuditCreate.mockReset();
    mockRevalidatePath.mockReset();
    mockUserFindUnique.mockResolvedValue({ deactivatedAt: null });
  });

  test("6. Super Admin can update category details", async () => {
    setMockAuth("admin_1", "SUPER_ADMIN");
    mockCatUpdate.mockResolvedValue({ id: "cat_1", nameEn: "Updated", nameMl: "പുതിയത്" });

    const formData = new FormData();
    formData.append("locale", "en");
    formData.append("id", "cat_1");
    formData.append("nameEn", "Updated");
    formData.append("nameMl", "പുതിയത്");

    const { updateCategory } = await import("./actions");
    await updateCategory(formData);

    expect(mockCatUpdate).toHaveBeenCalledWith({
      where: { id: "cat_1" },
      data: { nameEn: "Updated", nameMl: "പുതിയത്" },
    });
    expect(mockAuditCreate).toHaveBeenCalledWith({
      actorUserId: "admin_1",
      actorRole: "SUPER_ADMIN",
      action: "galleryCategory.update",
      entityType: "GalleryCategory",
      entityId: "cat_1",
      metadata: { nameEn: "Updated", nameMl: "പുതിയത്" },
    });
  });

  test("7. non-Super-Admin (CENTRE_STAFF) cannot update category", async () => {
    setMockAuth("staff_1", "CENTRE_STAFF");

    const formData = new FormData();
    formData.append("locale", "en");
    formData.append("id", "cat_1");
    formData.append("nameEn", "Updated");

    const { updateCategory } = await import("./actions");
    await expect(updateCategory(formData)).rejects.toThrow("redirect:/en/forbidden");
  });

  test("8. Super Admin can update gallery item captions, altText SEO keywords, and sort order", async () => {
    setMockAuth("admin_1", "SUPER_ADMIN");
    mockItemUpdate.mockResolvedValue({
      id: "item_1",
      altText: "G-TEC Thodupuzha Computer Lab",
      captionEn: "New Caption",
      sortOrder: 5,
    });

    const formData = new FormData();
    formData.append("locale", "en");
    formData.append("id", "item_1");
    formData.append("altText", "G-TEC Thodupuzha Computer Lab");
    formData.append("captionEn", "New Caption");
    formData.append("sortOrder", "5");

    const { updateGalleryItem } = await import("./actions");
    await updateGalleryItem(formData);

    expect(mockItemUpdate).toHaveBeenCalledWith({
      where: { id: "item_1" },
      data: expect.objectContaining({
        altText: "G-TEC Thodupuzha Computer Lab",
        captionEn: "New Caption",
        sortOrder: 5,
      }),
    });
    expect(mockAuditCreate).toHaveBeenCalledWith({
      actorUserId: "admin_1",
      actorRole: "SUPER_ADMIN",
      action: "galleryItem.update",
      entityType: "GalleryItem",
      entityId: "item_1",
      metadata: expect.objectContaining({
        altText: "G-TEC Thodupuzha Computer Lab",
        captionEn: "New Caption",
        sortOrder: 5,
      }),
    });
  });

  test("9. non-Super-Admin (CENTRE_STAFF) cannot update gallery item", async () => {
    setMockAuth("staff_1", "CENTRE_STAFF");

    const formData = new FormData();
    formData.append("locale", "en");
    formData.append("id", "item_1");
    formData.append("captionEn", "Hacked");

    const { updateGalleryItem } = await import("./actions");
    await expect(updateGalleryItem(formData)).rejects.toThrow("redirect:/en/forbidden");
  });

  test("10. Super Admin can replace an image file during update", async () => {
    setMockAuth("admin_1", "SUPER_ADMIN");
    mockUploadFile.mockResolvedValue("gallery/replaced-new.png");
    mockItemUpdate.mockResolvedValue({ id: "item_1", url: "gallery/replaced-new.png" });

    const formData = new FormData();
    formData.append("locale", "en");
    formData.append("id", "item_1");
    formData.append("file", fakeFile("new-image.png", "image/png"));
    formData.append("altText", "SEO Lab Image");
    formData.append("captionEn", "Replaced Caption");

    const { updateGalleryItem } = await import("./actions");
    await updateGalleryItem(formData);

    expect(mockUploadFile).toHaveBeenCalled();
    expect(mockItemUpdate).toHaveBeenCalledWith({
      where: { id: "item_1" },
      data: expect.objectContaining({
        url: "gallery/replaced-new.png",
        altText: "SEO Lab Image",
        captionEn: "Replaced Caption",
      }),
    });
  });

  test("11. Super Admin can delete a gallery item", async () => {
    setMockAuth("admin_1", "SUPER_ADMIN");
    mockItemDelete.mockResolvedValue({ id: "item_1" });

    const formData = new FormData();
    formData.append("locale", "en");
    formData.append("id", "item_1");

    const { deleteGalleryItem } = await import("./actions");
    await deleteGalleryItem(formData);

    expect(mockItemDelete).toHaveBeenCalledWith({ where: { id: "item_1" } });
    expect(mockAuditCreate).toHaveBeenCalledWith({
      actorUserId: "admin_1",
      actorRole: "SUPER_ADMIN",
      action: "galleryItem.delete",
      entityType: "GalleryItem",
      entityId: "item_1",
    });
  });
});

describe("GalleryPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockRedirect.mockReset();
    mockRedirect.mockImplementation((url: string) => {
      throw new Error(`redirect:${url}`);
    });
    mockUserFindUnique.mockResolvedValue({ deactivatedAt: null });
    mockCatFindMany.mockResolvedValue([
      {
        id: "cat_1",
        nameEn: "Campus",
        nameMl: null,
        slug: "campus",
        sortOrder: 1,
        _count: { items: 1 },
      },
    ]);
    mockItemFindMany.mockResolvedValue([
      {
        id: "item_1",
        categoryId: "cat_1",
        mediaType: "IMAGE",
        url: "gallery/test.jpg",
        altText: "Campus Main Building Exterior",
        captionEn: "Campus main",
        captionMl: null,
        sortOrder: 1,
        category: { id: "cat_1", nameEn: "Campus" },
      },
    ]);
  });

  test("12. /admin/gallery is denied to an employer-role user (403)", async () => {
    mockAuth.mockResolvedValue({
      userId: "employer_1",
      sessionClaims: { metadata: { role: "EMPLOYER" } },
    });

    const { default: GalleryPage } = await import("./page");

    await expect(
      GalleryPage({ params: Promise.resolve({ locale: "en" }) }),
    ).rejects.toThrow("redirect:/en/forbidden");
  });

  test("13. renders view-only gallery for CENTRE_STAFF with create/edit/delete buttons hidden", async () => {
    mockAuth.mockResolvedValue({
      userId: "staff_1",
      sessionClaims: { metadata: { role: "CENTRE_STAFF" } },
    });

    const { default: GalleryPage } = await import("./page");
    const pageEl = await GalleryPage({ params: Promise.resolve({ locale: "en" }) });
    const html = renderToString(pageEl);

    expect(html).toContain("Gallery");
    expect(html).toContain("Read-only");
    expect(html).toContain("Campus");
    expect(html).toContain("Campus Main Building Exterior");
    // Mutation controls must NOT be present
    expect(html).not.toContain("Add Category");
    expect(html).not.toContain("Upload Images");
    expect(html).not.toContain("Add Video URL");
    expect(html).not.toContain("Delete Item");
    expect(html).not.toContain("Edit");
  });

  test("14. renders full management & edit controls for SUPER_ADMIN with Alt / SEO column", async () => {
    mockAuth.mockResolvedValue({
      userId: "admin_1",
      sessionClaims: { metadata: { role: "SUPER_ADMIN" } },
    });

    const { default: GalleryPage } = await import("./page");
    const pageEl = await GalleryPage({ params: Promise.resolve({ locale: "en" }) });
    const html = renderToString(pageEl);

    expect(html).toContain("Gallery");
    expect(html).not.toContain("Read-only");
    expect(html).toContain("Alt / SEO Keywords");
    expect(html).toContain("Campus Main Building Exterior");
    // Mutation and edit controls must be present
    expect(html).toContain("Add Category");
    expect(html).toContain("Upload Images");
    expect(html).toContain("Add Video URL");
    expect(html).toContain("Delete");
    expect(html).toContain("Edit");
  });
});
