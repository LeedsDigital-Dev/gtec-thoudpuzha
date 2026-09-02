import Image from "next/image";
import { getCertificationPartners } from "@/lib/certification-partners";
import type { PublicCertificationPartner } from "@/lib/certification-partners";
import { getMediaUrl } from "@/lib/media";

export async function CertificationPartnerStrip({
  heading,
  partners: providedPartners,
}: {
  heading: string;
  partners?: PublicCertificationPartner[];
}) {
  const partners = providedPartners ?? (await getCertificationPartners());

  if (partners.length === 0) return null;

  return (
    <section
      aria-label="Certification partners"
      className="border-y bg-muted/20 py-14"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="mb-10 text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          {heading}
        </h2>
         
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {partners.map((partner) => {
            const img = (
              <Image
                src={getMediaUrl(partner.logoUrl)}
                alt={partner.name}
                width={140}
                height={56}
                style={{ width: "auto" }}
                 className="h-14 w-auto object-contain opacity-60 grayscale transition-all duration-200 hover:opacity-100 hover:grayscale-0"
              />
            );

            return partner.link ? (
              <a
                key={partner.id}
                href={partner.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                {img}
              </a>
            ) : (
              <span key={partner.id} className="block">
                {img}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
