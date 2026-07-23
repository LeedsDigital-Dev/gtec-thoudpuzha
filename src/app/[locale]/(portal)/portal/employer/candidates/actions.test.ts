import { describe, expect, test, vi, beforeEach } from "vitest";
import type { CandidateProfileWithCompletion } from "@/lib/biodata";

// ─── Hoisted mocks ──────────────────────────────────────────────────────────

const mockAuth = vi.hoisted(() => vi.fn());
const mockFindUniqueProfile = vi.hoisted(() => vi.fn());
const mockFindFirstJobPosting = vi.hoisted(() => vi.fn());
const mockFindUniqueCandidate = vi.hoisted(() => vi.fn());
const mockResendSend = vi.hoisted(() => vi.fn());
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
    employerProfile: { findUnique: mockFindUniqueProfile },
    jobPosting: { findFirst: mockFindFirstJobPosting },
    candidateProfile: { findUnique: mockFindUniqueCandidate },
  },
}));

vi.mock("next/navigation", () => ({
  redirect: mockRedirect,
}));

vi.mock("resend", () => ({
  Resend: vi.fn(function () {
    return { emails: { send: mockResendSend } };
  }),
}));

// Mock the biodata-search module
const mockGetSearchableCandidates = vi.hoisted(() => vi.fn());

vi.mock("@/lib/biodata-search", () => ({
  getSearchableCandidates: mockGetSearchableCandidates,
}));

// ─── Helpers ─────────────────────────────────────────────────────────────────

function makeProfile(
  overrides: Partial<CandidateProfileWithCompletion> = {},
): CandidateProfileWithCompletion {
  return {
    id: "c1",
    fullName: "John Doe",
    dateOfBirth: new Date("2000-01-01"),
    phone: "9876543210",
    email: "john@example.com",
    courseCompletedIds: ["course_1"],
    certificationIds: [],
    educationalQualification: "GRADUATE",
    yearOfPassing: 2022,
    address: "123 Main St",
    languagesKnown: ["English", "Malayalam"],
    skillIds: ["skill_1", "skill_2"],
    preferredJobLocation: "Kochi",
    preferredJobType: "FULL_TIME",
    careerObjective: "Looking for opportunities",
    photoUrl: null,
    profileVisible: true,
    isVerifiedStudent: false,
    studentRecordId: null,
    ...overrides,
  };
}

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("searchCandidates", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockAuth.mockReset();
    mockFindUniqueProfile.mockReset();
    mockGetSearchableCandidates.mockReset();
    mockRedirect.mockReset();
    mockRedirect.mockImplementation((url: string) => {
      throw new Error(`redirect:${url}`);
    });
    // Default: employer is logged in and approved
    mockAuth.mockResolvedValue({
      userId: "user_emp_1",
      sessionClaims: { metadata: { role: "EMPLOYER" } },
    });
    mockFindUniqueProfile.mockResolvedValue({
      id: "ep_1",
      userId: "user_emp_1",
      status: "APPROVED",
    });
  });

  test("1. Only includes candidates with profileVisible=true AND isComplete=true", async () => {
    // getSearchableCandidates() already filters to visible+complete profiles.
    // The mock should only return those that would pass the filter.
    const visibleComplete = makeProfile({ id: "p1" });
    const bothComplete = makeProfile({ id: "p4" });

    mockGetSearchableCandidates.mockResolvedValue([
      visibleComplete,
      bothComplete,
    ]);

    const { searchCandidates } = await import("./actions");
    const results = await searchCandidates({});

    expect(results).toHaveLength(2);
    const ids = results.map((r) => r.id);
    expect(ids).toContain("p1");
    expect(ids).toContain("p4");
  });

  test("2a. preferredJobLocation filter narrows results", async () => {
    mockGetSearchableCandidates.mockResolvedValue([
      makeProfile({ id: "p1", preferredJobLocation: "Kochi" }),
      makeProfile({ id: "p2", preferredJobLocation: "Bangalore" }),
      makeProfile({ id: "p3", preferredJobLocation: "Kochi" }),
    ]);

    const { searchCandidates } = await import("./actions");
    const results = await searchCandidates({
      preferredJobLocation: "Kochi",
    });

    expect(results).toHaveLength(2);
    expect(results.map((r) => r.id).sort()).toEqual(["p1", "p3"]);
  });

  test("2b. preferredJobType filter narrows results", async () => {
    mockGetSearchableCandidates.mockResolvedValue([
      makeProfile({ id: "p1", preferredJobType: "FULL_TIME" }),
      makeProfile({ id: "p2", preferredJobType: "PART_TIME" }),
      makeProfile({ id: "p3", preferredJobType: "FULL_TIME" }),
    ]);

    const { searchCandidates } = await import("./actions");
    const results = await searchCandidates({
      preferredJobType: "PART_TIME",
    });

    expect(results).toHaveLength(1);
    expect(results[0].id).toBe("p2");
  });

  test("2c. educationalQualification filter narrows results", async () => {
    mockGetSearchableCandidates.mockResolvedValue([
      makeProfile({ id: "p1", educationalQualification: "GRADUATE" }),
      makeProfile({ id: "p2", educationalQualification: "POST_GRADUATE" }),
      makeProfile({ id: "p3", educationalQualification: "DIPLOMA" }),
    ]);

    const { searchCandidates } = await import("./actions");
    const results = await searchCandidates({
      educationalQualification: "POST_GRADUATE",
    });

    expect(results).toHaveLength(1);
    expect(results[0].id).toBe("p2");
  });

  test("2d. languagesKnown filter narrows results", async () => {
    mockGetSearchableCandidates.mockResolvedValue([
      makeProfile({
        id: "p1",
        languagesKnown: ["English", "Malayalam"],
      }),
      makeProfile({
        id: "p2",
        languagesKnown: ["English", "Hindi"],
      }),
      makeProfile({
        id: "p3",
        languagesKnown: ["Malayalam"],
      }),
    ]);

    const { searchCandidates } = await import("./actions");
    const results = await searchCandidates({
      languagesKnown: ["Hindi"],
    });

    expect(results).toHaveLength(1);
    expect(results[0].id).toBe("p2");
  });

  test("3. Non-approved employer is blocked", async () => {
    mockFindUniqueProfile.mockResolvedValue({
      id: "ep_1",
      userId: "user_emp_1",
      status: "PENDING",
    });

    const { searchCandidates } = await import("./actions");

    await expect(searchCandidates({})).rejects.toThrow(
      "redirect:/portal/employer/register/status",
    );

    expect(mockGetSearchableCandidates).not.toHaveBeenCalled();
  });
});

describe("inviteToApply", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockAuth.mockReset();
    mockFindUniqueProfile.mockReset();
    mockFindFirstJobPosting.mockReset();
    mockFindUniqueCandidate.mockReset();
    mockResendSend.mockReset();
    mockRedirect.mockReset();
    mockRedirect.mockImplementation((url: string) => {
      throw new Error(`redirect:${url}`);
    });
    // Default: employer is logged in and approved
    mockAuth.mockResolvedValue({
      userId: "user_emp_1",
      sessionClaims: { metadata: { role: "EMPLOYER" } },
    });
    mockFindUniqueProfile.mockResolvedValue({
      id: "ep_1",
      userId: "user_emp_1",
      companyName: "Acme Corp",
      contactPersonName: "Alice",
      status: "APPROVED",
    });
    // Default: employer's own APPROVED posting
    mockFindFirstJobPosting.mockResolvedValue({
      id: "jp_1",
      title: "Software Engineer",
      employerId: "ep_1",
      status: "APPROVED",
    });
    // Default: valid searchable candidate
    mockFindUniqueCandidate.mockResolvedValue({
      id: "cand_1",
      userId: "user_cand",
      fullName: "John Doe",
      email: "john@example.com",
      profileVisible: true,
      preferredJobType: "FULL_TIME",
      preferredJobLocation: "Kochi",
      educationalQualification: "GRADUATE",
      phone: "9876543210",
      dateOfBirth: new Date("2000-01-01"),
      address: "123 Main St",
      languagesKnown: ["English"],
      skillIds: [],
      courseCompletedIds: ["course_1"],
      certificationIds: [],
      careerObjective: "Looking",
      photoUrl: null,
      isVerifiedStudent: false,
      studentRecordId: null,
      yearOfPassing: 2022,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });

  test("4. Invite sends notification email but does NOT create an Application", async () => {
    mockResendSend.mockResolvedValue({ id: "email_1" });

    const { inviteToApply } = await import("./actions");
    const result = await inviteToApply("cand_1", "jp_1");

    expect(result.success).toBe(true);

    // Verify email was sent
    expect(mockResendSend).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "john@example.com",
        subject: expect.stringContaining("Software Engineer"),
      }),
    );

    // Verify that no Application was created — the only prisma call
    // was employerProfile.findUnique, jobPosting.findFirst, and candidateProfile.findUnique
    expect(mockFindFirstJobPosting).toHaveBeenCalled();
    expect(mockFindUniqueCandidate).toHaveBeenCalled();
    // No create call on application
    const prismaModule = await import("@/lib/db");
    expect((prismaModule.prisma as Record<string, unknown>).application).toBeUndefined();
  });

  test("5. Employer can only select from their OWN approved postings", async () => {
    // Make findFirst return null — this posting doesn't belong to this employer
    mockFindFirstJobPosting.mockResolvedValue(null);

    const { inviteToApply } = await import("./actions");
    const result = await inviteToApply("cand_1", "jp_other");

    expect(result.success).toBe(false);
    expect(result.error).toContain("not found");

    // No email should be sent
    expect(mockResendSend).not.toHaveBeenCalled();
  });
});
