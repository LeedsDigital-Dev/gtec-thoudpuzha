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
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
                <GraduationCap className="size-6" />
              </div>
              <div>
                <p className="text-xl font-black tracking-tight text-foreground">
                  G-TEC <span className="text-primary">{siteConfig.centreName}</span>
                </p>
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                  Computer Education
                </p>
              </div>
            </div>

            {address && (
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground max-w-sm">
                {address}
              </p>
            )}

            <div className="mt-5 flex flex-wrap gap-2.5 pt-1">
              <a
                href={`tel:${siteConfig.phoneNumber}`}
                className="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-card px-3 py-2 text-sm font-bold text-foreground hover:border-primary/40 hover:text-primary transition-colors"
              >
                <Phone className="size-3.5 text-primary" />
                <span>{siteConfig.phoneNumber}</span>
              </a>
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-3 py-2 text-sm font-bold text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/10 transition-colors"
              >
                <MessageCircle className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h3 className="mb-4 text-sm sm:text-base font-black uppercase tracking-wider text-foreground">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm sm:text-base text-muted-foreground transition-colors hover:text-primary font-medium"
                  >
                    {navT(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Portals & Verification */}
          <div className="lg:col-span-3">
            <h3 className="mb-4 text-sm sm:text-base font-black uppercase tracking-wider text-foreground">
              {t("portals")}
            </h3>
            <ul className="space-y-3">
              {portalLinks.map((link, i) => {
                if (link.external) {
                  return (
                    <li key={`portal-${link.labelKey}-${i}`}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm sm:text-base font-bold text-primary hover:underline"
                        data-testid="verify-certificate-link"
                      >
                        <span>{t(link.labelKey)}</span>
                        <ArrowUpRight className="size-3.5" />
                      </a>
                    </li>
                  );
                }
                return (
                  <li key={`portal-${link.labelKey}-${i}`}>
                    <Link
                      href={link.href}
                      className="text-sm sm:text-base text-muted-foreground transition-colors hover:text-primary font-medium"
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
            <h3 className="mb-4 text-sm sm:text-base font-black uppercase tracking-wider text-foreground">
              {t("legal")}
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm sm:text-base text-muted-foreground transition-colors hover:text-primary font-medium"
                    data-testid={link.labelKey === "privacyPolicy" ? "footer-privacy-link" : "footer-terms-link"}
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-2xl border border-border/80 bg-card p-3.5 shadow-xs">
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                <ShieldCheck className="size-4.5 shrink-0" />
                <span>ISO 9001:2015</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                Certified Quality Management in Computer Training
              </p>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="mt-12 border-t border-border/60 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-sm text-muted-foreground font-medium">
          <p>
            &copy; {currentYear} G-TEC {siteConfig.centreName}. {t("allRightsReserved")}
          </p>
          <p className="text-sm text-muted-foreground/80">
            Official Digital Portal for G-TEC Education Centre, Thodupuzha
          </p>
        </div>
      </div>
    </footer>
  );
}

