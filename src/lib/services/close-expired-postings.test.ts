// @vitest-environment node
import { describe, expect, test, vi, beforeEach, afterEach } from "vitest";

const mockFindMany = vi.hoisted(() => vi.fn());
const mockUpdateMany = vi.hoisted(() => vi.fn());
const mockAuditLogCreate = vi.hoisted(() => vi.fn());

vi.mock("@/lib/db", () => ({
  prisma: {
    jobPosting: {
      findMany: mockFindMany,
      updateMany: mockUpdateMany,
    },
    auditLogEntry: {
      create: mockAuditLogCreate,
    },
  },
}));

import { closeExpiredPostings } from "./close-expired-postings";

function pastPosting(overrides: Record<string, unknown> = {}) {
  return {
    id: "jp_1",
    employerId: "emp_1",
    title: "Software Engineer",
    applicationDeadline: new Date("2025-01-01"),
    status: "APPROVED",
    deletedAt: null,
    description: "A great job",
    department: "Engineering",
    jobType: "FULL_TIME",
    salaryMin: null,
    salaryMax: null,
    ...overrides,
  };
}

beforeEach(() => {
  vi.clearAllMocks();
  // Use fake timers so new Date() is predictable
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2025-06-15T12:00:00Z"));
});

afterEach(() => {
  vi.useRealTimers();
});

describe("closeExpiredPostings", () => {
  test("transitions expired APPROVED postings to CLOSED", async () => {
    const expired = [pastPosting()];
    mockFindMany.mockResolvedValue(expired);
    mockUpdateMany.mockResolvedValue({ count: 1 });

    const result = await closeExpiredPostings();

    expect(result).toEqual({ closed: 1 });
    expect(mockFindMany).toHaveBeenCalledWith({
      where: {
        status: "APPROVED",
        deletedAt: null,
        applicationDeadline: { lt: new Date("2025-06-15T12:00:00Z") },
      },
    });
    expect(mockUpdateMany).toHaveBeenCalledWith({
      where: { id: { in: ["jp_1"] } },
      data: { status: "CLOSED" },
    });
    expect(mockAuditLogCreate).toHaveBeenCalledTimes(1);
    expect(mockAuditLogCreate).toHaveBeenCalledWith({
      data: expect.objectContaining({
        actorUserId: null,
        actorRole: null,
        action: "VACANCY_AUTO_CLOSE",
        entityType: "JobPosting",
        entityId: "jp_1",
      }),
    });
  });

  test("does not close postings with future deadline", async () => {
    mockFindMany.mockResolvedValue([]);

    const result = await closeExpiredPostings();

    expect(result).toEqual({ closed: 0 });
    expect(mockUpdateMany).not.toHaveBeenCalled();
    expect(mockAuditLogCreate).not.toHaveBeenCalled();
  });

  test("is idempotent — second run does not error or create duplicate logs", async () => {
    // First run: one posting found and closed
    const expired = [pastPosting()];
    mockFindMany.mockResolvedValue(expired);
    mockUpdateMany.mockResolvedValue({ count: 1 });

    const first = await closeExpiredPostings();
    expect(first).toEqual({ closed: 1 });

    // Second run: no expired postings found (already closed)
    mockFindMany.mockResolvedValue([]);

    const second = await closeExpiredPostings();
    expect(second).toEqual({ closed: 0 });

    // updateMany not called on second run
    expect(mockUpdateMany).toHaveBeenCalledTimes(1);
    expect(mockAuditLogCreate).toHaveBeenCalledTimes(1);
  });

  test("excludes soft-deleted postings even if deadline passed", async () => {
    // findMany returns nothing because the query filters deletedAt: null
    mockFindMany.mockResolvedValue([]);

    const result = await closeExpiredPostings();

    expect(result).toEqual({ closed: 0 });
    // Verify the query includes the soft-delete exclusion
    expect(mockFindMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          deletedAt: null,
        }),
      }),
    );
    expect(mockUpdateMany).not.toHaveBeenCalled();
    expect(mockAuditLogCreate).not.toHaveBeenCalled();
  });
});
