import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { Role } from "@/lib/auth";

export default async function PostVacancyPage() {
  const session = await auth();
  if (!session.userId) {
    redirect("/sign-in");
  }

  const role = session.sessionClaims?.metadata?.role as string | undefined;
  if (role !== Role.EMPLOYER) {
    redirect("/forbidden");
  }

  const profile = await prisma.employerProfile.findUnique({
    where: { userId: session.userId },
  });

  if (!profile || profile.status === "PENDING" || profile.status === "REJECTED") {
    redirect("/portal/employer/register/status");
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="mb-3 text-2xl font-semibold">Post a Vacancy</h1>
        <p className="text-gray-600">Vacancy posting will be available soon.</p>
      </div>
    </div>
  );
}
