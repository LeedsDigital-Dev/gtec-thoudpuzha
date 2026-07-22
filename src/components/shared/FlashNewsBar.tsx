import { getLocale } from "next-intl/server";
import { getActiveFlashNews } from "@/lib/flash-news";

type Locale = "en" | "ml";

export async function FlashNewsBar() {
  const locale = (await getLocale()) as Locale;
  const items = await getActiveFlashNews(locale);

  if (items.length === 0) {
    return null;
  }

  return (
    <div
      className="bg-primary text-primary-foreground overflow-hidden whitespace-nowrap py-2 text-sm font-medium"
      aria-label="Flash news"
      role="region"
    >
      <div className="flash-marquee inline-block will-change-transform">
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
          {items.map((item) => (
            <span key={`dup-${item.id}`} className="inline-flex items-center">
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
        </span>
      </div>
    </div>
  );
}
