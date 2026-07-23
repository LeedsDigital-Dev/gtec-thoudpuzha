-- CreateEnum
CREATE TYPE "EducationalQualification" AS ENUM ('SSLC', 'PLUS_TWO', 'DIPLOMA', 'GRADUATE', 'POST_GRADUATE', 'OTHER');

-- CreateEnum
CREATE TYPE "PreferredJobType" AS ENUM ('FULL_TIME', 'PART_TIME', 'INTERNSHIP', 'WORK_FROM_HOME');

-- AlterTable
ALTER TABLE "CandidateProfile" ADD COLUMN     "address" TEXT,
ADD COLUMN     "careerObjective" TEXT,
ADD COLUMN     "certificationIds" TEXT[],
ADD COLUMN     "courseCompletedIds" TEXT[],
ADD COLUMN     "dateOfBirth" TIMESTAMP(3),
ADD COLUMN     "educationalQualification" "EducationalQualification",
ADD COLUMN     "email" TEXT,
ADD COLUMN     "fullName" TEXT,
ADD COLUMN     "languagesKnown" TEXT[],
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "photoUrl" TEXT,
ADD COLUMN     "preferredJobLocation" TEXT,
ADD COLUMN     "preferredJobType" "PreferredJobType",
ADD COLUMN     "yearOfPassing" INTEGER;
