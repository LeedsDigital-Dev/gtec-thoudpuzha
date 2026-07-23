import { describe, expect, test, vi, beforeEach } from "vitest";

// ─── Hoisted mocks ──────────────────────────────────────────────────────────

const mockAuth = vi.hoisted(() => vi.fn());
const mockFindUniqueSkill = vi.hoisted(() => vi.fn());
const mockUpdateSkill = vi.hoisted(() => vi.fn());
const mockDeleteSkill = vi.hoisted(() => vi.fn());
const mockFindManyCandidateProfile = vi.hoisted(() => vi.fn());
const mockUpdateCandidateProfile = vi.hoisted(() => vi.fn());
const mockCountCandidateProfile = vi.hoisted(() => vi.fn());
const mockFindManyJobPosting = vi.hoisted(() => vi.fn());
const mockUpdateJobPosting = vi.hoisted(() => vi.fn());
const mockCountJobPosting = vi.hoisted(() => vi.fn());
const mockUserFindUnique = vi.hoisted(() => vi.fn());
const mockAuditCreate = vi.hoisted(() => vi.fn());
const mockRevalidatePath = vi.hoisted(() => vi.fn());
const mockRedirect = vi.hoisted(() =>
  vi.fn((url: string) => {
    throw new Error(`redirect:${url}`);
  }),
);

vi.mock("@clerk/nextjs/server", () => ({ auth: mockAuth }));

vi.mock("@/lib/db", () => ({
  prisma: {
    skill: {
      findUnique: mockFindUniqueSkill,
      update: mockUpdateSkill,
      delete: mockDeleteSkill,
    },
    candidateProfile: {
      findMany: mockFindManyCandidateProfile,
      update: mockUpdateCandidateProfile,
      count: mockCountCandidateProfile,
    },
    jobPosting: {
      findMany: mockFindManyJobPosting,
      update: mockUpdateJobPosting,
      count: mockCountJobPosting,
    },
    user: {
      findUnique: mockUserFindUnique,
    },
    auditLogEntry: { create: mockAuditCreate },
  },
}));

vi.mock("next/navigation", () => ({ redirect: mockRedirect }));

vi.mock("next/cache", () => ({ revalidatePath: mockRevalidatePath }));

vi.mock("@/lib/audit", () => ({ logAdminAction: mockAuditCreate }));

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("approveSkill", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockAuth.mockResolvedValue({
      userId: "staff_1",
      sessionClaims: { metadata: { role: "CENTRE_STAFF" } },
    });
    mockUpdateSkill.mockResolvedValue({
      id: "skill_1",
      label: "JavaScript",
      status: "APPROVED",
    });
    mockUserFindUnique.mockResolvedValue({ deactivatedAt: null });
  });

  test("1. Approving a PENDING skill sets status to APPROVED", async () => {
    const { approveSkill } = await import("./actions");

    const formData = new FormData();
    formData.set("id", "skill_1");
    formData.set("locale", "en");

    await approveSkill(formData);

    expect(mockUpdateSkill).toHaveBeenCalledWith({
      where: { id: "skill_1" },
      data: { status: "APPROVED" },
    });
  });

  test("approveSkill denies job_seeker", async () => {
    mockAuth.mockResolvedValue({
      userId: "js_1",
      sessionClaims: { metadata: { role: "JOB_SEEKER" } },
    });

    const { approveSkill } = await import("./actions");
    const formData = new FormData();
    formData.set("id", "skill_1");
    formData.set("locale", "en");

    await expect(approveSkill(formData)).rejects.toThrow("redirect:/en/forbidden");
    expect(mockUpdateSkill).not.toHaveBeenCalled();
  });
});

describe("mergeSkill", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockAuth.mockResolvedValue({
      userId: "staff_1",
      sessionClaims: { metadata: { role: "CENTRE_STAFF" } },
    });
    mockFindUniqueSkill.mockImplementation(
      (args: { where: { id: string } }) => {
        if (args.where.id === "skill_a")
          return Promise.resolve({ id: "skill_a", label: "JS" });
        if (args.where.id === "skill_b")
          return Promise.resolve({ id: "skill_b", label: "JavaScript" });
        return Promise.resolve(null);
      },
    );
    mockUserFindUnique.mockResolvedValue({ deactivatedAt: null });
  });

  test("2. Merging skill A into skill B re-points all CandidateProfile references", async () => {
    mockFindManyCandidateProfile.mockResolvedValue([
      { id: "cp_1", skillIds: ["skill_a", "skill_c"] },
      { id: "cp_2", skillIds: ["skill_a"] },
    ]);
    mockFindManyJobPosting.mockResolvedValue([]);
    mockUpdateCandidateProfile.mockResolvedValue({});

    const { mergeSkill } = await import("./actions");
    const formData = new FormData();
    formData.set("sourceId", "skill_a");
    formData.set("targetId", "skill_b");
    formData.set("locale", "en");

    await mergeSkill(formData);

    // First profile: skill_a replaced with skill_b, skill_c preserved
    expect(mockUpdateCandidateProfile).toHaveBeenCalledWith({
      where: { id: "cp_1" },
      data: { skillIds: { set: ["skill_c", "skill_b"] } },
    });
    // Second profile: skill_a replaced with skill_b
    expect(mockUpdateCandidateProfile).toHaveBeenCalledWith({
      where: { id: "cp_2" },
      data: { skillIds: { set: ["skill_b"] } },
    });
    // Source skill deleted
    expect(mockDeleteSkill).toHaveBeenCalledWith({ where: { id: "skill_a" } });
  });

  test("3. Merging skill A into skill B re-points all JobPosting references too", async () => {
    mockFindManyCandidateProfile.mockResolvedValue([]);
    mockFindManyJobPosting.mockResolvedValue([
      { id: "jp_1", skillIds: ["skill_a", "skill_x"] },
    ]);
    mockUpdateJobPosting.mockResolvedValue({});

    const { mergeSkill } = await import("./actions");
    const formData = new FormData();
    formData.set("sourceId", "skill_a");
    formData.set("targetId", "skill_b");
    formData.set("locale", "en");

    await mergeSkill(formData);

    expect(mockUpdateJobPosting).toHaveBeenCalledWith({
      where: { id: "jp_1" },
      data: { skillIds: { set: ["skill_x", "skill_b"] } },
    });
    expect(mockDeleteSkill).toHaveBeenCalledWith({ where: { id: "skill_a" } });
  });

  test("mergeSkill denies job_seeker", async () => {
    mockAuth.mockResolvedValue({
      userId: "js_1",
      sessionClaims: { metadata: { role: "JOB_SEEKER" } },
    });

    const { mergeSkill } = await import("./actions");
    const formData = new FormData();
    formData.set("sourceId", "skill_a");
    formData.set("targetId", "skill_b");
    formData.set("locale", "en");

    await expect(mergeSkill(formData)).rejects.toThrow("redirect:/en/forbidden");
    expect(mockDeleteSkill).not.toHaveBeenCalled();
  });
});

describe("deleteSkill", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockAuth.mockResolvedValue({
      userId: "staff_1",
      sessionClaims: { metadata: { role: "CENTRE_STAFF" } },
    });
    mockFindUniqueSkill.mockResolvedValue({
      id: "skill_1",
      label: "OldSkill",
    });
    mockUserFindUnique.mockResolvedValue({ deactivatedAt: null });
  });

  test("4. Deleting a skill with active references is blocked, suggesting merge instead", async () => {
    mockCountCandidateProfile.mockResolvedValue(2);
    mockCountJobPosting.mockResolvedValue(0);

    const { deleteSkill } = await import("./actions");
    const formData = new FormData();
    formData.set("id", "skill_1");
    formData.set("locale", "en");

    await expect(deleteSkill(formData)).rejects.toThrow(
      "redirect:/en/admin/skills-taxonomy",
    );
    expect(mockDeleteSkill).not.toHaveBeenCalled();
  });

  test("deleteSkill succeeds when no references exist", async () => {
    mockCountCandidateProfile.mockResolvedValue(0);
    mockCountJobPosting.mockResolvedValue(0);
    mockDeleteSkill.mockResolvedValue({ id: "skill_1" });

    const { deleteSkill } = await import("./actions");
    const formData = new FormData();
    formData.set("id", "skill_1");
    formData.set("locale", "en");

    await deleteSkill(formData);

    expect(mockDeleteSkill).toHaveBeenCalledWith({ where: { id: "skill_1" } });
  });

  test("deleteSkill denies job_seeker", async () => {
    mockAuth.mockResolvedValue({
      userId: "js_1",
      sessionClaims: { metadata: { role: "JOB_SEEKER" } },
    });

    const { deleteSkill } = await import("./actions");
    const formData = new FormData();
    formData.set("id", "skill_1");
    formData.set("locale", "en");

    await expect(deleteSkill(formData)).rejects.toThrow("redirect:/en/forbidden");
    expect(mockDeleteSkill).not.toHaveBeenCalled();
  });
});

describe("skills-taxonomy page", () => {
  test("5. /admin/skills-taxonomy is denied to a job_seeker-role user", async () => {
    mockAuth.mockResolvedValue({
      userId: "js_1",
      sessionClaims: { metadata: { role: "JOB_SEEKER" } },
    });

    const { default: SkillsTaxonomyPage } = await import("./page");

    await expect(
      SkillsTaxonomyPage({
        params: Promise.resolve({ locale: "en" }),
        searchParams: Promise.resolve({}),
      }),
    ).rejects.toThrow("redirect:/en/forbidden");
  });
});
