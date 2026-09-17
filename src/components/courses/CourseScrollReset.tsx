"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Ensures that whenever a user navigates to a course detail page,
 * the viewport is placed at the top (scroll position 0), unless a hash anchor
 * (such as #admission-enquiry) is explicitly provided.
 */
export function CourseScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      const rafId = requestAnimationFrame(() => {
        if (!window.location.hash && (window.scrollY > 0 || document.documentElement.scrollTop > 0)) {
          window.scrollTo({ top: 0, left: 0, behavior: "instant" });
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
        }
      });

      const timeoutId = setTimeout(() => {
        if (!window.location.hash && (window.scrollY > 0 || document.documentElement.scrollTop > 0)) {
          window.scrollTo({ top: 0, left: 0, behavior: "instant" });
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
        }
      }, 50);

      return () => {
        cancelAnimationFrame(rafId);
        clearTimeout(timeoutId);
      };
    }
  }, [pathname]);

  return null;
}
