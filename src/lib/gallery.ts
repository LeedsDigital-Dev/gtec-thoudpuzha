import { prisma } from "@/lib/db";

export type PublicGalleryCategory = {
  id: string;
  nameEn: string;
  nameMl: string | null;
  sortOrder: number;
  items: Array<{
    id: string;
    mediaType: "IMAGE" | "VIDEO";
    url: string;
    captionEn: string | null;
    captionMl: string | null;
    sortOrder: number;
  }>;
};

export async function getGalleryData(): Promise<PublicGalleryCategory[]> {
  const categories = await prisma.galleryCategory.findMany({
    include: {
      items: {
        orderBy: { sortOrder: "asc" },
      },
    },
    orderBy: { sortOrder: "asc" },
  });

  return categories;
}
