import { getTranslations } from "next-intl/server";
import dynamic from "next/dynamic";
import { HeroSection } from "@/components/shared/HeroSection";
import { EnquiryForm } from "@/components/shared/EnquiryForm";
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
      {/* Hero & Admission Fast Track Section */}
      <section className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
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
          <section id="enquiry" className="lg:col-span-5 lg:sticky lg:top-24">
            <EnquiryForm source="homepage-hero" courses={courses} />
          </section>
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

