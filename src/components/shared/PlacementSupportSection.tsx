"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Briefcase,
  Building,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Award,
  GraduationCap,
  TrendingUp,
  Play,
  Pause,
} from "lucide-react";
import { getMediaUrl } from "@/lib/media";
import type { PublicGalleryCategory } from "@/lib/gallery";

const PLACEMENT_SLUG = "placement-support";
const AUTO_SCROLL_INTERVAL_MS = 3800;

export type PlacementData = {
  slug: string;
  items: PublicGalleryCategory["items"];
} | null;

interface PlacementSupportSectionProps {
  data: PlacementData;
  heading: string;
  viewFullGallery: string;
  ctaHeading: string;
  ctaText: string;
  viewVacancies: string;
  hiringCta: string;
  locale?: string;
}

// Fallback high-res imagery from project assets if gallery item has no image or fails to load
const FALLBACK_IMAGES = [
  "/images/hero-lab-team.jpg",
  "/images/hero-main-student.jpg",
  "/images/hero-analytics-code.jpg",
  "/images/hero-students-lab.jpg",
  "/images/hero-ai-student.jpg",
  "/images/hero-coding-laptop.jpg",
  "/images/hero-main-tech.jpg",
  "/images/courses/course-web-dev.jpg",
  "/images/courses/course-data-science.jpg",
];

export function PlacementSupportSection({
  data,
  heading,
  viewFullGallery,
  ctaHeading,
  ctaText,
  viewVacancies,
  hiringCta,
  locale = "en",
}: PlacementSupportSectionProps) {
  // Up to 9 support items
  const items = data?.items?.slice(0, 9) ?? [];
  const totalItems = items.length;

  // Default active index: Item 5 (index 4) if 9 items exist, otherwise middle item
  const defaultIndex = totalItems === 9 ? 4 : Math.max(0, Math.floor((totalItems - 1) / 2));
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : Math.max(0, totalItems - 1)));
  }, [totalItems]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev < totalItems - 1 ? prev + 1 : 0));
  }, [totalItems]);

  // Auto-scrolling animation loop (smooth cyclic rotation)
  useEffect(() => {
    if (!isPlaying || isHovered || totalItems <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev < totalItems - 1 ? prev + 1 : 0));
    }, AUTO_SCROLL_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [isPlaying, isHovered, totalItems]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current) return;
      if (document.activeElement && containerRef.current.contains(document.activeElement)) {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          handlePrev();
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          handleNext();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  if (!data || totalItems === 0) return null;

  // Touch swipe support for mobile/tablet
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
    setTouchStartX(null);
  };

  return (
    <section
      aria-labelledby="placement-support-heading"
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-background via-sky-50/30 to-background dark:via-slate-950/40"
    >
      {/* Decorative ambient background glows */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-96 w-[650px] -translate-x-1/2 rounded-full bg-sky-400/10 blur-3xl dark:bg-sky-500/10"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 sm:mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1.5 text-xs sm:text-sm font-bold text-primary shadow-xs mb-3.5">
              <Sparkles className="size-4 text-amber-500 animate-pulse" />
              <span>Placement & Career Support</span>
            </div>
            <h2
              id="placement-support-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground"
            >
              {heading}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-xl">
              Real success stories, campus recruitment drives, and hands-on career mentorship preparing every student for industry leadership.
            </p>
          </div>

          <div className="flex items-center gap-4 self-start sm:self-auto">
            <Link
              href={`/gallery?category=${PLACEMENT_SLUG}`}
              className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/85 group transition-colors"
            >
              <span>{viewFullGallery}</span>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* 3D Fanned / Auto-Scrolling Carousel Stage */}
        <div
          ref={containerRef}
          tabIndex={0}
          aria-roledescription="carousel"
          aria-label="Placement and support gallery showcase"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative outline-none select-none [--card-step:42px] sm:[--card-step:80px] md:[--card-step:110px] lg:[--card-step:135px]"
        >
          {/* Top Carousel Navigation Arrows Overlay */}
          <div className="absolute inset-y-0 -left-2 sm:left-2 lg:left-4 z-40 flex items-center">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous placement item"
              className="group flex size-10 sm:size-12 items-center justify-center rounded-full border border-primary/20 bg-background/90 text-foreground backdrop-blur-md shadow-lg shadow-black/10 transition-all duration-200 hover:scale-110 hover:border-primary hover:bg-primary hover:text-primary-foreground active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="size-5 sm:size-6 transition-transform group-hover:-translate-x-0.5" />
            </button>
          </div>

          <div className="absolute inset-y-0 -right-2 sm:right-2 lg:right-4 z-40 flex items-center">
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next placement item"
              className="group flex size-10 sm:size-12 items-center justify-center rounded-full border border-primary/20 bg-background/90 text-foreground backdrop-blur-md shadow-lg shadow-black/10 transition-all duration-200 hover:scale-110 hover:border-primary hover:bg-primary hover:text-primary-foreground active:scale-95 cursor-pointer"
            >
              <ChevronRight className="size-5 sm:size-6 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Cards Stage Container */}
          <div className="relative flex items-center justify-center min-h-[440px] sm:min-h-[490px] lg:min-h-[530px] overflow-hidden py-6">
            {items.map((item, index) => {
              const offset = index - activeIndex;
              const absOffset = Math.abs(offset);
              const isActive = offset === 0;

              // Perspective scale: center is 1.0 (or 1.05), gradually decreasing toward outer sides
              const scale = isActive ? 1.04 : Math.max(0.52, 1 - absOffset * 0.115);

              // Angular rotation: left cards tilt negative, right cards tilt positive
              const rotateDeg = isActive ? 0 : offset * 3.2;

              // Vertical arch offset to create dynamic curve
              const translateY = isActive ? 0 : absOffset * 6;

              // Opacity & Layering
              const opacity = isActive ? 1.0 : Math.max(0.35, 1 - absOffset * 0.15);
              const zIndex = 40 - absOffset * 5;

              // Determine visual image
              const imageSrc = item.url
                ? getMediaUrl(item.url)
                : FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];

              const itemCaption =
                locale === "ml" && item.captionMl
                  ? item.captionMl
                  : item.captionEn || "Placement & Support Initiative";

              return (
                <div
                  key={item.id || `placement-card-${index}`}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={itemCaption}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => setActiveIndex(index)}
                  style={{
                    zIndex,
                    opacity,
                    transform: `translateX(calc(-50% + (${offset} * var(--card-step)))) translateY(${translateY}px) scale(${scale}) rotate(${rotateDeg}deg)`,
                  }}
                  className={`absolute left-1/2 top-4 w-[250px] sm:w-[290px] lg:w-[330px] h-[360px] sm:h-[410px] lg:h-[450px] rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 [transition-timing-function:cubic-bezier(0.25,1,0.5,1)] origin-center ${
                    isActive
                      ? "ring-4 ring-sky-400/40 border-2 border-primary shadow-[0_20px_50px_rgba(0,102,204,0.35)] dark:shadow-[0_20px_50px_rgba(56,189,248,0.25)]"
                      : "border border-border/70 shadow-md hover:border-primary/50 hover:opacity-95"
                  }`}
                >
                  {/* Image Container */}
                  <div className="relative w-full h-full bg-slate-900">
                    <Image
                      src={imageSrc}
                      alt={itemCaption}
                      fill
                      unoptimized
                      priority={isActive || absOffset <= 1}
                      className={`object-cover transition-transform duration-700 ${
                        isActive ? "scale-105" : "scale-100"
                      }`}
                      sizes="(max-width: 640px) 250px, (max-width: 1024px) 290px, 330px"
                    />

                    {/* Gradient & Frosted Glass Backing */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 via-45% to-black/15" />

                    {/* Top Badges Bar */}
                    {isActive && (
                      <div className="absolute inset-x-0 top-0 p-4 flex items-center justify-end z-10">
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/90 backdrop-blur-md px-2.5 py-1 text-[11px] font-extrabold text-amber-950 shadow-md ring-1 ring-amber-300 animate-bounce">
                          <Award className="size-3.5 fill-current" />
                          <span>Featured</span>
                        </span>
                      </div>
                    )}

                    {/* Bottom Content Card Details */}
                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 z-10 flex flex-col justify-end">
                      {/* Category Micro-tag */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center gap-1 rounded-md bg-white/15 px-2 py-0.5 text-[10px] sm:text-xs font-semibold text-sky-200 backdrop-blur-md border border-white/10">
                          {index % 3 === 0 ? (
                            <GraduationCap className="size-3 text-sky-300" />
                          ) : index % 3 === 1 ? (
                            <Briefcase className="size-3 text-amber-300" />
                          ) : (
                            <TrendingUp className="size-3 text-emerald-300" />
                          )}
                          <span>
                            {index % 3 === 0
                              ? "Placement Success"
                              : index % 3 === 1
                                ? "Campus Recruitment"
                                : "Skill Workshop"}
                          </span>
                        </span>
                      </div>

                      {/* Main Title / Caption */}
                      <p
                        className={`font-bold text-white transition-all duration-300 leading-snug line-clamp-3 ${
                          isActive ? "text-base sm:text-lg text-sky-50 drop-shadow-sm" : "text-sm text-slate-200"
                        }`}
                      >
                        {itemCaption}
                      </p>

                      {/* Interactive hint on active card */}
                      {isActive && (
                        <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-sky-300/90">
                          <span>G-TEC Career Network</span>
                          <Sparkles className="size-3 text-amber-400" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 9 Pagination Dots & Auto-Scroll Play/Pause Control Below Cards */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <div
              className="flex items-center justify-center gap-2 sm:gap-2.5"
              role="tablist"
              aria-label="Placement carousel pagination"
            >
              {items.map((_, dotIdx) => {
                const isDotActive = dotIdx === activeIndex;
                return (
                  <button
                    key={`dot-${dotIdx}`}
                    type="button"
                    role="tab"
                    aria-selected={isDotActive}
                    aria-label={`Slide ${dotIdx + 1}${isDotActive ? " (Current)" : ""}`}
                    onClick={() => setActiveIndex(dotIdx)}
                    className={`group relative flex items-center justify-center transition-all duration-500 cursor-pointer ${
                      isDotActive
                        ? "w-8 sm:w-10 h-3 rounded-full bg-gradient-to-r from-primary to-sky-400 shadow-md shadow-primary/30 ring-2 ring-primary/30"
                        : "w-3 h-3 rounded-full bg-muted-foreground/30 hover:bg-primary/50 hover:scale-125"
                    }`}
                  >
                    <span className="sr-only">Go to item {dotIdx + 1}</span>
                  </button>
                );
              })}
            </div>

            {/* Auto-scroll Play / Pause Toggle Button */}
            <button
              type="button"
              onClick={() => setIsPlaying((p) => !p)}
              aria-label={isPlaying ? "Pause auto scrolling" : "Play auto scrolling"}
              title={isPlaying ? "Pause auto scrolling" : "Play auto scrolling"}
              className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card/80 px-2.5 py-1 text-[11px] font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 shadow-2xs transition-all cursor-pointer"
            >
              {isPlaying ? (
                <>
                  <Pause className="size-3 text-primary" />
                  <span>Auto-scroll on</span>
                </>
              ) : (
                <>
                  <Play className="size-3 text-muted-foreground" />
                  <span>Paused</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* High Conversion Placement & Hiring Banner */}
        <div className="relative mt-12 sm:mt-16 overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-br from-primary/15 via-card to-amber-500/10 p-7 sm:p-10 text-center shadow-xl">
          {/* Ambient light glow */}
          <div
            className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-primary/20 blur-2xl"
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-2xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              {ctaHeading}
            </h3>
            <p className="mt-2.5 text-sm sm:text-base text-muted-foreground leading-relaxed">
              {ctaText}
            </p>
            <div className="mt-7 flex flex-col sm:flex-row flex-wrap justify-center gap-3.5">
              <Link
                href="/portal/jobs"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm sm:text-base font-bold text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              >
                <Briefcase className="size-4.5" />
                <span>{viewVacancies}</span>
                <ArrowRight className="size-4.5" />
              </Link>
              <Link
                href="/portal/employer/register"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-primary/40 bg-background/80 px-6 py-3 text-sm sm:text-base font-bold text-foreground shadow-xs transition-all hover:bg-muted/80 hover:border-primary hover:-translate-y-0.5 active:translate-y-0"
              >
                <Building className="size-4.5 text-primary" />
                <span>{hiringCta}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
