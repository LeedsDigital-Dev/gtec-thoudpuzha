"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import {
  Menu,
  X,
  Phone,
  MessageCircle,
  Sparkles,
  Home,
  Info,
  GraduationCap,
  Briefcase,
  Image as ImageIcon,
  BookOpen,
  Send,
  User,
  ChevronDown,
} from "lucide-react";
import { useAuth, UserButton } from "@clerk/nextjs";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { siteConfig } from "@/lib/site";
import { CoursesDropdown } from "@/components/shared/CoursesDropdown";

const navItems: { labelKey: string; href: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { labelKey: "home", href: "/", icon: Home },
  { labelKey: "about", href: "/about", icon: Info },
  { labelKey: "placement", href: "/placement", icon: Briefcase },
  { labelKey: "gallery", href: "/gallery", icon: ImageIcon },
  { labelKey: "resources", href: "/portal/student", icon: BookOpen },
  { labelKey: "contact", href: "/contact", icon: Send },
];

interface CourseDropdownItem {
  slug: string;
  titleEn: string;
  titleMl: string | null;
}

export function Header({
  courses,
}: {
  courses?: CourseDropdownItem[];
}) {
  const locale = useLocale();
  const t = useTranslations("nav");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [coursesOpenMobile, setCoursesOpenMobile] = useState(false);
  const { isSignedIn } = useAuth();

  const localeHref = (path: string) => {
    if (path === "/") return `/${locale}`;
    return `/${locale}${path}`;
  };

  const portalUrl = localeHref("/portal");

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-3.5 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link
          href={localeHref("/")}
          className="flex items-center gap-2.5 shrink-0 group"
          aria-label="G-TEC Thodupuzha home"
        >
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-base sm:text-lg shadow-sm transition-transform group-hover:scale-105">
            G
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-base sm:text-lg font-bold leading-tight tracking-tight text-foreground truncate">
              {t("brandName")}
            </span>
            <span className="text-[10px] sm:text-xs font-medium tracking-wide text-muted-foreground truncate">
              {siteConfig.centreName}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden lg:flex items-center gap-6"
          aria-label="Primary navigation"
        >
          {navItems.slice(0, 2).map((item) => (
            <Link
              key={item.href}
              href={localeHref(item.href)}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {t(item.labelKey)}
            </Link>
          ))}

          {courses && courses.length > 0 ? (
            <CoursesDropdown
              courses={courses}
              label={t("courses")}
              locale={locale}
            />
          ) : (
            <Link
              href={localeHref("/courses")}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {t("courses")}
            </Link>
          )}

          {navItems.slice(2).map((item) => (
            <Link
              key={item.href}
              href={localeHref(item.href)}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {t(item.labelKey)}
            </Link>
          ))}
        </nav>

        {/* Desktop Quick Actions */}
        <div className="hidden lg:flex items-center gap-2">
          <a
            href={`https://wa.me/${siteConfig.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("whatsapp")}
            className="inline-flex items-center gap-1.5 rounded-lg bg-accent/90 px-3 py-2 text-xs font-semibold text-accent-foreground hover:bg-accent shadow-xs transition-all"
          >
            <MessageCircle className="size-4 shrink-0" />
            <span>{t("whatsapp")}</span>
          </a>
          <a
            href={`tel:${siteConfig.phoneNumber}`}
            aria-label={t("callNow")}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 shadow-xs transition-all"
          >
            <Phone className="size-4 shrink-0" />
            <span>{t("callNow")}</span>
          </a>
          <Link
            href={localeHref("/#enquiry")}
            aria-label={t("applyNow")}
            className="inline-flex items-center gap-1 rounded-lg bg-secondary px-3 py-2 text-xs font-semibold text-secondary-foreground hover:bg-secondary/80 shadow-xs transition-all"
          >
            <Sparkles className="size-3.5" />
            <span>{t("applyNow")}</span>
          </Link>
          {isSignedIn ? (
            <UserButton
              appearance={{
                elements: { avatarBox: "size-8" },
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
              className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-xs font-semibold hover:bg-muted transition-all"
            >
              <User className="size-3.5" />
              <span>{t("login")}</span>
            </Link>
          )}
          <div className="ml-1 border-l pl-2 border-border">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Mobile Header Bar (Streamlined to prevent overcrowding) */}
        <div className="flex lg:hidden items-center gap-1.5">
          <a
            href={`https://wa.me/${siteConfig.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("whatsapp")}
            className="inline-flex items-center justify-center rounded-lg bg-accent/10 text-accent hover:bg-accent/20 h-9 w-9 shrink-0 transition-colors"
          >
            <MessageCircle className="size-4" />
          </a>
          <a
            href={`tel:${siteConfig.phoneNumber}`}
            aria-label={t("callNow")}
            className="inline-flex items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary/20 h-9 w-9 shrink-0 transition-colors"
          >
            <Phone className="size-4" />
          </a>

          {isSignedIn ? (
            <div className="shrink-0 flex items-center justify-center px-1">
              <UserButton
                appearance={{
                  elements: { avatarBox: "size-8" },
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
            </div>
          ) : (
            <Link
              href={localeHref("/#enquiry")}
              aria-label={t("applyNow")}
              className="inline-flex items-center gap-1 rounded-lg bg-primary px-2.5 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 shrink-0 shadow-xs"
            >
              <span>{t("apply")}</span>
            </Link>
          )}

          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="inline-flex items-center justify-center rounded-lg h-9 w-9 text-foreground hover:bg-muted transition-colors shrink-0 ml-0.5"
            aria-label={mobileMenuOpen ? t("closeMenu") : t("openMenu")}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
          >
            {mobileMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </div>
      </div>

      {/* Feature-Rich Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <nav
          id="mobile-nav"
          className="lg:hidden border-t border-border bg-background/98 backdrop-blur-xl px-4 py-5 shadow-2xl animate-in slide-in-from-top-2 duration-200 max-h-[calc(100vh-4rem)] overflow-y-auto"
          aria-label="Mobile navigation"
        >
          {/* Quick Call-to-Action Cards */}
          <div className="space-y-2.5 mb-5 pb-4 border-b border-border">
            <Link
              href={localeHref("/#enquiry")}
              className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-all active:scale-[0.99]"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Sparkles className="size-4" />
              <span>{t("applyNow")}</span>
            </Link>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-accent/15 px-3 py-2.5 text-xs font-semibold text-accent hover:bg-accent/20 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <MessageCircle className="size-4" />
                <span>{t("whatsapp")}</span>
              </a>
              <a
                href={`tel:${siteConfig.phoneNumber}`}
                className="flex items-center justify-center gap-2 rounded-xl bg-primary/10 px-3 py-2.5 text-xs font-semibold text-primary hover:bg-primary/20 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Phone className="size-4" />
                <span>{t("callNow")}</span>
              </a>
            </div>

            {/* Language Switcher Segmented Control */}
            <div className="pt-1">
              <LanguageSwitcher variant="segmented" />
            </div>
          </div>

          {/* Navigation Links with Icons */}
          <div className="space-y-1">
            <Link
              href={localeHref("/")}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Home className="size-4 text-muted-foreground" />
              <span>{t("home")}</span>
            </Link>

            <Link
              href={localeHref("/about")}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Info className="size-4 text-muted-foreground" />
              <span>{t("about")}</span>
            </Link>

            {/* Collapsible Courses Section */}
            <div className="rounded-lg">
              <div className="flex items-center justify-between rounded-lg px-3 py-2.5 hover:bg-muted transition-colors">
                <Link
                  href={localeHref("/courses")}
                  className="flex items-center gap-3 text-sm font-semibold text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <GraduationCap className="size-4 text-muted-foreground" />
                  <span>{t("courses")}</span>
                </Link>
                {courses && courses.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setCoursesOpenMobile((o) => !o)}
                    className="p-1 text-muted-foreground hover:text-foreground"
                    aria-label="Toggle courses submenu"
                  >
                    <ChevronDown className={`size-4 transition-transform duration-200 ${coursesOpenMobile ? "rotate-180" : ""}`} />
                  </button>
                )}
              </div>

              {courses && courses.length > 0 && coursesOpenMobile && (
                <div className="ml-7 my-1 border-l-2 border-primary/30 pl-3 space-y-1 animate-in fade-in-50 duration-150">
                  {courses.map((course) => (
                    <Link
                      key={course.slug}
                      href={localeHref(`/courses/${course.slug}`)}
                      className="block rounded-md px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {locale === "ml" && course.titleMl
                        ? course.titleMl
                        : course.titleEn}
                    </Link>
                  ))}
                  <Link
                    href={localeHref("/courses")}
                    className="block rounded-md px-2.5 py-1.5 text-xs font-semibold text-primary hover:underline"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {locale === "ml" ? "എല്ലാ കോഴ്സുകളും കാൺക →" : "View All Courses →"}
                  </Link>
                </div>
              )}
            </div>

            <Link
              href={localeHref("/placement")}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Briefcase className="size-4 text-muted-foreground" />
              <span>{t("placement")}</span>
            </Link>

            <Link
              href={localeHref("/gallery")}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <ImageIcon className="size-4 text-muted-foreground" />
              <span>{t("gallery")}</span>
            </Link>

            <Link
              href={localeHref("/portal/student")}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <BookOpen className="size-4 text-muted-foreground" />
              <span>{t("resources")}</span>
            </Link>

            <Link
              href={localeHref("/contact")}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Send className="size-4 text-muted-foreground" />
              <span>{t("contact")}</span>
            </Link>
          </div>

          {/* User Profile / Portal Footer */}
          <div className="mt-5 pt-4 border-t border-border">
            {isSignedIn ? (
              <Link
                href={portalUrl}
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 text-xs font-semibold text-foreground hover:bg-muted transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                  <User className="size-4" />
                </div>
                <div>
                  <span className="block font-bold text-sm text-foreground">{t("myPortal")}</span>
                  <span className="text-muted-foreground">{t("brandName")} Account</span>
                </div>
              </Link>
            ) : (
              <Link
                href={localeHref("/sign-in")}
                className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card p-3 text-xs font-semibold text-foreground hover:bg-muted transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="size-4 text-muted-foreground" />
                <span>{t("login")}</span>
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
