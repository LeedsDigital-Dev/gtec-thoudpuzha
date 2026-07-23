"use client";

import { useState } from "react";
import { EnquiryForm } from "@/components/shared/EnquiryForm";
import { siteConfig } from "@/lib/site";
import type { PublicCourse } from "@/lib/courses";
import type { SiteSettings } from "@prisma/client";

interface ContactSectionProps {
  settings: Pick<
    SiteSettings,
    | "address"
    | "mapEmbedUrl"
    | "facebookUrl"
    | "instagramUrl"
    | "youtubeUrl"
    | "linkedinUrl"
    | "googleReviewsUrl"
  >;
  courses: PublicCourse[];
}

const socialIcons: Record<
  string,
  { label: string; path: string; viewBox: string }
> = {
  facebook: {
    label: "Facebook",
    path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3V2z",
    viewBox: "0 0 24 24",
  },
  instagram: {
    label: "Instagram",
    path: "M17.5 6.5h.01M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm10 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0z",
    viewBox: "0 0 24 24",
  },
  youtube: {
    label: "YouTube",
    path: "M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29.45 29.45 0 0 0 1 12a29.45 29.45 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29.45 29.45 0 0 0 23 12a29.45 29.45 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12z",
    viewBox: "0 0 24 24",
  },
  linkedin: {
    label: "LinkedIn",
    path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
    viewBox: "0 0 24 24",
  },
};

export function ContactSection({ settings, courses }: ContactSectionProps) {
  const [showEnquiry, setShowEnquiry] = useState(false);

  const socialLinks = [
    { url: settings.facebookUrl, key: "facebook" },
    { url: settings.instagramUrl, key: "instagram" },
    { url: settings.youtubeUrl, key: "youtube" },
    { url: settings.linkedinUrl, key: "linkedin" },
  ].filter((s): s is { url: string; key: string } => !!s.url);

  return (
    <section className="bg-muted/40 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-10 text-center text-3xl font-bold">Contact Us</h2>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Map */}
          {settings.mapEmbedUrl && (
            <div className="overflow-hidden rounded-xl border shadow-sm">
              <iframe
                title="G-TEC Thodupuzha location"
                src={settings.mapEmbedUrl}
                width="100%"
                height="320"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                data-testid="google-map-iframe"
              />
            </div>
          )}

          {/* Contact Details */}
          <div className="flex flex-col justify-center gap-6">
            <div>
              <h3 className="text-xl font-semibold">
                G-TEC {siteConfig.centreName}
              </h3>
              {settings.address && (
                <p className="mt-1 text-muted-foreground">{settings.address}</p>
              )}
            </div>

            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Phone:</span>{" "}
                <a
                  href={`tel:${siteConfig.phoneNumber}`}
                  className="text-primary hover:underline"
                >
                  {siteConfig.phoneNumber}
                </a>
              </p>
              <p>
                <span className="font-medium">WhatsApp:</span>{" "}
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}`}
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {siteConfig.phoneNumber}
                </a>
              </p>
            </div>

            {/* Social Icons */}
            {socialLinks.length > 0 && (
              <div className="flex gap-3">
                {socialLinks.map(({ url, key }) => {
                  const icon = socialIcons[key];
                  return (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={icon.label}
                      className="flex h-10 w-10 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                    >
                      <svg
                        viewBox={icon.viewBox}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <path d={icon.path} />
                      </svg>
                    </a>
                  );
                })}
              </div>
            )}

            {/* Reviews link */}
            {settings.googleReviewsUrl && (
              <a
                href={settings.googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                See our Google Reviews →
              </a>
            )}

            {/* Send us a message button */}
            <div>
              <button
                type="button"
                onClick={() => setShowEnquiry(true)}
                className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
              >
                Send us a message
              </button>
            </div>
          </div>
        </div>

        {/* Modal */}
        {showEnquiry && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowEnquiry(false);
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Enquiry form"
          >
            <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-background p-6 shadow-xl">
              <button
                type="button"
                onClick={() => setShowEnquiry(false)}
                className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
                aria-label="Close"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="h-5 w-5"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
              <EnquiryForm source="contact_page" courses={courses} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
