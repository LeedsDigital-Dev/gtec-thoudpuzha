"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "gtec_preloader_shown";

export function Preloader() {
  const [show, setShow] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) {
        return;
      }
    } catch {
      // Ignore storage errors
    }

    setShow(true);
    sessionStorage.setItem(STORAGE_KEY, "1");

    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, 600);

    const removeTimer = setTimeout(() => {
      setShow(false);
    }, 1100);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  useEffect(() => {
    const htmlPreloader = document.getElementById("gtec-preloader-static");
    if (htmlPreloader && htmlPreloader.parentNode) {
      htmlPreloader.parentNode.removeChild(htmlPreloader);
    }
  }, []);

  if (!show) return null;

  return (
    <div
      id="gtec-preloader"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0b2d5e] transition-opacity duration-500 font-sans pointer-events-none ${
        fading ? "opacity-0" : "opacity-100"
      }`}
      role="status"
      aria-label="Loading"
    >
      <div className="flex flex-col items-center gap-8">
        <div className="relative flex items-center justify-center">
          <div className="absolute w-24 h-24 rounded-full bg-[#ffbf00]/20 animate-ping" />
          <div className="relative flex w-20 h-20 items-center justify-center rounded-full bg-[#ffbf00]">
            <svg
              className="w-10 h-10 text-[#0b2d5e]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
            </svg>
          </div>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-3xl font-bold text-white tracking-tight leading-none">
            GTEC
          </span>
          <span className="text-xs font-medium text-[#5b86b9] uppercase tracking-[0.2em] mt-1">
            Thodupuzha
          </span>
        </div>
        <div className="mt-4 flex gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#ffbf00] animate-bounce" />
          <span className="w-2 h-2 rounded-full bg-[#ffbf00] animate-bounce [animation-delay:150ms]" />
          <span className="w-2 h-2 rounded-full bg-[#ffbf00] animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}

export const PreloaderCleanup = Preloader;
