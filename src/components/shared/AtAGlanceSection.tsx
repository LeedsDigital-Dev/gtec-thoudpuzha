import { getAtAGlanceStats, type SiteSettingsWithCards } from "@/lib/site-settings";

interface AtAGlanceSectionProps {
  settings: SiteSettingsWithCards;
}

export function AtAGlanceSection({ settings }: AtAGlanceSectionProps) {
  const stats = getAtAGlanceStats(settings);

  return (
    <section aria-labelledby="at-a-glance-heading" className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          id="at-a-glance-heading"
          className="text-center text-3xl font-bold tracking-tight"
        >
          G-TEC at a Glance
        </h2>
        <dl className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center"
            >
              <dt className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </dt>
              <dd className="mt-2 text-3xl font-bold text-primary">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
