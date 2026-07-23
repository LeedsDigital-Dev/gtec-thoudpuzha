"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireRole, Role } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { logAdminAction } from "@/lib/audit";

function localeFromFormData(formData: FormData): string {
  return (formData.get("locale") as string) || "en";
}

export async function approveSkill(formData: FormData) {
  const authResult = await requireRole([Role.CENTRE_STAFF, Role.SUPER_ADMIN]);
  if (!authResult.authorized) {
    redirect(`/${localeFromFormData(formData)}/forbidden`);
  }

  const id = formData.get("id") as string;

  const skill = await prisma.skill.update({
    where: { id },
    data: { status: "APPROVED" },
  });

  await logAdminAction({
    actorUserId: authResult.userId,
    actorRole: authResult.role,
    action: "skill.approve",
    entityType: "Skill",
    entityId: skill.id,
    metadata: { label: skill.label },
  });

  revalidatePath(`/${localeFromFormData(formData)}/admin/skills-taxonomy`);
}

export async function mergeSkill(formData: FormData) {
  const authResult = await requireRole([Role.CENTRE_STAFF, Role.SUPER_ADMIN]);
  if (!authResult.authorized) {
    redirect(`/${localeFromFormData(formData)}/forbidden`);
  }

  const sourceId = formData.get("sourceId") as string;
  const targetId = formData.get("targetId") as string;
  const locale = localeFromFormData(formData);

  if (sourceId === targetId) return;

  const [sourceSkill, targetSkill] = await Promise.all([
    prisma.skill.findUnique({ where: { id: sourceId } }),
    prisma.skill.findUnique({ where: { id: targetId } }),
  ]);

  if (!sourceSkill || !targetSkill) {
    redirect(`/${locale}/admin/skills-taxonomy`);
  }

  // Re-point all CandidateProfile references
  const candidateProfiles = await prisma.candidateProfile.findMany({
    where: { skillIds: { has: sourceId } },
    select: { id: true, skillIds: true },
  });

  for (const profile of candidateProfiles) {
    const newSkillIds = profile.skillIds.filter((s) => s !== sourceId);
    if (!newSkillIds.includes(targetId)) {
      newSkillIds.push(targetId);
    }
    await prisma.candidateProfile.update({
      where: { id: profile.id },
      data: { skillIds: { set: newSkillIds } },
    });
  }

  // Re-point all JobPosting references
  const jobPostings = await prisma.jobPosting.findMany({
    where: { skillIds: { has: sourceId } },
    select: { id: true, skillIds: true },
  });

  for (const posting of jobPostings) {
    const newSkillIds = posting.skillIds.filter((s) => s !== sourceId);
    if (!newSkillIds.includes(targetId)) {
      newSkillIds.push(targetId);
    }
    await prisma.jobPosting.update({
      where: { id: posting.id },
      data: { skillIds: { set: newSkillIds } },
    });
  }

  // Delete source skill
  await prisma.skill.delete({ where: { id: sourceId } });

  await logAdminAction({
    actorUserId: authResult.userId,
    actorRole: authResult.role,
    action: "skill.merge",
    entityType: "Skill",
    entityId: sourceId,
    metadata: {
      mergedIntoId: targetId,
      sourceLabel: sourceSkill.label,
      targetLabel: targetSkill.label,
      repointedCandidateProfiles: candidateProfiles.length,
      repointedJobPostings: jobPostings.length,
    },
  });

  revalidatePath(`/${locale}/admin/skills-taxonomy`);
}

export async function deleteSkill(formData: FormData) {
  const authResult = await requireRole([Role.CENTRE_STAFF, Role.SUPER_ADMIN]);
  if (!authResult.authorized) {
    redirect(`/${localeFromFormData(formData)}/forbidden`);
  }

  const id = formData.get("id") as string;
  const locale = localeFromFormData(formData);

  const skill = await prisma.skill.findUnique({ where: { id } });
  if (!skill) return;

  // Block deletion if skill has active references
  const [candidateCount, jobPostingCount] = await Promise.all([
    prisma.candidateProfile.count({ where: { skillIds: { has: id } } }),
    prisma.jobPosting.count({ where: { skillIds: { has: id } } }),
  ]);

  if (candidateCount > 0 || jobPostingCount > 0) {
    // Blocked — redirect back without deleting
    redirect(`/${locale}/admin/skills-taxonomy`);
  }

  await prisma.skill.delete({ where: { id } });

  await logAdminAction({
    actorUserId: authResult.userId,
    actorRole: authResult.role,
    action: "skill.delete",
    entityType: "Skill",
    entityId: id,
    metadata: { label: skill.label },
  });

  revalidatePath(`/${locale}/admin/skills-taxonomy`);
}
