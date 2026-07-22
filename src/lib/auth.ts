import { auth as clerkAuth } from "@clerk/nextjs/server";

export enum Role {
  STUDENT = "STUDENT",
  JOB_SEEKER = "JOB_SEEKER",
  EMPLOYER = "EMPLOYER",
  CENTRE_STAFF = "CENTRE_STAFF",
  SUPER_ADMIN = "SUPER_ADMIN",
}

export type RequireRoleResult =
  | { authorized: false; reason: "unauthenticated" | "no_role" | "forbidden" }
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

  return { authorized: true, role, userId: session.userId };
}
