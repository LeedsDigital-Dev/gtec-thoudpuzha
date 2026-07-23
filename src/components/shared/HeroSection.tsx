import Link from "next/link";
import { MessageCircle, Phone, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

interface HeroSectionProps {
  t: {
    badge: string;
    headline: string;
    subhead: string;
    applyNow: string;
    whatsappUs: string;
    callNow: string;
  };
}

export function HeroSection({ t }: HeroSectionProps) {
  return (
    <section className="flex flex-col justify-center gap-6 py-12 lg:py-0">
      <span className="w-fit rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-secondary-foreground">
        {t.badge}
      </span>
      <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
        {t.headline}
      </h1>
      <p className="max-w-lg text-lg text-muted-foreground">
        {t.subhead}
      </p>
      <div className="flex flex-wrap items-center gap-3 pt-2">
        <Link href="#enquiry" className={cn(buttonVariants({ size: "lg" }))}>
          {t.applyNow}
          <ArrowRight className="ml-1 size-4" />
        </Link>
        <a
          href={`https://wa.me/${siteConfig.whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
        >
          <MessageCircle className="mr-1 size-4" />
          {t.whatsappUs}
        </a>
        <a
          href={`tel:${siteConfig.phoneNumber}`}
          className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}
        >
          <Phone className="mr-1 size-4" />
          {t.callNow}
        </a>
      </div>
    </section>
  );
}
