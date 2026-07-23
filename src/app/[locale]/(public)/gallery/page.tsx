import { getTranslations } from "next-intl/server";
import { getGalleryData } from "@/lib/gallery";
import { GalleryGrid } from "@/components/shared/GalleryGrid";
import type { Locale } from "@/lib/site-settings";

export const revalidate = 60;

interface GalleryPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
}

export default async function GalleryPage({
  params,
  searchParams,
}: GalleryPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "gallery" });
  const { category: initialCategorySlug } = await searchParams;
  const categories = await getGalleryData();

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold">{t("heading")}</h1>
      <GalleryGrid
        categories={categories}
        initialCategorySlug={initialCategorySlug}
        locale={locale as Locale}
      />
    </main>
  );
}
