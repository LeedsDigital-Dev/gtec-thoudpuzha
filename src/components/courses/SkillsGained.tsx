import { Award } from "lucide-react";

interface SkillsGainedProps {
  skills: string[];
  locale: string;
}

export function SkillsGained({ skills, locale }: SkillsGainedProps) {
  const isMl = locale === "ml";
  const title = isMl ? "നിങ്ങൾ നേടുന്ന പ്രായോഗിക സ്കില്ലുകൾ" : "Skills You'll Gain";
  const subtitle = isMl
    ? "തൊഴിൽ വിപണിയിൽ ആവശ്യമായ ഏറ്റവും പുതിയ ടൂളുകളിലും രീതികളിലുമുള്ള പ്രാവീണ്യം"
    : "Industry-standard software, tools, frameworks, and job-ready competencies";

  if (!skills || skills.length === 0) return null;

  return (
    <section className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 lg:p-10 shadow-xs">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border/60 pb-5 mb-6">
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
          <Award className="size-5 text-amber-500" />
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

      {/* Skills Chips */}
      <div className="flex flex-wrap gap-2.5 sm:gap-3">
        {skills.map((skill, idx) => (
          <span
            key={idx}
            className="inline-flex items-center gap-1.5 rounded-xl border border-primary/20 bg-primary/5 px-3.5 py-2 text-xs sm:text-sm font-bold text-foreground transition-all duration-200 hover:bg-primary/15 hover:border-primary/40 hover:-translate-y-0.5 shadow-2xs"
          >
            <span className="size-1.5 rounded-full bg-primary" />
            <span>{skill}</span>
          </span>
        ))}
      </div>
    </section>
  );
}
