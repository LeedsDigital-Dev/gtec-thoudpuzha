import { redirect } from "next/navigation";
import { requireRole, Role } from "@/lib/auth";
import { prisma } from "@/lib/db";
import EnrollmentForm from "./enrollment-form";

interface Props {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    studentProfileId?: string;
    created?: string;
    skipped?: string;
    skippedCourses?: string;
    unenrolled?: string;
    unenrolledCourse?: string;
  }>;
}

export default async function CourseEnrollmentPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const authResult = await requireRole([Role.CENTRE_STAFF, Role.SUPER_ADMIN]);

  if (!authResult.authorized) {
    redirect(`/${locale}/forbidden`);
  }

  const sp = await searchParams;
  const studentProfileId = sp.studentProfileId || null;
  const created = sp.created ? Number(sp.created) : 0;
  const skipped = sp.skipped ? Number(sp.skipped) : 0;
  const skippedCourses = sp.skippedCourses || null;
  const unenrolled = sp.unenrolled === "true";
  const unenrolledCourse = sp.unenrolledCourse || null;

  const [candidates, courses] = await Promise.all([
    prisma.candidateProfile.findMany({
      where: { isVerifiedStudent: true },
      select: { id: true, fullName: true, studentRecordId: true },
      orderBy: { fullName: "asc" },
    }),
    prisma.course.findMany({
      where: { status: "PUBLISHED" },
      select: { id: true, titleEn: true },
      orderBy: { titleEn: "asc" },
    }),
  ]);

  let currentEnrollments: Array<{
    id: string;
    courseId: string;
    enrolledAt: Date;
    course: { id: string; titleEn: string };
  }> = [];
  let enrolledCourseIds: string[] = [];

  if (studentProfileId) {
    currentEnrollments = await prisma.studentCourseEnrollment.findMany({
      where: { studentProfileId },
      include: { course: { select: { id: true, titleEn: true } } },
      orderBy: { enrolledAt: "desc" },
    });
    enrolledCourseIds = currentEnrollments.map((e) => e.courseId);
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Course Enrollment</h1>

      {/* Success banner — created */}
      {created > 0 && (
        <div
          className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800"
          role="alert"
        >
          Successfully enrolled in {created} course
          {created !== 1 ? "s" : ""}.
        </div>
      )}

      {/* Skipped banner */}
      {skipped > 0 && (
        <div
          className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800"
          role="alert"
        >
          {skipped} course{skipped !== 1 ? "s" : ""} already enrolled and
          skipped
          {skippedCourses ? `: ${skippedCourses}` : ""}.
        </div>
      )}

      {/* Unenrolled banner */}
      {unenrolled && (
        <div
          className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800"
          role="alert"
        >
          Successfully unenrolled from
          {unenrolledCourse ? ` "${unenrolledCourse}"` : " course"}.
        </div>
      )}

      <div className="mt-6">
        <EnrollmentForm
          candidates={candidates}
          courses={courses}
          currentEnrollments={currentEnrollments}
          enrolledCourseIds={enrolledCourseIds}
          studentProfileId={studentProfileId}
          locale={locale}
        />
      </div>
    </main>
  );
}
