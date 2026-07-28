import { getTranslations } from "next-intl/server";
import { HeroSection } from "@/components/shared/HeroSection";
import { EnquiryForm } from "@/components/shared/EnquiryForm";
import { AtAGlanceSection } from "@/components/shared/AtAGlanceSection";
import { AboutSection } from "@/components/shared/AboutSection";
import { WhyChooseUsSection } from "@/components/shared/WhyChooseUsSection";
import { ContactSection } from "@/components/shared/ContactSection";
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

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export const revalidate = 60;

export default async function HomePage({ params }: HomePageProps) {
  const { locale: localeStr } = await params;
  const locale = localeStr as Locale;

  const [
    settings,
    courses,
    teaser,
    placementData,
    certPartners,
  ] = await Promise.all([
    getCachedSiteSettings(),
    getCachedPublishedCourses(),
    getCachedHomepageTeaser(),
    getCachedPlacementGalleryData(),
    getCachedCertificationPartners(),
  ]);

  const [
    heroT,
    aboutT,
    atAGlanceT,
    whyT,
    placementT,
    newsT,
    certT,
  ] = await Promise.all([
    getTranslations({ locale, namespace: "hero" }),
    getTranslations({ locale, namespace: "about" }),
    getTranslations({ locale, namespace: "atAGlance" }),
    getTranslations({ locale, namespace: "whyChooseUs" }),
    getTranslations({ locale, namespace: "placementSupport" }),
    getTranslations({ locale, namespace: "newsTeaser" }),
    getTranslations({ locale, namespace: "certPartners" }),
  ]);

  return (
    <main>
      <div className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,var(--color-primary)_/_4%,transparent_60%)]"
          aria-hidden="true"
        />
        <section className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12">
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
            <section id="enquiry" className="lg:sticky lg:top-24">
              <EnquiryForm source="homepage-hero" courses={courses} />
            </section>
          </div>
        </section>
      </div>

      <AtAGlanceSection heading={atAGlanceT("heading")} settings={settings} />
      <NewsTeaserSection teaser={teaser} heading={newsT("heading")} viewAll={newsT("viewAll")} upcomingEventLabel={newsT("upcomingEvent")} locale={locale} />
      <AboutSection settings={settings} locale={locale} heading={aboutT("heading")} photoPlaceholder={aboutT("photoPlaceholder")} />
      <WhyChooseUsSection heading={whyT("heading")} settings={settings} locale={locale} />
      <CertificationPartnerStrip heading={certT("heading")} partners={certPartners} />
      <PlacementSupportSection data={placementData} heading={placementT("heading")} viewFullGallery={placementT("viewFullGallery")} ctaHeading={placementT("ctaHeading")} ctaText={placementT("ctaText")} viewVacancies={placementT("viewVacancies")} hiringCta={placementT("hiringCta")} />
      <ContactSection settings={settings} courses={courses} />
    </main>
  );
}
