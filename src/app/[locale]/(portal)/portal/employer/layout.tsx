import { redirect } from "next/navigation";
import { Role, requireRole } from "@/lib/auth";
import { EmployerShell } from "@/components/portal/employer-shell";

export default async function EmployerPortalLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const authResult = await requireRole([Role.EMPLOYER]);

  if (!authResult.authorized) {
    if (authResult.reason === "unauthenticated") {
      redirect(`/${locale}/sign-in`);
    }
    if (authResult.reason === "no_role") {
      redirect(`/${locale}/account-setup-incomplete`);
    }
    redirect(`/${locale}/forbidden?reason=${authResult.reason}&from=employer-portal`);
  }

  return <EmployerShell>{children}</EmployerShell>;
}
