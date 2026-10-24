import { Clock, GraduationCap, Laptop, Award } from "lucide-react";
import type { CourseHighlightItem } from "@/lib/course-detail-helpers";

interface CourseHighlightsProps {
  highlights: CourseHighlightItem[];
}

export function CourseHighlights({ highlights }: CourseHighlightsProps) {
  const getIcon = (name: CourseHighlightItem["iconName"]) => {
    switch (name) {
      case "clock":
        return <Clock className="size-6 text-primary" />;
      case "barChart":
        return <GraduationCap className="size-6 text-primary" />;
      case "laptop":
        return <Laptop className="size-6 text-primary" />;
      case "award":
        return <Award className="size-6 text-amber-500" />;
      default:
        return <Award className="size-6 text-primary" />;
    }
  };

  return (
    <section aria-label="Course Highlights" className="pt-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {highlights.map((item) => (
          <div
            key={item.id}
            className="group relative flex items-start gap-4 rounded-2xl border border-border/80 bg-card p-5 shadow-xs transition-all duration-300 hover:shadow-md hover:border-primary/40 hover:-translate-y-0.5"
          >
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/15 transition-transform duration-300 group-hover:scale-105">
              {getIcon(item.iconName)}
            </div>
            <div className="space-y-1 min-w-0">
              <span className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {item.label}
              </span>
              <p className="text-base font-bold text-foreground leading-snug break-words">
                {item.value}
              </p>
              {item.subtext && (
                <span className="block text-xs text-muted-foreground/90 font-medium">
                  {item.subtext}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
