import { Briefcase, TrendingUp } from "lucide-react";
import type { CareerRole } from "@/lib/course-detail-helpers";

interface CareerOpportunitiesProps {
  roles: CareerRole[];
  locale: string;
}

export function CareerOpportunities({ roles, locale }: CareerOpportunitiesProps) {
  const isMl = locale === "ml";
  const title = isMl ? "കരിയർ സാധ്യതകൾ & തൊഴിൽ അവസരങ്ങൾ" : "Career Opportunities";
  const subtitle = isMl
    ? "ഈ കോഴ്‌സ് വിജയകരമായി പൂർത്തിയാക്കിയാൽ നിങ്ങൾക്ക് ലഭിക്കുന്ന തൊഴിൽ പദവികൾ"
    : "High-growth job roles and employment pathways open to program graduates";

  if (!roles || roles.length === 0) return null;

  return (
    <section className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 lg:p-10 shadow-xs">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border/60 pb-5 mb-6">
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
          <Briefcase className="size-5" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground font-medium mt-0.5">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Career Roles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-4">
        {roles.map((role, idx) => (
          <div
            key={idx}
            className="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-muted/20 p-4 sm:p-5 transition-all duration-300 hover:bg-card hover:shadow-md hover:border-primary/40 hover:-translate-y-0.5"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                  <TrendingUp className="size-4" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80">
                  {isMl ? "തൊഴിൽ റോൾ" : "Job Role"}
                </span>
              </div>
              <h3 className="font-bold text-base sm:text-lg text-foreground group-hover:text-primary transition-colors leading-snug break-words">
                {role.title}
              </h3>
              {role.description && (
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {role.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
