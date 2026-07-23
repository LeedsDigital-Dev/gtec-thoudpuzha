import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { Role } from "@/lib/auth";
import { BiodataForm } from "@/components/shared/BiodataForm";
import { getPublishedCourses } from "@/lib/courses";
import { getApprovedSkills, createPENDINGSkill } from "@/lib/skills";
import { saveBiodata } from "./actions";

export default async function BiodataPage() {
  const session = await auth();
  if (!session.userId) {
    return null;
  }

  const role = session.sessionClaims?.metadata?.role as Role | undefined;
  const _isStudent = role === Role.STUDENT;
  const isVerifiedStudent = role === Role.STUDENT;

  const [profile, courses, skills] = await Promise.all([
    prisma.candidateProfile.findUnique({
      where: { userId: session.userId },
    }),
    getPublishedCourses(),
    getApprovedSkills(),
  ]);

  const profileWithCompletion = profile
    ? {
        ...profile,
        isVerifiedStudent,
        studentRecordId: profile.studentRecordId,
      }
    : null;

  return (
    <div className="min-h-screen p-6">
      <BiodataForm
        profile={profileWithCompletion}
        isVerifiedStudent={isVerifiedStudent}
        courses={courses}
        skills={skills}
        onAddNewSkill={createPENDINGSkill}
        onSubmit={async (data) => { void saveBiodata(data); }}
      />
    </div>
  );
}
