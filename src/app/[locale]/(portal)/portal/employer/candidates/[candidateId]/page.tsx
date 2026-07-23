import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { Role } from "@/lib/auth";
import { getSearchableCandidates } from "@/lib/biodata-search";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ candidateId: string }>;
}

const QUALIFICATION_LABELS: Record<string, string> = {
  SSLC: "SSLC",
  PLUS_TWO: "Plus Two",
  DIPLOMA: "Diploma",
  GRADUATE: "Graduate",
  POST_GRADUATE: "Post Graduate",
  OTHER: "Other",
};

const JOB_TYPE_LABELS: Record<string, string> = {
  FULL_TIME: "Full Time",
  PART_TIME: "Part Time",
  INTERNSHIP: "Internship",
  WORK_FROM_HOME: "Work from Home",
};

export default async function CandidateDetailPage({ params }: PageProps) {
  const { candidateId } = await params;
  const session = await auth();
  if (!session.userId) redirect("/sign-in");

  const role = session.sessionClaims?.metadata?.role as string | undefined;
  if (role !== Role.EMPLOYER) redirect("/forbidden");

  const profile = await prisma.employerProfile.findUnique({
    where: { userId: session.userId },
  });
  if (!profile || profile.status !== "APPROVED") {
    redirect("/portal/employer/register/status");
  }

  // Only allow viewing searchable candidates (reuse getSearchableCandidates)
  const searchable = await getSearchableCandidates();
  const candidate = searchable.find((c) => c.id === candidateId);
  if (!candidate) {
    redirect("/portal/employer/candidates");
  }

  // Resolve course names
  let courseNames: { id: string; titleEn: string }[] = [];
  if (candidate.courseCompletedIds.length > 0) {
    courseNames = await prisma.course.findMany({
      where: { id: { in: candidate.courseCompletedIds } },
      select: { id: true, titleEn: true },
    });
  }

  // Resolve skill labels
  let skillLabels: { id: string; label: string }[] = [];
  if (candidate.skillIds.length > 0) {
    skillLabels = await prisma.skill.findMany({
      where: { id: { in: candidate.skillIds } },
      select: { id: true, label: true },
    });
  }

  const courseMap = new Map(courseNames.map((c) => [c.id, c.titleEn]));
  const skillMap = new Map(skillLabels.map((s) => [s.id, s.label]));

  return (
    <div className="mx-auto max-w-4xl p-4 py-10">
      <Link
        href="/portal/employer/candidates"
        className="mb-4 inline-flex items-center text-sm text-blue-600 hover:underline"
      >
        ← Back to Candidate Search
      </Link>

      <div className="rounded-lg border bg-white p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold">
            {candidate.fullName ?? "Unnamed Candidate"}
          </h1>
          {candidate.isVerifiedStudent && (
            <span className="mt-1 inline-block rounded-full bg-green-100 px-3 py-0.5 text-xs font-medium text-green-800">
              Verified Student
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Section title="Contact">
            <Field label="Email" value={candidate.email} />
            <Field label="Phone" value={candidate.phone} />
            <Field label="Address" value={candidate.address} />
          </Section>

          <Section title="Education">
            <Field
              label="Qualification"
              value={
                candidate.educationalQualification
                  ? QUALIFICATION_LABELS[candidate.educationalQualification] ??
                    candidate.educationalQualification
                  : null
              }
            />
            <Field
              label="Year of Passing"
              value={candidate.yearOfPassing?.toString() ?? null}
            />
            {candidate.isVerifiedStudent && courseNames.length > 0 && (
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Courses Completed
                </span>
                <ul className="mt-1 list-inside list-disc text-sm">
                  {candidate.courseCompletedIds.map((id) => (
                    <li key={id}>{courseMap.get(id) ?? id}</li>
                  ))}
                </ul>
              </div>
            )}
          </Section>

          <Section title="Job Preferences">
            <Field
              label="Preferred Location"
              value={candidate.preferredJobLocation}
            />
            <Field
              label="Preferred Job Type"
              value={
                candidate.preferredJobType
                  ? JOB_TYPE_LABELS[candidate.preferredJobType] ??
                    candidate.preferredJobType
                  : null
              }
            />
            <Field
              label="Career Objective"
              value={candidate.careerObjective}
            />
          </Section>

          <Section title="Skills & Languages">
            {skillLabels.length > 0 && (
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Skills
                </span>
                <div className="mt-1 flex flex-wrap gap-1">
                  {candidate.skillIds.map((id) => (
                    <span
                      key={id}
                      className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs text-blue-700"
                    >
                      {skillMap.get(id) ?? id}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {candidate.languagesKnown.length > 0 && (
              <div className="mt-3">
                <span className="text-sm font-medium text-gray-500">
                  Languages
                </span>
                <div className="mt-1 flex flex-wrap gap-1">
                  {candidate.languagesKnown.map((lang) => (
                    <span
                      key={lang}
                      className="rounded-full bg-green-50 px-2.5 py-0.5 text-xs text-green-700"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </Section>
        </div>

        <div className="mt-6 border-t pt-4">
          <Link
            href={`/api/biodata/${candidate.id}/pdf`}
            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
          >
            Download Biodata (PDF)
          </Link>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-400">
        {title}
      </h2>
      {children}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;
  return (
    <div className="mb-2">
      <span className="text-sm font-medium text-gray-500">{label}</span>
      <p className="text-sm">{value}</p>
    </div>
  );
}
