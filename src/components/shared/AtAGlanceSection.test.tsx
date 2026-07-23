import { describe, expect, test } from "vitest";
import { renderToString } from "react-dom/server";
import { AtAGlanceSection } from "./AtAGlanceSection";

function createSettings() {
  return {
    id: "settings_1",
    yearsInOperation: "30+",
    studentsTrained: "5M+",
    centresWorldwide: "1,000+",
    affiliations: "200+",
    countries: "30",
    aboutBodyEn: "About",
    aboutBodyMl: null,
    aboutPhotoUrl: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    whyChooseUsCards: [],
  };
}

describe("AtAGlanceSection", () => {
  test("renders the five stats from SiteSettings", async () => {
    const element = await AtAGlanceSection({ settings: createSettings() });
    const html = renderToString(element);

    expect(html).toContain("30+");
    expect(html).toContain("5M+");
    expect(html).toContain("1,000+");
    expect(html).toContain("200+");
    expect(html).toContain("30");
  });
});
