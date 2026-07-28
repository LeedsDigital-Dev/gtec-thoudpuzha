"use client";

import { useEffect } from "react";

const STORAGE_KEY = "gtec_preloader_shown";

export function PreloaderCleanup() {
  useEffect(() => {
    const htmlPreloader = document.getElementById("gtec-preloader-static");
    if (htmlPreloader) {
      htmlPreloader.style.opacity = "0";
      setTimeout(() => {
        if (htmlPreloader.parentNode) {
          htmlPreloader.parentNode.removeChild(htmlPreloader);
        }
      }, 500);
    }
    sessionStorage.setItem(STORAGE_KEY, "1");
  }, []);

  return null;
}
