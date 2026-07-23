-- CreateTable
CREATE TABLE "StudentProgressEntry" (
    "id" TEXT NOT NULL,
    "studentProfileId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "noteEn" TEXT NOT NULL,
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StudentProgressEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimetableEntry" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "contentText" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TimetableEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "StudentProgressEntry_studentProfileId_idx" ON "StudentProgressEntry"("studentProfileId");

-- CreateIndex
CREATE INDEX "StudentProgressEntry_courseId_idx" ON "StudentProgressEntry"("courseId");

-- CreateIndex
CREATE INDEX "TimetableEntry_courseId_idx" ON "TimetableEntry"("courseId");

-- AddForeignKey
ALTER TABLE "StudentProgressEntry" ADD CONSTRAINT "StudentProgressEntry_studentProfileId_fkey" FOREIGN KEY ("studentProfileId") REFERENCES "CandidateProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentProgressEntry" ADD CONSTRAINT "StudentProgressEntry_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimetableEntry" ADD CONSTRAINT "TimetableEntry_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
