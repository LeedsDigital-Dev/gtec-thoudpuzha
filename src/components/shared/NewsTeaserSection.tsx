import Link from "next/link";
import { CalendarDays, Newspaper, ArrowRight, Sparkles } from "lucide-react";

interface TeaserItem {
  id: string;
  type: "NEWS" | "EVENT";
  titleEn: string;
  titleMl: string | null;
  slug: string;
  publishedAt: Date | string | null;
  eventDate: Date | string | null;
}

interface NewsTeaserSectionProps {
  teaser: {
    newsItems: TeaserItem[];
    nextEvent: TeaserItem | null;
  };
  heading: string;
  viewAll: string;
  upcomingEventLabel: string;
  locale: "en" | "ml";
}

function formatDate(date: Date | string | null | undefined): string {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  if (!(d instanceof Date) || isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function pickLocalizedText(
  localized: { en: string; ml?: string | null },
  locale: "en" | "ml",
): string {
  return locale === "ml" && localized.ml ? localized.ml : localized.en;
}

export function NewsTeaserSection({
  teaser,
  heading,
  viewAll,
  upcomingEventLabel,
  locale,
}: NewsTeaserSectionProps) {
  const { newsItems, nextEvent } = teaser;

  if (newsItems.length === 0 && !nextEvent) return null;

  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 sm:mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-2.5">
              <Sparkles className="size-3 text-amber-500" />
              <span>Campus Buzz</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-foreground">
              {heading}
            </h2>
          </div>
          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-primary hover:text-primary/80 group self-start sm:self-auto transition-colors"
          >
            <span>{viewAll}</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {newsItems.map((item) => (
            <Link
              key={item.id}
              href={`/news/${item.slug}`}
              className="group relative flex flex-col justify-between rounded-2xl border border-border/70 bg-card p-5 sm:p-6 shadow-xs transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/40"
            >
              <div>
                <div className="mb-3.5 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                    <Newspaper className="size-3 text-primary" />
                    <span>News</span>
                  </span>
                  {item.publishedAt && (
                    <span className="text-[11px] font-medium text-muted-foreground">
                      {formatDate(item.publishedAt)}
                    </span>
                  )}
                </div>
                <h3 className="line-clamp-3 text-sm sm:text-base font-bold leading-snug text-foreground group-hover:text-primary transition-colors">
                  {pickLocalizedText({ en: item.titleEn, ml: item.titleMl }, locale)}
                </h3>
              </div>

              <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-primary opacity-80 group-hover:opacity-100">
                <span>Read article</span>
                <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}

          {nextEvent && (
            <Link
              key={nextEvent.id}
              href={`/news/${nextEvent.slug}`}
              className="group relative flex flex-col justify-between rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-5 sm:p-6 shadow-xs transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/60"
            >
              <div>
                <div className="mb-3.5 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground">
                    <CalendarDays className="size-3 text-amber-300" />
                    <span>{upcomingEventLabel}</span>
                  </span>
                  {nextEvent.eventDate && (
                    <span className="text-[11px] font-semibold text-primary">
                      {formatDate(nextEvent.eventDate)}
                    </span>
                  )}
                </div>
                <h3 className="line-clamp-3 text-sm sm:text-base font-bold leading-snug text-foreground group-hover:text-primary transition-colors">
                  {pickLocalizedText({ en: nextEvent.titleEn, ml: nextEvent.titleMl }, locale)}
                </h3>
              </div>

              <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-primary group-hover:underline">
                <span>Event details</span>
                <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

