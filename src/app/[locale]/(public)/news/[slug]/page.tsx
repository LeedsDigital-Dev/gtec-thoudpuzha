import { notFound } from "next/navigation";
import Link from "next/link";
import { getNewsEventBySlug } from "@/lib/news-events";

export const revalidate = 60;

interface NewsDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function NewsDetailPage({
  params,
}: NewsDetailPageProps) {
  const { slug } = await params;
  const item = await getNewsEventBySlug(slug);

  if (!item) {
    notFound();
  }

  function formatDate(date: Date | null): string {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href="/news"
        className="text-sm text-primary underline hover:no-underline"
      >
        &larr; Back to News &amp; Events
      </Link>

      <article className="mt-6">
        <p className="text-xs text-muted-foreground">
          {item.type === "NEWS" ? "News" : "Event"} &middot;{" "}
          {formatDate(item.publishedAt)}
        </p>
        <h1 className="mt-2 text-3xl font-bold">{item.titleEn}</h1>

        {item.coverImageUrl && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={item.coverImageUrl}
            alt={item.titleEn}
            className="mt-6 w-full rounded-lg object-cover"
          />
        )}

        {item.eventDate && (
          <p className="mt-4 text-sm font-medium">
            Event date: {formatDate(item.eventDate)}
          </p>
        )}

        <div className="mt-6 whitespace-pre-line leading-relaxed">
          {item.bodyEn}
        </div>
      </article>
    </main>
  );
}
