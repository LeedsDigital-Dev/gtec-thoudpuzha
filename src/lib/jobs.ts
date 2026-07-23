import { prisma } from "@/lib/db";
import type { JobPosting, JobType } from "@prisma/client";

export type ActiveJobPosting = Pick<
  JobPosting,
  | "id"
  | "title"
  | "department"
  | "salaryMin"
  | "salaryMax"
  | "salaryVisibility"
  | "jobType"
  | "skillIds"
  | "applicationDeadline"
  | "description"
  | "createdAt"
> & {
  employer: {
    companyName: string;
    companyAddress: string;
  };
};

export async function getActiveJobPostings(filters?: {
  jobType?: JobType;
  skillId?: string;
  location?: string;
}): Promise<ActiveJobPosting[]> {
  const where: Record<string, unknown> = {
    status: "APPROVED",
    deletedAt: null,
    applicationDeadline: { gt: new Date() },
  };

  if (filters?.jobType) {
    where.jobType = filters.jobType;
  }

  if (filters?.skillId) {
    where.skillIds = { has: filters.skillId };
  }

  const postings = await prisma.jobPosting.findMany({
    where,
    include: {
      employer: {
        select: { companyName: true, companyAddress: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  if (filters?.location) {
    const loc = filters.location.toLowerCase();
    return postings.filter((p) =>
      p.employer.companyAddress.toLowerCase().includes(loc),
    );
  }

  return postings;
}
