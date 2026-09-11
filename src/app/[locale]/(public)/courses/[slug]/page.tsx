import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getCourseBySlug, getRelatedCourses, getPublishedCourses } from "@/lib/courses";
import { getCachedSiteSettings } from "@/lib/data-cache";
import { getMediaUrl, getCourseFallbackImage } from "@/lib/media";
import type { CourseContent } from "@/lib/course-content.types";
import {
  getCourseHighlights,
  getWhatYoullLearn,
  getCurriculumModules,
  getSkillsGained,
  getCareerOpportunities,
  getWhoCanJoin,
  getWhyChooseGtecFeatures,
} from "@/lib/course-detail-helpers";

import { CourseBreadcrumb } from "@/components/courses/CourseBreadcrumb";
import { CourseHero } from "@/components/courses/CourseHero";
import { CourseHighlights } from "@/components/courses/CourseHighlights";
import { CourseOverview } from "@/components/courses/CourseOverview";
import { WhatYoullLearn } from "@/components/courses/WhatYoullLearn";
import { CourseCurriculum } from "@/components/courses/CourseCurriculum";
import { SkillsGained } from "@/components/courses/SkillsGained";
import { CareerOpportunities } from "@/components/courses/CareerOpportunities";
import { WhoCanJoin } from "@/components/courses/WhoCanJoin";
import { WhyChooseGtec } from "@/components/courses/WhyChooseGtec";
import { RelatedCoursesSection } from "@/components/courses/RelatedCoursesSection";
import { CourseCTA } from "@/components/courses/CourseCTA";
import { CourseQuickEnquiry } from "@/components/courses/CourseQuickEnquiry";

interface CourseDetailProps {
  params: Promise<{ locale: string; slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: CourseDetailProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course || course.status !== "PUBLISHED") {
    const tErr = await getTranslations({ locale, namespace: "errors" });
    return { title: tErr("title") };
  }

  const title = `${course.titleEn} | G-TEC Education Thodupuzha`;
  const description =
    course.descriptionEn ||
    `Enroll in ${course.titleEn} at G-TEC Education Thodupuzha. Comprehensive training with practical lab sessions, certified trainers, and 100% placement assistance.`;

  const ogImage = course.coverImageUrl
    ? getMediaUrl(course.coverImageUrl)
    : getCourseFallbackImage(course.slug, course.category?.nameEn);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function CourseDetailPage({ params }: CourseDetailProps) {
  const { locale, slug } = await params;

  const [course, allCourses, siteSettings] = await Promise.all([
    getCourseBySlug(slug),
    getPublishedCourses(),
    getCachedSiteSettings().catch(() => null),
  ]);

  if (!course || course.status !== "PUBLISHED") {
    notFound();
  }

  // Fetch related courses prioritizing the same category
  const relatedCourses = await getRelatedCourses(slug, 3, course.categoryId);

  const contentBlocks = course.contentBlocks as unknown as CourseContent | null;

  // Bilingual text selection
  const isMl = locale === "ml";
  const displayTitle = isMl && course.titleMl ? course.titleMl : course.titleEn;
  const heroTagline = isMl && contentBlocks?.heroTaglineMl
    ? contentBlocks.heroTaglineMl
    : contentBlocks?.heroTaglineEn;

  const overviewText = isMl && contentBlocks?.overviewMl
    ? contentBlocks.overviewMl
    : contentBlocks?.overviewEn || (isMl ? course.descriptionMl : course.descriptionEn);

  const detailedContentText = isMl && contentBlocks?.detailedContentMl
    ? contentBlocks.detailedContentMl
    : contentBlocks?.detailedContentEn;

  // Extract structured highlights and enriched data
  const highlights = getCourseHighlights(course, locale);
  const whatYoullLearn = getWhatYoullLearn(course, contentBlocks, locale);
  const curriculumModules = getCurriculumModules(course, contentBlocks, locale);
  const skills = getSkillsGained(course);
  const careerRoles = getCareerOpportunities(course, locale);
  const audience = getWhoCanJoin(locale);
  const whyChooseFeatures = getWhyChooseGtecFeatures(locale);

  const whatsappNumber = siteSettings?.whatsappNumber || "919544229992";

  return (
    <main className="min-h-screen bg-background pb-16 sm:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10 pt-2 sm:pt-4">
        {/* 1. Breadcrumb Navigation */}
        <CourseBreadcrumb courseTitle={displayTitle} locale={locale} />

        {/* 2. Course Hero Section */}
        <CourseHero
          course={course}
          locale={locale}
          tagline={heroTagline}
          whatsappNumber={whatsappNumber}
        />

        {/* 3. Course Highlights Cards Strip (4 Cards) */}
        <CourseHighlights highlights={highlights} />

        {/* 4. Main 2-Column Content + Sticky Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start pt-2">
          {/* Main Content Column (8 cols on desktop) */}
          <div className="lg:col-span-8 space-y-8 sm:space-y-10">
            {/* Course Overview */}
            <CourseOverview
              overview={overviewText}
              detailedContent={detailedContentText}
              detailedImage={contentBlocks?.detailedContentImageUrl}
              locale={locale}
            />

            {/* What You'll Learn */}
            <WhatYoullLearn outcomes={whatYoullLearn} locale={locale} />

            {/* Course Curriculum & Syllabus */}
            <CourseCurriculum
              modules={curriculumModules}
              courseLists={contentBlocks?.courseLists}
              locale={locale}
            />

            {/* Skills You'll Gain */}
            <SkillsGained skills={skills} locale={locale} />

            {/* Career Opportunities */}
            <CareerOpportunities roles={careerRoles} locale={locale} />

            {/* Who Can Join */}
            <WhoCanJoin audience={audience} locale={locale} />

            {/* Why Choose G-TEC */}
            <WhyChooseGtec features={whyChooseFeatures} locale={locale} />
          </div>

          {/* Sticky Sidebar Column (4 cols on desktop) */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <CourseQuickEnquiry
              courseId={course.id}
              courseTitle={displayTitle}
              courses={allCourses}
              locale={locale}
              whatsappNumber={whatsappNumber}
            />
          </aside>
        </div>

        {/* 5. Related Courses Grid */}
        <RelatedCoursesSection courses={relatedCourses} locale={locale} />

        {/* 6. Final Call To Action Banner */}
        <CourseCTA
          courseTitle={displayTitle}
          locale={locale}
          whatsappNumber={whatsappNumber}
        />
      </div>
    </main>
  );
}
