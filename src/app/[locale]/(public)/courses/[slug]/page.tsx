import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { getCourseBySlug, getRelatedCourses, getCourseSlugs } from "@/lib/courses";
import { CoursePageContent } from "@/components/courses/CoursePageContent";
import { EnquiryForm } from "@/components/shared/EnquiryForm";
import { getPublishedCourses } from "@/lib/courses";
import { Link } from "@/lib/i18n/navigation";
import type { CourseContent } from "@/lib/course-content.types";
import { getMediaUrl } from "@/lib/media";

interface CourseDetailProps {
  params: Promise<{ locale: string; slug: string }>;
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getCourseSlugs();
  return slugs.map((slug) => ({ slug }));
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
      ? { images: [getMediaUrl(course.coverImageUrl)] }
      : undefined,
  };
}

export default async function CourseDetailPage({ params }: CourseDetailProps) {
  const { locale, slug } = await params;
  const [course, allCourses, relatedCourses] = await Promise.all([
    getCourseBySlug(slug),
    getPublishedCourses(),
    getRelatedCourses(slug, 3),
  ]);

  if (!course || course.status !== "PUBLISHED") {
    notFound();
  }

  const contentBlocks = course.contentBlocks as unknown as CourseContent | null;

  return (
    <main className="py-6 sm:py-10 px-4 sm:px-6 max-w-4xl mx-auto w-full max-w-full overflow-x-hidden">
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
            {relatedCourses.map((c) => (
              <Link
                key={c.slug}
                href={`/courses/${c.slug}`}
                className="rounded-lg border border-border p-4 hover:shadow-md transition-shadow"
              >
                {c.coverImageUrl ? (
                  <div className="relative h-40 w-full mb-3 rounded-md overflow-hidden bg-muted">
                    <Image
                      src={getMediaUrl(c.coverImageUrl)}
                      alt={c.titleEn}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                ) : (
                  <div className="h-40 w-full bg-muted rounded-md mb-3 flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">No image</span>
                  </div>
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
