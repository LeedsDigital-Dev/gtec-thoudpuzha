import Link from "next/link";
import { CalendarDays, Newspaper } from "lucide-react";

interface TeaserItem {
  id: string;
  type: "NEWS" | "EVENT";
  titleEn: string;
  titleMl: string | null;
  slug: string;
  publishedAt: Date | null;
  eventDate: Date | null;
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

function formatDate(date: Date | null): string {
  if (!date) return "";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function pickLocalizedText(
  localized: { en: string; ml?: string | null },
  locale: "en" | "ml",
): string {
  return locale === "ml" && localized.ml ? localized.ml : localized.en;
}

export function NewsTeaserSection({ teaser, heading, viewAll, upcomingEventLabel, locale }: NewsTeaserSectionProps) {
  const { newsItems, nextEvent } = teaser;

  if (newsItems.length === 0 && !nextEvent) return null;

  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">{heading}</h2>
          <Link
            href="/news"
            className="text-sm font-semibold text-primary hover:underline"
          >
            {viewAll} →
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {newsItems.map((item) => (
            <Link
              key={item.id}
              href={`/news/${item.slug}`}
              className="group flex flex-col rounded-xl border border-border bg-background p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="mb-3 flex items-center gap-2">
                <Newspaper className="size-4 text-muted-foreground" />
                <p className="text-xs font-medium text-muted-foreground">
                  {formatDate(item.publishedAt)}
                </p>
              </div>
              <h3 className="line-clamp-2 flex-1 text-sm font-semibold leading-snug group-hover:text-primary transition-colors">
                {pickLocalizedText({ en: item.titleEn, ml: item.titleMl }, locale)}
              </h3>
            </Link>
          ))}

          {nextEvent && (
            <Link
              key={nextEvent.id}
              href={`/news/${nextEvent.slug}`}
              className="group flex flex-col rounded-xl border-2 border-primary/20 bg-primary/5 p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 hover:border-primary/30"
            >
              <div className="mb-3 flex items-center gap-2">
                <CalendarDays className="size-4 text-primary" />
                <p className="text-xs font-semibold text-primary">{upcomingEventLabel}</p>
              </div>
              <h3 className="line-clamp-2 flex-1 text-sm font-semibold leading-snug group-hover:text-primary transition-colors">
                {pickLocalizedText({ en: nextEvent.titleEn, ml: nextEvent.titleMl }, locale)}
              </h3>
              {nextEvent.eventDate && (
                <p className="mt-2 text-xs font-medium text-muted-foreground">
                  {formatDate(nextEvent.eventDate)}
                </p>
              )}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
