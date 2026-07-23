import Link from "next/link";
import { getTranslations } from "next-intl/server";
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
    <footer className="bg-foreground/5 border-t">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand + Address */}
          <div>
            <p className="text-lg font-bold tracking-tight">
              G-TEC <span className="text-primary">{siteConfig.centreName}</span>
            </p>
            {address && (
              <p className="mt-2 text-sm text-muted-foreground">{address}</p>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {navT(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Portals */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {t("portals")}
            </h3>
            <ul className="space-y-2">
              {portalLinks.map((link) => {
                if (link.external) {
                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                        data-testid="verify-certificate-link"
                      >
                        {t(link.labelKey)} ↗
                    </a>
                    </li>
                  );
                }
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {t(link.labelKey)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {t("legal")}
            </h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    data-testid={link.labelKey === "privacyPolicy" ? "footer-privacy-link" : "footer-terms-link"}
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>
            &copy; {currentYear} G-TEC {siteConfig.centreName}. {t("allRightsReserved")}
          </p>
        </div>
      </div>
    </footer>
  );
}
