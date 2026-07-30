import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaNeon } from "@prisma/adapter-neon";
import pg from "pg";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set");
}

function createPrismaClient(): PrismaClient {
  if (databaseUrl!.includes("neon.tech")) {
    const adapter = new PrismaNeon({ connectionString: databaseUrl! });
    return new PrismaClient({ adapter });
  }

  const pool = new pg.Pool({ connectionString: databaseUrl! });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
