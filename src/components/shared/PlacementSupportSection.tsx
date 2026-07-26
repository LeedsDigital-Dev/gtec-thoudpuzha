import Link from "next/link";
import Image from "next/image";
import { getMediaUrl } from "@/lib/media";
import type { PublicGalleryCategory } from "@/lib/gallery";

const PLACEMENT_SLUG = "placement-support";

export type PlacementData = {
  slug: string;
  items: PublicGalleryCategory["items"];
} | null;

export function PlacementSupportSection({
  data,
  heading,
  viewFullGallery,
  ctaHeading,
  ctaText,
  viewVacancies,
  hiringCta,
}: {
  data: PlacementData;
  heading: string;
  viewFullGallery: string;
  ctaHeading: string;
  ctaText: string;
  viewVacancies: string;
  hiringCta: string;
}) {
  if (!data || data.items.length === 0) return null;

  return (
    <section aria-labelledby="placement-support-heading" className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h2
            id="placement-support-heading"
            className="text-2xl font-bold"
          >
            {heading}
          </h2>
          <Link
            href={`/gallery?category=${PLACEMENT_SLUG}`}
            className="text-sm font-medium text-primary underline hover:no-underline"
          >
            {viewFullGallery}
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {data.items.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-square overflow-hidden rounded-lg bg-muted"
            >
              <Image
                src={getMediaUrl(item.url)}
                alt={item.captionEn ?? "Placement & Support image"}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
              />
              {item.captionEn && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                  <p className="truncate text-xs text-white">
                    {item.captionEn}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="mt-10 rounded-xl bg-primary/10 p-8 text-center">
          <h3 className="text-xl font-semibold">{ctaHeading}</h3>
          <p className="mt-2 text-muted-foreground">{ctaText}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/portal/jobs"
              className="inline-flex items-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              {viewVacancies}
            </Link>
            <Link
              href="/portal/employer/register"
              className="inline-flex items-center rounded-lg border border-border bg-background px-6 py-3 text-sm font-medium hover:bg-muted"
            >
              {hiringCta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
