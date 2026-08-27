import { getLocale } from "next-intl/server";
import { getActiveFlashNews } from "@/lib/flash-news";
import type { PublicFlashNewsItem } from "@/lib/flash-news";

type Locale = "en" | "ml";

export async function FlashNewsBar({
  items: providedItems,
}: {
  items?: PublicFlashNewsItem[];
} = {}) {
  const locale = (await getLocale()) as Locale;
  const items = providedItems ?? (await getActiveFlashNews(locale));

  if (items.length === 0) {
    return null;
  }

  return (
    <div
      className="relative w-full max-w-full overflow-x-hidden bg-primary text-primary-foreground py-2 text-sm font-medium"
      aria-label="Flash news"
      role="region"
    >
      <div className="flash-marquee flex items-center whitespace-nowrap will-change-transform max-w-full">
        <span className="inline-flex items-center gap-8 px-4">
          {items.map((item) => (
            <span key={item.id} className="inline-flex items-center">
              {item.link ? (
                <a
                  href={item.link}
                  className="underline underline-offset-2 hover:opacity-90"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.text}
                </a>
              ) : (
                item.text
              )}
            </span>
          ))}
          <span aria-hidden="true">•</span>
          <span aria-hidden="true">
            {items.map((item) => (
              <span key={`dup-${item.id}`} className="inline-flex items-center">
                {item.link ? (
                  <a
                    href={item.link}
                    className="underline underline-offset-2 hover:opacity-90"
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    {item.text}
                  </a>
                ) : (
                  item.text
                )}
              </span>
            ))}
          </span>
        </span>
      </div>
    </div>
  );
}
