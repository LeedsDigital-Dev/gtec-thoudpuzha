import Link from "next/link";
import { getActiveJobPostings } from "@/lib/jobs";

export const revalidate = 60;

interface PlacementPageProps {
  params: Promise<{ locale: string }>;
}

export default async function PlacementPage({ params }: PlacementPageProps) {
  await params;
  const postings = await getActiveJobPostings();

  const recent = postings.slice(0, 6);

  const JOB_TYPE_LABELS: Record<string, string> = {
    FULL_TIME: "Full Time",
    PART_TIME: "Part Time",
    CONTRACT: "Contract",
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section aria-labelledby="placement-heading">
        <div className="mb-8">
          <h1
            id="placement-heading"
            className="text-3xl font-bold"
          >
            Placement &amp; Support
          </h1>
          <p className="mt-2 text-gray-600">
            We help our students and job seekers connect with leading employers.
            Browse current openings below.
          </p>
        </div>

        {recent.length === 0 ? (
          <div className="rounded-lg border border-dashed p-12 text-center text-gray-500">
            <p>No open positions right now.</p>
            <p className="mt-1 text-sm">
              Check back soon — new vacancies are posted regularly.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recent.map((posting) => (
              <div
                key={posting.id}
                className="rounded-lg border p-5 transition-colors hover:bg-gray-50"
              >
                <h3 className="font-semibold">{posting.title}</h3>
                <p className="mt-0.5 text-sm text-gray-600">
                  {posting.employer.companyName}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                    {JOB_TYPE_LABELS[posting.jobType] ?? posting.jobType}
                  </span>
                  {posting.employer.companyAddress && (
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">
                      {posting.employer.companyAddress}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 rounded-xl bg-primary/10 p-8 text-center">
          <h2 className="text-xl font-semibold">
            Ready to take the next step?
          </h2>
          <p className="mt-2 text-muted-foreground">
            Sign in to view full job details, apply with your biodata, and track
            your applications.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/portal/jobs"
              className="inline-flex items-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              View all vacancies &rarr;
            </Link>
            <Link
              href="/portal/employer/register"
              className="inline-flex items-center rounded-lg border border-border bg-background px-6 py-3 text-sm font-medium hover:bg-muted"
            >
              Are you hiring? Post a vacancy &rarr;
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
