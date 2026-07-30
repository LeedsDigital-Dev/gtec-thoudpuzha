import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getActiveJobPostings } from "@/lib/jobs";

export const revalidate = 3600;

interface PlacementPageProps {
  params: Promise<{ locale: string }>;
}

export default async function PlacementPage({ params }: PlacementPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "placement" });
  const jt = await getTranslations({ locale, namespace: "jobType" });

  const postings = await getActiveJobPostings();

  const recent = postings.slice(0, 6);

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section aria-labelledby="placement-heading">
        <div className="mb-8">
          <h1
            id="placement-heading"
            className="text-3xl font-bold"
          >
            {t("heading")}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {t("description")}
          </p>
        </div>

        {recent.length === 0 ? (
          <div className="rounded-lg border border-dashed p-12 text-center text-muted-foreground">
            <p>{t("noPositions")}</p>
            <p className="mt-1 text-sm">
              {t("noPositionsHint")}
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recent.map((posting) => (
              <div
                key={posting.id}
                className="rounded-lg border p-5 transition-colors hover:bg-muted/50"
              >
                <h2 className="font-semibold">{posting.title}</h2>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {posting.employer.companyName}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    {jt(posting.jobType)}
                  </span>
                  {posting.employer.companyAddress && (
                    <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-foreground">
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
            {t("ctaHeading")}
          </h2>
          <p className="mt-2 text-muted-foreground">
            {t("ctaText")}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/portal/jobs"
              className="inline-flex items-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              {t("viewVacancies")}
            </Link>
            <Link
              href="/portal/employer/register"
              className="inline-flex items-center rounded-lg border border-border bg-background px-6 py-3 text-sm font-medium hover:bg-muted"
            >
              {t("hiringCta")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
