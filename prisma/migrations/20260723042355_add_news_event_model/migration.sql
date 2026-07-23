-- CreateEnum
CREATE TYPE "NewsEventType" AS ENUM ('NEWS', 'EVENT');

-- CreateTable
CREATE TABLE "NewsEvent" (
    "id" TEXT NOT NULL,
    "type" "NewsEventType" NOT NULL,
    "titleEn" TEXT NOT NULL,
    "titleMl" TEXT,
    "bodyEn" TEXT NOT NULL,
    "bodyMl" TEXT,
    "coverImageUrl" TEXT,
    "eventDate" TIMESTAMP(3),
    "publishedAt" TIMESTAMP(3),
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NewsEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NewsEvent_slug_key" ON "NewsEvent"("slug");

-- CreateIndex
CREATE INDEX "NewsEvent_type_idx" ON "NewsEvent"("type");

-- CreateIndex
CREATE INDEX "NewsEvent_publishedAt_idx" ON "NewsEvent"("publishedAt");

-- CreateIndex
CREATE INDEX "NewsEvent_eventDate_idx" ON "NewsEvent"("eventDate");
