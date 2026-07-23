import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";

const roles: Record<string, string> = {
  STUDENT: "/portal",
  JOB_SEEKER: "/portal",
  EMPLOYER: "/portal/employer/register",
  CENTRE_STAFF: "/admin",
  SUPER_ADMIN: "/admin",
};

export default async function SignUpPickerPage() {
  const session = await auth();

  if (session.userId) {
    const role = session.sessionClaims?.metadata?.role as string | undefined;
    const dest = role && roles[role] ? roles[role] : "/portal";
    redirect(dest);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-3xl">
        <h1 className="mb-2 text-center text-3xl font-bold">
          Create Your Account
        </h1>
        <p className="mb-8 text-center text-gray-600">
          Select the option that best describes you
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          <Link
            href="/portal/sign-up/student"
            className="group rounded-xl border-2 border-gray-200 bg-white p-6 text-center shadow-sm transition hover:border-blue-500 hover:shadow-md"
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl">
              🎓
            </div>
            <h2 className="mb-2 text-lg font-semibold">
              I&apos;m a G-TEC Thodupuzha student
            </h2>
            <p className="text-sm text-gray-500">
              Access your academic resources, timetable, and progress
            </p>
          </Link>

          <Link
            href="/sign-up?intent=job_seeker"
            className="group rounded-xl border-2 border-gray-200 bg-white p-6 text-center shadow-sm transition hover:border-green-500 hover:shadow-md"
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-2xl">
              💼
            </div>
            <h2 className="mb-2 text-lg font-semibold">
              I&apos;m looking for a job
            </h2>
            <p className="text-sm text-gray-500">
              Browse vacancies and apply with your profile
            </p>
          </Link>

          <Link
            href="/sign-up?intent=employer"
            className="group rounded-xl border-2 border-gray-200 bg-white p-6 text-center shadow-sm transition hover:border-purple-500 hover:shadow-md"
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-2xl">
                              🏢
            </div>
            <h2 className="mb-2 text-lg font-semibold">
              I&apos;m an employer looking to hire
            </h2>
            <p className="text-sm text-gray-500">
              Post vacancies and find qualified candidates
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
