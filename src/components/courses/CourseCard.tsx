import { Link } from "@/lib/i18n/navigation";

interface CourseCardProps {
  slug: string;
  titleEn: string;
  titleMl: string | null;
  descriptionEn: string | null;
  descriptionMl: string | null;
  coverImageUrl: string | null;
  locale: string;
}

export function CourseCard({
  slug,
  titleEn,
  titleMl,
  descriptionEn,
  descriptionMl,
  coverImageUrl,
  locale,
}: CourseCardProps) {
  const title = locale === "ml" && titleMl ? titleMl : titleEn;
  const description = locale === "ml" && descriptionMl
    ? descriptionMl
    : descriptionEn;

  return (
    <Link
      href={`/courses/${slug}`}
      className="group rounded-lg border border-border overflow-hidden bg-card hover:shadow-md transition-shadow"
    >
      {coverImageUrl ? (
        <div className="h-48 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={coverImageUrl}
            alt={title}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="h-48 bg-muted flex items-center justify-center">
          <span className="text-muted-foreground text-sm">No image</span>
        </div>
      )}
      <div className="p-4">
        <h2 className="font-semibold text-lg group-hover:text-primary transition-colors">
          {title}
        </h2>
        {description && (
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        )}
      </div>
    </Link>
  );
}
