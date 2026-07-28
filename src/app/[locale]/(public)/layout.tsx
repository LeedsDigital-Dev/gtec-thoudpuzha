import { Header } from "@/components/shared/Header";
import { FlashNewsBar } from "@/components/shared/FlashNewsBar";
import { Footer } from "@/components/shared/Footer";
import { getSiteSettings } from "@/lib/site-settings";
import { getPublishedCourses } from "@/lib/courses";

export const revalidate = 60;

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let address: string | null | undefined;
  try {
    const settings = await getSiteSettings();
    address = settings.address;
  } catch {
    // SiteSettings not initialized yet — render footer without address
  }

  const courses = await getPublishedCourses()
    .then((c) =>
      c.map(({ slug, titleEn, titleMl }) => ({
        slug,
        titleEn,
        titleMl,
      })),
    )
    .catch(() => []);

  return (
    <>
      <Header courses={courses} />
      <FlashNewsBar />
      {children}
      <Footer address={address} />
    </>
  );
}
