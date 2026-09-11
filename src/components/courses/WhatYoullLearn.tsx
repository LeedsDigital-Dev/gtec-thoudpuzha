import { CheckCircle2, Sparkles } from "lucide-react";

interface WhatYoullLearnProps {
  outcomes: string[];
  locale: string;
}

export function WhatYoullLearn({ outcomes, locale }: WhatYoullLearnProps) {
  const isMl = locale === "ml";
  const title = isMl ? "നിങ്ങൾ എന്തെല്ലാം പഠിക്കും" : "What You'll Learn";
  const subtitle = isMl
    ? "ഈ കോഴ്‌സിലൂടെ നിങ്ങൾ നേടുന്ന പ്രധാന പ്രായോഗിക അറിവുകൾ"
    : "Key competencies, practical workflows, and real-world tools covered";

  if (!outcomes || outcomes.length === 0) return null;

  return (
    <section className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 lg:p-10 shadow-xs">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border/60 pb-5 mb-6">
        <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
          <Sparkles className="size-5" />
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

      {/* 2-column grid of learning outcomes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
        {outcomes.map((outcome, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 rounded-xl border border-border/60 bg-muted/30 p-3.5 sm:p-4 transition-all duration-200 hover:bg-muted/60 hover:border-primary/30"
          >
            <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="size-4" />
            </div>
            <span className="text-sm sm:text-base font-semibold text-foreground/90 leading-snug break-words">
              {outcome}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
