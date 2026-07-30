import { redirect } from "next/navigation";
import { requireRole, Role, type PermissionKey } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { AdminShell } from "@/components/admin/admin-shell";

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const authResult = await requireRole([Role.CENTRE_STAFF, Role.SUPER_ADMIN]);
  if (!authResult.authorized) {
    redirect(`/${locale}/forbidden?reason=${authResult.reason}&from=admin`);
  }

  const { role, userId } = authResult;
  const isSuperAdmin = role === Role.SUPER_ADMIN;

  let permissions: Partial<Record<PermissionKey, boolean>> = {};
  if (!isSuperAdmin) {
    const row = await prisma.staffPermission.findUnique({
      where: { userId },
    });
    if (row) {
      permissions = {
        canEditCourses: row.canEditCourses,
        canEditGallery: row.canEditGallery,
        canEditCertificationPartners: row.canEditCertificationPartners,
        canEditNewsEvents: row.canEditNewsEvents,
        canEditFlashNews: row.canEditFlashNews,
        canProvisionStudents: row.canProvisionStudents,
        canApproveEmployers: row.canApproveEmployers,
        canApproveJobPostings: row.canApproveJobPostings,
        canModerateSkillsTaxonomy: row.canModerateSkillsTaxonomy,
      };
    }
  }

  return (
    <AdminShell isSuperAdmin={isSuperAdmin} permissions={permissions}>
      {children}
    </AdminShell>
  );
}
