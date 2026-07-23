import { auth } from "@clerk/nextjs/server";
import { getTranslations } from "next-intl/server";

export default async function PortalDashboardPage() {
  const session = await auth();
  const role = (session.sessionClaims?.metadata?.role as string) ?? "Unknown";
  const t = await getTranslations("portalDashboard");

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-semibold">{t("heading", { role })}</h1>
        <p className="mt-2 text-gray-600">{t("subtitle")}</p>
      </div>
    </div>
  );
}
