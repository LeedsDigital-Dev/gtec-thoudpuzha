import Link from "next/link";
import { siteConfig } from "@/lib/site";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Gallery", href: "/gallery" },
  { label: "Placement", href: "/placement" },
  { label: "News & Events", href: "/news" },
  { label: "Contact", href: "/contact" },
];

const portalLinks = [
  { label: "Student Login", href: "/portal/sign-in" },
  { label: "Academic Resources", href: "/portal/student" },
  { label: "Job Vacancies", href: "/portal/jobs" },
  { label: "My Biodata", href: "/portal/biodata" },
  { label: "Employer Login", href: "/portal/sign-in" },
  { label: "Post a Vacancy", href: "/portal/employer/post-vacancy" },
  {
    label: "Verify Certificate",
    href: "https://gtecadmin.com",
    external: true,
  },
];

export function Footer({ address }: { address?: string | null }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground/5 border-t">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Portals */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Portals
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
                        {link.label} ↗
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
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>
            &copy; {currentYear} G-TEC {siteConfig.centreName}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
