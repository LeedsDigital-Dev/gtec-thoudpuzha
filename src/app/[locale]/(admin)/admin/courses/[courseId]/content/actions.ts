"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireRole, Role } from "@/lib/auth";
import { prisma } from "@/lib/db";
import type { Prisma } from "@prisma/client";
import { logAdminAction } from "@/lib/audit";
import { CourseContentSchema } from "@/lib/course-content.schema";
import type { CourseContent } from "@/lib/course-content.types";

function localeFromFormData(formData: FormData): string {
  return (formData.get("locale") as string) || "en";
}

export async function saveCourseContent(formData: FormData) {
  const authResult = await requireRole([Role.CENTRE_STAFF, Role.SUPER_ADMIN]);
  if (!authResult.authorized) {
    redirect(`/${localeFromFormData(formData)}/forbidden`);
  }

  const courseId = formData.get("courseId") as string;
  if (!courseId) throw new Error("Missing courseId");

  const raw = formData.get("contentBlocks") as string;
  if (!raw) throw new Error("Missing content data");

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error("Invalid JSON in content data");
  }

  const validated = CourseContentSchema.parse(parsed);

  await prisma.course.update({
    where: { id: courseId },
    data: { contentBlocks: validated as Prisma.InputJsonValue },
  });

  const course = await prisma.course.findUnique({
    where: { id: courseId },
    select: { slug: true, titleEn: true },
  });

  await logAdminAction({
    actorUserId: authResult.userId!,
    actorRole: authResult.role,
    action: "courseContent.save",
    entityType: "Course",
    entityId: courseId,
    metadata: { titleEn: course?.titleEn },
  });

  const locale = localeFromFormData(formData);
  revalidatePath(`/${locale}/admin/courses/${courseId}/content`);
  revalidatePath(`/${locale}/courses`);
  if (course?.slug) {
    revalidatePath(`/${locale}/courses/${course.slug}`);
  }
}

export async function getCourseContent(
  courseId: string,
): Promise<CourseContent | null> {
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    select: { contentBlocks: true },
  });

  if (!course?.contentBlocks) return null;

  const parsed = CourseContentSchema.safeParse(course.contentBlocks);
  if (!parsed.success) return null;

  return parsed.data;
}
