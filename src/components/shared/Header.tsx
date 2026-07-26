"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { useAuth, UserButton } from "@clerk/nextjs";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { siteConfig } from "@/lib/site";

const navItems: { labelKey: string; href: string }[] = [
  { labelKey: "home", href: "/" },
  { labelKey: "about", href: "/about" },
  { labelKey: "courses", href: "/courses" },
  { labelKey: "placement", href: "/placement" },
  { labelKey: "gallery", href: "/gallery" },
  { labelKey: "resources", href: "/portal/student" },
  { labelKey: "contact", href: "/contact" },
];

export function Header() {
  const locale = useLocale();
  const t = useTranslations("nav");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isSignedIn } = useAuth();

  const localeHref = (path: string) => {
    if (path === "/") return `/${locale}`;
    return `/${locale}${path}`;
  };

  const portalUrl = localeHref("/portal");

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href={localeHref("/")}
          className="flex items-center gap-2"
          aria-label="G-TEC Thodupuzha home"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded bg-primary text-primary-foreground font-bold">
            G
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold leading-tight">{t("brandName")}</span>
            <span className="text-xs font-semibold tracking-wide text-muted-foreground">
              {siteConfig.centreName}
            </span>
          </div>
        </Link>

        <nav
          className="hidden lg:flex items-center gap-6"
          aria-label="Primary navigation"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={localeHref(item.href)}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              {t(item.labelKey)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`https://wa.me/${siteConfig.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("whatsapp")}
            className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-2 py-2 text-sm font-medium text-accent-foreground hover:bg-accent/90 md:px-3"
          >
            <MessageCircle className="size-4" />
            <span className="hidden md:inline">{t("whatsapp")}</span>
          </a>
          <a
            href={`tel:${siteConfig.phoneNumber}`}
            aria-label={t("callNow")}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-2 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 md:px-3"
          >
            <Phone className="size-4" />
            <span className="hidden md:inline">{t("callNow")}</span>
          </a>
          <Link
            href={localeHref("/#enquiry")}
            aria-label={t("applyNow")}
            className="inline-flex items-center rounded-lg bg-secondary px-2 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/80 md:px-3"
          >
            <span className="hidden md:inline">{t("applyNow")}</span>
            <span className="md:hidden">{t("apply")}</span>
          </Link>
          {isSignedIn ? (
            <UserButton
              appearance={{
                elements: { avatarBox: "size-9" },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  href={portalUrl}
                  label={t("myPortal")}
                  labelIcon={<span />}
                />
              </UserButton.MenuItems>
            </UserButton>
          ) : (
            <Link
              href={localeHref("/sign-in")}
              aria-label={t("login")}
              className="inline-flex items-center rounded-lg border border-border px-2 py-2 text-sm font-medium hover:bg-muted md:px-3"
            >
              <span className="hidden md:inline">{t("login")}</span>
              <span className="md:hidden">{t("logIn")}</span>
            </Link>
          )}
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="inline-flex lg:hidden items-center justify-center rounded-lg p-2 text-foreground hover:bg-muted"
            aria-label={mobileMenuOpen ? t("closeMenu") : t("openMenu")}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
          >
            {mobileMenuOpen ? (
              <X className="size-6" />
            ) : (
              <Menu className="size-6" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav
          id="mobile-nav"
          className="lg:hidden border-t bg-background px-4 py-4"
          aria-label="Mobile navigation"
        >
          <ul className="space-y-3">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={localeHref(item.href)}
                  className="block text-base font-medium text-foreground/80 transition-colors hover:text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t(item.labelKey)}
                </Link>
              </li>
            ))}
            <li className="md:hidden">
              <LanguageSwitcher />
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
