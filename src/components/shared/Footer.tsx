import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { GraduationCap, ShieldCheck, Phone, MessageCircle, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site";

const quickLinks: { labelKey: string; href: string }[] = [
  { labelKey: "home", href: "/" },
  { labelKey: "about", href: "/about" },
  { labelKey: "courses", href: "/courses" },
  { labelKey: "gallery", href: "/gallery" },
  { labelKey: "placement", href: "/placement" },
  { labelKey: "news", href: "/news" },
  { labelKey: "contact", href: "/contact" },
];

const legalLinks: { labelKey: string; href: string }[] = [
  { labelKey: "privacyPolicy", href: "/privacy" },
  { labelKey: "termsOfService", href: "/terms" },
];

const portalLinks: { labelKey: string; href: string; external?: boolean }[] = [
  { labelKey: "studentLogin", href: "/portal/sign-in" },
  { labelKey: "academicResources", href: "/portal/student" },
  { labelKey: "jobVacancies", href: "/portal/jobs" },
  { labelKey: "myBiodata", href: "/portal/biodata" },
  { labelKey: "employerLogin", href: "/portal/sign-in" },
  { labelKey: "postVacancy", href: "/portal/employer/post-vacancy" },
  {
    labelKey: "verifyCertificate",
    href: "https://gtecadmin.com",
    external: true,
  },
];

export async function Footer({ address }: { address?: string | null }) {
  const t = await getTranslations("footer");
  const navT = await getTranslations("nav");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/80 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand Info */}
          <div className="sm:col-span-2 lg:col-span-4 text-left">
            <div className="flex items-center gap-2.5">
              <div className="flex size-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
                <GraduationCap className="size-5.5" />
              </div>
              <div>
                <p className="text-lg font-black tracking-tight text-foreground">
                  G-TEC <span className="text-primary">{siteConfig.centreName}</span>
                </p>
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Computer Education
                </p>
              </div>
            </div>

            {address && (
              <p className="mt-4 text-xs sm:text-sm leading-relaxed text-muted-foreground max-w-sm">
                {address}
              </p>
            )}

            <div className="mt-5 flex flex-wrap gap-2 pt-1">
              <a
                href={`tel:${siteConfig.phoneNumber}`}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-card px-2.5 py-1.5 text-xs font-semibold text-foreground hover:border-primary/40 hover:text-primary transition-colors"
              >
                <Phone className="size-3 text-primary" />
                <span>{siteConfig.phoneNumber}</span>
              </a>
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-2.5 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/10 transition-colors"
              >
                <MessageCircle className="size-3 text-emerald-600 dark:text-emerald-400" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-foreground">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {navT(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Portals & Verification */}
          <div className="lg:col-span-3">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-foreground">
              {t("portals")}
            </h3>
            <ul className="space-y-2.5">
              {portalLinks.map((link, i) => {
                if (link.external) {
                  return (
                    <li key={`portal-${link.labelKey}-${i}`}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-primary hover:underline"
                        data-testid="verify-certificate-link"
                      >
                        <span>{t(link.labelKey)}</span>
                        <ArrowUpRight className="size-3" />
                      </a>
                    </li>
                  );
                }
                return (
                  <li key={`portal-${link.labelKey}-${i}`}>
                    <Link
                      href={link.href}
                      className="text-xs sm:text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {t(link.labelKey)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Legal & ISO Accreditation */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-foreground">
              {t("legal")}
            </h3>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-muted-foreground transition-colors hover:text-primary"
                    data-testid={link.labelKey === "privacyPolicy" ? "footer-privacy-link" : "footer-terms-link"}
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-xl border border-border/80 bg-card p-3">
              <div className="flex items-center gap-2 text-primary font-bold text-xs">
                <ShieldCheck className="size-4 shrink-0" />
                <span>ISO 9001:2015</span>
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground leading-tight">
                Certified Quality Management in Computer Training
              </p>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="mt-12 border-t border-border/60 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs text-muted-foreground">
          <p>
            &copy; {currentYear} G-TEC {siteConfig.centreName}. {t("allRightsReserved")}
          </p>
          <p className="text-[11px]">
            Official Digital Portal for G-TEC Education Centre, Thodupuzha
          </p>
        </div>
      </div>
    </footer>
  );
}

