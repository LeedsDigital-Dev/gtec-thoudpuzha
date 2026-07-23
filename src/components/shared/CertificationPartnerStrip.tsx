import Image from "next/image";
import { getCertificationPartners } from "@/lib/certification-partners";
import { getMediaUrl } from "@/lib/media";

export async function CertificationPartnerStrip({ heading }: { heading: string }) {
  const partners = await getCertificationPartners();

  if (partners.length === 0) return null;

  return (
    <section
      aria-label="Certification partners"
      className="bg-muted/30 py-12"
    >
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-8 text-center text-lg font-semibold text-muted-foreground">
          {heading}
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-8">
          {partners.map((partner) => {
            const img = (
              <Image
                src={getMediaUrl(partner.logoUrl)}
                alt={partner.name}
                width={120}
                height={48}
                className="h-12 w-auto object-contain opacity-70 grayscale transition-all duration-200 hover:opacity-100 hover:grayscale-0"
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
