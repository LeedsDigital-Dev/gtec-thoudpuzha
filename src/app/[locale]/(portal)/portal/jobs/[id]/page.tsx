import { notFound, redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { Role } from "@/lib/auth";
import { getJobDetail } from "@/lib/jobs";
import { isProfileComplete } from "@/lib/biodata";
import { getSkillsByIds } from "@/lib/skills";
import type { JobType } from "@prisma/client";
import { ApplyButton } from "./apply-button";

interface PageProps {
  params: Promise<{ locale: string; id: string }>;
}

const JOB_TYPE_LABELS: Record<JobType, string> = {
  FULL_TIME: "Full Time",
  PART_TIME: "Part Time",
  CONTRACT: "Contract",
};

const EMPLOYEE_COUNT_LABELS: Record<string, string> = {
  RANGE_1_10: "1-10 employees",
  RANGE_11_50: "11-50 employees",
  RANGE_51_200: "51-200 employees",
  RANGE_200_PLUS: "200+ employees",
};

const INDUSTRY_LABELS: Record<string, string> = {
  IT_SOFTWARE: "IT & Software",
  EDUCATION_TRAINING: "Education & Training",
  HEALTHCARE: "Healthcare",
  BANKING_FINANCE: "Banking & Finance",
  MANUFACTURING: "Manufacturing",
  RETAIL: "Retail",
  HOSPITALITY: "Hospitality",
  CONSTRUCTION: "Construction",
  TELECOMMUNICATION: "Telecommunication",
  OTHER: "Other",
};

export default async function JobDetailPage({ params }: PageProps) {
  const { locale, id } = await params;

  const session = await auth();
  if (!session.userId) redirect("/sign-in");

  const role = session.sessionClaims?.metadata?.role as string | undefined;
  if (role !== Role.STUDENT && role !== Role.JOB_SEEKER) {
    redirect(`/${locale}/forbidden`);
  }

  const job = await getJobDetail(id);
  if (!job) notFound();

  const [skills, profile] = await Promise.all([
    getSkillsByIds(job.skillIds),
    prisma.candidateProfile.findUnique({ where: { userId: session.userId } }),
  ]);

  let alreadyApplied = false;
  let profileComplete = false;

  if (profile) {
    const completionInfo = isProfileComplete({
      ...profile,
      isVerifiedStudent: profile.isVerifiedStudent,
      studentRecordId: profile.studentRecordId,
    });
    profileComplete = completionInfo;

    if (profileComplete) {
      const existing = await prisma.application.findUnique({
        where: {
          jobPostingId_candidateProfileId: {
            jobPostingId: id,
            candidateProfileId: profile.id,
          },
        },
      });
      alreadyApplied = !!existing;
    }
  }

  const salaryDisplay =
    job.salaryVisibility === "DISCLOSE" && job.salaryMin
      ? `₹${job.salaryMin.toLocaleString("en-IN")}${
          job.salaryMax
            ? ` - ₹${job.salaryMax.toLocaleString("en-IN")}`
            : "+"
        }`
      : "Disclosed at interview";

  return (
    <div className="mx-auto max-w-4xl p-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">{job.title}</h1>
        <p className="mt-1 text-lg text-gray-600">
          {job.employer.companyName}
          {job.department && ` · ${job.department}`}
        </p>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
          {JOB_TYPE_LABELS[job.jobType]}
        </span>
        {job.employer.companyAddress && (
          <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
            {job.employer.companyAddress}
          </span>
        )}
        {job.employer.industrySector && (
          <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
            {INDUSTRY_LABELS[job.employer.industrySector] || job.employer.industrySector}
          </span>
        )}
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border p-4">
          <p className="text-sm text-gray-500">Salary</p>
          <p className="mt-1 font-medium">{salaryDisplay}</p>
        </div>
        {job.employer.employeeCountRange && (
          <div className="rounded-lg border p-4">
            <p className="text-sm text-gray-500">Company Size</p>
            <p className="mt-1 font-medium">
              {EMPLOYEE_COUNT_LABELS[job.employer.employeeCountRange]}
            </p>
          </div>
        )}
        <div className="rounded-lg border p-4">
          <p className="text-sm text-gray-500">Deadline</p>
          <p className="mt-1 font-medium">
            {new Date(job.applicationDeadline).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="mb-2 text-xl font-semibold">About this role</h2>
        <div className="whitespace-pre-wrap text-gray-700">{job.description}</div>
      </div>

      {job.employer.aboutCompany && (
        <div className="mb-8">
          <h2 className="mb-2 text-xl font-semibold">About {job.employer.companyName}</h2>
          <p className="text-gray-700">{job.employer.aboutCompany}</p>
        </div>
      )}

      {skills.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-2 text-xl font-semibold">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill.id}
                className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800"
              >
                {skill.label}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="border-t pt-6">
        <ApplyButton
          jobPostingId={id}
          locale={locale}
          hasProfile={!!profile}
          profileComplete={profileComplete}
          alreadyApplied={alreadyApplied}
        />
      </div>
    </div>
  );
}
