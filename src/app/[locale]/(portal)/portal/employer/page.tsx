import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { Role } from "@/lib/auth";
import type { JobPostingStatus } from "@prisma/client";

const STATUS_BADGE: Record<JobPostingStatus, { label: string; class: string }> =
  {
    PENDING: {
      label: "Pending Review",
      class: "bg-amber-100 text-amber-800",
    },
    APPROVED: {
      label: "Approved",
      class: "bg-green-100 text-green-800",
    },
    REJECTED: {
      label: "Rejected",
      class: "bg-red-100 text-red-800",
    },
    CLOSED: {
      label: "Closed",
      class: "bg-gray-100 text-gray-800",
    },
  };

export default async function EmployerDashboardPage() {
  const session = await auth();
  if (!session.userId) {
    redirect("/sign-in");
  }

  const role = session.sessionClaims?.metadata?.role as string | undefined;
  if (role !== Role.EMPLOYER) {
    redirect("/forbidden");
  }

  const profile = await prisma.employerProfile.findUnique({
    where: { userId: session.userId },
  });

  if (!profile) {
    redirect("/portal/employer/register");
  }

  if (profile.status === "PENDING" || profile.status === "REJECTED") {
    redirect("/portal/employer/register/status");
  }

  const postings = await prisma.jobPosting.findMany({
    where: { employerId: profile.id, deletedAt: null },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      jobType: true,
      status: true,
      applicationDeadline: true,
      createdAt: true,
    },
  });

  return (
    <div className="mx-auto max-w-4xl p-4 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Employer Dashboard</h1>
          <p className="mt-1 text-gray-600">{profile.companyName}</p>
        </div>
        <Link
          href="/portal/employer/post-vacancy"
          className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Post a Vacancy
        </Link>
      </div>

      <h2 className="mb-4 text-xl font-semibold">Your Job Postings</h2>

      {postings.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center text-gray-500">
          <p>No job postings yet.</p>
          <Link
            href="/portal/employer/post-vacancy"
            className="mt-2 inline-block text-blue-600 underline"
          >
            Post your first vacancy
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {postings.map((posting) => {
            const badge = STATUS_BADGE[posting.status];
            return (
              <div
                key={posting.id}
                className="rounded-lg border p-4 transition-colors hover:bg-gray-50"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">{posting.title}</h3>
                    <p className="mt-0.5 text-sm text-gray-500">
                      {posting.jobType.replace("_", " ")} · Deadline:{" "}
                      {new Date(posting.applicationDeadline).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${badge.class}`}
                  >
                    {badge.label}
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-400">
                  Posted {new Date(posting.createdAt).toLocaleDateString()}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
