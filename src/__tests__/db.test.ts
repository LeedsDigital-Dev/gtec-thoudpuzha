import { describe, expect, test, afterAll } from "vitest";
import { prisma } from "@/lib/db";

const hasDb = !!process.env.DATABASE_URL && process.env.SKIP_DB_TESTS !== "true";

afterAll(async () => {
  if (hasDb) {
    await prisma.$disconnect();
  }
});

describe.skipIf(!hasDb)("Prisma client singleton", () => {
  test("can connect and run a trivial query against the dev database", async () => {
    const result = await prisma.$queryRaw<Array<{ one: number }>>`SELECT 1 as one`;
    expect(result).toHaveLength(1);
    expect(result[0].one).toBe(1);
  });
});

describe.skipIf(!hasDb)("Role enum values", () => {
  const roles = [
    "STUDENT",
    "JOB_SEEKER",
    "EMPLOYER",
    "CENTRE_STAFF",
    "SUPER_ADMIN",
  ] as const;

  for (const role of roles) {
    test(`User can be created with role ${role}`, async () => {
      const userId = `test-user-${role}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

      const user = await prisma.user.create({
        data: {
          id: userId,
          role,
        },
      });

      expect(user.id).toBe(userId);
      expect(user.role).toBe(role);

      await prisma.user.delete({ where: { id: userId } });
    });
  }
});

describe.skipIf(!hasDb)("CandidateProfile", () => {
  test("can be created linked to a User, with isVerifiedStudent defaulting to false", async () => {
    const userId = `test-cp-user-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

    const _user = await prisma.user.create({
      data: { id: userId, role: "STUDENT" },
    });

    const profile = await prisma.candidateProfile.create({
      data: { userId },
    });

    expect(profile.userId).toBe(userId);
    expect(profile.isVerifiedStudent).toBe(false);

    await prisma.candidateProfile.delete({ where: { id: profile.id } });
    await prisma.user.delete({ where: { id: userId } });
  });
});
