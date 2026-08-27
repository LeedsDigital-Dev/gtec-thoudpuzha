import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { Role, getEffectiveRole } from "@/lib/auth";
import { StudentShell } from "@/components/portal/student-shell";
import { JobSeekerShell } from "@/components/portal/job-seeker-shell";

export default async function JobsPortalLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await auth();

  if (!session.userId) {
    redirect(`/${locale}/sign-in`);
  }

  const role = await getEffectiveRole(session);

  if (!role) {
    redirect(`/${locale}/account-setup-incomplete`);
  }

  if (role === Role.SUPER_ADMIN || role === Role.CENTRE_STAFF) {
    redirect(`/${locale}/admin/job-postings`);
  }

  if (role === Role.EMPLOYER) {
    redirect(`/${locale}/portal/employer`);
  }

  if (role === Role.STUDENT) {
    return <StudentShell>{children}</StudentShell>;
  }

  if (role === Role.JOB_SEEKER) {
    return <JobSeekerShell>{children}</JobSeekerShell>;
  }

  redirect(`/${locale}/forbidden`);
}
