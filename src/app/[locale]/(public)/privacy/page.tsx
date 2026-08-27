import { getTranslations } from "next-intl/server";

export const revalidate = 86400;

export default async function PrivacyPage() {
  const t = await getTranslations("privacy");

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-2 text-3xl font-bold">{t("heading")}</h1>
      <p className="mb-8 text-sm text-muted-foreground">
        {t("lastUpdated", { date: "23 July 2026" })}
      </p>

      <div className="prose prose-sm max-w-none space-y-6 text-muted-foreground">
        <p>{t("introduction")}</p>

        <section>
          <h2 className="text-lg font-semibold text-foreground">{t("infoWeCollect")}</h2>
          <p>{t("infoWeCollectContent")}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">{t("howWeUse")}</h2>
          <p>{t("howWeUseContent")}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">{t("dataSharing")}</h2>
          <p>{t("dataSharingContent")}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">{t("dataRetention")}</h2>
          <p>{t("dataRetentionContent")}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">{t("yourRights")}</h2>
          <p>{t("yourRightsContent")}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">{t("contact")}</h2>
          <p>{t("contactContent")}</p>
        </section>
      </div>
    </main>
  );
}
