import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

export default async function CompleteSignupPage(props: {
  searchParams: Promise<{ intent?: string }>;
}) {
  const { intent } = await props.searchParams;
  const session = await auth();

  if (!session.userId) {
    redirect("/sign-in");
  }

  if (!intent || (intent !== "job_seeker" && intent !== "employer")) {
    redirect("/");
  }

  const role = intent === "job_seeker" ? "JOB_SEEKER" : "EMPLOYER";

  const client = await clerkClient();
  await client.users.updateUser(session.userId, {
    publicMetadata: { role },
  });

  await prisma.user.upsert({
    where: { id: session.userId },
    update: { role },
    create: { id: session.userId, role },
  });

  if (intent === "job_seeker") {
    const existing = await prisma.candidateProfile.findUnique({
      where: { userId: session.userId },
    });
    if (!existing) {
      await prisma.candidateProfile.create({
        data: {
          userId: session.userId,
          isVerifiedStudent: false,
        },
      });
    }
    redirect("/portal/student/biodata");
  }

  redirect("/portal/employer/register");
}
