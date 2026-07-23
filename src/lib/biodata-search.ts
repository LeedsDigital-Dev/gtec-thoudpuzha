import type { CandidateProfileWithCompletion } from "./biodata";
import { isProfileComplete } from "./biodata";

/**
 * Returns searchable CandidateProfiles — those with profileVisible=true AND
 * a complete profile. Sprint 8's employer candidate search MUST use this
 * helper rather than querying CandidateProfile directly.
 */
export async function getSearchableCandidates(): Promise<CandidateProfileWithCompletion[]> {
  const { prisma } = await import("@/lib/db");
  const profiles = await prisma.candidateProfile.findMany({
    where: { profileVisible: true },
  });

  return profiles
    .filter((p) => {
      const wrapped: CandidateProfileWithCompletion = {
        ...p,
        isVerifiedStudent: p.isVerifiedStudent,
        studentRecordId: p.studentRecordId,
      };
      return isProfileComplete(wrapped);
    })
    .map((p) => ({
      ...p,
      isVerifiedStudent: p.isVerifiedStudent,
      studentRecordId: p.studentRecordId,
    }));
}
