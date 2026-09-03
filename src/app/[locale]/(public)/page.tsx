import Image from "next/image";
import { getTranslations } from "next-intl/server";
import dynamic from "next/dynamic";
import { HeroSection } from "@/components/shared/HeroSection";
import { AtAGlanceSection } from "@/components/shared/AtAGlanceSection";
import { AboutSection } from "@/components/shared/AboutSection";
import { WhyChooseUsSection } from "@/components/shared/WhyChooseUsSection";
import { PlacementSupportSection } from "@/components/shared/PlacementSupportSection";
import { CertificationPartnerStrip } from "@/components/shared/CertificationPartnerStrip";
import type { Locale } from "@/lib/site-settings";
import {
  getCachedSiteSettings,
  getCachedPublishedCourses,
  getCachedHomepageTeaser,
  getCachedPlacementGalleryData,
  getCachedCertificationPartners,
} from "@/lib/data-cache";
import { NewsTeaserSection } from "@/components/shared/NewsTeaserSection";

const ContactSection = dynamic(
  () =>
    import("@/components/shared/ContactSection").then(
      (mod) => mod.ContactSection,
    ),
  {
    loading: () => <div className="h-96 bg-muted/40 animate-pulse" />,
  },
);

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale: localeStr } = await params;
  const locale = localeStr as Locale;

  const [settings, courses, teaser, placementData, certPartners] =
    await Promise.all([
      getCachedSiteSettings(),
      getCachedPublishedCourses(),
      getCachedHomepageTeaser(),
      getCachedPlacementGalleryData(),
      getCachedCertificationPartners(),
    ]);

  const [heroT, aboutT, atAGlanceT, whyT, placementT, newsT, certT] =
    await Promise.all([
      getTranslations({ locale, namespace: "hero" }),
      getTranslations({ locale, namespace: "about" }),
      getTranslations({ locale, namespace: "atAGlance" }),
      getTranslations({ locale, namespace: "whyChooseUs" }),
      getTranslations({ locale, namespace: "placementSupport" }),
      getTranslations({ locale, namespace: "newsTeaser" }),
      getTranslations({ locale, namespace: "certPartners" }),
    ]);

  return (
    <main className="relative flex flex-col w-full min-h-screen">
      {/* Hero & Visual Showcase Section */}
      <section className="relative overflow-hidden py-8 sm:py-12 lg:py-16">
        {/* Exact Graphic Background matching reference (Solid Blue Curved Backdrop, Dotted Matrix, Bottom Sweeping Arc, Sparkle Star) */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none"
          aria-hidden="true"
        >
          {/* Top-Right Large Solid Royal Blue Circular Backdrop */}
          <div
            className="absolute -top-20 -right-28 sm:-top-28 sm:-right-36 lg:-top-36 lg:-right-44 w-[480px] h-[480px] sm:w-[580px] sm:h-[580px] lg:w-[720px] lg:h-[720px] rounded-full bg-[#0052cc] dark:bg-[#0047ab] transition-all"
            style={{
              clipPath: "ellipse(100% 100% at 85% 15%)",
            }}
          />

          {/* Dotted Grid Accent on the Right Edge */}
          <div className="absolute right-2 top-[24%] sm:right-5 sm:top-[26%] lg:right-6 lg:top-[28%] w-24 h-48 sm:w-28 sm:h-56 z-0">
            <svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
              <pattern id="ref-hero-dots" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
                <circle cx="2.5" cy="2.5" r="1.5" fill="#ffffff" fillOpacity="0.45" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#ref-hero-dots)" />
            </svg>
          </div>

          {/* Bottom-Right Sweeping Blue Curved Arc */}
          <div
            className="absolute -bottom-28 right-[4%] sm:-bottom-36 sm:right-[6%] lg:-bottom-44 lg:right-[8%] w-[360px] h-[360px] sm:w-[460px] sm:h-[460px] lg:w-[560px] lg:h-[560px] rounded-full bg-[#0052cc] dark:bg-[#0047ab]"
            style={{
              clipPath: "ellipse(100% 100% at 75% 85%)",
            }}
          />

          {/* 4-Point Diamond Sparkle Star (Bottom Right) */}
          <div className="absolute right-[4%] bottom-[4%] sm:right-[6%] sm:bottom-[6%] lg:right-[7%] lg:bottom-[7%] z-0">
            <svg
              className="w-14 h-14 sm:w-18 sm:h-18 lg:w-22 lg:h-22 text-blue-400/40 dark:text-blue-300/30 fill-current"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M 50 0 C 50 32 68 50 100 50 C 68 50 50 68 50 100 C 50 68 32 50 0 50 C 32 50 50 32 50 0 Z" />
            </svg>
          </div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-10 xl:gap-14">
            {/* Left Content (clean, crisp, 100% readable) */}
            <div className="lg:col-span-6 xl:col-span-6">
              <HeroSection
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

            {/* Right Showcase Image (Enlarged, with rounded corners & clean depth matching reference) */}
            <div className="relative lg:col-span-6 xl:col-span-6 flex justify-center">
              <div className="relative aspect-[16/10] sm:aspect-[16/10] lg:aspect-[16/10] w-full max-w-[640px] overflow-hidden rounded-[1.75rem] border border-border/60 bg-card shadow-2xl transition-all duration-500 hover:shadow-primary/10">
                <Image
                  src="/images/hero-students-lab.jpg"
                  alt="Students learning and collaborating in a modern IT computer laboratory at G-TEC Thodupuzha"
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 50vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Numerical Highlights */}
      <AtAGlanceSection
        heading={atAGlanceT("heading")}
        settings={settings}
      />

      {/* Latest News & Events */}
      <NewsTeaserSection
        teaser={teaser}
        heading={newsT("heading")}
        viewAll={newsT("viewAll")}
        upcomingEventLabel={newsT("upcomingEvent")}
        locale={locale}
      />

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

      {/* Placement Support & Student Success */}
      <PlacementSupportSection
        data={placementData}
        heading={placementT("heading")}
        viewFullGallery={placementT("viewFullGallery")}
        ctaHeading={placementT("ctaHeading")}
        ctaText={placementT("ctaText")}
        viewVacancies={placementT("viewVacancies")}
        hiringCta={placementT("hiringCta")}
      />

      {/* Contact & Map Section */}
      <ContactSection settings={settings} courses={courses} />
    </main>
  );
}

