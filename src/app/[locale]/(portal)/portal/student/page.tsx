import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { Role } from "@/lib/auth";
import Link from "next/link";
import {
  BookOpen,
  Video,
  FileText,
  BarChart3,
  Calendar,
  ScrollText,
} from "lucide-react";

const TILES = [
  {
    title: "Study Notes",
    href: "/portal/student/resources/notes",
    icon: BookOpen,
  },
  {
    title: "Video Lectures",
    href: "/portal/student/resources/lectures",
    icon: Video,
  },
  {
    title: "Assignments",
    href: "/portal/student/resources/assignments",
    icon: FileText,
  },
  {
    title: "My Progress",
    href: "/portal/student/resources/progress",
    icon: BarChart3,
  },
  {
    title: "Timetable",
    href: "/portal/student/resources/timetable",
    icon: Calendar,
  },
  {
    title: "Past Papers",
    href: "/portal/student/resources/past-papers",
    icon: ScrollText,
  },
] as const;

export default async function StudentDashboardPage() {
  const session = await auth();
  if (!session.userId) return null;

  const role = session.sessionClaims?.metadata?.role as Role | undefined;

  // Parent layout gates STUDENT|JOB_SEEKER; dashboard is STUDENT-only
  if (role !== Role.STUDENT) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-semibold">
            This area isn&apos;t for your account type
          </h1>
          <p className="mt-2 text-gray-600">
            This section is intended for Student accounts. Please use the
            appropriate portal for your account type.
          </p>
          <Link
            href="/portal"
            className="mt-4 inline-block text-blue-600 underline"
          >
            Go to Portal Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const profile = await prisma.candidateProfile.findUnique({
    where: { userId: session.userId },
    select: { courseCompletedIds: true },
  });

  const hasLinkedCourse =
    profile && profile.courseCompletedIds.length > 0;

  if (!hasLinkedCourse) {
    return <EmptyState />;
  }

  return <DashboardGrid />;
}

function EmptyState() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-semibold">
          Welcome to the Student Portal
        </h1>
        <p className="mt-4 text-gray-600">
          You haven&apos;t been linked to any courses yet. Please contact the
          centre to get enrolled.
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Once you&apos;re linked, you&apos;ll find your study notes, video
          lectures, assignments, and more right here.
        </p>
      </div>
    </div>
  );
}

function DashboardGrid() {
  return (
    <div className="p-6">
      <h1 className="mb-8 text-3xl font-semibold">Student Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {TILES.map((tile) => {
          const Icon = tile.icon;
          return (
            <Link
              key={tile.href}
              href={tile.href}
              className="flex items-center gap-4 rounded-lg border p-6 transition-shadow hover:shadow-md"
            >
              <Icon className="h-8 w-8 text-blue-600" />
              <span className="text-lg font-medium">{tile.title}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
