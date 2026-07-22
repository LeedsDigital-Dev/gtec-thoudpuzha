import { HeroSection } from "@/components/shared/HeroSection";
import { EnquiryForm } from "@/components/shared/EnquiryForm";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12">
        <HeroSection />
        <section id="enquiry" className="lg:sticky lg:top-24">
          <EnquiryForm source="homepage-hero" />
        </section>
      </div>
    </main>
  );
}
