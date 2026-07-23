"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireRole, Role } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { logAdminAction } from "@/lib/audit";
import type { ResourceType } from "@prisma/client";

function localeFromFormData(formData: FormData): string {
  return (formData.get("locale") as string) || "en";
}

export async function uploadResource(formData: FormData) {
  const authResult = await requireRole([Role.CENTRE_STAFF, Role.SUPER_ADMIN]);
  if (!authResult.authorized) {
    redirect(`/${localeFromFormData(formData)}/forbidden`);
  }

  const courseId = formData.get("courseId") as string;
  const type = formData.get("type") as ResourceType;
  const title = formData.get("title") as string;
  const fileUrl = (formData.get("fileUrl") as string) || null;

  if (!courseId || !type || !title) {
    throw new Error("courseId, type, and title are required");
  }

  const resource = await prisma.academicResource.create({
    data: { courseId, type, title, fileUrl },
  });

  await logAdminAction({
    actorUserId: authResult.userId!,
    actorRole: authResult.role,
    action: "academicResource.upload",
    entityType: "AcademicResource",
    entityId: resource.id,
    metadata: { courseId, type, title },
  });

  revalidatePath(`/${localeFromFormData(formData)}/admin/academic-resources`);
}

export async function deleteResource(formData: FormData) {
  const authResult = await requireRole([Role.CENTRE_STAFF, Role.SUPER_ADMIN]);
  if (!authResult.authorized) {
    redirect(`/${localeFromFormData(formData)}/forbidden`);
  }

  const id = formData.get("id") as string;

  await prisma.academicResource.delete({ where: { id } });

  await logAdminAction({
    actorUserId: authResult.userId!,
    actorRole: authResult.role,
    action: "academicResource.delete",
    entityType: "AcademicResource",
    entityId: id,
  });

  revalidatePath(`/${localeFromFormData(formData)}/admin/academic-resources`);
}
