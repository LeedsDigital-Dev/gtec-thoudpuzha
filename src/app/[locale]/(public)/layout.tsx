import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="border-b p-4">
        <nav className="flex items-center justify-end">
          <LanguageSwitcher />
        </nav>
      </header>
      {children}
    </>
  );
}
