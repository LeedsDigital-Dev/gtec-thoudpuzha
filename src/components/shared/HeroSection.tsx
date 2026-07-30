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
    <div className="flex flex-col justify-center gap-6 py-8 lg:min-h-[440px] lg:py-0">
      <span className="w-fit rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-primary">
        {t.badge}
      </span>

      <h1 className="max-w-xl text-3xl font-bold leading-[1.1] tracking-tighter sm:text-5xl lg:text-6xl">
        {t.headline}
      </h1>

      <p className="max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
        {t.subhead}
      </p>

      <div className="flex flex-wrap items-center gap-3 pt-3">
        <Link
          href="#enquiry"
          className={cn(
            buttonVariants({ size: "lg" }),
            "shadow-md transition-shadow hover:shadow-lg"
          )}
        >
          {t.applyNow}
          <ArrowRight className="ml-1.5 size-4" />
        </Link>
        <a
          href={`https://wa.me/${siteConfig.whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({ size: "lg" }),
            "bg-accent text-accent-foreground hover:bg-accent/90 shadow-md transition-shadow hover:shadow-lg"
          )}
        >
          <MessageCircle className="mr-1.5 size-4" />
          {t.whatsappUs}
        </a>
        <a
          href={`tel:${siteConfig.phoneNumber}`}
          className={cn(
            buttonVariants({ variant: "secondary", size: "lg" }),
            "shadow-sm"
          )}
        >
          <Phone className="mr-1.5 size-4" />
          {t.callNow}
        </a>
      </div>
    </div>
  );
}
