import { describe, expect, test } from "vitest";
import { renderToString } from "react-dom/server";
import {
  CourseFilterSystem,
  getCourseDepartment,
  getCourseLevel,
} from "./CourseFilterSystem";
import type { PublicCourse } from "@/lib/courses";

describe("CourseFilterSystem helpers", () => {
  const mockCourse1: PublicCourse = {
    id: "c-1",
    slug: "full-stack-web-development",
    titleEn: "Full Stack Web Development",
    titleMl: null,
    descriptionEn: "Master React, Node.js and modern web apps.",
    descriptionMl: null,
    durationText: "6 Months",
    certifications: ["G-TEC", "Full Stack"],
    careerOutcomesEn: "Full Stack Developer, Frontend Developer",
    careerOutcomesMl: null,
    coverImageUrl: null,
    featured: true,
    category: { id: "cat-1", nameEn: "IT & Software", nameMl: "ഐടി" },
    contentBlocks: null,
  };

  const mockCourse2: PublicCourse = {
    id: "c-2",
    slug: "diploma-in-computer-application",
    titleEn: "Diploma in Computer Application (DCA)",
    titleMl: null,
    descriptionEn: "Basic computer fundamentals and MS Office.",
    descriptionMl: null,
    durationText: "6 Months",
    certifications: ["G-TEC", "DCA"],
    careerOutcomesEn: "Office Assistant, Computer Operator",
    careerOutcomesMl: null,
    coverImageUrl: null,
    featured: true,
    category: { id: "cat-1", nameEn: "IT & Software", nameMl: "ഐടി" },
    contentBlocks: null,
  };

  const mockCourse3: PublicCourse = {
    id: "c-3",
    slug: "tallyprime-with-gst",
    titleEn: "TallyPrime with GST & E-Filing",
    titleMl: null,
    descriptionEn: "Accounting, inventory, and GST compliance.",
    descriptionMl: null,
    durationText: "3 Months",
    certifications: ["G-TEC", "Tally"],
    careerOutcomesEn: "Accountant, GST Practitioner",
    careerOutcomesMl: null,
    coverImageUrl: null,
    featured: false,
    category: { id: "cat-2", nameEn: "Accounting & Finance", nameMl: "അക്കൗണ്ടിംഗ്" },
    contentBlocks: null,
  };

  test("getCourseDepartment maps courses accurately", () => {
    expect(getCourseDepartment(mockCourse1)).toBe("Web Development");
    expect(getCourseDepartment(mockCourse2)).toBe("Office & Productivity");
    expect(getCourseDepartment(mockCourse3)).toBe("Accounting & Finance");
  });

  test("getCourseLevel maps basic vs advanced levels accurately", () => {
    expect(getCourseLevel(mockCourse1)).toBe("ADVANCED");
    expect(getCourseLevel(mockCourse2)).toBe("BASIC");
    expect(getCourseLevel(mockCourse3)).toBe("BASIC");
  });

  test("renders course cards, dropdown filters, and action buttons in SSR", () => {
    const html = renderToString(
      <CourseFilterSystem
        courses={[mockCourse1, mockCourse2, mockCourse3]}
        locale="en"
      />
    );

    expect(html).toContain("Full Stack Web Development");
    expect(html).toContain("Diploma in Computer Application (DCA)");
    expect(html).toContain("TallyPrime with GST &amp; E-Filing");
    expect(html).toContain("Web Development");
    expect(html).toContain("Accounting &amp; Finance");
    expect(html).toContain("Advanced");
    expect(html).toContain("Basic");
    expect(html).toContain("Enroll Now");
    expect(html).toContain("View Details");
    expect(html).toContain("Showing 3 of 3 courses");
  });
});
