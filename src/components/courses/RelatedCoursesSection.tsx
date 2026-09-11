import Image from "next/image";
import { Link } from "@/lib/i18n/navigation";
import { Clock, ArrowRight, BookOpen, Sparkles } from "lucide-react";
import type { RelatedCourse } from "@/lib/courses";
import { getCourseFallbackImage, getMediaUrl } from "@/lib/media";

interface RelatedCoursesSectionProps {
  courses: RelatedCourse[];
  locale: string;
}

export function RelatedCoursesSection({
  courses,
  locale,
}: RelatedCoursesSectionProps) {
  const isMl = locale === "ml";
  const heading = isMl ? "സമാനമായ മറ്റ് കോഴ്‌സുകൾ" : "Explore Related Courses";
  const subtitle = isMl
    ? "നിങ്ങളുടെ കരിയർ ലക്ഷ്യങ്ങൾക്ക് അനുയോജ്യമായ മറ്റ് മുൻനിര കോഴ്‌സുകൾ"
    : "Discover industry-focused programs to enhance your technical & professional skills";

  if (!courses || courses.length === 0) return null;

  return (
    <section className="space-y-6 pt-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-border/60 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-0.5 text-xs font-bold text-primary mb-2">
            <Sparkles className="size-3 text-amber-500" />
            <span>{isMl ? "കൂടുതൽ കോഴ്‌സുകൾ" : "Recommended For You"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            {heading}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground font-medium mt-1">
            {subtitle}
          </p>
        </div>
        <Link
          href="/courses"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-primary hover:text-primary/80 transition-colors"
        >
          <span>{isMl ? "എല്ലാ കോഴ്‌സുകളും കാണുക" : "View All Courses"}</span>
          <ArrowRight className="size-4" />
        </Link>
      </div>

      {/* Grid of Related Course Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {courses.map((c) => {
          const title = isMl && c.titleMl ? c.titleMl : c.titleEn;
          const description = isMl && c.descriptionMl ? c.descriptionMl : c.descriptionEn;
          const categoryName = isMl && c.category?.nameMl ? c.category.nameMl : c.category?.nameEn || (isMl ? "പ്രൊഫഷണൽ" : "Professional");
          const duration = c.durationText || (isMl ? "3-6 മാസം" : "3–6 Months");

          const imageSrc = c.coverImageUrl
            ? getMediaUrl(c.coverImageUrl)
            : getCourseFallbackImage(c.slug, c.category?.nameEn);

          return (
            <div
              key={c.slug}
              className="group flex flex-col justify-between rounded-2xl border border-border/80 bg-card overflow-hidden shadow-xs transition-all duration-300 hover:shadow-xl hover:border-primary/40 hover:-translate-y-1"
            >
              <div>
                {/* Course Image */}
                <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-muted">
                  <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                  {/* Category Pill */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center rounded-md bg-background/90 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-foreground shadow-2xs border border-border/50">
                      {categoryName}
                    </span>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-3 right-3">
                    <span className="inline-flex items-center gap-1 rounded-md bg-black/60 backdrop-blur-md px-2 py-0.5 text-[11px] font-bold text-white">
                      <Clock className="size-3 text-amber-400" />
                      <span>{duration}</span>
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 space-y-2">
                  <h3 className="font-bold text-base sm:text-lg text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">
                    {title}
                  </h3>
                  {description && (
                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {description}
                    </p>
                  )}
                </div>
              </div>

              {/* Card Footer Link */}
              <div className="p-5 pt-0">
                <Link
                  href={`/courses/${c.slug}`}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-primary/25 bg-primary/5 py-2.5 text-xs sm:text-sm font-bold text-primary transition-all duration-200 hover:bg-primary hover:text-primary-foreground hover:shadow-xs group-hover:border-primary"
                >
                  <span>{isMl ? "കോഴ്‌സ് വിശദാംശങ്ങൾ" : "View Course"}</span>
                  <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
