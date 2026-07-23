import { getTranslations } from "next-intl/server";

export const revalidate = 60;

export default async function TermsPage() {
  const t = await getTranslations("terms");

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-2 text-3xl font-bold">{t("heading")}</h1>
      <p className="mb-8 text-sm text-muted-foreground">
        {t("lastUpdated", { date: "23 July 2026" })}
      </p>

      <div className="prose prose-sm max-w-none space-y-6 text-muted-foreground">
        <p>{t("introduction")}</p>

        <section>
          <h2 className="text-lg font-semibold text-foreground">{t("services")}</h2>
          <p>{t("servicesContent")}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">{t("userAccounts")}</h2>
          <p>{t("userAccountsContent")}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">{t("candidateBiodata")}</h2>
          <p>{t("candidateBiodataContent")}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">{t("employerObligations")}</h2>
          <p>{t("employerObligationsContent")}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">{t("prohibitedUses")}</h2>
          <p>{t("prohibitedUsesContent")}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">{t("limitationOfLiability")}</h2>
          <p>{t("limitationOfLiabilityContent")}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">{t("contact")}</h2>
          <p>{t("contactContent")}</p>
        </section>
      </div>
    </main>
  );
}
