import Image from "next/image";
import { BookOpen } from "lucide-react";

interface CourseOverviewProps {
  overview: string | null;
  detailedContent?: string | null;
  detailedImage?: string | null;
  locale: string;
}

export function CourseOverview({
  overview,
  detailedContent,
  detailedImage,
  locale,
}: CourseOverviewProps) {
  const isMl = locale === "ml";
  const title = isMl ? "കോഴ്‌സിനെക്കുറിച്ച് സമഗ്ര വിവരണം" : "About This Course";

  if (!overview && !detailedContent && !detailedImage) {
    return null;
  }

  const paragraphs = detailedContent
    ? detailedContent.split("\n\n").filter(Boolean)
    : [];

  return (
    <section className="space-y-5 rounded-3xl border border-border/80 bg-card p-6 sm:p-8 lg:p-10 shadow-xs">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border/60 pb-5">
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
          <BookOpen className="size-5" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground font-medium mt-0.5">
            {isMl
              ? "കരിയർ വിജയത്തിനായുള്ള പ്രായോഗിക പഠന ലക്ഷ്യങ്ങൾ"
              : "Comprehensive overview and real-world career orientation"}
          </p>
        </div>
      </div>

      {/* Main Overview Text */}
      {overview && (
        <div className="text-base sm:text-[17px] text-muted-foreground leading-relaxed space-y-4 font-normal">
          <p className="break-words">{overview}</p>
        </div>
      )}

      {/* Detailed Content Paragraphs */}
      {paragraphs.length > 0 && (
        <div className="space-y-4 pt-2">
          {paragraphs.map((para, idx) => (
            <p
              key={idx}
              className="text-base text-muted-foreground leading-relaxed break-words"
            >
              {para}
            </p>
          ))}
        </div>
      )}

      {/* Detailed Image if provided in CMS */}
      {detailedImage && (
        <div className="pt-3">
          <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-2xl border border-border bg-muted">
            <Image
              src={detailedImage}
              alt="Course curriculum details"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
        </div>
      )}
    </section>
  );
}
