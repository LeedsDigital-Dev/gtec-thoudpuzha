"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { usePathname } from "@/lib/i18n/navigation";
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
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { useAuth, UserButton } from "@clerk/nextjs";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { siteConfig } from "@/lib/site";
import { CoursesDropdown } from "@/components/shared/CoursesDropdown";
import Image from "next/image";
import { cn } from "@/lib/utils";

const navItems: {
  labelKey: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
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
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [coursesOpenMobile, setCoursesOpenMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isSignedIn } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer upon route navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const localeHref = (path: string) => {
    if (path === "/") return `/${locale}`;
    return `/${locale}${path}`;
  };

  const portalUrl = localeHref("/portal");

  const isLinkActive = (href: string) => {
    if (href === "/") {
      return pathname === "/" || pathname === "";
    }
    return pathname.startsWith(href);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border/80 shadow-xs supports-[backdrop-filter]:bg-background/80"
          : "bg-background/80 backdrop-blur-lg border-b border-border/50 supports-[backdrop-filter]:bg-background/70"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-3.5 sm:px-6 lg:px-8">
        {/* Brand Logo & Centre Identity */}
        <Link
          href={localeHref("/")}
          className="flex items-center gap-2.5 sm:gap-3 shrink-0 group py-1"
          aria-label="G-TEC Thodupuzha home"
        >
          {/* Logo container with exact aspect ratio and hover scaling */}
          <div className="relative h-10 sm:h-11 lg:h-12 aspect-[1600/1094] shrink-0 flex items-center transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/icons/gtec.jpeg"
              alt="G-TEC Thodupuzha"
              fill
              priority
              sizes="(max-width: 640px) 60px, (max-width: 1024px) 70px, 80px"
              className="object-contain"
            />
          </div>

          {/* Clean Centre Name / Brand Typography */}
          <div className="flex flex-col justify-center min-w-0 border-l border-border/80 pl-2.5 sm:pl-3">
            <span className="text-sm sm:text-base font-bold leading-tight tracking-tight text-foreground truncate group-hover:text-primary transition-colors flex items-center gap-1.5 whitespace-nowrap">
              <span>{t("brandName")}</span>
            </span>
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-muted-foreground uppercase truncate flex items-center gap-1.5 whitespace-nowrap">
              <span className="size-1.5 rounded-full bg-emerald-500 shrink-0 inline-block animate-pulse" />
              <span>{siteConfig.centreName}</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden lg:flex items-center gap-0.5 xl:gap-1 bg-muted/40 p-1 rounded-full border border-border/40 shadow-2xs backdrop-blur-sm shrink-0"
          aria-label="Primary navigation"
        >
          {navItems.slice(0, 2).map((item) => {
            const active = isLinkActive(item.href);
            return (
              <Link
                key={item.href}
                href={localeHref(item.href)}
                className={cn(
                  "relative text-xs xl:text-sm font-medium px-2.5 xl:px-3.5 py-1.5 rounded-full transition-all duration-200 inline-flex items-center justify-center whitespace-nowrap",
                  active
                    ? "bg-background text-foreground font-semibold shadow-xs border border-border/50"
                    : "text-foreground/75 hover:text-foreground hover:bg-background/60"
                )}
              >
                {t(item.labelKey)}
              </Link>
            );
          })}

          {courses && courses.length > 0 ? (
            <CoursesDropdown
              courses={courses}
              label={t("courses")}
              locale={locale}
            />
          ) : (
            <Link
              href={localeHref("/courses")}
              className={cn(
                "relative text-xs xl:text-sm font-medium px-2.5 xl:px-3.5 py-1.5 rounded-full transition-all duration-200 inline-flex items-center justify-center whitespace-nowrap",
                pathname.startsWith("/courses")
                  ? "bg-background text-foreground font-semibold shadow-xs border border-border/50"
                  : "text-foreground/75 hover:text-foreground hover:bg-background/60"
              )}
            >
              {t("courses")}
            </Link>
          )}

          {navItems.slice(2).map((item) => {
            const active = isLinkActive(item.href);
            return (
              <Link
                key={item.href}
                href={localeHref(item.href)}
                className={cn(
                  "relative text-xs xl:text-sm font-medium px-2.5 xl:px-3.5 py-1.5 rounded-full transition-all duration-200 inline-flex items-center justify-center whitespace-nowrap",
                  active
                    ? "bg-background text-foreground font-semibold shadow-xs border border-border/50"
                    : "text-foreground/75 hover:text-foreground hover:bg-background/60"
                )}
              >
                {t(item.labelKey)}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Quick Actions */}
        <div className="hidden lg:flex items-center gap-1.5 xl:gap-2 shrink-0">
          {/* Quick Contact Icons */}
          <div className="flex items-center gap-1.5">
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("whatsapp")}
              title={t("whatsapp")}
              className="h-8.5 inline-flex items-center justify-center gap-1.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-2.5 xl:px-3 text-xs font-semibold shadow-2xs transition-all duration-200 hover:scale-105 active:scale-95 group whitespace-nowrap shrink-0"
            >
              <MessageCircle className="size-3.5 shrink-0 transition-transform duration-200 group-hover:rotate-12" />
              <span className="hidden xl:inline">{t("whatsapp")}</span>
            </a>
            <a
              href={`tel:${siteConfig.phoneNumber}`}
              aria-label={t("callNow")}
              title={t("callNow")}
              className="h-8.5 inline-flex items-center justify-center gap-1.5 rounded-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 px-2.5 xl:px-3 text-xs font-semibold shadow-2xs transition-all duration-200 hover:scale-105 active:scale-95 group whitespace-nowrap shrink-0"
            >
              <Phone className="size-3.5 shrink-0 transition-transform duration-200 group-hover:-rotate-12" />
              <span className="hidden xl:inline">{t("callNow")}</span>
            </a>
          </div>

          {/* Primary CTA: Apply Now */}
          <Link
            href={localeHref("/#enquiry")}
            aria-label={t("applyNow")}
            className="h-8.5 relative inline-flex items-center justify-center gap-1.5 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-3.5 xl:px-4 text-xs xl:text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 active:scale-95 group overflow-hidden whitespace-nowrap shrink-0"
          >
            <Sparkles className="size-3.5 shrink-0 text-amber-300 animate-pulse" />
            <span>{t("applyNow")}</span>
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
          </Link>

          {/* Login / User Portal */}
          {isSignedIn ? (
            <div className="h-8.5 flex items-center justify-center shrink-0">
              <UserButton
                appearance={{
                  elements: { avatarBox: "size-8 ring-2 ring-primary/20" },
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
              href={localeHref("/sign-in")}
              aria-label={t("login")}
              className="h-8.5 inline-flex items-center justify-center gap-1.5 rounded-full border border-border/80 bg-background/60 hover:bg-muted/80 px-2.5 xl:px-3 text-xs font-semibold text-foreground/80 hover:text-foreground transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap shrink-0"
            >
              <User className="size-3.5 shrink-0 text-muted-foreground" />
              <span>{t("login")}</span>
            </Link>
          )}

          {/* Language Switcher */}
          <div className="flex items-center justify-center shrink-0">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Mobile Header Bar Quick Controls */}
        <div className="flex lg:hidden items-center gap-1.5 shrink-0">
          <a
            href={`https://wa.me/${siteConfig.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("whatsapp")}
            className="size-8.5 inline-flex items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border border-emerald-500/20 shrink-0 transition-all duration-200 active:scale-95"
          >
            <MessageCircle className="size-4" />
          </a>
          <a
            href={`tel:${siteConfig.phoneNumber}`}
            aria-label={t("callNow")}
            className="size-8.5 inline-flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 shrink-0 transition-all duration-200 active:scale-95"
          >
            <Phone className="size-4" />
          </a>

          {isSignedIn ? (
            <div className="size-8.5 flex items-center justify-center shrink-0">
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
              className="h-8.5 inline-flex items-center justify-center gap-1 rounded-full bg-primary px-3 text-xs font-semibold text-primary-foreground hover:bg-primary/90 shrink-0 shadow-xs active:scale-95 transition-all whitespace-nowrap"
            >
              <Sparkles className="size-3 text-amber-300" />
              <span>{t("apply")}</span>
            </Link>
          )}

          {/* Hamburger Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="size-8.5 inline-flex items-center justify-center rounded-full bg-muted/60 text-foreground hover:bg-muted border border-border/70 transition-all duration-200 shrink-0 active:scale-95 ml-0.5"
            aria-label={mobileMenuOpen ? t("closeMenu") : t("openMenu")}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
          >
            {mobileMenuOpen ? (
              <X className="size-5 transition-transform duration-200 rotate-90" />
            ) : (
              <Menu className="size-5 transition-transform duration-200" />
            )}
          </button>
        </div>
      </div>

      {/* Feature-Rich Mobile Drawer Menu with Frosted Glassmorphism */}
      {mobileMenuOpen && (
        <nav
          id="mobile-nav"
          className="lg:hidden border-t border-border/70 bg-background/95 backdrop-blur-2xl px-4 py-5 shadow-2xl animate-in slide-in-from-top-3 duration-250 max-h-[calc(100vh-4rem)] overflow-y-auto"
          aria-label="Mobile navigation"
        >
          {/* Quick Call-to-Action Cards */}
          <div className="space-y-2.5 mb-5 pb-4 border-b border-border/70">
            <Link
              href={localeHref("/#enquiry")}
              className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-all active:scale-[0.98] group relative overflow-hidden"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Sparkles className="size-4 text-amber-300 animate-pulse" />
              <span>{t("applyNow")}</span>
              <ArrowRight className="size-4 ml-auto transition-transform group-hover:translate-x-1" />
            </Link>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-3 py-2.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition-all active:scale-[0.98]"
                onClick={() => setMobileMenuOpen(false)}
              >
                <MessageCircle className="size-4" />
                <span>{t("whatsapp")}</span>
              </a>
              <a
                href={`tel:${siteConfig.phoneNumber}`}
                className="flex items-center justify-center gap-2 rounded-xl bg-primary/10 border border-primary/20 px-3 py-2.5 text-xs font-semibold text-primary hover:bg-primary/20 transition-all active:scale-[0.98]"
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

          {/* Navigation Links with Icons & Categorized Styling */}
          <div className="space-y-1">
            <Link
              href={localeHref("/")}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all duration-150",
                isLinkActive("/")
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-foreground hover:bg-muted/70"
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex size-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <Home className="size-4" />
              </div>
              <span>{t("home")}</span>
            </Link>

            <Link
              href={localeHref("/about")}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all duration-150",
                isLinkActive("/about")
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-foreground hover:bg-muted/70"
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex size-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                <Info className="size-4" />
              </div>
              <span>{t("about")}</span>
            </Link>

            {/* Collapsible Courses Section */}
            <div className="rounded-xl overflow-hidden">
              <div
                className={cn(
                  "flex items-center justify-between rounded-xl px-3.5 py-2.5 transition-all duration-150",
                  pathname.startsWith("/courses")
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-foreground hover:bg-muted/70"
                )}
              >
                <Link
                  href={localeHref("/courses")}
                  className="flex items-center gap-3 text-sm font-semibold flex-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex size-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                    <GraduationCap className="size-4" />
                  </div>
                  <span>{t("courses")}</span>
                </Link>
                {courses && courses.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setCoursesOpenMobile((o) => !o)}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
                    aria-label="Toggle courses submenu"
                  >
                    <ChevronDown
                      className={cn(
                        "size-4 transition-transform duration-200",
                        coursesOpenMobile ? "rotate-180" : ""
                      )}
                    />
                  </button>
                )}
              </div>

              {courses && courses.length > 0 && coursesOpenMobile && (
                <div className="ml-8 my-1.5 border-l-2 border-primary/30 pl-3.5 space-y-1 animate-in fade-in-50 duration-150">
                  {courses.map((course) => (
                    <Link
                      key={course.slug}
                      href={localeHref(`/courses/${course.slug}`)}
                      className="block rounded-lg px-2.5 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {locale === "ml" && course.titleMl
                        ? course.titleMl
                        : course.titleEn}
                    </Link>
                  ))}
                  <Link
                    href={localeHref("/courses")}
                    className="flex items-center gap-1 rounded-lg px-2.5 py-2 text-xs font-semibold text-primary hover:underline"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>
                      {locale === "ml"
                        ? "എല്ലാ കോഴ്സുകളും കാൺക"
                        : "View All Courses"}
                    </span>
                    <ArrowRight className="size-3" />
                  </Link>
                </div>
              )}
            </div>

            <Link
              href={localeHref("/placement")}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all duration-150",
                isLinkActive("/placement")
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-foreground hover:bg-muted/70"
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Briefcase className="size-4" />
              </div>
              <span>{t("placement")}</span>
            </Link>

            <Link
              href={localeHref("/gallery")}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all duration-150",
                isLinkActive("/gallery")
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-foreground hover:bg-muted/70"
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex size-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <ImageIcon className="size-4" />
              </div>
              <span>{t("gallery")}</span>
            </Link>

            <Link
              href={localeHref("/portal/student")}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all duration-150",
                isLinkActive("/portal/student")
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-foreground hover:bg-muted/70"
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex size-8 items-center justify-center rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400">
                <BookOpen className="size-4" />
              </div>
              <span>{t("resources")}</span>
            </Link>

            <Link
              href={localeHref("/contact")}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all duration-150",
                isLinkActive("/contact")
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-foreground hover:bg-muted/70"
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex size-8 items-center justify-center rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400">
                <Send className="size-4" />
              </div>
              <span>{t("contact")}</span>
            </Link>
          </div>

          {/* User Profile / Portal Footer Card */}
          <div className="mt-5 pt-4 border-t border-border/70">
            {isSignedIn ? (
              <Link
                href={portalUrl}
                className="flex items-center justify-between rounded-xl border border-border/80 bg-card p-3.5 text-xs font-semibold text-foreground hover:bg-muted/70 transition-all active:scale-[0.99] shadow-xs"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-2 text-primary">
                    <User className="size-4" />
                  </div>
                  <div>
                    <span className="block font-bold text-sm text-foreground">
                      {t("myPortal")}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      {t("brandName")} Account
                    </span>
                  </div>
                </div>
                <ExternalLink className="size-4 text-muted-foreground" />
              </Link>
            ) : (
              <Link
                href={localeHref("/sign-in")}
                className="flex items-center justify-center gap-2 rounded-xl border border-border/80 bg-card p-3 text-xs font-semibold text-foreground hover:bg-muted/70 transition-all active:scale-[0.99] shadow-xs"
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

