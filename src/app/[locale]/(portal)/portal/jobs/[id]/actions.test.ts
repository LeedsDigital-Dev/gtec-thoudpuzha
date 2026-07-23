// @vitest-environment node
import { describe, expect, test, vi, beforeEach } from "vitest";

const mockAuth = vi.hoisted(() => vi.fn());
const mockFindUnique = vi.hoisted(() => vi.fn());
const mockCreate = vi.hoisted(() => vi.fn());
const mockRevalidatePath = vi.hoisted(() => vi.fn());

vi.mock("@clerk/nextjs/server", () => ({ auth: mockAuth }));

vi.mock("@/lib/db", () => ({
  prisma: {
    candidateProfile: { findUnique: mockFindUnique },
    application: { findUnique: mockFindUnique, create: mockCreate },
  },
}));

vi.mock("next/cache", () => ({ revalidatePath: mockRevalidatePath }));

import { applyToJob } from "./actions";

beforeEach(() => {
  vi.clearAllMocks();
});

describe("applyToJob", () => {
  test("returns error when candidate profile is incomplete", async () => {
    mockAuth.mockResolvedValue({
      userId: "user_1",
      sessionClaims: { metadata: { role: "JOB_SEEKER" } },
    });
    // Incomplete profile: missing fullName, dateOfBirth, etc.
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

    const formData = new FormData();
    formData.append("jobPostingId", "jp_1");
    formData.append("locale", "en");

    const result = await applyToJob(formData);
    expect(result).toEqual({ error: "Complete your profile to apply" });
    expect(mockCreate).not.toHaveBeenCalled();
  });

  test("creates an Application record when profile is complete", async () => {
    mockAuth.mockResolvedValue({
      userId: "user_1",
      sessionClaims: { metadata: { role: "JOB_SEEKER" } },
    });
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
      address: "Test address",
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
    // No existing application (findUnique returns null)
    mockFindUnique.mockResolvedValueOnce(null);
    mockCreate.mockResolvedValue({ id: "app_1" });

    const formData = new FormData();
    formData.append("jobPostingId", "jp_1");
    formData.append("locale", "en");

    const result = await applyToJob(formData);
    expect(result).toEqual({ applied: true });
    expect(mockCreate).toHaveBeenCalledWith({
      data: { jobPostingId: "jp_1", candidateProfileId: "cp_1" },
    });
    expect(mockRevalidatePath).toHaveBeenCalled();
  });

  test("blocks duplicate application to the same job", async () => {
    mockAuth.mockResolvedValue({
      userId: "user_1",
      sessionClaims: { metadata: { role: "JOB_SEEKER" } },
    });
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
      address: "Test address",
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
    // Existing application found
    mockFindUnique.mockResolvedValueOnce({
      id: "app_1",
      jobPostingId: "jp_1",
      candidateProfileId: "cp_1",
      status: "APPLIED",
    });

    const formData = new FormData();
    formData.append("jobPostingId", "jp_1");
    formData.append("locale", "en");

    const result = await applyToJob(formData);
    expect(result).toEqual({ error: "Already applied" });
    expect(mockCreate).not.toHaveBeenCalled();
  });
});
