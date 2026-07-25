import { auth } from "@clerk/nextjs/server";
import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/db";
import { Role, getEffectiveRole } from "@/lib/auth";
import Link from "next/link";
import { Briefcase, User, Search } from "lucide-react";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function JobSeekerDashboardPage({ params }: PageProps) {
  const { locale } = await params;
  const session = await auth();
  if (!session.userId) return null;

  const role = await getEffectiveRole(session);
  const t = await getTranslations({ locale, namespace: "jobSeekerDashboard" });
  const rgt = await getTranslations({ locale, namespace: "roleGate" });

  if (role !== Role.JOB_SEEKER) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-semibold">{rgt("notYourAccount")}</h1>
          <p className="mt-2 text-gray-600">
            {rgt("description", { roles: "Job Seeker" })}
          </p>
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

  const hasBiodata = profile !== null;

  const applicationsCount = hasBiodata
    ? await prisma.application.count({
        where: { candidateProfileId: profile.id },
      })
    : 0;

  const recentApplications = hasBiodata
    ? await prisma.application.findMany({
        where: { candidateProfileId: profile.id },
        orderBy: { appliedAt: "desc" },
        take: 3,
        include: {
          jobPosting: {
            select: {
              id: true,
              title: true,
              employer: { select: { companyName: true } },
            },
          },
        },
      })
    : [];

  const STATUS_STYLES: Record<string, string> = {
    APPLIED: "bg-blue-100 text-blue-800",
    VIEWED: "bg-purple-100 text-purple-800",
    SHORTLISTED: "bg-amber-100 text-amber-800",
    REJECTED: "bg-red-100 text-red-800",
    HIRED: "bg-green-100 text-green-800",
  };

  return (
    <div className="p-6">
      <h1 className="mb-2 text-3xl font-semibold">
        {profile?.fullName
          ? t("welcomeBack", { name: profile.fullName })
          : t("heading")}
      </h1>
      <p className="text-muted-foreground">
        {hasBiodata ? t("readyToApply") : t("completeProfileHint")}
      </p>

      {/* Action tiles */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/portal/jobs"
          className="flex items-center gap-4 rounded-lg border p-6 transition-shadow hover:shadow-md"
        >
          <Search className="h-8 w-8 text-blue-600" />
          <div>
            <span className="text-lg font-medium">{t("browseJobs")}</span>
            <p className="text-sm text-muted-foreground">
              {t("browseJobsDesc")}
            </p>
          </div>
        </Link>

        <Link
          href="/portal/student/applications"
          className="flex items-center gap-4 rounded-lg border p-6 transition-shadow hover:shadow-md"
        >
          <Briefcase className="h-8 w-8 text-green-600" />
          <div>
            <span className="text-lg font-medium">{t("myApplications")}</span>
            <p className="text-sm text-muted-foreground">
              {applicationsCount > 0
                ? t("applicationsCount", { count: applicationsCount })
                : t("noApplicationsYet")}
            </p>
          </div>
        </Link>

        <Link
          href="/portal/student/biodata"
          className="flex items-center gap-4 rounded-lg border p-6 transition-shadow hover:shadow-md"
        >
          <User className="h-8 w-8 text-purple-600" />
          <div>
            <span className="text-lg font-medium">
              {hasBiodata ? t("updateProfile") : t("completeProfile")}
            </span>
            <p className="text-sm text-muted-foreground">
              {hasBiodata ? t("profileReady") : t("profileNeeded")}
            </p>
          </div>
        </Link>
      </div>

      {/* Recent applications */}
      {recentApplications.length > 0 && (
        <section className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">{t("recentApplications")}</h2>
            <Link
              href="/portal/student/applications"
              className="text-sm text-blue-600 hover:underline"
            >
              {t("viewAll")}
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {recentApplications.map((app) => {
              const badgeStyle =
                STATUS_STYLES[app.status] ?? "bg-gray-100 text-gray-800";
              return (
                <div
                  key={app.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <Link
                      href={`/portal/jobs/${app.jobPosting.id}`}
                      className="font-medium text-blue-600 hover:underline"
                    >
                      {app.jobPosting.title}
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      {app.jobPosting.employer.companyName}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${badgeStyle}`}
                  >
                    {app.status}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
