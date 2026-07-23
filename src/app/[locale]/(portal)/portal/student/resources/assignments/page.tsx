import { getTranslations } from "next-intl/server";
import { ResourceList } from "../resource-list";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function AssignmentsPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "resources" });
  return <ResourceList type="ASSIGNMENT" title={t("assignments")} locale={locale} />;
}
