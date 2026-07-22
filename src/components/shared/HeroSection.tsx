import Link from "next/link";
import { MessageCircle, Phone, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

// TODO: Super-Admin-editable content — replace with CMS-managed fields once
// the admin homepage content editor is built.
export function HeroSection() {
  return (
    <section className="flex flex-col justify-center gap-6 py-12 lg:py-0">
      <span className="w-fit rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-secondary-foreground">
        Admissions Open 2025-26
      </span>
      <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
        Build Your Career With G-TEC Thodupuzha
      </h1>
      <p className="max-w-lg text-lg text-muted-foreground">
        Learn in-demand skills in IT, multimedia, accounting, and spoken English.
        Join a trusted global network and take the next step toward a brighter
        future.
      </p>
      <div className="flex flex-wrap items-center gap-3 pt-2">
        <Link
          href="#enquiry"
          className={cn(buttonVariants({ size: "lg" }))}
        >
          Apply Now
          <ArrowRight className="ml-1 size-4" />
        </Link>
        <a
          href={`https://wa.me/${siteConfig.whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp Us"
          className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
        >
          <MessageCircle className="mr-1 size-4" />
          WhatsApp Us
        </a>
        <a
          href={`tel:${siteConfig.phoneNumber}`}
          aria-label="Call Now"
          className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}
        >
          <Phone className="mr-1 size-4" />
          Call Now
        </a>
      </div>
    </section>
  );
}
