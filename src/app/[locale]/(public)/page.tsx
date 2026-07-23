import { getLocale, getTranslations } from "next-intl/server";
import { HeroSection } from "@/components/shared/HeroSection";
import { EnquiryForm } from "@/components/shared/EnquiryForm";
import { AtAGlanceSection } from "@/components/shared/AtAGlanceSection";
import { AboutSection } from "@/components/shared/AboutSection";
import { WhyChooseUsSection } from "@/components/shared/WhyChooseUsSection";
import { ContactSection } from "@/components/shared/ContactSection";
import { PlacementSupportSection } from "@/components/shared/PlacementSupportSection";
import { CertificationPartnerStrip } from "@/components/shared/CertificationPartnerStrip";
import { getPublishedCourses } from "@/lib/courses";
import { getSiteSettings, type Locale } from "@/lib/site-settings";
import { getHomepageTeaser } from "@/lib/news-events";
import { getPlacementGalleryData } from "@/lib/gallery";
import { NewsTeaserSection } from "@/components/shared/NewsTeaserSection";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  await params;
  const locale = (await getLocale()) as Locale;
  const settings = await getSiteSettings();
  const courses = await getPublishedCourses();
  const teaser = await getHomepageTeaser();
  const placementData = await getPlacementGalleryData();

  const heroT = await getTranslations("hero");
  const aboutT = await getTranslations("about");
  const atAGlanceT = await getTranslations("atAGlance");
  const whyT = await getTranslations("whyChooseUs");
  const placementT = await getTranslations("placementSupport");
  const newsT = await getTranslations("newsTeaser");
  const certT = await getTranslations("certPartners");

  return (
    <main>
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <HeroSection t={{
            badge: heroT("badge"),
            headline: heroT("headline"),
            subhead: heroT("subhead"),
            applyNow: heroT("applyNow"),
            whatsappUs: heroT("whatsappUs"),
            callNow: heroT("callNow"),
          }} />
          <section id="enquiry" className="lg:sticky lg:top-24">
            <EnquiryForm source="homepage-hero" courses={courses} />
          </section>
        </div>
      </section>
      <AtAGlanceSection heading={atAGlanceT("heading")} settings={settings} />
      <NewsTeaserSection teaser={teaser} heading={newsT("heading")} viewAll={newsT("viewAll")} upcomingEventLabel={newsT("upcomingEvent")} />
      <AboutSection settings={settings} locale={locale} heading={aboutT("heading")} photoPlaceholder={aboutT("photoPlaceholder")} />
      <WhyChooseUsSection heading={whyT("heading")} settings={settings} locale={locale} />
      <CertificationPartnerStrip heading={certT("heading")} />
      <PlacementSupportSection data={placementData} heading={placementT("heading")} viewFullGallery={placementT("viewFullGallery")} ctaHeading={placementT("ctaHeading")} ctaText={placementT("ctaText")} viewVacancies={placementT("viewVacancies")} hiringCta={placementT("hiringCta")} />
      <ContactSection settings={settings} courses={courses} />
    </main>
  );
}
