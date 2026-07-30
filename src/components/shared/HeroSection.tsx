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
    <div className="flex flex-col justify-center gap-4 sm:gap-6 py-4 sm:py-8 lg:min-h-[440px] lg:py-0">
      <span className="w-fit rounded-full bg-primary/10 px-3.5 py-1 text-xs sm:text-sm font-semibold uppercase tracking-wide text-primary">
        {t.badge}
      </span>

      <h1 className="max-w-xl text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.15] tracking-tight text-foreground">
        {t.headline}
      </h1>

      <p className="max-w-lg text-sm sm:text-base lg:text-lg leading-relaxed text-muted-foreground">
        {t.subhead}
      </p>

      <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3 pt-2">
        <Link
          href="#enquiry"
          className={cn(
            buttonVariants({ size: "lg" }),
            "w-full sm:w-auto justify-center shadow-md transition-all hover:shadow-lg active:scale-[0.99]"
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
            "w-full sm:w-auto justify-center bg-accent text-accent-foreground hover:bg-accent/90 shadow-md transition-all hover:shadow-lg active:scale-[0.99]"
          )}
        >
          <MessageCircle className="mr-1.5 size-4" />
          {t.whatsappUs}
        </a>
        <a
          href={`tel:${siteConfig.phoneNumber}`}
          className={cn(
            buttonVariants({ variant: "secondary", size: "lg" }),
            "w-full sm:w-auto justify-center shadow-sm"
          )}
        >
          <Phone className="mr-1.5 size-4" />
          {t.callNow}
        </a>
      </div>
    </div>
  );
}
