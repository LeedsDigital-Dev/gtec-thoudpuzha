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
    <section aria-labelledby="why-choose-us-heading" className="bg-muted/30 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          id="why-choose-us-heading"
          className="text-center text-3xl font-bold tracking-tight"
        >
          {heading}
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => {
            const Icon = iconMap[card.icon];
            return (
              <div
                key={card.id}
                className="group rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-tight">
                  {card.title}
                </h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
