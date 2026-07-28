import { describe, test, expect, vi, beforeEach } from "vitest";

const mockCourseUpdate = vi.fn();
const mockCourseFindUnique = vi.fn();
const mockLogAdminAction = vi.fn();

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

vi.mock("@/lib/db", () => ({
  prisma: {
    course: {
      update: mockCourseUpdate,
      findUnique: mockCourseFindUnique,
    },
  },
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

vi.mock("@/lib/audit", () => ({
  logAdminAction: mockLogAdminAction,
}));

vi.mock("@/lib/auth", () => ({
  requireRole: vi.fn(() =>
    Promise.resolve({
      authorized: true,
      userId: "test-user-id",
      role: "SUPER_ADMIN",
    }),
  ),
  Role: { CENTRE_STAFF: "CENTRE_STAFF", SUPER_ADMIN: "SUPER_ADMIN" },
}));

const { saveCourseContent, getCourseContent } = await import(
  "@/app/[locale]/(admin)/admin/courses/[courseId]/content/actions"
);

function makeFormData(overrides: Record<string, string> = {}, omit: string[] = []) {
  const fd = new FormData();
  const defaults: Record<string, string> = {
    locale: "en",
    courseId: "course-123",
    contentBlocks: JSON.stringify({
      heroTaglineEn: "Test tagline",
      courseLists: [],
    }),
  };
  for (const [key, val] of Object.entries(defaults)) {
    if (!omit.includes(key)) fd.append(key, val);
  }
  for (const [key, val] of Object.entries(overrides)) {
    fd.set(key, val);
  }
  return fd;
}

describe("saveCourseContent", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockCourseUpdate.mockResolvedValue({ id: "course-123" });
    mockCourseFindUnique.mockResolvedValue({
      slug: "test-course",
      titleEn: "Test Course",
    });
    mockLogAdminAction.mockResolvedValue(undefined);
  });

  test("saves valid content", async () => {
    await saveCourseContent(makeFormData());
    expect(mockCourseUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: "course-123" },
        data: expect.objectContaining({
          contentBlocks: expect.any(Object),
        }),
      }),
    );
    expect(mockLogAdminAction).toHaveBeenCalled();
  });

  test("rejects invalid JSON content", async () => {
    await expect(
      saveCourseContent(makeFormData({ contentBlocks: "not-json" })),
    ).rejects.toThrow("Invalid JSON");
    expect(mockCourseUpdate).not.toHaveBeenCalled();
  });

  test("rejects missing content data", async () => {
    await expect(
      saveCourseContent(makeFormData({}, ["contentBlocks"])),
    ).rejects.toThrow("Missing content data");
  });

  test("rejects missing courseId", async () => {
    await expect(
      saveCourseContent(makeFormData({}, ["courseId"])),
    ).rejects.toThrow("Missing courseId");
  });

  test("rejects content with empty course list heading", async () => {
    await expect(
      saveCourseContent(
        makeFormData({
          contentBlocks: JSON.stringify({
            courseLists: [
              {
                type: "course_list",
                heading: "",
                items: [{ code: "ABC", name: "Test" }],
              },
            ],
          }),
        }),
      ),
    ).rejects.toThrow();
    expect(mockCourseUpdate).not.toHaveBeenCalled();
  });
});

describe("getCourseContent", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("returns null when no content", async () => {
    mockCourseFindUnique.mockResolvedValue(null);
    const result = await getCourseContent("no-content");
    expect(result).toBeNull();
  });

  test("returns parsed content when valid", async () => {
    const validData = {
      heroTaglineEn: "Test",
      courseLists: [],
    };
    mockCourseFindUnique.mockResolvedValue({
      contentBlocks: validData,
    });
    const result = await getCourseContent("valid-course");
    expect(result).toEqual(expect.objectContaining({ heroTaglineEn: "Test" }));
  });

  test("returns null for malformed JSON", async () => {
    mockCourseFindUnique.mockResolvedValue({
      contentBlocks: { courseLists: "not-an-array" },
    });
    const result = await getCourseContent("malformed");
    expect(result).toBeNull();
  });
});
