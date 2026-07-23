-- AlterTable: add slug column (nullable initially for backfill)
ALTER TABLE "GalleryCategory" ADD COLUMN "slug" TEXT;

-- Backfill existing rows with a slug derived from nameEn
UPDATE "GalleryCategory"
SET "slug" = lower(regexp_replace(regexp_replace("nameEn", '[^a-zA-Z0-9\s-]', '', 'g'), '\s+', '-', 'g'))
WHERE "slug" IS NULL;

-- Handle potential duplicate slugs by appending a suffix
UPDATE "GalleryCategory"
SET "slug" = "slug" || '-' || substring(md5("id")::text, 1, 6)
WHERE "slug" IN (
  SELECT "slug" FROM "GalleryCategory" GROUP BY "slug" HAVING count(*) > 1
);

-- Now make slug NOT NULL and add unique constraint
ALTER TABLE "GalleryCategory" ALTER COLUMN "slug" SET NOT NULL;
CREATE UNIQUE INDEX "GalleryCategory_slug_key" ON "GalleryCategory"("slug");
