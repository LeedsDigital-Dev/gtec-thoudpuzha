import { Users, UserCheck } from "lucide-react";
import type { AudienceItem } from "@/lib/course-detail-helpers";

interface WhoCanJoinProps {
  audience: AudienceItem[];
  locale: string;
}

export function WhoCanJoin({ audience, locale }: WhoCanJoinProps) {
  const isMl = locale === "ml";
  const title = isMl ? "ഈ കോഴ്‌സ് ആർക്കൊക്കെ അനുയോജ്യം?" : "Who Can Join This Course?";
  const subtitle = isMl
    ? "വിദ്യാർത്ഥികൾക്കും പ്രൊഫഷണലുകൾക്കും ഒരുപോലെ പ്രയോജനപ്രദം"
    : "Ideal learning path for students, freshers, job seekers, and working professionals";

  if (!audience || audience.length === 0) return null;

  return (
    <section className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 lg:p-10 shadow-xs">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border/60 pb-5 mb-6">
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
          <Users className="size-5" />
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

      {/* Audience Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {audience.map((item, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3.5 rounded-2xl border border-border/80 bg-muted/20 p-4 sm:p-5 transition-all duration-300 hover:bg-muted/40 hover:border-primary/40"
          >
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mt-0.5">
              <UserCheck className="size-4.5" />
            </div>
            <div className="space-y-1 min-w-0">
              <h3 className="font-bold text-base text-foreground">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
