import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { Role } from "@/lib/auth";

export default async function CompleteSignupPage(props: {
  searchParams: Promise<{ intent?: string }>;
  params: Promise<{ locale: string }>;
}) {
  const { intent } = await props.searchParams;
  const { locale } = await props.params;
  const session = await auth();

  if (!session.userId) {
    redirect("/sign-in");
  }

  const client = await clerkClient();
  const clerkUser = await client.users.getUser(session.userId);
  const invitedRole = (clerkUser.publicMetadata?.role as string | undefined);

  if (invitedRole === Role.CENTRE_STAFF) {
    await prisma.user.upsert({
      where: { id: session.userId },
      update: { role: Role.CENTRE_STAFF },
      create: { id: session.userId, role: Role.CENTRE_STAFF },
    });

    const existingPerm = await prisma.staffPermission.findUnique({
      where: { userId: session.userId },
    });
    if (!existingPerm) {
      await prisma.staffPermission.create({
        data: { userId: session.userId },
      });
    }

    redirect(`/${locale}/admin`);
  }

  if (!intent || (intent !== "job_seeker" && intent !== "employer")) {
    redirect(`/${locale}`);
  }

  const role = intent === "job_seeker" ? "JOB_SEEKER" : "EMPLOYER";

  await client.users.updateUserMetadata(session.userId, {
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
    redirect(`/${locale}/portal/student/biodata`);
  }

  redirect(`/${locale}/portal/employer/register`);
}
