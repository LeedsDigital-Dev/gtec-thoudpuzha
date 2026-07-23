import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { Role } from "@/lib/auth";
import { ApplicantsList } from "./applicants-list";

export default async function ApplicantsPage({
  params,
}: {
  params: Promise<{ postingId: string }>;
}) {
  const { postingId } = await params;

  const session = await auth();
  if (!session.userId) redirect("/sign-in");

  const role = session.sessionClaims?.metadata?.role as string | undefined;
  if (role !== Role.EMPLOYER) redirect("/forbidden");

  const profile = await prisma.employerProfile.findUnique({
    where: { userId: session.userId },
  });
  if (!profile) redirect("/portal/employer/register");
  if (profile.status === "PENDING" || profile.status === "REJECTED") {
    redirect("/portal/employer/register/status");
  }

  const posting = await prisma.jobPosting.findFirst({
    where: { id: postingId, employerId: profile.id, deletedAt: null },
    select: { id: true, title: true, employerId: true },
  });
  if (!posting) redirect("/portal/employer");

  // Auto-transition APPLIED → VIEWED on employer view
  await prisma.application.updateMany({
    where: { jobPostingId: postingId, status: "APPLIED" },
    data: { status: "VIEWED", statusUpdatedAt: new Date() },
  });

  const applicants = await prisma.application.findMany({
    where: { jobPostingId: postingId },
    orderBy: { appliedAt: "desc" },
    include: {
      candidateProfile: {
        select: {
          id: true,
          fullName: true,
          email: true,
          phone: true,
          educationalQualification: true,
          skillIds: true,
          preferredJobLocation: true,
          preferredJobType: true,
          careerObjective: true,
          photoUrl: true,
        },
      },
    },
  });

  return (
    <div className="mx-auto max-w-5xl p-4 py-10">
      <h1 className="mb-2 text-3xl font-semibold">Applicants</h1>
      <p className="mb-8 text-gray-600">{posting.title}</p>

      {applicants.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center text-gray-500">
          <p>No applications received yet.</p>
        </div>
      ) : (
        <ApplicantsList applicants={applicants} postingId={postingId} />
      )}
    </div>
  );
}
