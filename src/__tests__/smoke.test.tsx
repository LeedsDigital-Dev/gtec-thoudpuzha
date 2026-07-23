import { expect, test, vi } from "vitest";
import { renderToString } from "react-dom/server";
import HomePage from "@/app/[locale]/(public)/page";

vi.mock("next-intl/server", () => ({
  getLocale: vi.fn(() => Promise.resolve("en")),
}));

vi.mock("@/lib/gallery", () => ({
  getPlacementGalleryData: vi.fn(() => Promise.resolve(null)),
}));

vi.mock("@/lib/site-settings", async () => {
  const actual = await vi.importActual("@/lib/site-settings");
  return {
    ...actual,
    getSiteSettings: vi.fn(() =>
      Promise.resolve({
        id: "settings_1",
        yearsInOperation: "25+",
        studentsTrained: "3.2M+",
        centresWorldwide: "800+",
        affiliations: "100+",
        countries: "23",
        aboutBodyEn: "About",
        aboutBodyMl: null,
        aboutPhotoUrl: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        whyChooseUsCards: [
          {
            id: "card_1",
            sortOrder: 0,
            icon: "AWARD",
            titleEn: "Title 1",
            titleMl: null,
            descriptionEn: "Description 1",
            descriptionMl: null,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
      }),
    ),
  };
});

test("homepage renders without throwing", async () => {
  const page = await HomePage({ params: Promise.resolve({ locale: "en" }) });
  expect(() => renderToString(page)).not.toThrow();
});

test("(public) homepage renders hero and enquiry form", async () => {
  const html = renderToString(
    await HomePage({ params: Promise.resolve({ locale: "en" }) }),
  );
  expect(html).toContain("Build Your Career With G-TEC Thodupuzha");
  expect(html).toContain("Apply Now");
  expect(html).toContain("Full name");
  expect(html).toContain("Phone number");
});
