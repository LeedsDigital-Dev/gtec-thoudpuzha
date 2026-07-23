import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { Role } from "@/lib/auth";
import { getSearchableCandidates } from "@/lib/biodata-search";
import { CandidateSearchForm } from "./search-form";

export const dynamic = "force-dynamic";

export default async function CandidateSearchPage() {
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
        <h1 className="text-3xl font-semibold">Candidate Search</h1>
        <p className="mt-1 text-gray-600">
          Browse and search candidate profiles
        </p>
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
