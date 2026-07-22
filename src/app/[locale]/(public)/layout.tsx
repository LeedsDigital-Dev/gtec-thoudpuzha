import { Header } from "@/components/shared/Header";
import { FlashNewsBar } from "@/components/shared/FlashNewsBar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <FlashNewsBar />
      {children}
    </>
  );
}
