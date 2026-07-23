import { prisma } from "@/lib/db";
import type { Course, CourseCategory } from "@prisma/client";

export type PublicCourse = Pick<
  Course,
  | "id"
  | "slug"
  | "titleEn"
  | "titleMl"
  | "descriptionEn"
  | "descriptionMl"
  | "durationText"
  | "certifications"
  | "careerOutcomesEn"
  | "careerOutcomesMl"
  | "coverImageUrl"
  | "featured"
> & {
  category: Pick<CourseCategory, "id" | "nameEn" | "nameMl"> | null;
};

export async function getPublishedCourses(): Promise<PublicCourse[]> {
  const courses = await prisma.course.findMany({
    where: { status: "PUBLISHED" },
    include: {
      category: {
        select: { id: true, nameEn: true, nameMl: true },
      },
    },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });

  return courses.map(
    ({ syllabus: _syllabus, status: _status, ...rest }) => rest,
  );
}

export type CourseWithCategory = Course & {
  category: CourseCategory | null;
};

export async function getCourseBySlug(
  slug: string,
): Promise<CourseWithCategory | null> {
  const course = await prisma.course.findUnique({
    where: { slug },
    include: { category: true },
  });

  return course;
}
