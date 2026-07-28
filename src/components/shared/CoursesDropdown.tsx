"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Link, usePathname } from "@/lib/i18n/navigation";

interface CourseDropdownItem {
  slug: string;
  titleEn: string;
  titleMl: string | null;
}

interface CoursesDropdownProps {
  courses: CourseDropdownItem[];
  label: string;
  locale: string;
}

export function CoursesDropdown({
  courses,
  label,
  locale,
}: CoursesDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const handleArrowKeys = useCallback(
    (e: React.KeyboardEvent) => {
      if (!open || courses.length === 0) return;
      const items = containerRef.current?.querySelectorAll<HTMLAnchorElement>(
        '[role="menuitem"]',
      );
      if (!items || items.length === 0) return;
      const currentIndex = Array.from(items).indexOf(
        document.activeElement as HTMLAnchorElement,
      );
      if (e.key === "ArrowDown") {
        e.preventDefault();
        const next = (currentIndex + 1) % items.length;
        items[next]?.focus();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const prev = (currentIndex - 1 + items.length) % items.length;
        items[prev]?.focus();
      }
    },
    [open, courses.length],
  );

  if (courses.length === 0) {
    return (
      <Link href="/courses" className="text-sm font-medium hover:text-primary transition-colors">
        {label}
      </Link>
    );
  }

  return (
    <div ref={containerRef} className="relative" onKeyDown={handleArrowKeys}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen(!open)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (!open) setOpen(true);
          }
        }}
        className="text-sm font-medium hover:text-primary transition-colors inline-flex items-center gap-1"
        aria-expanded={open}
        aria-haspopup="true"
      >
        {label}
        <svg
          className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          aria-label={`${label} menu`}
          className="absolute top-full left-0 mt-1 min-w-[220px] rounded-lg border border-border bg-card shadow-lg z-50 py-1"
        >
          <Link
            href="/courses"
            role="menuitem"
            className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground border-b border-border"
            tabIndex={-1}
          >
            All Courses
          </Link>
          {courses.map((course) => (
            <Link
              key={course.slug}
              href={`/courses/${course.slug}`}
              role="menuitem"
              className="block px-4 py-2 text-sm hover:bg-muted hover:text-primary transition-colors"
              tabIndex={-1}
            >
              {locale === "ml" && course.titleMl
                ? course.titleMl
                : course.titleEn}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
