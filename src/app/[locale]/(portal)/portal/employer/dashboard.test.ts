import { renderToString } from "react-dom/server";
import { describe, expect, test, vi, beforeEach } from "vitest";

// ─── Hoisted mocks ──────────────────────────────────────────────────────────

const mockAuth = vi.hoisted(() => vi.fn());
const mockFindUniqueProfile = vi.hoisted(() => vi.fn());
const mockFindManyPostings = vi.hoisted(() => vi.fn());
const mockRedirect = vi.hoisted(() =>
  vi.fn((url: string) => {
    throw new Error(`redirect:${url}`);
  }),
);

vi.mock("@clerk/nextjs/server", () => ({
  auth: mockAuth,
}));

vi.mock("@/lib/db", () => ({
  prisma: {
    employerProfile: {
      findUnique: mockFindUniqueProfile,
    },
    jobPosting: {
      findMany: mockFindManyPostings,
    },
  },
}));

vi.mock("next/navigation", () => ({
  redirect: mockRedirect,
}));

// ─── Tests ──────────────────────────────────────────────────────────────────

describe("Employer Dashboard — own postings only", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockAuth.mockReset();
    mockFindUniqueProfile.mockReset();
    mockFindManyPostings.mockReset();
    mockRedirect.mockReset();
    mockRedirect.mockImplementation((url: string) => {
      throw new Error(`redirect:${url}`);
    });
  });

  test("5. Dashboard lists only this employer's own postings", async () => {
    mockAuth.mockResolvedValue({
      userId: "user_emp_1",
      sessionClaims: { metadata: { role: "EMPLOYER" } },
    });
    mockFindUniqueProfile.mockResolvedValue({
      id: "ep_1",
      userId: "user_emp_1",
      companyName: "Acme Corp",
      status: "APPROVED",
    });
    mockFindManyPostings.mockResolvedValue([
      {
        id: "jp_1",
        title: "Software Engineer",
        jobType: "FULL_TIME",
        status: "APPROVED",
        applicationDeadline: new Date("2026-12-31"),
        createdAt: new Date("2026-07-20"),
      },
      {
        id: "jp_2",
        title: "DevOps Engineer",
        jobType: "FULL_TIME",
        status: "PENDING",
        applicationDeadline: new Date("2026-11-30"),
        createdAt: new Date("2026-07-21"),
      },
    ]);

    const mod = await import("./page");
    const element = await mod.default();
    const html = renderToString(element);

    expect(html).toContain("Software Engineer");
    expect(html).toContain("DevOps Engineer");
    expect(html).toContain("Acme Corp");
    expect(html).toContain("Approved");
    expect(html).toContain("Pending Review");

    // Verify it queried using this employer's profile id
    expect(mockFindManyPostings).toHaveBeenCalledWith({
      where: { employerId: "ep_1", deletedAt: null },
      orderBy: { createdAt: "desc" },
      select: expect.any(Object),
    });
  });

  test("Dashboard shows empty state when no postings exist", async () => {
    mockAuth.mockResolvedValue({
      userId: "user_emp_2",
      sessionClaims: { metadata: { role: "EMPLOYER" } },
    });
    mockFindUniqueProfile.mockResolvedValue({
      id: "ep_2",
      userId: "user_emp_2",
      companyName: "Empty Co",
      status: "APPROVED",
    });
    mockFindManyPostings.mockResolvedValue([]);

    const mod = await import("./page");
    const element = await mod.default();
    const html = renderToString(element);

    expect(html).toContain("No job postings yet");
    expect(html).toContain("Post your first vacancy");
  });
});
