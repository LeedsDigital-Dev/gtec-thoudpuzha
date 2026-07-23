import { redirect } from "next/navigation";
import { requireRole, requirePermission, StaffPermissionKeys, Role } from "@/lib/auth";
import { prisma } from "@/lib/db";
import type { JobPostingStatus } from "@prisma/client";
import {
  approveJobPosting,
  rejectJobPosting,
  editAndApproveJobPosting,
} from "./actions";

interface JobPostingsPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ status?: string }>;
}

const STATUS_LABELS: Record<string, string> = {
  PENDING: "Pending",
  APPROVED: "Approved",
  REJECTED: "Rejected",
  CLOSED: "Closed",
};

const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-800",
  APPROVED: "bg-green-100 text-green-800",
  REJECTED: "bg-red-100 text-red-800",
  CLOSED: "bg-gray-100 text-gray-800",
  AUTO_PUBLISHED: "bg-blue-100 text-blue-800",
};

export default async function JobPostingsPage({
  params,
  searchParams,
}: JobPostingsPageProps) {
  const { locale } = await params;
  const { status: filterStatus } = await searchParams;

  const authResult = await requireRole([
    Role.CENTRE_STAFF,
    Role.SUPER_ADMIN,
  ]);

  if (!authResult.authorized) {
    redirect(`/${locale}/forbidden`);
  }

  const permResult = await requirePermission(StaffPermissionKeys.canApproveJobPostings);
  const canApprove = permResult.authorized;
  const isAutoPublishedView = filterStatus === "AUTO_PUBLISHED";

  // Determine Prisma filter
  let where: Record<string, unknown> = {};
  if (isAutoPublishedView) {
    where = { status: "APPROVED", autoPublished: true };
  } else if (
    filterStatus &&
    ["PENDING", "APPROVED", "REJECTED", "CLOSED"].includes(filterStatus)
  ) {
    where = { status: filterStatus as JobPostingStatus };
  }

  const postings = await prisma.jobPosting.findMany({
    where,
    include: { employer: true },
    orderBy: { createdAt: "desc" },
  });

  const statusFilters = ["PENDING", "APPROVED", "REJECTED", "CLOSED"];

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Job Postings Moderation</h1>

      {/* Status filter */}
      <section className="mt-4 flex items-center gap-2 flex-wrap">
        <span className="text-sm text-muted-foreground">Filter:</span>
        <a
          href={`/${locale}/admin/job-postings`}
          className={`rounded px-3 py-1 text-sm ${!filterStatus ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
        >
          All
        </a>
        {statusFilters.map((s) => (
          <a
            key={s}
            href={`/${locale}/admin/job-postings?status=${s}`}
            className={`rounded px-3 py-1 text-sm ${filterStatus === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
          >
            {STATUS_LABELS[s]}
          </a>
        ))}
        <a
          href={`/${locale}/admin/job-postings?status=AUTO_PUBLISHED`}
          className={`rounded px-3 py-1 text-sm ${isAutoPublishedView ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
        >
          Auto-published (audit)
        </a>
      </section>

      {/* Postings table */}
      <section className="mt-6">
        <h2 className="text-lg font-medium">
          {postings.length} posting{postings.length !== 1 ? "s" : ""}
          {isAutoPublishedView ? " (auto-published — for audit)" : ""}
        </h2>

        {postings.length === 0 ? (
          <p className="mt-4 text-muted-foreground">No job postings found.</p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-3 py-2 text-left">
                    Title
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-left">
                    Company
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-left">
                    Job Type
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-left">
                    Deadline
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-left">
                    Status
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-left">
                    Auto-published
                  </th>
                  {canApprove && !isAutoPublishedView && (
                    <th className="border border-gray-300 px-3 py-2 text-left">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {postings.map((jp) => (
                  <tr key={jp.id}>
                    <td className="border border-gray-300 px-3 py-2 font-medium">
                      {jp.title}
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-sm">
                      {jp.employer.companyName}
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-sm">
                      {jp.jobType.replace(/_/g, " ")}
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-sm font-mono">
                      {jp.applicationDeadline.toLocaleDateString()}
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      <span
                        className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${
                          isAutoPublishedView
                            ? STATUS_COLORS["AUTO_PUBLISHED"]
                            : STATUS_COLORS[jp.status] || STATUS_COLORS["PENDING"]
                        }`}
                      >
                        {isAutoPublishedView
                          ? "Auto-published"
                          : STATUS_LABELS[jp.status]}
                      </span>
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-sm">
                      {jp.autoPublished ? (
                        <span className="text-blue-600">Yes</span>
                      ) : (
                        <span className="text-muted-foreground">No</span>
                      )}
                      {jp.rejectionReason && (
                        <p className="mt-1 text-xs text-red-600">
                          {jp.rejectionReason}
                        </p>
                      )}
                    </td>
                    {canApprove && !isAutoPublishedView && (
                      <td className="border border-gray-300 px-3 py-2">
                        {jp.status === "PENDING" && (
                          <div className="flex flex-wrap gap-1">
                            <form action={approveJobPosting}>
                              <input type="hidden" name="locale" value={locale} />
                              <input
                                type="hidden"
                                name="postingId"
                                value={jp.id}
                              />
                              <button
                                type="submit"
                                className="rounded bg-green-600 px-2 py-1 text-xs text-white hover:bg-green-700"
                              >
                                Approve
                              </button>
                            </form>

                            <details className="inline-block">
                              <summary className="cursor-pointer rounded bg-red-600 px-2 py-1 text-xs text-white hover:bg-red-700">
                                Reject
                              </summary>
                              <form
                                action={rejectJobPosting}
                                className="mt-1 flex gap-1"
                              >
                                <input
                                  type="hidden"
                                  name="locale"
                                  value={locale}
                                />
                                <input
                                  type="hidden"
                                  name="postingId"
                                  value={jp.id}
                                />
                                <input
                                  name="rejectionReason"
                                  placeholder="Reason (required)"
                                  required
                                  className="w-40 rounded border border-border px-2 py-1 text-xs"
                                />
                                <button
                                  type="submit"
                                  className="rounded bg-red-600 px-2 py-1 text-xs text-white hover:bg-red-700"
                                >
                                  Submit
                                </button>
                              </form>
                            </details>

                            <details className="inline-block">
                              <summary className="cursor-pointer rounded bg-blue-600 px-2 py-1 text-xs text-white hover:bg-blue-700">
                                Edit & Approve
                              </summary>
                              <form
                                action={editAndApproveJobPosting}
                                className="mt-1 flex flex-col gap-1"
                              >
                                <input
                                  type="hidden"
                                  name="locale"
                                  value={locale}
                                />
                                <input
                                  type="hidden"
                                  name="postingId"
                                  value={jp.id}
                                />
                                <input
                                  name="title"
                                  defaultValue={jp.title}
                                  className="w-full rounded border border-border px-2 py-1 text-xs"
                                />
                                <textarea
                                  name="description"
                                  defaultValue={jp.description}
                                  className="w-full rounded border border-border px-2 py-1 text-xs"
                                  rows={2}
                                />
                                <div className="flex gap-1">
                                  <input
                                    name="salaryMin"
                                    type="number"
                                    defaultValue={jp.salaryMin ?? ""}
                                    placeholder="Salary min"
                                    className="w-24 rounded border border-border px-2 py-1 text-xs"
                                  />
                                  <input
                                    name="salaryMax"
                                    type="number"
                                    defaultValue={jp.salaryMax ?? ""}
                                    placeholder="Salary max"
                                    className="w-24 rounded border border-border px-2 py-1 text-xs"
                                  />
                                </div>
                                <button
                                  type="submit"
                                  className="rounded bg-blue-600 px-2 py-1 text-xs text-white hover:bg-blue-700"
                                >
                                  Save & Approve
                                </button>
                              </form>
                            </details>
                          </div>
                        )}

                        {jp.status === "REJECTED" && (
                          <form action={approveJobPosting}>
                            <input type="hidden" name="locale" value={locale} />
                            <input
                              type="hidden"
                              name="postingId"
                              value={jp.id}
                            />
                            <button
                              type="submit"
                              className="rounded bg-green-600 px-2 py-1 text-xs text-white hover:bg-green-700"
                            >
                              Re-approve
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
