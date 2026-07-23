// @vitest-environment node
import { describe, expect, test, beforeAll, afterAll } from "vitest";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

let prisma: PrismaClient;

beforeAll(() => {
  const testDbUrl = process.env.DATABASE_URL;
  if (!testDbUrl) {
    throw new Error("DATABASE_URL is not set — required for application-unique.test.ts");
  }
  prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: testDbUrl }),
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Application DB-level unique constraint", () => {
  test("1. prevents duplicate Application on the same (candidateProfileId, jobPostingId)", async () => {
    // Create a user as EMPLOYER (needed for JobPosting FK)
    const empUserId = `test-unique-emp-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const _employerUser = await prisma.user.create({
      data: { id: empUserId, role: "EMPLOYER" },
    });
    const employer = await prisma.employerProfile.create({
      data: {
        userId: empUserId,
        companyName: "Unique Test Co",
        industrySector: "IT_SOFTWARE",
        contactPersonName: "Test",
        designation: "HR",
        phone: "9999999999",
        email: "unique@test.com",
        companyAddress: "Test",
        employeeCountRange: "RANGE_1_10",
        aboutCompany: "Test",
      },
    });

    // Create a job posting
    const jobPosting = await prisma.jobPosting.create({
      data: {
        employerId: employer.id,
        title: "Unique Constraint Test Job",
        jobType: "FULL_TIME",
        applicationDeadline: new Date("2026-12-31"),
        description: "Test",
        status: "APPROVED",
      },
    });

    // Create a candidate user + profile
    const candUserId = `test-unique-cand-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    await prisma.user.create({
      data: { id: candUserId, role: "STUDENT" },
    });
    const candidate = await prisma.candidateProfile.create({
      data: { userId: candUserId },
    });

    // First application — should succeed
    const first = await prisma.application.create({
      data: {
        jobPostingId: jobPosting.id,
        candidateProfileId: candidate.id,
      },
    });
    expect(first.id).toBeTruthy();
    expect(first.status).toBe("APPLIED");
    expect(first.appliedAt).toBeTruthy();

    // Second application with same pair — must throw unique constraint violation
    await expect(
      prisma.application.create({
        data: {
          jobPostingId: jobPosting.id,
          candidateProfileId: candidate.id,
        },
      }),
    ).rejects.toThrow();

    // Cleanup (reverse order to respect FKs)
    await prisma.application.deleteMany({
      where: { candidateProfileId: candidate.id },
    });
    await prisma.candidateProfile.delete({ where: { id: candidate.id } });
    await prisma.user.delete({ where: { id: candUserId } });
    await prisma.jobPosting.delete({ where: { id: jobPosting.id } });
    await prisma.employerProfile.delete({ where: { id: employer.id } });
    await prisma.user.delete({ where: { id: empUserId } });
  });
});
