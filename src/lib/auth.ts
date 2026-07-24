import { auth as clerkAuth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { fetchRoleFromApi } from "@/lib/role-fallback";

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

  let role = session.sessionClaims?.metadata?.role as Role | undefined;

  // Fast path: JWT claims have the role — no extra API call needed.
  // Fallback: if claims are stale (e.g. role was just set), fetch from the
  // Clerk Backend API — same function middleware.ts uses for the same reason.
  if (!role) {
    const apiRole = await fetchRoleFromApi(session.userId);
    role = apiRole as Role | undefined;
  }

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

export type PermissionKey = keyof typeof StaffPermissionKeys;

export const StaffPermissionKeys = {
  canEditCourses: "canEditCourses",
  canEditGallery: "canEditGallery",
  canEditCertificationPartners: "canEditCertificationPartners",
  canEditNewsEvents: "canEditNewsEvents",
  canEditFlashNews: "canEditFlashNews",
  canProvisionStudents: "canProvisionStudents",
  canApproveEmployers: "canApproveEmployers",
  canApproveJobPostings: "canApproveJobPostings",
  canModerateSkillsTaxonomy: "canModerateSkillsTaxonomy",
} as const;

export type RequirePermissionResult =
  | { authorized: false; reason: "unauthenticated" | "no_role" | "forbidden" | "deactivated" | "no_permission" }
  | { authorized: true; role: Role; userId: string };

/**
 * Check if the current user has a specific permission.
 * Super Admin always passes regardless of StaffPermission row state.
 * Centre Staff must have the specific boolean flag set to true in their StaffPermission row.
 */
export async function requirePermission(
  permissionKey: PermissionKey,
): Promise<RequirePermissionResult> {
  const session = await clerkAuth();

  if (!session.userId) {
    return { authorized: false, reason: "unauthenticated" };
  }

  let role = session.sessionClaims?.metadata?.role as Role | undefined;

  // Same stale-JWT-claim fallback as requireRole — see that function for details.
  if (!role) {
    const apiRole = await fetchRoleFromApi(session.userId);
    role = apiRole as Role | undefined;
  }

  if (!role) {
    return { authorized: false, reason: "no_role" };
  }

  if (role !== Role.CENTRE_STAFF && role !== Role.SUPER_ADMIN) {
    return { authorized: false, reason: "forbidden" };
  }

  // Deactivation check
  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { deactivatedAt: true },
  });
  if (user?.deactivatedAt) {
    return { authorized: false, reason: "deactivated" };
  }

  // Super Admin always passes
  if (role === Role.SUPER_ADMIN) {
    return { authorized: true, role, userId: session.userId };
  }

  // Centre Staff — check the specific permission flag
  const permission = await prisma.staffPermission.findUnique({
    where: { userId: session.userId },
  });

  if (!permission || !permission[permissionKey]) {
    return { authorized: false, reason: "no_permission" };
  }

  return { authorized: true, role, userId: session.userId };
}
