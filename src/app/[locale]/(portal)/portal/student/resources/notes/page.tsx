import { getTranslations } from "next-intl/server";
import { ResourceList } from "../resource-list";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function StudyNotesPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "resources" });
  return <ResourceList type="NOTE" title={t("studyNotes")} locale={locale} />;
}
