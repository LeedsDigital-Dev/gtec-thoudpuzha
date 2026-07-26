import { redirect } from "next/navigation";
import { Role, requireRole } from "@/lib/auth";
import { JobSeekerShell } from "@/components/portal/job-seeker-shell";

export default async function JobSeekerPortalLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const authResult = await requireRole([Role.JOB_SEEKER]);

  if (!authResult.authorized) {
    if (authResult.reason === "unauthenticated") {
      redirect(`/${locale}/sign-in`);
    }
    if (authResult.reason === "no_role") {
      redirect(`/${locale}/account-setup-incomplete`);
    }
    redirect(`/${locale}/forbidden`);
  }

  return <JobSeekerShell>{children}</JobSeekerShell>;
}
