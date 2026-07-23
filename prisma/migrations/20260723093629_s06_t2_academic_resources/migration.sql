-- CreateEnum
CREATE TYPE "ResourceType" AS ENUM ('NOTE', 'ASSIGNMENT', 'PAST_PAPER', 'LECTURE', 'TIMETABLE', 'PROGRESS');

-- CreateTable
CREATE TABLE "StudentCourseEnrollment" (
    "id" TEXT NOT NULL,
    "studentProfileId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "enrolledAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StudentCourseEnrollment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AcademicResource" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "type" "ResourceType" NOT NULL,
    "title" TEXT NOT NULL,
    "fileUrl" TEXT,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AcademicResource_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "StudentCourseEnrollment_studentProfileId_idx" ON "StudentCourseEnrollment"("studentProfileId");

-- CreateIndex
CREATE INDEX "StudentCourseEnrollment_courseId_idx" ON "StudentCourseEnrollment"("courseId");

-- CreateIndex
CREATE UNIQUE INDEX "StudentCourseEnrollment_studentProfileId_courseId_key" ON "StudentCourseEnrollment"("studentProfileId", "courseId");

-- CreateIndex
CREATE INDEX "AcademicResource_courseId_idx" ON "AcademicResource"("courseId");

-- CreateIndex
CREATE INDEX "AcademicResource_type_idx" ON "AcademicResource"("type");

-- AddForeignKey
ALTER TABLE "StudentCourseEnrollment" ADD CONSTRAINT "StudentCourseEnrollment_studentProfileId_fkey" FOREIGN KEY ("studentProfileId") REFERENCES "CandidateProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentCourseEnrollment" ADD CONSTRAINT "StudentCourseEnrollment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademicResource" ADD CONSTRAINT "AcademicResource_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
