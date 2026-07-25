import { auth } from "@clerk/nextjs/server";
import { getTranslations } from "next-intl/server";
import { getEffectiveRole } from "@/lib/auth";

export default async function PortalDashboardPage() {
  const session = await auth();
  const role = (await getEffectiveRole(session)) ?? "Unknown";
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
