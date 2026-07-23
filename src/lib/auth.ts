import { auth as clerkAuth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

export enum Role {
  STUDENT = "STUDENT",
  JOB_SEEKER = "JOB_SEEKER",
  EMPLOYER = "EMPLOYER",
  CENTRE_STAFF = "CENTRE_STAFF",
  SUPER_ADMIN = "SUPER_ADMIN",
}

export type RequireRoleResult =
  | { authorized: false; reason: "unauthenticated" | "no_role" | "forbidden" | "deactivated" }
  | { authorized: true; role: Role; userId: string };

export async function requireRole(
  allowedRoles: Role[],
): Promise<RequireRoleResult> {
  const session = await clerkAuth();

  if (!session.userId) {
    return { authorized: false, reason: "unauthenticated" };
  }

  const role = session.sessionClaims?.metadata?.role as Role | undefined;

  if (!role) {
    return { authorized: false, reason: "no_role" };
  }

  if (!allowedRoles.includes(role)) {
    return { authorized: false, reason: "forbidden" };
  }

  // Deactivation check — enforced even for valid roles
  if (role === Role.CENTRE_STAFF || role === Role.SUPER_ADMIN) {
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: { deactivatedAt: true },
    });
    if (user?.deactivatedAt) {
      return { authorized: false, reason: "deactivated" };
    }
  }

  return { authorized: true, role, userId: session.userId };
}

/**
 * Portal-specific role gate — same check as requireRole but semantically
 * distinct so callers can render a friendly "this area isn't for your
 * account type" message instead of a hard 403 redirect.
 */
export async function requirePortalRole(
  allowedRoles: Role[],
): Promise<RequireRoleResult> {
  return requireRole(allowedRoles);
}
