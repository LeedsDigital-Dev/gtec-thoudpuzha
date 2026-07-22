-- CreateTable
CREATE TABLE "FlashNewsItem" (
    "id" TEXT NOT NULL,
    "textEn" TEXT NOT NULL,
    "textMl" TEXT,
    "link" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "expiresAt" TIMESTAMP(3),
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FlashNewsItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FlashNewsItem_active_expiresAt_idx" ON "FlashNewsItem"("active", "expiresAt");

-- CreateIndex
CREATE INDEX "FlashNewsItem_sortOrder_idx" ON "FlashNewsItem"("sortOrder");
