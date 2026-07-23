import { auth } from "@clerk/nextjs/server";
import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/db";
import { Role } from "@/lib/auth";
import Link from "next/link";

interface PageProps {
  params: Promise<{ locale: string }>;
}

const STATUS_STYLES: Record<string, string> = {
  APPLIED: "bg-blue-100 text-blue-800",
  VIEWED: "bg-purple-100 text-purple-800",
  SHORTLISTED: "bg-amber-100 text-amber-800",
  REJECTED: "bg-red-100 text-red-800",
  HIRED: "bg-green-100 text-green-800",
};

export default async function StudentApplicationsPage({ params }: PageProps) {
  const { locale } = await params;
  const session = await auth();
  if (!session.userId) return null;

  const role = session.sessionClaims?.metadata?.role as Role | undefined;
  const sa = await getTranslations({ locale, namespace: "studentApplications" });
  const rgt = await getTranslations({ locale, namespace: "roleGate" });

  if (role !== Role.STUDENT && role !== Role.JOB_SEEKER) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-semibold">{rgt("notYourAccount")}</h1>
          <Link
            href="/portal"
            className="mt-4 inline-block text-blue-600 underline"
          >
            {rgt("goToPortal")}
          </Link>
        </div>
      </div>
    );
  }

  const profile = await prisma.candidateProfile.findUnique({
    where: { userId: session.userId },
  });
  if (!profile) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-semibold">{sa("noProfile")}</h1>
          <p className="mt-2 text-gray-600">{sa("noProfileDesc")}</p>
          <Link
            href="/portal/student/biodata"
            className="mt-4 inline-block text-blue-600 underline"
          >
            {sa("completeBiodata")}
          </Link>
        </div>
      </div>
    );
  }

  const applications = await prisma.application.findMany({
    where: { candidateProfileId: profile.id },
    orderBy: { appliedAt: "desc" },
    include: {
      jobPosting: {
        select: {
          id: true,
          title: true,
          status: true,
          applicationDeadline: true,
          employer: {
            select: {
              companyName: true,
            },
          },
        },
      },
    },
  });

  return (
    <div className="mx-auto max-w-3xl p-4 py-10">
      <h1 className="mb-8 text-3xl font-semibold">{sa("heading")}</h1>

      {applications.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center text-gray-500">
          <p>{sa("noApplications")}</p>
          <Link
            href="/portal/jobs"
            className="mt-2 inline-block text-blue-600 underline"
          >
            {sa("browseJobs")}
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => {
            const badgeStyle = STATUS_STYLES[app.status] ?? "bg-gray-100 text-gray-800";
            return (
              <div
                key={app.id}
                className="rounded-lg border p-4 transition-colors hover:bg-gray-50"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <Link
                      href={`/portal/jobs/${app.jobPosting.id}`}
                      className="font-medium text-blue-600 hover:underline"
                    >
                      {app.jobPosting.title}
                    </Link>
                    <p className="mt-0.5 text-sm text-gray-500">
                      {app.jobPosting.employer.companyName}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${badgeStyle}`}
                  >
                    {app.status}
                  </span>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  {sa("applied", { date: new Date(app.appliedAt).toLocaleDateString() })}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
