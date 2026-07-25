import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { Role, getEffectiveRole } from "@/lib/auth";
import { getApprovedSkills } from "@/lib/skills";
import { PostVacancyForm } from "./post-vacancy-form";

export default async function PostVacancyPage() {
  const session = await auth();
  if (!session.userId) {
    redirect("/sign-in");
  }

  const role = await getEffectiveRole(session);
  if (role !== Role.EMPLOYER) {
    redirect("/forbidden");
  }

  const profile = await prisma.employerProfile.findUnique({
    where: { userId: session.userId },
  });

  if (!profile || profile.status === "PENDING" || profile.status === "REJECTED") {
    redirect("/portal/employer/register/status");
  }

  const skills = await getApprovedSkills();

  return <PostVacancyForm skills={skills} />;
}
