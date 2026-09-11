import Image from "next/image";
import {
  Clock,
  Award,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/shared/icons/WhatsAppIcon";
import type { CourseWithCategory } from "@/lib/courses";
import { getCourseFallbackImage, getMediaUrl } from "@/lib/media";
import { deriveCourseLevel } from "@/lib/course-detail-helpers";

interface CourseHeroProps {
  course: CourseWithCategory;
  locale: string;
  tagline?: string | null;
  whatsappNumber?: string | null;
}

export function CourseHero({
  course,
  locale,
  tagline,
  whatsappNumber = "919544229992",
}: CourseHeroProps) {
  const isMl = locale === "ml";
  const title = isMl && course.titleMl ? course.titleMl : course.titleEn;
  const description = tagline || (isMl && course.descriptionMl ? course.descriptionMl : course.descriptionEn);
  const categoryName = isMl && course.category?.nameMl ? course.category.nameMl : course.category?.nameEn || (isMl ? "പ്രൊഫഷണൽ കോഴ്സ്" : "Professional Course");
  
  const duration = course.durationText || (isMl ? "3-6 മാസം" : "3–6 Months");
  const level = isMl ? (deriveCourseLevel(course).includes("Advanced") ? "തുടക്കക്കാർ & അഡ്വാൻസ്ഡ്" : "തുടക്കക്കാർക്കായി") : deriveCourseLevel(course);
  const certText = course.certifications && course.certifications.length > 0
    ? course.certifications[0]
    : "G-TEC Global";

  const imageSrc = course.coverImageUrl
    ? getMediaUrl(course.coverImageUrl)
    : getCourseFallbackImage(course.slug, course.category?.nameEn);

  const cleanPhone = (whatsappNumber || "919544229992").replace(/\D/g, "");
  const whatsappMsg = encodeURIComponent(
    `Hello G-TEC Thodupuzha, I would like to know more about admission for the course: ${course.titleEn}.`
  );
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${whatsappMsg}`;

  return (
    <section className="relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-primary/8 via-background to-muted/40 p-6 sm:p-8 lg:p-12 shadow-sm">
      {/* Background subtle glow decorations */}
      <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary/15 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" aria-hidden="true" />

      <div className="relative grid gap-8 lg:grid-cols-12 lg:gap-10 items-center">
        {/* Left Column (Hero Content) */}
        <div className="space-y-6 lg:col-span-7">
          {/* Category Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1 text-xs sm:text-sm font-bold tracking-wider text-primary uppercase shadow-2xs">
            <Sparkles className="size-3.5 text-amber-500 shrink-0" />
            <span>{categoryName}</span>
          </div>

          {/* Course Main Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[50px] font-black tracking-tight text-foreground leading-[1.15] break-words">
            {title}
          </h1>

          {/* Short Description */}
          {description && (
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl break-words">
              {description}
            </p>
          )}

          {/* Metadata Badges Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-2">
            <div className="flex items-center gap-2.5 rounded-xl border border-border/80 bg-card/80 p-2.5 sm:p-3 shadow-2xs">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Clock className="size-4.5" />
              </div>
              <div className="min-w-0">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80">
                  {isMl ? "കാലാവധി" : "Duration"}
                </span>
                <span className="block text-xs sm:text-sm font-bold text-foreground truncate">
                  {duration}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 rounded-xl border border-border/80 bg-card/80 p-2.5 sm:p-3 shadow-2xs">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <GraduationCap className="size-4.5" />
              </div>
              <div className="min-w-0">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80">
                  {isMl ? "ലെവൽ" : "Level"}
                </span>
                <span className="block text-xs sm:text-sm font-bold text-foreground truncate">
                  {level}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 rounded-xl border border-border/80 bg-card/80 p-2.5 sm:p-3 shadow-2xs">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <BookOpen className="size-4.5" />
              </div>
              <div className="min-w-0">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80">
                  {isMl ? "രീതി" : "Mode"}
                </span>
                <span className="block text-xs sm:text-sm font-bold text-foreground truncate">
                  {isMl ? "ലാബ് & തിയറി" : "Hands-On Lab"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 rounded-xl border border-border/80 bg-card/80 p-2.5 sm:p-3 shadow-2xs">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Award className="size-4.5 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="min-w-0">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80">
                  {isMl ? "സർട്ടിഫിക്കറ്റ്" : "Certificate"}
                </span>
                <span className="block text-xs sm:text-sm font-bold text-foreground truncate">
                  {certText}
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <a
              href="#admission-enquiry"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm sm:text-base font-bold text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>{isMl ? "ഇപ്പോൾ അഡ്മിഷൻ നേടൂ" : "Enroll Now"}</span>
              <ArrowRight className="size-4.5" />
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-3.5 text-sm sm:text-base font-bold text-emerald-700 dark:text-emerald-300 transition-all hover:bg-emerald-500/20 hover:border-emerald-500/50 hover:-translate-y-0.5"
            >
              <WhatsAppIcon className="size-4.5" />
              <span>{isMl ? "വാട്സ്ആപ്പിൽ ചോദിക്കൂ" : "WhatsApp Us"}</span>
            </a>
          </div>

          {/* Trust Value Strip */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 text-xs sm:text-sm font-semibold text-muted-foreground">
            <div className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>{isMl ? "100% പ്ലേസ്‌മെന്റ് പിന്തുണ" : "100% Placement Assistance"}</span>
            </div>
            <div className="inline-flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-primary shrink-0" />
              <span>{isMl ? "ഐഎസ്ഒ 9001:2015 അംഗീകാരം" : "ISO 9001:2015 Certified"}</span>
            </div>
            <div className="inline-flex items-center gap-1.5">
              <Sparkles className="size-4 text-amber-500 shrink-0" />
              <span>{isMl ? "ഫ്ലെക്സിബിൾ ബാച്ച് സമയം" : "Flexible Batch Timings"}</span>
            </div>
          </div>
        </div>

        {/* Right Column (Hero Visual Card) */}
        <div className="lg:col-span-5">
          <div className="relative group overflow-hidden rounded-2xl border border-border/80 bg-card p-2.5 shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-primary/40">
            <div className="relative h-64 sm:h-72 lg:h-80 w-full overflow-hidden rounded-xl bg-muted">
              <Image
                src={imageSrc}
                alt={title}
                fill
                priority
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

              {/* Floating Top Badge */}
              <div className="absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 rounded-full bg-background/90 backdrop-blur-md border border-border/60 px-3 py-1 text-xs font-bold text-foreground shadow-sm">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{isMl ? "അഡ്മിഷൻ ആരംഭിച്ചു" : "Admissions Open 2025-26"}</span>
              </div>

              {/* Bottom Card Overlay Details */}
              <div className="absolute bottom-3.5 inset-x-3.5 text-white">
                <div className="flex items-center justify-between text-xs font-semibold bg-black/40 backdrop-blur-md rounded-lg px-3 py-2 border border-white/10">
                  <span>{isMl ? "പ്രാക്ടിക്കൽ ലാബ് ട്രെയിനിംഗ്" : "Hands-On Lab Training"}</span>
                  <span className="text-amber-400 font-bold">{duration}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
