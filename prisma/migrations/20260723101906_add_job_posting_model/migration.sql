-- CreateEnum
CREATE TYPE "SalaryVisibility" AS ENUM ('DISCLOSE', 'PRIVATE');

-- CreateEnum
CREATE TYPE "JobType" AS ENUM ('FULL_TIME', 'PART_TIME', 'CONTRACT');

-- CreateEnum
CREATE TYPE "JobPostingStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'CLOSED');

-- CreateTable
CREATE TABLE "JobPosting" (
    "id" TEXT NOT NULL,
    "employerId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "department" TEXT,
    "salaryMin" INTEGER,
    "salaryMax" INTEGER,
    "salaryVisibility" "SalaryVisibility" NOT NULL DEFAULT 'PRIVATE',
    "jobType" "JobType" NOT NULL,
    "skillIds" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "applicationDeadline" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "status" "JobPostingStatus" NOT NULL DEFAULT 'PENDING',
    "autoPublished" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JobPosting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "JobPosting_employerId_idx" ON "JobPosting"("employerId");

-- CreateIndex
CREATE INDEX "JobPosting_status_idx" ON "JobPosting"("status");

-- CreateIndex
CREATE INDEX "JobPosting_createdAt_idx" ON "JobPosting"("createdAt");

-- AddForeignKey
ALTER TABLE "JobPosting" ADD CONSTRAINT "JobPosting_employerId_fkey" FOREIGN KEY ("employerId") REFERENCES "EmployerProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
