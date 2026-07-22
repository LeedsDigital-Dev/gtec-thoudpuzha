import Image from "next/image";
import { getLocalizedAbout, type Locale, type SiteSettingsWithCards } from "@/lib/site-settings";

interface AboutSectionProps {
  settings: SiteSettingsWithCards;
  locale: Locale;
}

export function AboutSection({ settings, locale }: AboutSectionProps) {
  const about = getLocalizedAbout(settings, locale);

  return (
    <section aria-labelledby="about-heading" className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          id="about-heading"
          className="text-center text-3xl font-bold tracking-tight"
        >
          About G-TEC Thodupuzha
        </h2>
        <div className="mt-10 grid items-center gap-10 lg:grid-cols-2">
          {about.photoUrl ? (
            <div className="relative aspect-video overflow-hidden rounded-xl">
              <Image
                src={about.photoUrl}
                alt="G-TEC Thodupuzha centre"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          ) : (
            <div className="flex aspect-video items-center justify-center rounded-xl bg-muted text-muted-foreground">
              Centre photo placeholder
            </div>
          )}
          <p className="text-lg leading-relaxed text-muted-foreground">
            {about.body}
          </p>
        </div>
      </div>
    </section>
  );
}
