import { Header } from "@/components/shared/Header";
import { FlashNewsBar } from "@/components/shared/FlashNewsBar";
import { Footer } from "@/components/shared/Footer";
import { PreloaderCleanup } from "@/components/shared/preloader";
import { getCachedSiteSettings } from "@/lib/data-cache";
import { getCachedPublishedCourses } from "@/lib/data-cache";

export const revalidate = 60;

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let address: string | null | undefined;
  try {
    const settings = await getCachedSiteSettings();
    address = settings.address;
  } catch {
    // SiteSettings not initialized yet — render footer without address
  }

  const courses = await getCachedPublishedCourses()
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
      <PreloaderCleanup />
      <Header courses={courses} />
      <FlashNewsBar />
      {children}
      <Footer address={address} />
    </>
  );
}
