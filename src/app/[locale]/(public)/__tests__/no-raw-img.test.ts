import { describe, test, expect } from "vitest";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

const projectRoot = resolve(__dirname, "../../../../..");

/** Return true if a file contains a raw `<img` (not `<Image`, not a test mock). */
function hasRawImgTag(filePath: string): boolean {
  if (!existsSync(filePath)) return false;
  const content = readFileSync(filePath, "utf-8");
  // Match `<img` but not `<Image` nor `<img` inside a string/comment
  // A raw <img> tag will have `<img` followed by a space, `>`, or `/` and not be
  // preceded by a word character (to filter out `<Image`).
  const imgTagRegex = /<img[\s>/]/;
  return imgTagRegex.test(content);
}

describe("No raw <img> tags on public marketing pages", () => {
  const filesToAudit = [
    "src/app/[locale]/(public)/news/[slug]/page.tsx",
    "src/components/shared/CertificationPartnerStrip.tsx",
    "src/components/shared/GalleryGrid.tsx",
    "src/components/shared/PlacementSupportSection.tsx",
  ];

  for (const file of filesToAudit) {
    test(`${file} must not contain raw <img> tags`, () => {
      const fullPath = resolve(projectRoot, file);
      expect(hasRawImgTag(fullPath)).toBe(false);
    });
  }
});
