-- CreateEnum
CREATE TYPE "SkillStatus" AS ENUM ('PENDING', 'APPROVED');

-- AlterTable
ALTER TABLE "CandidateProfile" ADD COLUMN     "skillIds" TEXT[];

-- CreateTable
CREATE TABLE "Skill" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "status" "SkillStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Skill_label_key" ON "Skill"("label");
