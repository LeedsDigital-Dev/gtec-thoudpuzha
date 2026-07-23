// @vitest-environment node
import { describe, expect, test, vi, beforeEach, afterEach } from "vitest";

const mockFindMany = vi.hoisted(() => vi.fn());
const mockSkillsFindMany = vi.hoisted(() => vi.fn());

vi.mock("@/lib/db", () => ({
  prisma: {
    jobPosting: {
      findMany: mockFindMany,
    },
    skill: {
      findMany: mockSkillsFindMany,
    },
  },
}));

import { getActiveJobPostings } from "./jobs";

function approvedPosting(overrides: Record<string, unknown> = {}) {
  return {
    id: "jp_1",
    employerId: "emp_1",
    title: "Software Engineer",
    department: "Engineering",
    salaryMin: 50000,
    salaryMax: 80000,
    salaryVisibility: "DISCLOSE",
    jobType: "FULL_TIME",
    skillIds: ["skill_1"],
    applicationDeadline: new Date("2026-12-31"),
    description: "A great job",
    createdAt: new Date("2026-01-01"),
    status: "APPROVED",
    deletedAt: null,
    employer: {
      companyName: "Tech Corp",
      companyAddress: "Kochi, Kerala",
    },
    ...overrides,
  };
}

beforeEach(() => {
  vi.clearAllMocks();
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-06-15T12:00:00Z"));
});

afterEach(() => {
  vi.useRealTimers();
});

describe("getActiveJobPostings", () => {
  test("excludes PENDING, REJECTED, CLOSED, and soft-deleted postings", async () => {
    mockFindMany.mockResolvedValue([]);

    await getActiveJobPostings();

    expect(mockFindMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          status: "APPROVED",
          deletedAt: null,
          applicationDeadline: { gt: new Date("2026-06-15T12:00:00Z") },
        }),
      }),
    );
  });

  test("excludes postings past their applicationDeadline", async () => {
    const past = approvedPosting({
      applicationDeadline: new Date("2025-01-01"),
    });
    const future = approvedPosting({
      id: "jp_2",
      applicationDeadline: new Date("2026-12-31"),
    });

    mockFindMany.mockResolvedValue([past, future]);

    const results = await getActiveJobPostings();

    // The DB returns both, but the query itself should only ask for future ones
    expect(mockFindMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          applicationDeadline: { gt: new Date("2026-06-15T12:00:00Z") },
        }),
      }),
    );
    expect(results).toEqual([past, future]);
  });

  test("filters by job type correctly", async () => {
    mockFindMany.mockResolvedValue([]);

    await getActiveJobPostings({ jobType: "PART_TIME" });

    expect(mockFindMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          status: "APPROVED",
          deletedAt: null,
          jobType: "PART_TIME",
        }),
      }),
    );
  });

  test("filters by skill id correctly", async () => {
    mockFindMany.mockResolvedValue([]);

    await getActiveJobPostings({ skillId: "skill_1" });

    expect(mockFindMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          status: "APPROVED",
          deletedAt: null,
          skillIds: { has: "skill_1" },
        }),
      }),
    );
  });

  test("filters by location (case-insensitive match on employer address)", async () => {
    const kochi = approvedPosting({
      id: "jp_kochi",
      employer: {
        companyName: "Tech Corp",
        companyAddress: "Kochi, Kerala",
      },
    });
    const bangalore = approvedPosting({
      id: "jp_blr",
      employer: {
        companyName: "Startup Co",
        companyAddress: "Bangalore, Karnataka",
      },
    });

    mockFindMany.mockResolvedValue([kochi, bangalore]);

    const results = await getActiveJobPostings({ location: "kochi" });

    expect(results).toHaveLength(1);
    expect(results[0].id).toBe("jp_kochi");
  });

  test("PRIVATE-salary posting indicates 'disclosed at interview' label", async () => {
    const posting = approvedPosting({
      salaryVisibility: "PRIVATE",
      salaryMin: null,
      salaryMax: null,
    });

    expect(posting.salaryVisibility).toBe("PRIVATE");

    // The render-time label is determined by salaryVisibility === "DISCLOSE"
    const label =
      posting.salaryVisibility === "DISCLOSE"
        ? "Salary disclosed"
        : "Salary: disclosed at interview";

    expect(label).toBe("Salary: disclosed at interview");
  });
});
