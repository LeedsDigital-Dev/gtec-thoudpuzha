import { redirect } from "next/navigation";
import { requireRole, Role } from "@/lib/auth";
import { prisma } from "@/lib/db";
import EnrollmentDashboard from "./enrollment-dashboard";

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
      select: {
        id: true,
        fullName: true,
        phone: true,
        studentRecordId: true,
        enrollments: {
          include: {
            course: { select: { id: true, titleEn: true } },
          },
          orderBy: { enrolledAt: "desc" },
        },
      },
      orderBy: { fullName: "asc" },
    }),
    prisma.course.findMany({
      where: { status: "PUBLISHED" },
      select: { id: true, titleEn: true },
      orderBy: { titleEn: "asc" },
    }),
  ]);

  const studentRecordIds = candidates
    .map((c) => c.studentRecordId)
    .filter((id): id is string => id !== null);

  const studentRecords = studentRecordIds.length > 0
    ? await prisma.studentRecord.findMany({
        where: { id: { in: studentRecordIds } },
        select: { id: true, studentId: true, phone: true },
      })
    : [];

  const recordMap = new Map(studentRecords.map((r) => [r.id, r]));

  const students = candidates.map((c) => {
    const record = c.studentRecordId ? recordMap.get(c.studentRecordId) : undefined;
    return {
      id: c.id,
      fullName: c.fullName,
      phone: c.phone || record?.phone || null,
      studentId: record?.studentId ?? c.studentRecordId ?? null,
      studentRecordId: c.studentRecordId,
      enrollments: c.enrollments,
    };
  });

  return (
    <main className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl font-semibold">Course Enrollment</h1>

      {created > 0 && (
        <div
          className="mt-4 rounded-lg border border-primary/30 bg-primary/10 p-4 text-sm text-primary"
          role="alert"
        >
          Successfully enrolled in {created} course
          {created !== 1 ? "s" : ""}.
        </div>
      )}

      {skipped > 0 && (
        <div
          className="mt-4 rounded-lg border border-accent/30 bg-accent/5 p-4 text-sm text-accent"
          role="alert"
        >
          {skipped} course{skipped !== 1 ? "s" : ""} already enrolled and
          skipped
          {skippedCourses ? `: ${skippedCourses}` : ""}.
        </div>
      )}

      {unenrolled && (
        <div
          className="mt-4 rounded-lg border border-primary/30 bg-primary/10 p-4 text-sm text-primary"
          role="alert"
        >
          Successfully unenrolled from
          {unenrolledCourse ? ` "${unenrolledCourse}"` : " course"}.
        </div>
      )}

      <div className="mt-6">
        <EnrollmentDashboard
          students={students}
          courses={courses}
          locale={locale}
          selectedStudentProfileId={studentProfileId}
        />
      </div>
    </main>
  );
}
