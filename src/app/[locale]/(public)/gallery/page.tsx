import dynamic from "next/dynamic";
import { getTranslations } from "next-intl/server";
import { getGalleryData } from "@/lib/gallery";
import type { Locale } from "@/lib/site-settings";

const GalleryGrid = dynamic(
  () =>
    import("@/components/shared/GalleryGrid").then((mod) => mod.GalleryGrid),
  {
    loading: () => (
      <div className="space-y-4">
        <div className="h-10 w-64 animate-pulse rounded bg-muted" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square animate-pulse rounded-lg bg-muted"
            />
          ))}
        </div>
      </div>
    ),
  },
);

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
