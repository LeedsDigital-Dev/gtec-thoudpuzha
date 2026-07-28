import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCourseBySlug } from "@/lib/courses";
import { CoursePageContent } from "@/components/courses/CoursePageContent";
import { EnquiryForm } from "@/components/shared/EnquiryForm";
import { getPublishedCourses } from "@/lib/courses";
import { Link } from "@/lib/i18n/navigation";
import type { CourseContent } from "@/lib/course-content.types";

interface CourseDetailProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({
  params,
}: CourseDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course || course.status !== "PUBLISHED") {
    return { title: "Course Not Found" };
  }
  return {
    title: `${course.titleEn} | GTEC Thodupuzha`,
    description: course.descriptionEn ?? undefined,
    openGraph: course.coverImageUrl
      ? { images: [course.coverImageUrl] }
      : undefined,
  };
}

export default async function CourseDetailPage({ params }: CourseDetailProps) {
  const { locale, slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course || course.status !== "PUBLISHED") {
    notFound();
  }

  const contentBlocks = course.contentBlocks as unknown as CourseContent | null;

  const allCourses = await getPublishedCourses();
  const relatedCourses = allCourses.filter((c) => c.slug !== slug);

  return (
    <main className="py-8 px-4 max-w-4xl mx-auto">
      <CoursePageContent
        titleEn={course.titleEn}
        titleMl={course.titleMl}
        descriptionEn={course.descriptionEn}
        descriptionMl={course.descriptionMl}
        coverImageUrl={course.coverImageUrl}
        contentBlocks={contentBlocks}
        locale={locale}
      />

      {/* Enquiry CTA */}
      <section className="mt-16 max-w-xl mx-auto space-y-6">
        <h2 className="text-xl font-semibold text-center">
          Interested in this course?
        </h2>
        <EnquiryForm
          source={`course-${slug}`}
          courses={allCourses}
        />
      </section>

      {/* Related Courses */}
      {relatedCourses.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Explore More Courses
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedCourses.slice(0, 3).map((c) => (
              <Link
                key={c.id}
                href={`/courses/${c.slug}`}
                className="rounded-lg border border-border p-4 hover:shadow-md transition-shadow"
              >
                {c.coverImageUrl && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={c.coverImageUrl}
                    alt={c.titleEn}
                    className="h-40 w-full object-cover rounded-md mb-3"
                    loading="lazy"
                  />
                )}
                <h3 className="font-medium">
                  {locale === "ml" && c.titleMl ? c.titleMl : c.titleEn}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
