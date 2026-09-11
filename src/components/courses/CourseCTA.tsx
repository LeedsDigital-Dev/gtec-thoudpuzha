import { ArrowRight, Sparkles, PhoneCall, CheckCircle2 } from "lucide-react";
import { WhatsAppIcon } from "@/components/shared/icons/WhatsAppIcon";

interface CourseCTAProps {
  courseTitle: string;
  locale: string;
  whatsappNumber?: string | null;
}

export function CourseCTA({
  courseTitle,
  locale,
  whatsappNumber = "919544229992",
}: CourseCTAProps) {
  const isMl = locale === "ml";
  const title = isMl
    ? "നിങ്ങളുടെ കരിയർ സ്വപ്നങ്ങൾ യാഥാർത്ഥ്യമാക്കൂ"
    : "Ready to Transform Your Career with G-TEC?";
  const subtitle = isMl
    ? "തൊടുപുഴയിലെ മികച്ച കമ്പ്യൂട്ടർ & പ്രൊഫഷണൽ ട്രെയിനിംഗ് ഇൻസ്റ്റിറ്റ്യൂട്ടിൽ ഇപ്പോൾ തന്നെ അഡ്മിഷൻ നേടൂ."
    : "Start learning with practical, industry-focused training, certified mentors, and 100% dedicated placement support.";

  const cleanPhone = (whatsappNumber || "919544229992").replace(/\D/g, "");
  const whatsappMsg = encodeURIComponent(
    `Hello G-TEC Thodupuzha, I would like to apply for the course: ${courseTitle}.`
  );
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${whatsappMsg}`;

  return (
    <section className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/15 via-card to-background p-8 sm:p-10 lg:p-12 shadow-lg">
      {/* Decorative Glow Elements */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-amber-500/15 blur-3xl" aria-hidden="true" />

      <div className="relative max-w-3xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs sm:text-sm font-bold text-primary shadow-2xs">
          <Sparkles className="size-4 text-amber-500" />
          <span>{isMl ? "അഡ്മിഷൻ ആരംഭിച്ചിരിക്കുന്നു" : "Admissions Open 2025-26"}</span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-foreground leading-[1.2]">
          {title}
        </h2>

        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          {subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a
            href="#admission-enquiry"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-4 text-sm sm:text-base font-bold text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>{isMl ? "ഇപ്പോൾ അപേക്ഷിക്കൂ" : "Apply For Admission"}</span>
            <ArrowRight className="size-5" />
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-6 py-4 text-sm sm:text-base font-bold text-emerald-700 dark:text-emerald-300 transition-all hover:bg-emerald-500/20 hover:border-emerald-500/60 hover:-translate-y-0.5 shadow-xs"
          >
            <WhatsAppIcon className="size-5" />
            <span>{isMl ? "വാട്സ്ആപ്പ് സന്ദേശം അയക്കൂ" : "WhatsApp Enquiry"}</span>
          </a>
        </div>

        {/* Value Indicators */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-4 text-xs sm:text-sm font-semibold text-muted-foreground border-t border-border/60">
          <div className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400" />
            <span>{isMl ? "100% പ്ലേസ്‌മെന്റ് പിന്തുണ" : "100% Placement Assistance"}</span>
          </div>
          <div className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400" />
            <span>{isMl ? "ഫ്ലെക്സിബിൾ ബാച്ച് സമയം" : "Flexible Batch Timings"}</span>
          </div>
          <div className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400" />
            <span>{isMl ? "സർട്ടിഫൈഡ് ഫാക്കൽറ്റി" : "Industry-Certified Mentors"}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
