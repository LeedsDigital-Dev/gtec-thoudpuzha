import { describe, expect, test, vi, beforeEach } from "vitest";
import { renderToString } from "react-dom/server";

const mockAuth = vi.hoisted(() => vi.fn());
const mockFindUnique = vi.hoisted(() => vi.fn());
const mockFindMany = vi.hoisted(() => vi.fn());

vi.mock("@clerk/nextjs/server", () => ({ auth: mockAuth }));

vi.mock("@/lib/db", () => ({
  prisma: {
    candidateProfile: { findUnique: mockFindUnique },
    application: { findMany: mockFindMany },
  },
}));

function makeApplication(overrides: Record<string, unknown> = {}) {
  return {
    id: "app_1",
    candidateProfileId: "cp_1",
    jobPostingId: "jp_1",
    status: "APPLIED",
    appliedAt: new Date("2026-07-22"),
    createdAt: new Date("2026-07-22"),
    updatedAt: new Date("2026-07-22"),
    statusUpdatedAt: new Date("2026-07-22"),
    jobPosting: {
      id: "jp_1",
      title: "Software Engineer",
      status: "APPROVED",
      applicationDeadline: new Date("2026-12-31"),
      employer: { companyName: "Tech Corp" },
    },
    ...overrides,
  };
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe("Student Applications Page — isolation", () => {
  test("2. candidate sees only their own applications", async () => {
    mockAuth.mockResolvedValue({
      userId: "user_candidate_1",
      sessionClaims: { metadata: { role: "STUDENT" } },
    });
    mockFindUnique.mockResolvedValue({
      id: "cp_1",
      userId: "user_candidate_1",
    });
    mockFindMany.mockResolvedValue([
      makeApplication({ id: "app_1", status: "APPLIED" }),
      makeApplication({
        id: "app_2",
        jobPostingId: "jp_2",
        status: "SHORTLISTED",
        jobPosting: {
          id: "jp_2",
          title: "DevOps Engineer",
          status: "APPROVED",
          applicationDeadline: new Date("2026-12-31"),
          employer: { companyName: "Startup Inc" },
        },
      }),
    ]);

    const mod = await import("./page");
    const html = renderToString(await mod.default());

    expect(html).toContain("Software Engineer");
    expect(html).toContain("DevOps Engineer");
    expect(html).toContain("Tech Corp");
    expect(html).toContain("Startup Inc");
    expect(html).toContain("APPLIED");
    expect(html).toContain("SHORTLISTED");

    // Verify it only queried for this candidate's profile
    expect(mockFindMany).toHaveBeenCalledWith({
      where: { candidateProfileId: "cp_1" },
      orderBy: { appliedAt: "desc" },
      include: expect.any(Object),
    });
  });

  test("2. candidate does NOT see another candidate's applications", async () => {
    mockAuth.mockResolvedValue({
      userId: "user_candidate_2",
      sessionClaims: { metadata: { role: "JOB_SEEKER" } },
    });
    mockFindUnique.mockResolvedValue({
      id: "cp_2",
      userId: "user_candidate_2",
    });
    // Only return apps for cp_2
    mockFindMany.mockImplementation(
      async ({ where }: { where: { candidateProfileId: string } }) => {
        if (where.candidateProfileId === "cp_2") return [];
        return [makeApplication()];
      },
    );

    const mod = await import("./page");
    const html = renderToString(await mod.default());

    expect(html).toContain("haven&#x27;t applied to any jobs yet");
    // cp_1's application should not be visible to cp_2
    expect(html).not.toContain("Software Engineer");
  });

  test("shows empty state when candidate has no applications", async () => {
    mockAuth.mockResolvedValue({
      userId: "user_no_apps",
      sessionClaims: { metadata: { role: "JOB_SEEKER" } },
    });
    mockFindUnique.mockResolvedValue({
      id: "cp_no_apps",
      userId: "user_no_apps",
    });
    mockFindMany.mockResolvedValue([]);

    const mod = await import("./page");
    const html = renderToString(await mod.default());

    expect(html).toContain("haven&#x27;t applied to any jobs yet");
    expect(html).toContain("Browse Jobs");
  });
});
