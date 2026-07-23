import { getLocale } from "next-intl/server";
import { HeroSection } from "@/components/shared/HeroSection";
import { EnquiryForm } from "@/components/shared/EnquiryForm";
import { AtAGlanceSection } from "@/components/shared/AtAGlanceSection";
import { AboutSection } from "@/components/shared/AboutSection";
import { WhyChooseUsSection } from "@/components/shared/WhyChooseUsSection";
import { ContactSection } from "@/components/shared/ContactSection";
import { getPublishedCourses } from "@/lib/courses";
import { getSiteSettings, type Locale } from "@/lib/site-settings";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  await params;
  const locale = (await getLocale()) as Locale;
  const settings = await getSiteSettings();
  const courses = await getPublishedCourses();

  return (
    <main>
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <HeroSection />
          <section id="enquiry" className="lg:sticky lg:top-24">
            <EnquiryForm source="homepage-hero" courses={courses} />
          </section>
        </div>
      </section>
      <AtAGlanceSection settings={settings} />
      <AboutSection settings={settings} locale={locale} />
      <WhyChooseUsSection settings={settings} locale={locale} />
      <ContactSection settings={settings} courses={courses} />
    </main>
  );
}
