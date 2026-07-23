import Link from "next/link";

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
    <section className="bg-muted/30 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold">{heading}</h2>
          <Link
            href="/news"
            className="text-sm font-medium text-primary underline hover:no-underline"
          >
            {viewAll}
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {newsItems.map((item) => (
            <Link
              key={item.id}
              href={`/news/${item.slug}`}
              className="block rounded border border-border bg-background p-4 transition-shadow hover:shadow-md"
            >
              <p className="text-xs text-muted-foreground">
                {formatDate(item.publishedAt)}
              </p>
              <h3 className="mt-1 line-clamp-2 text-sm font-medium">
                {pickLocalizedText({ en: item.titleEn, ml: item.titleMl }, locale)}
              </h3>
            </Link>
          ))}

          {nextEvent && (
            <Link
              key={nextEvent.id}
              href={`/news/${nextEvent.slug}`}
              className="block rounded border border-border bg-background p-4 transition-shadow hover:shadow-md"
            >
              <p className="text-xs font-semibold text-primary">{upcomingEventLabel}</p>
              <h3 className="mt-1 line-clamp-2 text-sm font-medium">
                {pickLocalizedText({ en: nextEvent.titleEn, ml: nextEvent.titleMl }, locale)}
              </h3>
              {nextEvent.eventDate && (
                <p className="mt-1 text-xs text-muted-foreground">
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
