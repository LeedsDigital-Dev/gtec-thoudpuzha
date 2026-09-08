import React from "react";
import {
  GraduationCap,
  Laptop,
  ShieldCheck,
  Briefcase,
  Clock,
} from "lucide-react";

interface FeatureItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const trustFeatures: FeatureItem[] = [
  {
    id: "faculty",
    icon: GraduationCap,
    title: "Expert Faculty",
    description: "Learn from experienced industry professionals",
  },
  {
    id: "practical",
    icon: Laptop,
    title: "Practical Training",
    description: "Hands-on projects and real-world exposure",
  },
  {
    id: "recognized",
    icon: ShieldCheck,
    title: "Industry Recognized",
    description: "Trusted education and certification programs",
  },
  {
    id: "placement",
    icon: Briefcase,
    title: "Placement Assistance",
    description: "Career guidance and placement support",
  },
  {
    id: "flexible",
    icon: Clock,
    title: "Flexible Learning",
    description: "Regular, weekend and flexible learning options",
  },
];

export function FooterFeatureBar() {
  return (
    <section
      aria-label="Key institutional features"
      className="border-b border-white/10 bg-[#0e263d]/80 backdrop-blur-md text-white py-8 lg:py-10 transition-colors"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          {trustFeatures.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className={`group flex items-start gap-4 transition-transform duration-200 hover:-translate-y-0.5 ${
                  idx < trustFeatures.length - 1
                    ? "lg:border-r lg:border-white/10 lg:pr-6"
                    : ""
                }`}
              >
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-sky-500/10 border border-sky-400/20 text-sky-400 shadow-xs transition-all duration-300 group-hover:scale-110 group-hover:bg-sky-500/20 group-hover:text-sky-300 group-hover:border-sky-400/40">
                  <Icon className="size-5.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm sm:text-base font-bold tracking-tight text-white group-hover:text-sky-300 transition-colors">
                    {feature.title}
                  </h4>
                  <p className="mt-1 text-xs sm:text-sm leading-relaxed text-slate-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
