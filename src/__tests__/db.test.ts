// @vitest-environment node
import { describe, expect, test, beforeAll, afterAll } from "vitest";
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

let prisma: PrismaClient;

beforeAll(() => {
  const testDbUrl = process.env.DATABASE_URL;
  if (!testDbUrl) {
    throw new Error("DATABASE_URL is not set — required for db.test.ts");
  }
  prisma = new PrismaClient({
    adapter: new PrismaNeon({ connectionString: testDbUrl }),
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Prisma client singleton", () => {
  test("can connect and run a trivial query against the dev database", async () => {
    const result = await prisma.$queryRaw<Array<{ one: number }>>`SELECT 1 as one`;
    expect(result).toHaveLength(1);
    expect(result[0].one).toBe(1);
  });
});

describe("Role enum values", () => {
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

describe("CandidateProfile", () => {
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
