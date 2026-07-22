-- CreateEnum
CREATE TYPE "WhyCardIcon" AS ENUM ('AWARD', 'USERS', 'BOOK_OPEN', 'BRIEFCASE', 'GLOBE', 'HEADPHONES');

-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" TEXT NOT NULL,
    "yearsInOperation" TEXT NOT NULL DEFAULT '25+',
    "studentsTrained" TEXT NOT NULL DEFAULT '3.2M+',
    "centresWorldwide" TEXT NOT NULL DEFAULT '800+',
    "affiliations" TEXT NOT NULL DEFAULT '100+',
    "countries" TEXT NOT NULL DEFAULT '23',
    "aboutBodyEn" TEXT NOT NULL DEFAULT '',
    "aboutBodyMl" TEXT,
    "aboutPhotoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WhyChooseUsCard" (
    "id" TEXT NOT NULL,
    "siteSettingsId" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "icon" "WhyCardIcon" NOT NULL,
    "titleEn" TEXT NOT NULL,
    "titleMl" TEXT,
    "descriptionEn" TEXT NOT NULL,
    "descriptionMl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WhyChooseUsCard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "WhyChooseUsCard_siteSettingsId_idx" ON "WhyChooseUsCard"("siteSettingsId");

-- CreateIndex
CREATE INDEX "WhyChooseUsCard_sortOrder_idx" ON "WhyChooseUsCard"("sortOrder");

-- AddForeignKey
ALTER TABLE "WhyChooseUsCard" ADD CONSTRAINT "WhyChooseUsCard_siteSettingsId_fkey" FOREIGN KEY ("siteSettingsId") REFERENCES "SiteSettings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Seed default site settings.
-- All figures below are parent-brand placeholders pending Thodupuzha-specific confirmation.
INSERT INTO "SiteSettings" ("id", "yearsInOperation", "studentsTrained", "centresWorldwide", "affiliations", "countries", "aboutBodyEn", "aboutBodyMl", "aboutPhotoUrl", "updatedAt")
VALUES ('singleton_site_settings', '25+', '3.2M+', '800+', '100+', '23', 'G-TEC Thodupuzha is a premier computer education centre offering industry-relevant courses in IT, multimedia, accounting, and spoken English. Our hands-on training and experienced faculty help students build skills that employers value.', NULL, NULL, CURRENT_TIMESTAMP);

-- Seed default Why Choose Us cards.
INSERT INTO "WhyChooseUsCard" ("id", "siteSettingsId", "sortOrder", "icon", "titleEn", "titleMl", "descriptionEn", "descriptionMl", "updatedAt")
VALUES
  ('why_card_1', 'singleton_site_settings', 0, 'AWARD', 'ISO-Authorized Curriculum', NULL, 'Our courses are aligned with global standards and recognized certifications, giving your resume real weight.', NULL, CURRENT_TIMESTAMP),
  ('why_card_2', 'singleton_site_settings', 1, 'USERS', 'Expert Trainers', NULL, 'Learn from faculty with industry experience who focus on practical, job-ready skills.', NULL, CURRENT_TIMESTAMP),
  ('why_card_3', 'singleton_site_settings', 2, 'BRIEFCASE', 'Placement Support', NULL, 'Get career guidance, interview preparation, and placement assistance to land your next opportunity.', NULL, CURRENT_TIMESTAMP);
