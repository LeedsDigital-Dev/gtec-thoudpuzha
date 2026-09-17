import Image from "next/image";

interface HeroVisualCollageProps {
  priority?: boolean;
}

export function HeroVisualCollage({ priority = true }: HeroVisualCollageProps) {
  return (
    <div className="relative w-full max-w-[520px] sm:max-w-[580px] lg:max-w-[620px] xl:max-w-[660px] mx-auto lg:ml-auto lg:mr-0 select-none py-4 sm:py-6">
      {/* Ambient Blue & Cyan Glows with subtle pulse */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[85%] rounded-full bg-gradient-to-tr from-primary/20 via-sky-400/25 to-blue-600/20 blur-3xl -z-10 animate-pulse"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-4 -right-4 w-44 h-44 rounded-full bg-cyan-400/20 blur-2xl -z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-4 -left-4 w-44 h-44 rounded-full bg-blue-600/15 blur-2xl -z-10"
        aria-hidden="true"
      />

      {/* Subtle Modern Tech Dotted Matrix Accent */}
      <div
        className="pointer-events-none absolute -right-2 -top-2 sm:-right-4 sm:-top-4 h-24 w-24 z-0 opacity-30 dark:opacity-20"
        aria-hidden="true"
      >
        <svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
          <pattern id="hero-tech-dots" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill="#0284c7" fillOpacity="0.8" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#hero-tech-dots)" />
        </svg>
      </div>

      {/* Subtle Floating Tech Geometric Accent Lines */}
      <div
        className="pointer-events-none absolute -left-3 bottom-8 sm:-left-6 sm:bottom-12 w-16 h-16 z-0 opacity-40 dark:opacity-25"
        aria-hidden="true"
      >
        <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full stroke-primary/50">
          <circle cx="30" cy="30" r="24" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="30" cy="30" r="14" strokeWidth="1" />
          <path d="M6 30h10M44 30h10M30 6v10M30 44v10" strokeWidth="1.5" />
        </svg>
      </div>

      {/* 3-Image Cohesive Composition Stage */}
      <div className="relative flex items-center justify-center min-h-[300px] sm:min-h-[360px] md:min-h-[400px] lg:min-h-[420px]">
        {/* Secondary Left Layered Panel: AI / Technology Student (hero-ai-student.jpg) */}
        <div className="absolute left-0 sm:left-1 md:left-2 top-[12%] sm:top-[10%] w-[44%] sm:w-[43%] aspect-[4/5] z-10 animate-float-subtle">
          <div className="relative w-full h-full overflow-hidden rounded-2xl sm:rounded-3xl border border-white/80 dark:border-white/20 bg-card shadow-xl shadow-blue-950/15 transform -rotate-2 sm:-rotate-3 transition-all duration-500 hover:rotate-0 hover:scale-105 hover:z-25 group">
            <Image
              src="/images/hero-ai-student.jpg"
              alt="Student exploring artificial intelligence and programming at G-TEC Thodupuzha"
              fill
              priority={priority}
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Soft subtle blending overlay connecting to center */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-primary/30 pointer-events-none" />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/30 rounded-2xl sm:rounded-3xl pointer-events-none" />
          </div>
        </div>

        {/* Secondary Right Layered Panel: Coding Student with Laptop (courses/hero-ai-student.jpg.jpg) */}
        <div className="absolute right-0 sm:right-1 md:right-2 bottom-[8%] sm:bottom-[7%] w-[44%] sm:w-[43%] aspect-[4/5] z-10 animate-float-gentle">
          <div className="relative w-full h-full overflow-hidden rounded-2xl sm:rounded-3xl border border-white/80 dark:border-white/20 bg-card shadow-xl shadow-blue-950/15 transform rotate-2 sm:rotate-3 transition-all duration-500 hover:rotate-0 hover:scale-105 hover:z-25 group">
            <Image
              src="/images/courses/hero-ai-student.jpg.jpg"
              alt="Hands-on coding and software education at G-TEC Thodupuzha"
              fill
              priority={priority}
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Soft subtle blending overlay connecting to center */}
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-primary/30 pointer-events-none" />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/30 rounded-2xl sm:rounded-3xl pointer-events-none" />
          </div>
        </div>

        {/* Main Center Focal Image: Professional Business & AI Technology (hero-main-tech.jpg) */}
        <div className="relative z-20 w-[58%] sm:w-[56%] md:w-[54%] lg:w-[56%] xl:w-[55%] aspect-[3/4] animate-float-gentle">
          <div className="relative w-full h-full overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-white/95 dark:border-white/25 bg-card shadow-2xl shadow-blue-950/30 ring-1 ring-primary/20 transition-all duration-500 hover:scale-[1.03] group">
            <Image
              src="/images/hero-main-tech.jpg"
              alt="Professional executive and tech learner engaging with interactive digital interface at G-TEC Thodupuzha"
              fill
              priority={priority}
              sizes="(max-width: 640px) 60vw, (max-width: 1024px) 40vw, 28vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Subtle light sheen highlight */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/15 pointer-events-none" />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/40 rounded-2xl sm:rounded-3xl pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
