import { describe, expect, test, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

const mockAuth = vi.hoisted(() => vi.fn());
const mockFindUnique = vi.hoisted(() => vi.fn());
const mockFindFirst = vi.hoisted(() => vi.fn());
const mockFindMany = vi.hoisted(() => vi.fn());
const mockNotFound = vi.hoisted(() => {
  const err = new Error("NEXT_NOT_FOUND");
  err.name = "NotFoundError";
  return vi.fn(() => {
    throw err;
  });
});
const mockRedirect = vi.hoisted(() =>
  vi.fn((url: string) => {
    throw new Error(`redirect:${url}`);
  }),
);
const mockGetSkillsByIds = vi.hoisted(() => vi.fn());

vi.mock("@clerk/nextjs/server", () => ({ auth: mockAuth }));

vi.mock("@/lib/db", () => ({
  prisma: {
    candidateProfile: { findUnique: mockFindUnique },
    application: { findUnique: mockFindUnique },
    skill: { findMany: mockFindMany },
  },
}));

vi.mock("@/lib/jobs", () => ({
  getJobDetail: mockFindFirst,
}));

vi.mock("@/lib/skills", () => ({
  getSkillsByIds: mockGetSkillsByIds,
}));

vi.mock("next/navigation", () => ({
  notFound: mockNotFound,
  redirect: mockRedirect,
}));

function makeJobDetail(overrides: Record<string, unknown> = {}) {
  return {
    id: "jp_1",
    title: "Software Engineer",
    department: "Engineering",
    salaryMin: 50000,
    salaryMax: 80000,
    salaryVisibility: "DISCLOSE",
    jobType: "FULL_TIME",
    skillIds: ["skill_1"],
    applicationDeadline: new Date("2026-12-31"),
    description: "A great job opportunity.",
    createdAt: new Date("2026-06-01"),
    employer: {
      companyName: "Tech Corp",
      companyAddress: "Kochi, Kerala",
      industrySector: "IT_SOFTWARE",
      employeeCountRange: "RANGE_51_200",
      aboutCompany: "We build great software.",
    },
    ...overrides,
  };
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe("Job detail page", () => {
  test("shows 'Complete your profile to apply' for incomplete profile", async () => {
    mockAuth.mockResolvedValue({
      userId: "user_1",
      sessionClaims: { metadata: { role: "JOB_SEEKER" } },
    });
    mockFindFirst.mockResolvedValue(makeJobDetail());
    mockGetSkillsByIds.mockResolvedValue([]);
    // Incomplete profile
    mockFindUnique.mockResolvedValue({
      id: "cp_1",
      userId: "user_1",
      fullName: null,
      dateOfBirth: null,
      phone: null,
      email: null,
      courseCompletedIds: [],
      certificationIds: [],
      educationalQualification: null,
      yearOfPassing: null,
      address: null,
      languagesKnown: [],
      skillIds: [],
      preferredJobLocation: null,
      preferredJobType: null,
      careerObjective: null,
      photoUrl: null,
      profileVisible: true,
      isVerifiedStudent: false,
      studentRecordId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const mod = await import("./page");
    const { container } = render(
      await mod.default({
        params: Promise.resolve({ locale: "en", id: "jp_1" }),
      }),
    );

    expect(screen.getByText("Complete your profile to apply")).toBeDefined();
    expect(screen.getByText("Software Engineer")).toBeDefined();
  });

  test("shows Applied ✓ after applying (reload)", async () => {
    mockAuth.mockResolvedValue({
      userId: "user_1",
      sessionClaims: { metadata: { role: "JOB_SEEKER" } },
    });
    mockFindFirst.mockResolvedValue(makeJobDetail());
    mockGetSkillsByIds.mockResolvedValue([]);
    // Complete profile
    mockFindUnique.mockResolvedValueOnce({
      id: "cp_1",
      userId: "user_1",
      fullName: "John Doe",
      dateOfBirth: new Date("2000-01-01"),
      phone: "9999999999",
      email: "john@example.com",
      courseCompletedIds: [],
      certificationIds: [],
      educationalQualification: "GRADUATE",
      yearOfPassing: 2022,
      address: "Test",
      languagesKnown: ["English"],
      skillIds: [],
      preferredJobLocation: "Kochi",
      preferredJobType: "FULL_TIME",
      careerObjective: null,
      photoUrl: null,
      profileVisible: true,
      isVerifiedStudent: false,
      studentRecordId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    // Existing application found (persisted)
    mockFindUnique.mockResolvedValueOnce({
      id: "app_1",
      jobPostingId: "jp_1",
      candidateProfileId: "cp_1",
      status: "APPLIED",
    });

    const mod = await import("./page");
    render(
      await mod.default({
        params: Promise.resolve({ locale: "en", id: "jp_1" }),
      }),
    );

    expect(screen.getByText("Applied ✓")).toBeDefined();
  });

  test("returns 404 for non-existent job id", async () => {
    mockAuth.mockResolvedValue({
      userId: "user_1",
      sessionClaims: { metadata: { role: "JOB_SEEKER" } },
    });
    mockFindFirst.mockResolvedValue(null);
    mockGetSkillsByIds.mockResolvedValue([]);

    const mod = await import("./page");
    await expect(
      mod.default({
        params: Promise.resolve({ locale: "en", id: "nonexistent" }),
      }),
    ).rejects.toThrow("NEXT_NOT_FOUND");
  });

  test("returns 404 for expired job", async () => {
    mockAuth.mockResolvedValue({
      userId: "user_1",
      sessionClaims: { metadata: { role: "JOB_SEEKER" } },
    });
    // getJobDetail returns null because the deadline is past
    mockFindFirst.mockResolvedValue(null);
    mockGetSkillsByIds.mockResolvedValue([]);

    const mod = await import("./page");
    await expect(
      mod.default({
        params: Promise.resolve({ locale: "en", id: "expired_job" }),
      }),
    ).rejects.toThrow("NEXT_NOT_FOUND");
  });
});
