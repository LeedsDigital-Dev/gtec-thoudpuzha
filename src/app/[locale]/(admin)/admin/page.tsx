import { redirect } from "next/navigation";
import Link from "next/link";
import { requireRole, requirePermission, StaffPermissionKeys, Role } from "@/lib/auth";
import { prisma } from "@/lib/db";

interface AdminDashboardPageProps {
  params: Promise<{ locale: string }>;
}

export default async function AdminDashboardPage({
  params,
}: AdminDashboardPageProps) {
  const { locale } = await params;
  const authResult = await requireRole([Role.CENTRE_STAFF, Role.SUPER_ADMIN]);

  if (!authResult.authorized) {
    redirect(`/${locale}/forbidden`);
  }

  const { userId: _userId, role } = authResult;

  // Check individual permissions
  const canApproveEmployers = (await requirePermission(StaffPermissionKeys.canApproveEmployers)).authorized;
  const canApproveJobPostings = (await requirePermission(StaffPermissionKeys.canApproveJobPostings)).authorized;
  const canModerateSkillsTaxonomy = (await requirePermission(StaffPermissionKeys.canModerateSkillsTaxonomy)).authorized;

  const isSuperAdmin = role === Role.SUPER_ADMIN;

  // Fetch counts and recent enquiries in parallel
  const [pendingEmployerCount, pendingJobPostingCount, pendingSkillCount, recentEnquiries] =
    await Promise.all([
      canApproveEmployers
        ? prisma.employerProfile.count({ where: { status: "PENDING" } })
        : Promise.resolve(null),
      canApproveJobPostings
        ? prisma.jobPosting.count({ where: { status: "PENDING" } })
        : Promise.resolve(null),
      canModerateSkillsTaxonomy
        ? prisma.skill.count({ where: { status: "PENDING" } })
        : Promise.resolve(null),
      prisma.enquiry.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        include: {
          course: { select: { titleEn: true } },
        },
      }),
    ]);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Welcome, {role === Role.SUPER_ADMIN ? "Super Admin" : "Staff"}
      </p>

      {/* Summary cards */}
      <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Pending employers */}
        <SummaryCard
          title="Pending Employer Registrations"
          count={pendingEmployerCount}
          href={`/${locale}/admin/employers?status=PENDING`}
          hasPermission={canApproveEmployers}
        />

        {/* Pending job postings */}
        <SummaryCard
          title="Pending Job Postings"
          count={pendingJobPostingCount}
          href={`/${locale}/admin/job-postings?status=PENDING`}
          hasPermission={canApproveJobPostings}
        />

        {/* Pending skills taxonomy */}
        <SummaryCard
          title="Pending Skills Taxonomy"
          count={pendingSkillCount}
          href={`/${locale}/admin/skills-taxonomy`}
          hasPermission={canModerateSkillsTaxonomy}
        />
      </section>

      {/* Recent enquiries */}
      <section className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent Enquiries</h2>
          <Link
            href={`/${locale}/admin/enquiries`}
            className="text-sm text-blue-600 hover:underline"
          >
            View all
          </Link>
        </div>

        <div className="mt-3 overflow-x-auto rounded border border-gray-300">
          {recentEnquiries.length === 0 ? (
            <p className="p-4 text-sm text-muted-foreground">No enquiries yet.</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-3 py-2 text-left text-sm font-medium">Name</th>
                  <th className="px-3 py-2 text-left text-sm font-medium">Phone</th>
                  <th className="px-3 py-2 text-left text-sm font-medium">Course</th>
                  <th className="px-3 py-2 text-left text-sm font-medium">Source</th>
                  <th className="px-3 py-2 text-left text-sm font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentEnquiries.map((enquiry) => (
                  <tr key={enquiry.id} className="border-t border-gray-300">
                    <td className="px-3 py-2 text-sm">{enquiry.name}</td>
                    <td className="px-3 py-2 text-sm">{enquiry.phone}</td>
                    <td className="px-3 py-2 text-sm">
                      {enquiry.course?.titleEn || "—"}
                    </td>
                    <td className="px-3 py-2 text-sm">{enquiry.source}</td>
                    <td className="px-3 py-2 text-sm">
                      {enquiry.createdAt.toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      {/* Quick links */}
      <section className="mt-8">
        {isSuperAdmin && (
          <Link
            href={`/${locale}/admin/audit-log`}
            className="inline-block rounded bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            View Audit Log
          </Link>
        )}
      </section>
    </main>
  );
}

function SummaryCard({
  title,
  count,
  href,
  hasPermission,
}: {
  title: string;
  count: number | null;
  href: string;
  hasPermission: boolean;
}) {
  if (!hasPermission) {
    return (
      <div className="rounded border border-gray-200 bg-gray-50 p-4 opacity-60">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="mt-1 text-xs text-gray-500">No access</p>
      </div>
    );
  }

  const colorClass =
    count !== null && count > 0
      ? "border-amber-300 bg-amber-50"
      : "border-gray-200 bg-white";

  return (
    <Link href={href} className="block">
      <div
        className={`rounded border p-4 transition-shadow hover:shadow-md ${colorClass}`}
      >
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <p className="mt-2 text-3xl font-bold">
          {count !== null ? count : "—"}
        </p>
        {count !== null && count > 0 && (
          <p className="mt-1 text-xs text-amber-700">Requires review</p>
        )}
      </div>
    </Link>
  );
}
