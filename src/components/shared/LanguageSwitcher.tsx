"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { usePathname } from "@/lib/i18n/navigation";
import { cn } from "@/lib/utils";

export function buildLocalePath(pathname: string, targetLocale: "en" | "ml") {
  if (pathname === "/") return `/${targetLocale}`;
  return `/${targetLocale}${pathname}`;
}

interface LanguageSwitcherProps {
  className?: string;
  variant?: "default" | "pill" | "segmented";
}

export function LanguageSwitcher({ className, variant = "default" }: LanguageSwitcherProps) {
  const locale = useLocale() as "en" | "ml";
  const pathname = usePathname();
  const targetLocale = locale === "en" ? "ml" : "en";
  const targetPath = buildLocalePath(pathname, targetLocale);

  if (variant === "segmented") {
    return (
      <div className={cn("flex items-center rounded-lg border border-border bg-muted/50 p-1 text-xs font-semibold", className)}>
        <Link
          href={locale === "en" ? pathname : buildLocalePath(pathname, "en")}
          className={`flex-1 rounded-md py-1.5 px-3 text-center transition-colors ${
            locale === "en" ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          English
        </Link>
        <Link
          href={locale === "ml" ? pathname : buildLocalePath(pathname, "ml")}
          className={`flex-1 rounded-md py-1.5 px-3 text-center transition-colors ${
            locale === "ml" ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          മലയാളം
        </Link>
      </div>
    );
  }

  return (
    <Link
      href={targetPath}
      hrefLang={targetLocale}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors hover:bg-muted",
        className
      )}
      aria-label={`Switch to ${targetLocale === "ml" ? "Malayalam" : "English"}`}
    >
      <span className="text-muted-foreground font-mono">🌐</span>
      <span>{targetLocale === "ml" ? "മലയാളം" : "English"}</span>
    </Link>
  );
}
