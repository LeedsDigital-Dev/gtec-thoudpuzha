import { prisma } from "@/lib/db";
import type { ResourceType } from "@prisma/client";

export async function getStudentResourcePages(
  studentProfileId: string,
  type: ResourceType,
) {
  const enrollments = await prisma.studentCourseEnrollment.findMany({
    where: { studentProfileId },
    select: { courseId: true },
  });

  if (enrollments.length === 0) return { resources: [], enrolledCourses: [] };

  const courseIds = enrollments.map((e) => e.courseId);

  const [resources, courses] = await Promise.all([
    prisma.academicResource.findMany({
      where: { courseId: { in: courseIds }, type },
      orderBy: { uploadedAt: "desc" },
    }),
    prisma.course.findMany({
      where: { id: { in: courseIds } },
      select: { id: true, titleEn: true },
    }),
  ]);

  return { resources, enrolledCourses: courses };
}
