"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Ensures that whenever a user navigates to a course detail page:
 * 1. If a hash anchor (such as #enquiry or #admission-enquiry) is present, scrolls smoothly to that section.
 * 2. If no hash is present, reliably resets the viewport to the top (0, 0) of the course details page.
 */
export function CourseScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Prevent browser from automatically restoring previous scroll offset (e.g. ~1800px from homepage)
    if (typeof window !== "undefined" && window.history) {
      try {
        window.history.scrollRestoration = "manual";
      } catch {
        // Ignore if restricted
      }
    }

    let timeoutIds: NodeJS.Timeout[] = [];
    let rafId: number | null = null;

    const handleScroll = () => {
      const hash = window.location.hash;

      if (hash) {
        const cleanHash = hash.replace("#", "");

        const scrollToHashTarget = () => {
          const targetElement =
            cleanHash === "enquiry" || cleanHash === "admission-enquiry"
              ? document.getElementById("admission-enquiry") || document.getElementById("enquiry")
              : document.getElementById(cleanHash) ||
                document.getElementById("admission-enquiry") ||
                document.getElementById("enquiry");

          if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
            return true;
          }
          return false;
        };

        // Try immediately
        scrollToHashTarget();

        // Retry across frames and staggered intervals to handle async hydration / layout shifts
        rafId = requestAnimationFrame(() => {
          scrollToHashTarget();
        });

        timeoutIds.push(setTimeout(scrollToHashTarget, 50));
        timeoutIds.push(setTimeout(scrollToHashTarget, 150));
        timeoutIds.push(setTimeout(scrollToHashTarget, 300));
        timeoutIds.push(setTimeout(scrollToHashTarget, 600));
      } else {
        const resetScrollToTop = () => {
          window.scrollTo({ top: 0, left: 0, behavior: "instant" });
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
        };

        resetScrollToTop();

        rafId = requestAnimationFrame(() => {
          if (window.scrollY > 0 || document.documentElement.scrollTop > 0) {
            resetScrollToTop();
          }
        });

        timeoutIds.push(
          setTimeout(() => {
            if (window.scrollY > 0 || document.documentElement.scrollTop > 0) {
              resetScrollToTop();
            }
          }, 50),
        );

        timeoutIds.push(
          setTimeout(() => {
            if (window.scrollY > 0 || document.documentElement.scrollTop > 0) {
              resetScrollToTop();
            }
          }, 150),
        );

        timeoutIds.push(
          setTimeout(() => {
            if (window.scrollY > 0 || document.documentElement.scrollTop > 0) {
              resetScrollToTop();
            }
          }, 350),
        );

        timeoutIds.push(
          setTimeout(() => {
            if (window.scrollY > 0 || document.documentElement.scrollTop > 0) {
              resetScrollToTop();
            }
          }, 600),
        );
      }
    };

    handleScroll();

    window.addEventListener("hashchange", handleScroll);

    return () => {
      window.removeEventListener("hashchange", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
      timeoutIds.forEach(clearTimeout);
    };
  }, [pathname]);

  return null;
}


