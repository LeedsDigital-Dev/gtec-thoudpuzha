-- AlterTable
ALTER TABLE "User" ADD COLUMN     "deactivatedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "StaffPermission" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "canEditCourses" BOOLEAN NOT NULL DEFAULT true,
    "canEditGallery" BOOLEAN NOT NULL DEFAULT true,
    "canEditCertificationPartners" BOOLEAN NOT NULL DEFAULT true,
    "canEditNewsEvents" BOOLEAN NOT NULL DEFAULT true,
    "canEditFlashNews" BOOLEAN NOT NULL DEFAULT true,
    "canProvisionStudents" BOOLEAN NOT NULL DEFAULT true,
    "canApproveEmployers" BOOLEAN NOT NULL DEFAULT false,
    "canApproveJobPostings" BOOLEAN NOT NULL DEFAULT false,
    "canModerateSkillsTaxonomy" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "StaffPermission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StaffPermission_userId_key" ON "StaffPermission"("userId");

-- AddForeignKey
ALTER TABLE "StaffPermission" ADD CONSTRAINT "StaffPermission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
