"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { Role, getEffectiveRole } from "@/lib/auth";
import { isProfileComplete } from "@/lib/biodata";

export async function applyToJob(formData: FormData): Promise<{ error?: string; applied?: boolean }> {
  const session = await auth();
  if (!session.userId) {
    return { error: "Unauthenticated" };
  }

  const role = await getEffectiveRole(session);
  if (!role || (role !== Role.STUDENT && role !== Role.JOB_SEEKER)) {
    return { error: "Forbidden" };
  }

  const jobPostingId = formData.get("jobPostingId") as string;
  if (!jobPostingId) return { error: "jobPostingId is required" };

  const profile = await prisma.candidateProfile.findUnique({
    where: { userId: session.userId },
  });
  if (!profile) return { error: "Complete your profile to apply" };
  if (!isProfileComplete({ ...profile, isVerifiedStudent: profile.isVerifiedStudent, studentRecordId: profile.studentRecordId })) {
    return { error: "Complete your profile to apply" };
  }

  const existing = await prisma.application.findUnique({
    where: {
      jobPostingId_candidateProfileId: {
        jobPostingId,
        candidateProfileId: profile.id,
      },
    },
  });
  if (existing) {
    return { error: "Already applied" };
  }

  await prisma.application.create({
    data: {
      jobPostingId,
      candidateProfileId: profile.id,
    },
  });

  revalidatePath(`/${(formData.get("locale") as string) || "en"}/portal/jobs/${jobPostingId}`);
  return { applied: true };
}
