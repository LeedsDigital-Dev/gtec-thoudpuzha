import Image from "next/image";
import { getLocalizedAbout, type Locale, type SiteSettingsWithCards } from "@/lib/site-settings";

interface AboutSectionProps {
  settings: SiteSettingsWithCards;
  locale: Locale;
  heading: string;
  photoPlaceholder: string;
}

export async function AboutSection({ settings, locale, heading, photoPlaceholder }: AboutSectionProps) {
  const about = getLocalizedAbout(settings, locale);

  return (
    <section aria-labelledby="about-heading" className="py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          id="about-heading"
          className="text-center text-3xl font-bold tracking-tight"
        >
          {heading}
        </h2>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {about.photoUrl ? (
            <div className="relative aspect-video overflow-hidden rounded-2xl shadow-lg">
              <Image
                src={about.photoUrl}
                alt="G-TEC Thodupuzha centre"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          ) : (
            <div className="flex aspect-video items-center justify-center rounded-2xl bg-muted text-muted-foreground shadow-inner">
              {photoPlaceholder}
            </div>
          )}
          <div className="flex flex-col justify-center">
            <p className="text-lg leading-relaxed text-muted-foreground lg:text-xl">
              {about.body}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
