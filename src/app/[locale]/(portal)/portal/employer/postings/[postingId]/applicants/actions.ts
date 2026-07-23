"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { Role } from "@/lib/auth";
import type { ApplicationStatus } from "@prisma/client";

export async function updateApplicationStatus(
  applicationId: string,
  newStatus: ApplicationStatus,
): Promise<{ error?: string; success?: boolean }> {
  const session = await auth();
  if (!session.userId) return { error: "Unauthenticated" };

  const role = session.sessionClaims?.metadata?.role as Role | undefined;
  if (role !== Role.EMPLOYER) return { error: "Forbidden" };

  const app = await prisma.application.findUnique({
    where: { id: applicationId },
    include: {
      jobPosting: { select: { employerId: true } },
    },
  });
  if (!app) return { error: "Application not found" };

  const profile = await prisma.employerProfile.findUnique({
    where: { userId: session.userId },
  });
  if (!profile || profile.id !== app.jobPosting.employerId) {
    return { error: "Forbidden" };
  }

  await prisma.application.update({
    where: { id: applicationId },
    data: { status: newStatus, statusUpdatedAt: new Date() },
  });

  revalidatePath("/portal/employer");
  return { success: true };
}
