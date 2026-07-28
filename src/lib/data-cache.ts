import { cache } from "react";
import type { PublicCourse } from "@/lib/courses";
import type { PublicCertificationPartner } from "@/lib/certification-partners";
import type { PublicFlashNewsItem } from "@/lib/flash-news";
import type { SiteSettingsWithCards } from "@/lib/site-settings";

export const getCachedSiteSettings = cache(
  async (): Promise<SiteSettingsWithCards> => {
    const { getSiteSettings } = await import("@/lib/site-settings");
    return getSiteSettings();
  },
);

export const getCachedPublishedCourses = cache(
  async (): Promise<PublicCourse[]> => {
    const { getPublishedCourses } = await import("@/lib/courses");
    return getPublishedCourses();
  },
);

export const getCachedHomepageTeaser = cache(async () => {
  const { getHomepageTeaser } = await import("@/lib/news-events");
  return getHomepageTeaser();
});

export const getCachedPlacementGalleryData = cache(async () => {
  const { getPlacementGalleryData } = await import("@/lib/gallery");
  return getPlacementGalleryData();
});

export const getCachedCertificationPartners = cache(
  async (): Promise<PublicCertificationPartner[]> => {
    const { getCertificationPartners } = await import(
      "@/lib/certification-partners"
    );
    return getCertificationPartners();
  },
);

export const getCachedActiveFlashNews = cache(
  async (locale: "en" | "ml"): Promise<PublicFlashNewsItem[]> => {
    const { getActiveFlashNews } = await import("@/lib/flash-news");
    return getActiveFlashNews(locale);
  },
);
