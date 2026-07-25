import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/db";
import { Role, getEffectiveRole } from "@/lib/auth";
import { getSearchableCandidates } from "@/lib/biodata-search";
import { CandidateSearchForm } from "./search-form";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function CandidateSearchPage({ params }: PageProps) {
  const { locale } = await params;
  const session = await auth();
  if (!session.userId) {
    redirect("/sign-in");
  }

  const role = await getEffectiveRole(session);
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

  const t = await getTranslations({ locale, namespace: "candidateSearch" });

  const [candidates, employerPostings] = await Promise.all([
    getSearchableCandidates(),
    prisma.jobPosting.findMany({
      where: {
        employerId: profile.id,
        status: "APPROVED",
        deletedAt: null,
      },
      select: { id: true, title: true, status: true },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <div className="mx-auto max-w-6xl p-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">{t("heading")}</h1>
        <p className="mt-1 text-gray-600">{t("description")}</p>
      </div>

      <CandidateSearchForm
        candidates={candidates.map((c) => ({
          id: c.id,
          fullName: c.fullName,
          email: c.email,
          phone: c.phone,
          preferredJobLocation: c.preferredJobLocation,
          preferredJobType: c.preferredJobType ?? null,
          educationalQualification: c.educationalQualification ?? null,
          skillIds: c.skillIds,
          courseCompletedIds: c.courseCompletedIds,
          languagesKnown: c.languagesKnown,
          careerObjective: c.careerObjective,
          isVerifiedStudent: c.isVerifiedStudent,
        }))}
        jobPostings={employerPostings}
      />
    </div>
  );
}
