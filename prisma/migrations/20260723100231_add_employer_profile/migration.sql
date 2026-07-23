-- CreateEnum
CREATE TYPE "IndustrySector" AS ENUM ('IT_SOFTWARE', 'EDUCATION_TRAINING', 'HEALTHCARE', 'BANKING_FINANCE', 'MANUFACTURING', 'RETAIL', 'HOSPITALITY', 'CONSTRUCTION', 'TELECOMMUNICATION', 'OTHER');

-- CreateEnum
CREATE TYPE "EmployeeCountRange" AS ENUM ('RANGE_1_10', 'RANGE_11_50', 'RANGE_51_200', 'RANGE_200_PLUS');

-- CreateEnum
CREATE TYPE "EmployerProfileStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "EmployerProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "industrySector" "IndustrySector" NOT NULL,
    "contactPersonName" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "companyAddress" TEXT NOT NULL,
    "hasWebsite" BOOLEAN NOT NULL DEFAULT false,
    "websiteUrl" TEXT,
    "employeeCountRange" "EmployeeCountRange" NOT NULL,
    "aboutCompany" TEXT NOT NULL,
    "status" "EmployerProfileStatus" NOT NULL DEFAULT 'PENDING',
    "autoPublishTrusted" BOOLEAN NOT NULL DEFAULT false,
    "rejectionReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmployerProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmployerProfile_userId_key" ON "EmployerProfile"("userId");

-- CreateIndex
CREATE INDEX "EmployerProfile_status_idx" ON "EmployerProfile"("status");

-- AddForeignKey
ALTER TABLE "EmployerProfile" ADD CONSTRAINT "EmployerProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
