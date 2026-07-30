import { unstable_cache } from "next/cache";
import type { PublicCourse } from "@/lib/courses";
import type { PublicCertificationPartner } from "@/lib/certification-partners";
import type { PublicFlashNewsItem } from "@/lib/flash-news";
import type { SiteSettingsWithCards } from "@/lib/site-settings";

export const getCachedSiteSettings = unstable_cache(
  async (): Promise<SiteSettingsWithCards> => {
    const { getSiteSettings } = await import("@/lib/site-settings");
    return getSiteSettings();
  },
  ["site-settings"],
  { revalidate: 3600, tags: ["site-settings"] },
);

export const getCachedPublishedCourses = unstable_cache(
  async (): Promise<PublicCourse[]> => {
    const { getPublishedCourses } = await import("@/lib/courses");
    return getPublishedCourses();
  },
  ["published-courses"],
  { revalidate: 3600, tags: ["published-courses", "courses"] },
);

export const getCachedHomepageTeaser = unstable_cache(
  async () => {
    const { getHomepageTeaser } = await import("@/lib/news-events");
    return getHomepageTeaser();
  },
  ["homepage-teaser"],
  { revalidate: 3600, tags: ["homepage-teaser", "news-events"] },
);

export const getCachedPlacementGalleryData = unstable_cache(
  async () => {
    const { getPlacementGalleryData } = await import("@/lib/gallery");
    return getPlacementGalleryData();
  },
  ["placement-gallery"],
  { revalidate: 3600, tags: ["placement-gallery", "gallery"] },
);

export const getCachedCertificationPartners = unstable_cache(
  async (): Promise<PublicCertificationPartner[]> => {
    const { getCertificationPartners } = await import(
      "@/lib/certification-partners"
    );
    return getCertificationPartners();
  },
  ["cert-partners"],
  { revalidate: 3600, tags: ["cert-partners"] },
);

export const getCachedActiveFlashNews = (locale: "en" | "ml") =>
  unstable_cache(
    async (): Promise<PublicFlashNewsItem[]> => {
      const { getActiveFlashNews } = await import("@/lib/flash-news");
      return getActiveFlashNews(locale);
    },
    [`active-flash-news-${locale}`],
    { revalidate: 3600, tags: ["flash-news"] },
  )();

