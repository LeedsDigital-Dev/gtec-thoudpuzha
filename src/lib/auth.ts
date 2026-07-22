import { auth as clerkAuth } from "@clerk/nextjs/server";

export enum Role {
  STUDENT = "STUDENT",
  JOB_SEEKER = "JOB_SEEKER",
  EMPLOYER = "EMPLOYER",
  CENTRE_STAFF = "CENTRE_STAFF",
  SUPER_ADMIN = "SUPER_ADMIN",
}

export async function requireRole(allowedRoles: Role[]) {
  const session = await clerkAuth();

  if (!session.userId) {
    return { authorized: false, reason: "unauthenticated" as const };
  }

  const role = session.sessionClaims?.metadata?.role as Role | undefined;

  if (!role) {
    return { authorized: false, reason: "no_role" as const };
  }

  if (!allowedRoles.includes(role)) {
    return { authorized: false, reason: "forbidden" as const };
  }

  return { authorized: true, role } as const;
}
