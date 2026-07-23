"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireRole, Role } from "@/lib/auth";
import { prisma } from "@/lib/db";
import type { Prisma } from "@prisma/client";
import { logAdminAction } from "@/lib/audit";
import { uploadFile } from "@/lib/storage";

function localeFromFormData(formData: FormData): string {
  return (formData.get("locale") as string) || "en";
}

/* ─── Category actions ─── */

export async function createCategory(formData: FormData) {
  const authResult = await requireRole([Role.CENTRE_STAFF, Role.SUPER_ADMIN]);
  if (!authResult.authorized) {
    redirect(`/${localeFromFormData(formData)}/forbidden`);
  }

  const nameEn = formData.get("nameEn") as string;
  const nameMl = (formData.get("nameMl") as string) || null;

  const maxOrder = await prisma.courseCategory.aggregate({
    _max: { sortOrder: true },
  });

  const category = await prisma.courseCategory.create({
    data: {
      nameEn,
      nameMl,
      sortOrder: (maxOrder._max.sortOrder ?? 0) + 1,
    },
  });

  await logAdminAction({
    actorUserId: authResult.userId!,
    actorRole: authResult.role,
    action: "courseCategory.create",
    entityType: "CourseCategory",
    entityId: category.id,
    metadata: { nameEn, nameMl },
  });

  revalidatePath(`/${localeFromFormData(formData)}/admin/courses`);
}

export async function updateCategory(formData: FormData) {
  const authResult = await requireRole([Role.CENTRE_STAFF, Role.SUPER_ADMIN]);
  if (!authResult.authorized) {
    redirect(`/${localeFromFormData(formData)}/forbidden`);
  }

  const id = formData.get("id") as string;
  const nameEn = formData.get("nameEn") as string;
  const nameMl = (formData.get("nameMl") as string) || null;

  await prisma.courseCategory.update({
    where: { id },
    data: { nameEn, nameMl },
  });

  await logAdminAction({
    actorUserId: authResult.userId!,
    actorRole: authResult.role,
    action: "courseCategory.update",
    entityType: "CourseCategory",
    entityId: id,
    metadata: { nameEn, nameMl },
  });

  revalidatePath(`/${localeFromFormData(formData)}/admin/courses`);
}

export async function deleteCategory(formData: FormData) {
  const authResult = await requireRole([Role.CENTRE_STAFF, Role.SUPER_ADMIN]);
  if (!authResult.authorized) {
    redirect(`/${localeFromFormData(formData)}/forbidden`);
  }

  const id = formData.get("id") as string;

  await prisma.courseCategory.delete({ where: { id } });

  await logAdminAction({
    actorUserId: authResult.userId!,
    actorRole: authResult.role,
    action: "courseCategory.delete",
    entityType: "CourseCategory",
    entityId: id,
  });

  revalidatePath(`/${localeFromFormData(formData)}/admin/courses`);
}

export async function moveCategory(formData: FormData) {
  const authResult = await requireRole([Role.CENTRE_STAFF, Role.SUPER_ADMIN]);
  if (!authResult.authorized) {
    redirect(`/${localeFromFormData(formData)}/forbidden`);
  }

  const id = formData.get("id") as string;
  const direction = formData.get("direction") as "up" | "down";

  const categories = await prisma.courseCategory.findMany({
    orderBy: { sortOrder: "asc" },
  });

  const index = categories.findIndex((c) => c.id === id);
  if (index === -1) return;

  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (swapIndex < 0 || swapIndex >= categories.length) return;

  const current = categories[index];
  const swap = categories[swapIndex];

  await prisma.courseCategory.update({
    where: { id: current.id },
    data: { sortOrder: swap.sortOrder },
  });

  await prisma.courseCategory.update({
    where: { id: swap.id },
    data: { sortOrder: current.sortOrder },
  });

  await logAdminAction({
    actorUserId: authResult.userId!,
    actorRole: authResult.role,
    action: "courseCategory.reorder",
    entityType: "CourseCategory",
    entityId: current.id,
    metadata: { direction, swappedWith: swap.id },
  });

  revalidatePath(`/${localeFromFormData(formData)}/admin/courses`);
}

/* ─── Course actions ─── */

export async function createCourse(formData: FormData) {
  const authResult = await requireRole([Role.CENTRE_STAFF, Role.SUPER_ADMIN]);
  if (!authResult.authorized) {
    redirect(`/${localeFromFormData(formData)}/forbidden`);
  }

  const titleEn = formData.get("titleEn") as string;
  const titleMl = (formData.get("titleMl") as string) || null;
  const slug = (formData.get("slug") as string) || slugify(titleEn);
  const categoryId = (formData.get("categoryId") as string) || null;
  const descriptionEn = (formData.get("descriptionEn") as string) || null;
  const descriptionMl = (formData.get("descriptionMl") as string) || null;
  const durationText = (formData.get("durationText") as string) || null;
  const careerOutcomesEn = (formData.get("careerOutcomesEn") as string) || null;
  const careerOutcomesMl = (formData.get("careerOutcomesMl") as string) || null;
  const featured = formData.get("featured") === "on";
  const status = (formData.get("status") as "DRAFT" | "PUBLISHED" | "ARCHIVED") || "DRAFT";
  const certificationsRaw = (formData.get("certifications") as string) || "";
  const certifications = certificationsRaw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  let syllabus: Record<string, unknown> | null = null;
  try {
    const syllabusRaw = formData.get("syllabus") as string;
    if (syllabusRaw) {
      syllabus = JSON.parse(syllabusRaw);
    }
  } catch {
    // ignore invalid JSON
  }

  const course = await prisma.course.create({
    data: {
      titleEn,
      titleMl,
      slug,
      categoryId,
      descriptionEn,
      descriptionMl,
      durationText,
      syllabus: syllabus as Prisma.InputJsonValue,
      certifications,
      careerOutcomesEn,
      careerOutcomesMl,
      featured,
      status,
    },
  });

  await logAdminAction({
    actorUserId: authResult.userId!,
    actorRole: authResult.role,
    action: "course.create",
    entityType: "Course",
    entityId: course.id,
    metadata: { titleEn, slug, categoryId, status },
  });

  revalidatePath(`/${localeFromFormData(formData)}/admin/courses`);
}

export async function updateCourse(formData: FormData) {
  const authResult = await requireRole([Role.CENTRE_STAFF, Role.SUPER_ADMIN]);
  if (!authResult.authorized) {
    redirect(`/${localeFromFormData(formData)}/forbidden`);
  }

  const id = formData.get("id") as string;
  const titleEn = formData.get("titleEn") as string;
  const titleMl = (formData.get("titleMl") as string) || null;
  const slug = (formData.get("slug") as string) || "";
  const categoryId = (formData.get("categoryId") as string) || null;
  const descriptionEn = (formData.get("descriptionEn") as string) || null;
  const descriptionMl = (formData.get("descriptionMl") as string) || null;
  const durationText = (formData.get("durationText") as string) || null;
  const careerOutcomesEn = (formData.get("careerOutcomesEn") as string) || null;
  const careerOutcomesMl = (formData.get("careerOutcomesMl") as string) || null;
  const featured = formData.get("featured") === "on";
  const status = (formData.get("status") as "DRAFT" | "PUBLISHED" | "ARCHIVED") || "DRAFT";
  const certificationsRaw = (formData.get("certifications") as string) || "";
  const certifications = certificationsRaw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  let syllabus: Record<string, unknown> | null = null;
  try {
    const syllabusRaw = formData.get("syllabus") as string;
    if (syllabusRaw) {
      syllabus = JSON.parse(syllabusRaw);
    }
  } catch {
    // ignore invalid JSON
  }

  await prisma.course.update({
    where: { id },
    data: {
      titleEn,
      titleMl,
      slug,
      categoryId,
      descriptionEn,
      descriptionMl,
      durationText,
      syllabus: syllabus as Prisma.InputJsonValue,
      certifications,
      careerOutcomesEn,
      careerOutcomesMl,
      featured,
      status,
    },
  });

  await logAdminAction({
    actorUserId: authResult.userId!,
    actorRole: authResult.role,
    action: "course.update",
    entityType: "Course",
    entityId: id,
    metadata: { titleEn, slug, categoryId, status },
  });

  revalidatePath(`/${localeFromFormData(formData)}/admin/courses`);
}

export async function deleteCourse(formData: FormData) {
  const authResult = await requireRole([Role.CENTRE_STAFF, Role.SUPER_ADMIN]);
  if (!authResult.authorized) {
    redirect(`/${localeFromFormData(formData)}/forbidden`);
  }

  const id = formData.get("id") as string;

  await prisma.course.delete({ where: { id } });

  await logAdminAction({
    actorUserId: authResult.userId!,
    actorRole: authResult.role,
    action: "course.delete",
    entityType: "Course",
    entityId: id,
  });

  revalidatePath(`/${localeFromFormData(formData)}/admin/courses`);
}

export async function uploadCourseImage(formData: FormData) {
  const authResult = await requireRole([Role.CENTRE_STAFF, Role.SUPER_ADMIN]);
  if (!authResult.authorized) {
    redirect(`/${localeFromFormData(formData)}/forbidden`);
  }

  const courseId = formData.get("courseId") as string;
  const file = formData.get("coverImage") as File | null;

  if (!file || file.size === 0) {
    throw new Error("No file provided");
  }

  const key = await uploadFile(file, "course-covers");

  await prisma.course.update({
    where: { id: courseId },
    data: { coverImageUrl: key },
  });

  await logAdminAction({
    actorUserId: authResult.userId!,
    actorRole: authResult.role,
    action: "course.uploadCoverImage",
    entityType: "Course",
    entityId: courseId,
    metadata: { storageKey: key },
  });

  revalidatePath(`/${localeFromFormData(formData)}/admin/courses`);
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
