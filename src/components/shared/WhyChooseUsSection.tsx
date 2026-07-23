import { Award, Users, BookOpen, Briefcase, Globe, Headphones } from "lucide-react";
import { getLocalizedWhyCards, type Locale, type SiteSettingsWithCards } from "@/lib/site-settings";
import type { WhyCardIcon } from "@prisma/client";

const iconMap: Record<WhyCardIcon, React.ComponentType<{ className?: string }>> = {
  AWARD: Award,
  USERS: Users,
  BOOK_OPEN: BookOpen,
  BRIEFCASE: Briefcase,
  GLOBE: Globe,
  HEADPHONES: Headphones,
};

interface WhyChooseUsSectionProps {
  settings: SiteSettingsWithCards;
  locale: Locale;
  heading: string;
}

export function WhyChooseUsSection({ settings, locale, heading }: WhyChooseUsSectionProps) {
  const cards = getLocalizedWhyCards(settings, locale);

  return (
    <section aria-labelledby="why-choose-us-heading" className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          id="why-choose-us-heading"
          className="text-center text-3xl font-bold tracking-tight"
        >
          {heading}
        </h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => {
            const Icon = iconMap[card.icon];
            return (
              <div
                key={card.id}
                className="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-xl font-semibold">{card.title}</h3>
                <p className="mt-2 text-muted-foreground">{card.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
