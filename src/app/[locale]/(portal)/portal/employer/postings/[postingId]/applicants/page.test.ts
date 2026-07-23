import { describe, expect, test, vi, beforeEach } from "vitest";
import { renderToString } from "react-dom/server";

const mockAuth = vi.hoisted(() => vi.fn());
const mockFindUniqueProfile = vi.hoisted(() => vi.fn());
const mockFindFirstPosting = vi.hoisted(() => vi.fn());
const mockFindMany = vi.hoisted(() => vi.fn());
const mockUpdateMany = vi.hoisted(() => vi.fn());
const mockRedirect = vi.hoisted(() =>
  vi.fn((url: string) => {
    throw new Error(`redirect:${url}`);
  }),
);

vi.mock("@clerk/nextjs/server", () => ({ auth: mockAuth }));

vi.mock("@/lib/db", () => ({
  prisma: {
    employerProfile: { findUnique: mockFindUniqueProfile },
    jobPosting: { findFirst: mockFindFirstPosting },
    application: { findMany: mockFindMany, updateMany: mockUpdateMany },
  },
}));

vi.mock("next/navigation", () => ({
  redirect: mockRedirect,
}));

function makeApplicant(overrides: Record<string, unknown> = {}) {
  return {
    id: "app_1",
    jobPostingId: "jp_1",
    candidateProfileId: "cp_1",
    status: "APPLIED",
    appliedAt: new Date("2026-07-22"),
    createdAt: new Date("2026-07-22"),
    updatedAt: new Date("2026-07-22"),
    statusUpdatedAt: new Date("2026-07-22"),
    candidateProfile: {
      id: "cp_1",
      fullName: "John Doe",
      email: "john@example.com",
      phone: "9999999999",
      educationalQualification: "GRADUATE",
      skillIds: ["skill_1"],
      preferredJobLocation: "Kochi",
      preferredJobType: "FULL_TIME",
      careerObjective: "Looking for a challenging role",
      photoUrl: null,
    },
    ...overrides,
  };
}

beforeEach(() => {
  vi.clearAllMocks();
  mockRedirect.mockImplementation((url: string) => {
    throw new Error(`redirect:${url}`);
  });
});

describe("Employer Applicants Page — isolation & auto-transition", () => {
  test("3. employer sees only applicants to THEIR posting", async () => {
    mockAuth.mockResolvedValue({
      userId: "user_emp_1",
      sessionClaims: { metadata: { role: "EMPLOYER" } },
    });
    // Employer profile lookup
    mockFindUniqueProfile.mockResolvedValueOnce({
      id: "ep_1",
      userId: "user_emp_1",
      companyName: "Tech Corp",
      status: "APPROVED",
    });
    // Job posting lookup — belongs to ep_1
    mockFindFirstPosting.mockResolvedValueOnce({
      id: "jp_1",
      title: "Software Engineer",
      employerId: "ep_1",
    });
    // Auto-transition updateMany
    mockUpdateMany.mockResolvedValue({ count: 1 });
    // Applicant list — only for jp_1
    mockFindMany.mockResolvedValue([
      makeApplicant({ id: "app_1", status: "VIEWED" }),
      makeApplicant({
        id: "app_2",
        candidateProfileId: "cp_2",
        status: "SHORTLISTED",
        candidateProfile: {
          id: "cp_2",
          fullName: "Jane Smith",
          email: "jane@example.com",
          phone: "8888888888",
          educationalQualification: "POST_GRADUATE",
          skillIds: [],
          preferredJobLocation: "Kochi",
          preferredJobType: "FULL_TIME",
          careerObjective: null,
          photoUrl: null,
        },
      }),
    ]);

    const mod = await import("./page");
    const html = renderToString(
      await mod.default({
        params: Promise.resolve({ postingId: "jp_1", locale: "en" }),
      }),
    );

    expect(html).toContain("John Doe");
    expect(html).toContain("Jane Smith");

    // Verify query was scoped to this posting
    expect(mockFindMany).toHaveBeenCalledWith({
      where: { jobPostingId: "jp_1" },
      orderBy: { appliedAt: "desc" },
      include: expect.any(Object),
    });

    // Verify auto-transition was triggered
    expect(mockUpdateMany).toHaveBeenCalledWith({
      where: { jobPostingId: "jp_1", status: "APPLIED" },
      data: { status: "VIEWED", statusUpdatedAt: expect.any(Date) },
    });
  });

  test("3. employer does NOT see applicants to another employer's posting", async () => {
    mockAuth.mockResolvedValue({
      userId: "user_emp_1",
      sessionClaims: { metadata: { role: "EMPLOYER" } },
    });
    mockFindUniqueProfile.mockResolvedValueOnce({
      id: "ep_1",
      userId: "user_emp_1",
      companyName: "Tech Corp",
      status: "APPROVED",
    });
    // Job posting belongs to another employer — findFirst returns null
    mockFindFirstPosting.mockResolvedValueOnce(null);

    await expect(
      (await import("./page")).default({
        params: Promise.resolve({ postingId: "jp_other", locale: "en" }),
      }),
    ).rejects.toThrow("redirect:/portal/employer");
  });

  test("4. viewing APPLIED applicants transitions them to VIEWED automatically", async () => {
    mockAuth.mockResolvedValue({
      userId: "user_emp_1",
      sessionClaims: { metadata: { role: "EMPLOYER" } },
    });
    mockFindUniqueProfile.mockResolvedValueOnce({
      id: "ep_1",
      userId: "user_emp_1",
      companyName: "Tech Corp",
      status: "APPROVED",
    });
    mockFindFirstPosting.mockResolvedValueOnce({
      id: "jp_1",
      title: "Software Engineer",
      employerId: "ep_1",
    });
    // Auto-transition is called with APPLIED → VIEWED
    mockUpdateMany.mockResolvedValue({ count: 2 });
    mockFindMany.mockResolvedValue([
      makeApplicant({ id: "app_1", status: "VIEWED" }),
      makeApplicant({
        id: "app_2",
        candidateProfileId: "cp_2",
        status: "VIEWED",
        candidateProfile: {
          id: "cp_2",
          fullName: "Jane Smith",
          email: "jane@example.com",
          phone: "8888888888",
          educationalQualification: "POST_GRADUATE",
          skillIds: [],
          preferredJobLocation: "Kochi",
          preferredJobType: "FULL_TIME",
          careerObjective: null,
          photoUrl: null,
        },
      }),
    ]);

    const mod = await import("./page");
    const html = renderToString(
      await mod.default({
        params: Promise.resolve({ postingId: "jp_1", locale: "en" }),
      }),
    );

    // After auto-transition, both should show VIEWED
    expect(html).toContain("VIEWED");
    expect(html).not.toContain(">APPLIED<");
    expect(mockUpdateMany).toHaveBeenCalledWith({
      where: { jobPostingId: "jp_1", status: "APPLIED" },
      data: { status: "VIEWED", statusUpdatedAt: expect.any(Date) },
    });
  });
});
