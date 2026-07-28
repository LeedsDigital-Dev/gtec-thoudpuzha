import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getPublishedCourses } from "@/lib/courses";
import { CourseCard } from "@/components/courses/CourseCard";

interface CoursesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: CoursesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  return {
    title: `${t("courses")} | GTEC Thodupuzha`,
    description: "Browse our professional courses and training programs",
  };
}

export default async function CoursesPage({ params }: CoursesPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  const courses = await getPublishedCourses();

  return (
    <main className="py-12 px-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">
        {t("courses")}
      </h1>

      {courses.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">
          No courses available at the moment. Check back soon.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              slug={course.slug}
              titleEn={course.titleEn}
              titleMl={course.titleMl}
              descriptionEn={course.descriptionEn}
              descriptionMl={course.descriptionMl}
              coverImageUrl={course.coverImageUrl}
              locale={locale}
            />
          ))}
        </div>
      )}
    </main>
  );
}
