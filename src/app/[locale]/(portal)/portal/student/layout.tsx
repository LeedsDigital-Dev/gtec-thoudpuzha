import { redirect } from "next/navigation";
import { Role, requireRole } from "@/lib/auth";
import { StudentShell } from "@/components/portal/student-shell";
import { JobSeekerShell } from "@/components/portal/job-seeker-shell";

/**
 * Parent layout for /portal/student/* — accessible to STUDENT and JOB_SEEKER
 * (biodata is shared). Renders the correct shell based on role.
 * The /portal/student/resources sub-layout adds a stricter STUDENT-only gate.
 */
export default async function StudentPortalLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const authResult = await requireRole([Role.STUDENT, Role.JOB_SEEKER]);

  if (!authResult.authorized) {
    if (authResult.reason === "unauthenticated") {
      redirect(`/${locale}/sign-in`);
    }
    if (authResult.reason === "no_role") {
      redirect(`/${locale}/account-setup-incomplete`);
    }
    redirect(`/${locale}/forbidden`);
  }

  if (authResult.role === Role.STUDENT) {
    return <StudentShell>{children}</StudentShell>;
  }
  return <JobSeekerShell>{children}</JobSeekerShell>;
}
