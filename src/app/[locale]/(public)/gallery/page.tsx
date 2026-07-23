import { getGalleryData } from "@/lib/gallery";
import { GalleryGrid } from "@/components/shared/GalleryGrid";

export const revalidate = 60;

interface GalleryPageProps {
  params: Promise<{ locale: string }>;
}

export default async function GalleryPage({ params }: GalleryPageProps) {
  await params;
  const categories = await getGalleryData();

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold">Gallery</h1>
      <GalleryGrid categories={categories} />
    </main>
  );
}
