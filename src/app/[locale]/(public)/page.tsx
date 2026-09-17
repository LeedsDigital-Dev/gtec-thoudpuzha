import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { HeroSection } from "@/components/shared/HeroSection";
import { HeroVisualCollage } from "@/components/shared/HeroVisualCollage";
import { AtAGlanceSection } from "@/components/shared/AtAGlanceSection";
import { AboutSection } from "@/components/shared/AboutSection";
import { WhyChooseUsSection } from "@/components/shared/WhyChooseUsSection";
import { PlacementSupportSection } from "@/components/shared/PlacementSupportSection";
import { CertificationPartnerStrip } from "@/components/shared/CertificationPartnerStrip";
import { EventsSection } from "@/components/shared/EventsSection";
import { FeaturedCoursesSection } from "@/components/shared/FeaturedCoursesSection";
import type { Locale } from "@/lib/site-settings";
import {
  getCachedSiteSettings,
  getCachedPublishedCourses,
  getCachedPlacementGalleryData,
  getCachedCertificationPartners,
  getCachedUpcomingEvents,
} from "@/lib/data-cache";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale: localeStr } = await params;
  const locale = localeStr as Locale;

  const [settings, courses, placementData, certPartners, events] =
    await Promise.all([
      getCachedSiteSettings(),
      getCachedPublishedCourses(),
      getCachedPlacementGalleryData(),
      getCachedCertificationPartners(),
      getCachedUpcomingEvents(3),
    ]);

  const [heroT, aboutT, atAGlanceT, whyT, placementT, certT] =
    await Promise.all([
      getTranslations({ locale, namespace: "hero" }),
      getTranslations({ locale, namespace: "about" }),
      getTranslations({ locale, namespace: "atAGlance" }),
      getTranslations({ locale, namespace: "whyChooseUs" }),
      getTranslations({ locale, namespace: "placementSupport" }),
      getTranslations({ locale, namespace: "certPartners" }),
    ]);

  return (
    <main className="relative flex flex-col w-full">
      {/* Hero & Visual Showcase Section */}
      <section className="relative overflow-hidden py-8 sm:py-10 lg:py-14">
        {/* Dynamic Blue Waves Background Image with Smooth Bottom Fade to White/Background */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none bg-sky-50/40 dark:bg-slate-950/40 [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)]"
          aria-hidden="true"
        >
          <Image
            src="/images/hero-waves-bg.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-bottom sm:object-center opacity-45 dark:opacity-20"
          />
          {/* Ambient gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/5 via-sky-100/15 via-40% to-background" />
        </div>

        {/* Seamless bottom fade overlay ensuring the entire bottom edge cleanly melts into white/background with no sharp line */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 sm:h-40 lg:h-48 bg-gradient-to-t from-background via-background/85 to-transparent -z-10"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-10 xl:gap-12">
            {/* Left Content Column (Preserving all text, buttons, and trust points) */}
            <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center z-10">
              <HeroSection
                locale={locale}
                t={{
                  badge: heroT("badge"),
                  headline: heroT("headline"),
                  subhead: heroT("subhead"),
                  applyNow: heroT("applyNow"),
                  whatsappUs: heroT("whatsappUs"),
                  callNow: heroT("callNow"),
                }}
              />
            </div>

            {/* Right Visual Collage Column (3-Image Cohesive Modern Tech Composition) */}
            <div className="relative lg:col-span-6 xl:col-span-7 flex items-center justify-center lg:justify-end">
              <HeroVisualCollage priority={true} />
            </div>
          </div>
        </div>
      </section>

      {/* Numerical Highlights */}
      <AtAGlanceSection
        heading={atAGlanceT("heading")}
        settings={settings}
      />

      {/* Featured Courses Showcase */}
      <FeaturedCoursesSection courses={courses} locale={locale} />

      {/* About Institution */}
      <AboutSection
        settings={settings}
        locale={locale}
        heading={aboutT("heading")}
        photoPlaceholder={aboutT("photoPlaceholder")}
      />

      {/* Why Choose Us */}
      <WhyChooseUsSection
        heading={whyT("heading")}
        settings={settings}
        locale={locale}
      />

      {/* Certification Partners */}
      <CertificationPartnerStrip
        heading={certT("heading")}
        partners={certPartners}
      />

      {/* Campus Happenings & Upcoming Events */}
      <EventsSection events={events} locale={locale} />

      {/* Placement Support & Student Success */}
      <PlacementSupportSection
        data={placementData}
        heading={placementT("heading")}
        viewFullGallery={placementT("viewFullGallery")}
        ctaHeading={placementT("ctaHeading")}
        ctaText={placementT("ctaText")}
        viewVacancies={placementT("viewVacancies")}
        hiringCta={placementT("hiringCta")}
        locale={locale}
      />
    </main>
  );
}

