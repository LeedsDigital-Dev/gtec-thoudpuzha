import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";
import type { JobPosting, JobType, EmployerProfile } from "@prisma/client";

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

export type JobDetail = Pick<
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
  employer: Pick<
    EmployerProfile,
    "companyName" | "companyAddress" | "industrySector" | "employeeCountRange" | "aboutCompany"
  >;
};

/** Fetch a single active (approved, non-expired, non-deleted) job posting. */
export async function getJobDetail(id: string): Promise<JobDetail | null> {
  try {
    const posting = await prisma.jobPosting.findFirst({
      where: {
        id,
        status: "APPROVED",
        deletedAt: null,
        applicationDeadline: { gt: new Date() },
      },
      select: {
        id: true,
        title: true,
        department: true,
        salaryMin: true,
        salaryMax: true,
        salaryVisibility: true,
        jobType: true,
        skillIds: true,
        applicationDeadline: true,
        description: true,
        createdAt: true,
        employer: {
          select: {
            companyName: true,
            companyAddress: true,
            industrySector: true,
            employeeCountRange: true,
            aboutCompany: true,
          },
        },
      },
    });
    return posting;
  } catch (err) {
    logger.exception("jobs", "Failed to fetch job detail", err);
    return null;
  }
}

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
  }).catch((err) => {
    logger.exception("jobs", "Failed to fetch active job postings", err);
    return [];
  });

  if (filters?.location) {
    const loc = filters.location.toLowerCase();
    return postings.filter((p) =>
      p.employer.companyAddress.toLowerCase().includes(loc),
    );
  }

  return postings;
}
