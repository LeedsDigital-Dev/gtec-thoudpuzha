import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { Role, getEffectiveRole } from "@/lib/auth";
import { renderToBuffer } from "@react-pdf/renderer";
import { BiodataPdfDocument } from "@/components/shared/BiodataPdfDocument";
import type { BiodataPdfData } from "@/components/shared/BiodataPdfDocument";

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

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ candidateId: string }> },
) {
  const { candidateId } = await params;
  const session = await auth();

  if (!session.userId) {
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  }

  const role = await getEffectiveRole(session);
  if (!role) {
    return NextResponse.json({ error: "No role assigned" }, { status: 403 });
  }

  // Fetch the candidate profile by its id (candidateId is the profile id)
  const profile = await prisma.candidateProfile.findUnique({
    where: { id: candidateId },
  });

  if (!profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  // Access control: self OR EMPLOYER only
  const isSelf = profile.userId === session.userId;
  const isEmployer = role === Role.EMPLOYER;

  if (!isSelf && !isEmployer) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Resolve course names for completed courses
  let courseCompletedNames: string[] = [];
  if (profile.courseCompletedIds.length > 0) {
    const courses = await prisma.course.findMany({
      where: { id: { in: profile.courseCompletedIds } },
      select: { titleEn: true },
    });
    const courseMap = new Map(
      courses.map((c, i) => [profile.courseCompletedIds[i], c.titleEn]),
    );
    courseCompletedNames = profile.courseCompletedIds
      .map((id) => courseMap.get(id) ?? id)
      .filter(Boolean);
  }

  // Resolve skill labels
  let skillLabels: string[] = [];
  if (profile.skillIds.length > 0) {
    const skills = await prisma.skill.findMany({
      where: { id: { in: profile.skillIds } },
      select: { label: true },
    });
    const skillMap = new Map(skills.map((s) => [s.label, s.label]));
    skillLabels = profile.skillIds
      .map((id) => skillMap.get(id) ?? id)
      .filter(Boolean);
  }

  const pdfData: BiodataPdfData = {
    fullName: profile.fullName,
    dateOfBirth: profile.dateOfBirth
      ? profile.dateOfBirth.toISOString().split("T")[0]
      : null,
    phone: profile.phone,
    email: profile.email,
    courseCompletedNames,
    certificationCodes: profile.certificationIds,
    educationalQualification: profile.educationalQualification
      ? QUALIFICATION_LABELS[profile.educationalQualification] ??
        profile.educationalQualification
      : null,
    yearOfPassing: profile.yearOfPassing,
    address: profile.address,
    languagesKnown: profile.languagesKnown ?? [],
    skillLabels,
    preferredJobLocation: profile.preferredJobLocation,
    preferredJobType: profile.preferredJobType
      ? JOB_TYPE_LABELS[profile.preferredJobType] ??
        profile.preferredJobType
      : null,
    careerObjective: profile.careerObjective,
  };

  const pdfBuffer = await renderToBuffer(
    <BiodataPdfDocument data={pdfData} />,
  );

  return new NextResponse(new Uint8Array(pdfBuffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="biodata-${candidateId}.pdf"`,
    },
  });
}
