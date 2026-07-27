import { Building2, GraduationCap, Globe, Award, Users } from "lucide-react";
import { getAtAGlanceStats, type SiteSettingsWithCards } from "@/lib/site-settings";

const statIcons: Record<number, React.ComponentType<{ className?: string }>> = {
  0: Building2,
  1: GraduationCap,
  2: Globe,
  3: Award,
  4: Users,
};

interface AtAGlanceSectionProps {
  settings: SiteSettingsWithCards;
  heading: string;
}

export function AtAGlanceSection({ settings, heading }: AtAGlanceSectionProps) {
  const stats = getAtAGlanceStats(settings);

  return (
    <section aria-labelledby="at-a-glance-heading" className="border-y bg-muted/30 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          id="at-a-glance-heading"
          className="text-center text-3xl font-bold tracking-tight"
        >
          {heading}
        </h2>

        <dl className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((stat, i) => {
            const Icon = statIcons[i] ?? Award;
            return (
              <div
                key={stat.label}
                className="group flex flex-col items-center rounded-xl border border-border/60 bg-background p-6 text-center shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <dd className="text-3xl font-bold tracking-tight text-primary lg:text-4xl">
                  {stat.value}
                </dd>
                <dt className="mt-1 text-sm font-medium text-muted-foreground">
                  {stat.label}
                </dt>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
