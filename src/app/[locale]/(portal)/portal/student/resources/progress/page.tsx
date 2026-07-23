import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import Link from "next/link";

export default async function MyProgressPage() {
  const session = await auth();
  if (!session.userId) return null;

  const profile = await prisma.candidateProfile.findUnique({
    where: { userId: session.userId },
    select: { id: true },
  });

  if (!profile) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-semibold">My Progress</h1>
          <p className="mt-4 text-gray-600">
            Please complete your profile first.
          </p>
        </div>
      </div>
    );
  }

  const entries = await prisma.studentProgressEntry.findMany({
    where: { studentProfileId: profile.id },
    orderBy: { recordedAt: "desc" },
    include: { course: { select: { titleEn: true } } },
  });

  if (entries.length === 0) {
    return (
      <div className="p-6">
        <h1 className="mb-2 text-2xl font-semibold">My Progress</h1>
        <p className="text-gray-600">
          No progress entries recorded yet.
        </p>
        <Link
          href="/portal/student"
          className="mt-4 inline-block text-blue-600 underline"
        >
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-semibold">My Progress</h1>
      <div className="space-y-4">
        {entries.map((e) => (
          <div
            key={e.id}
            className="rounded border border-border p-4"
          >
            <div className="mb-1 text-xs text-gray-500">
              {e.course.titleEn} &middot;{" "}
              {e.recordedAt.toISOString().slice(0, 10)}
            </div>
            <p className="text-sm text-gray-800 whitespace-pre-wrap">
              {e.noteEn}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
