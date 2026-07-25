import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Role, getEffectiveRole } from "@/lib/auth";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function PortalDashboardPage({ params }: PageProps) {
  const { locale } = await params;
  const session = await auth();

  if (!session.userId) {
    redirect(`/${locale}/sign-in`);
  }

  const role = await getEffectiveRole(session);

  switch (role) {
    case Role.STUDENT:
      redirect(`/${locale}/portal/student`);
    case Role.JOB_SEEKER:
      redirect(`/${locale}/portal/job-seeker`);
    case Role.EMPLOYER:
      redirect(`/${locale}/portal/employer`);
    case Role.CENTRE_STAFF:
    case Role.SUPER_ADMIN:
      redirect(`/${locale}/admin`);
    default:
      redirect(`/${locale}/sign-in`);
  }
}
