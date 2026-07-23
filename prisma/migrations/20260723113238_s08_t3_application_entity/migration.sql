-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('APPLIED', 'VIEWED', 'SHORTLISTED', 'REJECTED', 'HIRED');

-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL,
    "jobPostingId" TEXT NOT NULL,
    "candidateProfileId" TEXT NOT NULL,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'APPLIED',
    "appliedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "statusUpdatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Application_jobPostingId_idx" ON "Application"("jobPostingId");

-- CreateIndex
CREATE INDEX "Application_candidateProfileId_idx" ON "Application"("candidateProfileId");

-- CreateIndex
CREATE INDEX "Application_status_idx" ON "Application"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Application_jobPostingId_candidateProfileId_key" ON "Application"("jobPostingId", "candidateProfileId");

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_jobPostingId_fkey" FOREIGN KEY ("jobPostingId") REFERENCES "JobPosting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_candidateProfileId_fkey" FOREIGN KEY ("candidateProfileId") REFERENCES "CandidateProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
