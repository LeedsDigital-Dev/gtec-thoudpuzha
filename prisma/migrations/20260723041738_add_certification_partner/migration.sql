-- CreateTable
CREATE TABLE "CertificationPartner" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logoUrl" TEXT NOT NULL,
    "link" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CertificationPartner_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CertificationPartner_sortOrder_idx" ON "CertificationPartner"("sortOrder");
