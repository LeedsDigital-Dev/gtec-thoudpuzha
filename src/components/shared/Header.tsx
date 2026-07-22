"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { useState } from "react";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { siteConfig } from "@/lib/site";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Placement", href: "/placement" },
  { label: "Gallery", href: "/gallery" },
  { label: "Resources", href: "/portal/student" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const locale = useLocale();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const localeHref = (path: string) => {
    if (path === "/") return `/${locale}`;
    return `/${locale}${path}`;
  };

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
            <span className="text-lg font-bold leading-tight">G-TEC</span>
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
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`https://wa.me/${siteConfig.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="inline-flex items-center gap-1.5 rounded-lg bg-green-600 px-2 py-2 text-sm font-medium text-white hover:bg-green-700 md:px-3"
          >
            <MessageCircle className="size-4" />
            <span className="hidden md:inline">WhatsApp</span>
          </a>
          <a
            href={`tel:${siteConfig.phoneNumber}`}
            aria-label="Call Now"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-2 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 md:px-3"
          >
            <Phone className="size-4" />
            <span className="hidden md:inline">Call Now</span>
          </a>
          <Link
            href={localeHref("/#enquiry")}
            aria-label="Apply Now"
            className="inline-flex items-center rounded-lg bg-secondary px-2 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/80 md:px-3"
          >
            <span className="hidden md:inline">Apply Now</span>
            <span className="md:hidden">Apply</span>
          </Link>
          <Link
            href={localeHref("/sign-in")}
            aria-label="Login"
            className="inline-flex items-center rounded-lg border border-border px-2 py-2 text-sm font-medium hover:bg-muted md:px-3"
          >
            <span className="hidden md:inline">Login</span>
            <span className="md:hidden">Log in</span>
          </Link>
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="inline-flex lg:hidden items-center justify-center rounded-lg p-2 text-foreground hover:bg-muted"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
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
                  {item.label}
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
