"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { usePathname } from "@/lib/i18n/navigation";

export function buildLocalePath(pathname: string, targetLocale: "en" | "ml") {
  if (pathname === "/") return `/${targetLocale}`;
  return `/${targetLocale}${pathname}`;
}

export function LanguageSwitcher() {
  const locale = useLocale() as "en" | "ml";
  const pathname = usePathname();
  const targetLocale = locale === "en" ? "ml" : "en";
  const targetPath = buildLocalePath(pathname, targetLocale);

  return (
    <Link
      href={targetPath}
      hrefLang={targetLocale}
      aria-label={`Switch to ${targetLocale === "ml" ? "Malayalam" : "English"}`}
    >
      {targetLocale === "ml" ? "മലയാളം" : "English"}
    </Link>
  );
}
