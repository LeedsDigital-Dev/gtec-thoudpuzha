"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { Role } from "@/lib/auth";
import type {
  EducationalQualification,
  PreferredJobType,
} from "@prisma/client";

export type BiodataFormData = {
  fullName?: string;
  dateOfBirth?: string;
  phone?: string;
  email?: string;
  courseCompletedIds: string[];
  certificationIds: string[];
  educationalQualification?: EducationalQualification;
  yearOfPassing?: number;
  address?: string;
  languagesKnown: string[];
  skillIds: string[];
  preferredJobLocation?: string;
  preferredJobType?: PreferredJobType;
  careerObjective?: string;
  photoUrl?: string;
};

export async function saveBiodata(data: BiodataFormData) {
  const session = await auth();
  if (!session.userId) {
    throw new Error("Unauthenticated");
  }

  const role = session.sessionClaims?.metadata?.role as Role | undefined;
  if (!role || (role !== Role.STUDENT && role !== Role.JOB_SEEKER)) {
    throw new Error("Forbidden");
  }

  const profile = await prisma.candidateProfile.upsert({
    where: { userId: session.userId },
    update: {
      fullName: data.fullName ?? null,
      dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
      phone: data.phone ?? null,
      email: data.email ?? null,
      courseCompletedIds: data.courseCompletedIds,
      certificationIds: data.certificationIds,
      educationalQualification: data.educationalQualification ?? null,
      yearOfPassing: data.yearOfPassing ?? null,
      address: data.address ?? null,
      languagesKnown: data.languagesKnown,
      skillIds: data.skillIds,
      preferredJobLocation: data.preferredJobLocation ?? null,
      preferredJobType: data.preferredJobType ?? null,
      careerObjective: data.careerObjective ?? null,
      photoUrl: data.photoUrl ?? null,
    },
    create: {
      userId: session.userId,
      fullName: data.fullName ?? null,
      dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
      phone: data.phone ?? null,
      email: data.email ?? null,
      courseCompletedIds: data.courseCompletedIds,
      certificationIds: data.certificationIds,
      educationalQualification: data.educationalQualification ?? null,
      yearOfPassing: data.yearOfPassing ?? null,
      address: data.address ?? null,
      languagesKnown: data.languagesKnown,
      skillIds: data.skillIds,
      preferredJobLocation: data.preferredJobLocation ?? null,
      preferredJobType: data.preferredJobType ?? null,
      careerObjective: data.careerObjective ?? null,
      photoUrl: data.photoUrl ?? null,
    },
  });

  return { success: true, profile };
}

export type BiodataActionResult = {
  success: boolean;
  isComplete: boolean;
};

export type CandidateProfileWithCompletion = {
  id: string;
  fullName: string | null;
  dateOfBirth: Date | null;
  phone: string | null;
  email: string | null;
  courseCompletedIds: string[];
  certificationIds: string[];
  educationalQualification: EducationalQualification | null;
  yearOfPassing: number | null;
  address: string | null;
  languagesKnown: string[];
  skillIds: string[];
  preferredJobLocation: string | null;
  preferredJobType: PreferredJobType | null;
  careerObjective: string | null;
  photoUrl: string | null;
  isVerifiedStudent: boolean;
  studentRecordId: string | null;
};

export function isProfileComplete(
  profile: CandidateProfileWithCompletion,
): boolean {
  const hasRequired = Boolean(
    profile.fullName &&
      profile.dateOfBirth &&
      profile.phone &&
      profile.email &&
      profile.educationalQualification &&
      profile.address &&
      profile.preferredJobType,
  );

  if (!hasRequired) return false;

  if (profile.isVerifiedStudent && profile.courseCompletedIds.length === 0) {
    return false;
  }

  return true;
}

export async function getCurrentProfile(): Promise<CandidateProfileWithCompletion | null> {
  const session = await auth();
  if (!session.userId) return null;

  const profile = await prisma.candidateProfile.findUnique({
    where: { userId: session.userId },
  });

  if (!profile) return null;

  return {
    ...profile,
    isVerifiedStudent: profile.isVerifiedStudent,
    studentRecordId: profile.studentRecordId,
  };
}
