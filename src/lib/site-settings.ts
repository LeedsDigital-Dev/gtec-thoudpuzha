import { prisma } from "@/lib/db";
import type { SiteSettings, WhyChooseUsCard } from "@prisma/client";

export type SiteSettingsWithCards = SiteSettings & {
  whyChooseUsCards: WhyChooseUsCard[];
};

export type Locale = "en" | "ml";

const DEFAULT_SITE_SETTINGS: SiteSettingsWithCards = {
  id: "default",
  updatedAt: new Date(),
  yearsInOperation: "25+",
  studentsTrained: "10,000+",
  centresWorldwide: "500+",
  affiliations: "50+",
  countries: "15+",
  aboutTextEn:
    "G-TEC EDUCATION Thodupuzha is a premier skill development and computer education centre.",
  aboutTextMl:
    "ജി-ടെക് എഡ്യൂക്കേഷൻ തൊടുപുഴ ഒരു പ്രമുഖ കമ്പ്യൂട്ടർ വിദ്യാഭ്യാസ സ്ഥാപനമാണ്.",
  address: "Near Private Bus Stand, Thodupuzha, Idukki, Kerala - 685584",
  whyChooseUsCards: [],
};

export async function getSiteSettings(): Promise<SiteSettingsWithCards> {
  try {
    const settings = await prisma.siteSettings.findFirst({
      include: {
        whyChooseUsCards: {
          orderBy: { sortOrder: "asc" },
        },
      },
    });

    if (!settings) {
      return DEFAULT_SITE_SETTINGS;
    }

    return settings;
  } catch {
    return DEFAULT_SITE_SETTINGS;
  }
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
