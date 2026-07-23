"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requirePermission, StaffPermissionKeys } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { logAdminAction } from "@/lib/audit";
import { sendJobPostingModerationNotification } from "@/lib/email";

function localeFromFormData(formData: FormData): string {
  return (formData.get("locale") as string) || "en";
}

export async function approveJobPosting(formData: FormData) {
  const authResult = await requirePermission(StaffPermissionKeys.canApproveJobPostings);
  if (!authResult.authorized) {
    redirect(`/${localeFromFormData(formData)}/forbidden`);
  }

  const postingId = formData.get("postingId") as string;
  if (!postingId) throw new Error("postingId is required");

  const posting = await prisma.jobPosting.update({
    where: { id: postingId },
    data: { status: "APPROVED" },
    include: { employer: true },
  });

  await logAdminAction({
    actorUserId: authResult.userId,
    actorRole: authResult.role,
    action: "jobPosting.approve",
    entityType: "JobPosting",
    entityId: posting.id,
    metadata: { title: posting.title, companyName: posting.employer.companyName },
  });

  await sendJobPostingModerationNotification({
    jobTitle: posting.title,
    companyName: posting.employer.companyName,
    employerEmail: posting.employer.email,
    status: "APPROVED",
  });

  revalidatePath(`/${localeFromFormData(formData)}/admin/job-postings`);
}

export async function rejectJobPosting(formData: FormData) {
  const authResult = await requirePermission(StaffPermissionKeys.canApproveJobPostings);
  if (!authResult.authorized) {
    redirect(`/${localeFromFormData(formData)}/forbidden`);
  }

  const postingId = formData.get("postingId") as string;
  const rejectionReason = formData.get("rejectionReason") as string;

  if (!postingId) throw new Error("postingId is required");
  if (!rejectionReason?.trim()) {
    throw new Error("rejectionReason is required");
  }

  const posting = await prisma.jobPosting.update({
    where: { id: postingId },
    data: { status: "REJECTED" },
    include: { employer: true },
  });

  await logAdminAction({
    actorUserId: authResult.userId,
    actorRole: authResult.role,
    action: "jobPosting.reject",
    entityType: "JobPosting",
    entityId: posting.id,
    metadata: { title: posting.title, rejectionReason: rejectionReason.trim() },
  });

  await sendJobPostingModerationNotification({
    jobTitle: posting.title,
    companyName: posting.employer.companyName,
    employerEmail: posting.employer.email,
    status: "REJECTED",
    rejectionReason: rejectionReason.trim(),
  });

  revalidatePath(`/${localeFromFormData(formData)}/admin/job-postings`);
}

export async function editAndApproveJobPosting(formData: FormData) {
  const authResult = await requirePermission(StaffPermissionKeys.canApproveJobPostings);
  if (!authResult.authorized) {
    redirect(`/${localeFromFormData(formData)}/forbidden`);
  }

  const postingId = formData.get("postingId") as string;
  if (!postingId) throw new Error("postingId is required");

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const department = formData.get("department") as string;
  const salaryMin = formData.get("salaryMin") as string;
  const salaryMax = formData.get("salaryMax") as string;

  const data: Record<string, unknown> = { status: "APPROVED" };
  if (title?.trim()) data.title = title.trim();
  if (description?.trim()) data.description = description.trim();
  if (department?.trim()) data.department = department.trim();
  if (salaryMin) data.salaryMin = parseInt(salaryMin, 10);
  if (salaryMax) data.salaryMax = parseInt(salaryMax, 10);

  const posting = await prisma.jobPosting.update({
    where: { id: postingId },
    data,
    include: { employer: true },
  });

  await logAdminAction({
    actorUserId: authResult.userId,
    actorRole: authResult.role,
    action: "jobPosting.editAndApprove",
    entityType: "JobPosting",
    entityId: posting.id,
    metadata: { title: posting.title, editedFields: Object.keys(data).filter((k) => k !== "status") },
  });

  await sendJobPostingModerationNotification({
    jobTitle: posting.title,
    companyName: posting.employer.companyName,
    employerEmail: posting.employer.email,
    status: "APPROVED",
  });

  revalidatePath(`/${localeFromFormData(formData)}/admin/job-postings`);
}
