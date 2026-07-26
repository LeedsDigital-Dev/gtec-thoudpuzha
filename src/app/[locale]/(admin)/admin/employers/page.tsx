import { redirect } from "next/navigation";
import { requireRole, requirePermission, StaffPermissionKeys, Role } from "@/lib/auth";
import { prisma } from "@/lib/db";
import type { EmployerProfileStatus } from "@prisma/client";
import {
  approveEmployer,
  rejectEmployer,
  approveAndTrustEmployer,
  toggleAutoPublishTrusted,
} from "./actions";

interface EmployersPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ status?: string }>;
}

const STATUS_LABELS: Record<string, string> = {
  PENDING: "Pending",
  APPROVED: "Approved",
  REJECTED: "Rejected",
};

export default async function EmployersPage({
  params,
  searchParams,
}: EmployersPageProps) {
  const { locale } = await params;
  const { status: filterStatus } = await searchParams;

  const authResult = await requireRole([
    Role.CENTRE_STAFF,
    Role.SUPER_ADMIN,
  ]);

  if (!authResult.authorized) {
    redirect(`/${locale}/forbidden`);
  }

  const permResult = await requirePermission(StaffPermissionKeys.canApproveEmployers);
  const canApprove = permResult.authorized;

  const where =
    filterStatus && ["PENDING", "APPROVED", "REJECTED"].includes(filterStatus)
      ? { status: filterStatus as EmployerProfileStatus }
      : {};

  const employers = await prisma.employerProfile.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  const statuses = ["PENDING", "APPROVED", "REJECTED"];

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Employer Registrations</h1>

      {/* Status filter */}
      <section className="mt-4 flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Filter:</span>
        <a
          href={`/${locale}/admin/employers`}
          className={`rounded px-3 py-1 text-sm ${!filterStatus ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
        >
          All
        </a>
        {statuses.map((s) => (
          <a
            key={s}
            href={`/${locale}/admin/employers?status=${s}`}
            className={`rounded px-3 py-1 text-sm ${filterStatus === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
          >
            {STATUS_LABELS[s]}
          </a>
        ))}
      </section>

      {/* Employers table */}
      <section className="mt-6">
        <h2 className="text-lg font-medium">
          {employers.length} registration{employers.length !== 1 ? "s" : ""}
        </h2>

        {employers.length === 0 ? (
          <p className="mt-4 text-muted-foreground">
            No employer registrations found.
          </p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr>
                  <th className="border border-border px-3 py-2 text-left">
                    Company
                  </th>
                  <th className="border border-border px-3 py-2 text-left">
                    Contact Person
                  </th>
                  <th className="border border-border px-3 py-2 text-left">
                    Phone
                  </th>
                  <th className="border border-border px-3 py-2 text-left">
                    Email
                  </th>
                  <th className="border border-border px-3 py-2 text-left">
                    Industry
                  </th>
                  <th className="border border-border px-3 py-2 text-left">
                    Status
                  </th>
                  <th className="border border-border px-3 py-2 text-left">
                    Auto-Publish
                  </th>
                  {canApprove && (
                    <th className="border border-border px-3 py-2 text-left">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {employers.map((ep) => (
                  <tr key={ep.id}>
                    <td className="border border-border px-3 py-2 font-medium">
                      {ep.companyName}
                    </td>
                    <td className="border border-border px-3 py-2">
                      {ep.contactPersonName}
                    </td>
                    <td className="border border-border px-3 py-2 font-mono text-sm">
                      {ep.phone}
                    </td>
                    <td className="border border-border px-3 py-2 text-sm">
                      {ep.email}
                    </td>
                    <td className="border border-border px-3 py-2 text-sm">
                      {ep.industrySector.replace(/_/g, " ")}
                    </td>
                    <td className="border border-border px-3 py-2">
                      <span
                        className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${
                          ep.status === "APPROVED"
                            ? "bg-primary/10 text-primary"
                            : ep.status === "REJECTED"
                              ? "bg-destructive/10 text-destructive"
                              : "bg-accent/10 text-accent"
                        }`}
                      >
                        {STATUS_LABELS[ep.status]}
                      </span>
                      {ep.rejectionReason && (
                        <p className="mt-1 text-xs text-destructive">
                          {ep.rejectionReason}
                        </p>
                      )}
                    </td>
                    <td className="border border-border px-3 py-2 text-sm">
                      {ep.autoPublishTrusted ? (
                        <span className="text-primary">Trusted</span>
                      ) : (
                        <span className="text-muted-foreground">No</span>
                      )}
                    </td>
                    {canApprove && (
                      <td className="border border-border px-3 py-2">
                        {ep.status === "PENDING" && (
                          <div className="flex flex-wrap gap-1">
                            <form action={approveEmployer}>
                              <input type="hidden" name="locale" value={locale} />
                              <input
                                type="hidden"
                                name="profileId"
                                value={ep.id}
                              />
                              <button
                                type="submit"
                                className="rounded bg-primary px-2 py-1 text-xs text-white hover:bg-primary/90"
                              >
                                Approve
                              </button>
                            </form>

                            <form action={approveAndTrustEmployer}>
                              <input type="hidden" name="locale" value={locale} />
                              <input
                                type="hidden"
                                name="profileId"
                                value={ep.id}
                              />
                              <button
                                type="submit"
                                className="rounded bg-primary px-2 py-1 text-xs text-white hover:bg-primary/90"
                              >
                                Approve + Trust
                              </button>
                            </form>

                            <details className="inline-block">
                              <summary className="cursor-pointer rounded bg-destructive px-2 py-1 text-xs text-white hover:bg-destructive/90">
                                Reject
                              </summary>
                              <form
                                action={rejectEmployer}
                                className="mt-1 flex gap-1"
                              >
                                <input
                                  type="hidden"
                                  name="locale"
                                  value={locale}
                                />
                                <input
                                  type="hidden"
                                  name="profileId"
                                  value={ep.id}
                                />
                                <input
                                  name="rejectionReason"
                                  placeholder="Reason (required)"
                                  required
                                  className="w-40 rounded border border-border px-2 py-1 text-xs"
                                />
                                <button
                                  type="submit"
                                  className="rounded bg-destructive px-2 py-1 text-xs text-white hover:bg-destructive/90"
                                >
                                  Submit
                                </button>
                              </form>
                            </details>
                          </div>
                        )}

                        {ep.status === "REJECTED" && (
                          <form action={approveEmployer}>
                            <input type="hidden" name="locale" value={locale} />
                            <input
                              type="hidden"
                              name="profileId"
                              value={ep.id}
                            />
                            <button
                              type="submit"
                              className="rounded bg-primary px-2 py-1 text-xs text-white hover:bg-primary/90"
                            >
                              Re-approve
                            </button>
                          </form>
                        )}

                        {ep.status === "APPROVED" && (
                          <form action={toggleAutoPublishTrusted}>
                            <input type="hidden" name="locale" value={locale} />
                            <input
                              type="hidden"
                              name="profileId"
                              value={ep.id}
                            />
                            <button
                              type="submit"
                              className={`rounded px-2 py-1 text-xs text-white ${ep.autoPublishTrusted ? "bg-accent/80 hover:bg-accent/90" : "bg-primary hover:bg-primary/90"}`}
                            >
                              {ep.autoPublishTrusted
                                ? "Remove Trust"
                                : "Mark Trusted"}
                            </button>
                          </form>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
