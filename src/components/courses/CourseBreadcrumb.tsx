import { Link } from "@/lib/i18n/navigation";
import { ChevronRight, Home } from "lucide-react";

interface CourseBreadcrumbProps {
  courseTitle: string;
  locale: string;
}

export function CourseBreadcrumb({
  courseTitle,
  locale,
}: CourseBreadcrumbProps) {
  const isMl = locale === "ml";
  const homeLabel = isMl ? "ഹോം" : "Home";
  const coursesLabel = isMl ? "കോഴ്‌സുകൾ" : "Courses";

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground/80 py-3"
    >
      <Link
        href="/"
        className="inline-flex items-center gap-1 hover:text-primary transition-colors font-medium"
      >
        <Home className="size-3.5" />
        <span>{homeLabel}</span>
      </Link>

      <ChevronRight className="size-3.5 text-muted-foreground/50 shrink-0" aria-hidden="true" />

      <Link
        href="/courses"
        className="hover:text-primary transition-colors font-medium"
      >
        {coursesLabel}
      </Link>

      <ChevronRight className="size-3.5 text-muted-foreground/50 shrink-0" aria-hidden="true" />

      <span
        className="font-semibold text-foreground truncate max-w-[200px] sm:max-w-md"
        aria-current="page"
      >
        {courseTitle}
      </span>
    </nav>
  );
}
