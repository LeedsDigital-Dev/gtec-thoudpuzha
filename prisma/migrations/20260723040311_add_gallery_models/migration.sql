-- CreateEnum
CREATE TYPE "GalleryMediaType" AS ENUM ('IMAGE', 'VIDEO');

-- CreateTable
CREATE TABLE "GalleryCategory" (
    "id" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "nameMl" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GalleryCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GalleryItem" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "mediaType" "GalleryMediaType" NOT NULL,
    "url" TEXT NOT NULL,
    "captionEn" TEXT,
    "captionMl" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GalleryItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "GalleryCategory_sortOrder_idx" ON "GalleryCategory"("sortOrder");

-- CreateIndex
CREATE INDEX "GalleryItem_categoryId_idx" ON "GalleryItem"("categoryId");

-- CreateIndex
CREATE INDEX "GalleryItem_sortOrder_idx" ON "GalleryItem"("sortOrder");

-- AddForeignKey
ALTER TABLE "GalleryItem" ADD CONSTRAINT "GalleryItem_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "GalleryCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
