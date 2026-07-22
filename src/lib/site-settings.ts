import { prisma } from "@/lib/db";
import type { SiteSettings, WhyChooseUsCard } from "@prisma/client";

export type SiteSettingsWithCards = SiteSettings & {
  whyChooseUsCards: WhyChooseUsCard[];
};

export type Locale = "en" | "ml";

export async function getSiteSettings(): Promise<SiteSettingsWithCards> {
  const settings = await prisma.siteSettings.findFirst({
    include: {
      whyChooseUsCards: {
        orderBy: { sortOrder: "asc" },
      },
    },
  });

  if (!settings) {
    throw new Error("Site settings have not been initialized.");
  }

  return settings;
}

export function pickLocalizedText(
  localized: { en: string; ml?: string | null },
  locale: Locale,
): string {
  return locale === "ml" && localized.ml ? localized.ml : localized.en;
}

export function getAtAGlanceStats(settings: SiteSettingsWithCards) {
  return [
    { label: "Years of Operation", value: settings.yearsInOperation },
    { label: "Students Trained", value: settings.studentsTrained },
    { label: "Centres Worldwide", value: settings.centresWorldwide },
    { label: "Affiliations", value: settings.affiliations },
    { label: "Countries", value: settings.countries },
  ];
}

export function getLocalizedWhyCards(
  settings: SiteSettingsWithCards,
  locale: Locale,
) {
  return settings.whyChooseUsCards.map((card) => ({
    ...card,
    title: pickLocalizedText({ en: card.titleEn, ml: card.titleMl }, locale),
    description: pickLocalizedText(
      { en: card.descriptionEn, ml: card.descriptionMl },
      locale,
    ),
  }));
}

export function getLocalizedAbout(
  settings: SiteSettingsWithCards,
  locale: Locale,
) {
  return {
    body: pickLocalizedText({ en: settings.aboutBodyEn, ml: settings.aboutBodyMl }, locale),
    photoUrl: settings.aboutPhotoUrl,
  };
}
