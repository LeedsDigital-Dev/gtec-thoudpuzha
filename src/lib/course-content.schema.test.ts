import { describe, test, expect } from "vitest";
import { CourseContentSchema } from "@/lib/course-content.schema";

const validContent = {
  heroTaglineEn: "Kickstart your career",
  heroTaglineMl: "നിങ്ങളുടെ കരിയർ ആരംഭിക്കുക",
  overviewEn: "Learn accounting from experts.",
  overviewMl: "വിദഗ്ധരിൽ നിന്ന് അക്കൗണ്ടിംഗ് പഠിക്കുക.",
  detailedContentEn: "Detailed paragraph about the course.",
  detailedContentMl: "കോഴ്സിനെക്കുറിച്ചുള്ള വിശദമായ വിവരണം.",
  detailedContentImageUrl: "https://example.com/image.jpg",
  courseLists: [
    {
      type: "course_list" as const,
      heading: "G-TEC Diploma Courses",
      items: [
        { code: "PDIFAS", name: "Professional Diploma in Indian, Foreign and SAP Accounting" },
        { code: "ADFA", name: "Advanced Diploma in Financial Accounting" },
      ],
    },
  ],
  benefits: {
    type: "benefits" as const,
    heading: "Benefits of the course",
    items: [
      { textEn: "100% Job-Oriented Training", textMl: "100% ജോബ്-ഓറിയന്റഡ് പരിശീലനം" },
      { textEn: "Hands-On with Real Software", textMl: "" },
    ],
  },
};

describe("CourseContentSchema", () => {
  test("valid full content passes validation", () => {
    const result = CourseContentSchema.safeParse(validContent);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.courseLists).toHaveLength(1);
      expect(result.data.benefits?.items).toHaveLength(2);
    }
  });

  test("empty course lists and no benefits passes", () => {
    const result = CourseContentSchema.safeParse({
      courseLists: [],
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.courseLists).toEqual([]);
      expect(result.data.benefits).toBeUndefined();
    }
  });

  test("course list without items fails", () => {
    const result = CourseContentSchema.safeParse({
      courseLists: [
        {
          type: "course_list",
          heading: "Empty List",
          items: [],
        },
      ],
    });
    expect(result.success).toBe(false);
  });

  test("course list without heading fails", () => {
    const result = CourseContentSchema.safeParse({
      courseLists: [
        {
          type: "course_list",
          heading: "",
          items: [{ code: "ABC", name: "Test" }],
        },
      ],
    });
    expect(result.success).toBe(false);
  });

  test("course list item without code fails", () => {
    const result = CourseContentSchema.safeParse({
      courseLists: [
        {
          type: "course_list",
          heading: "Test",
          items: [{ code: "", name: "Test" }],
        },
      ],
    });
    expect(result.success).toBe(false);
  });

  test("course list item without name fails", () => {
    const result = CourseContentSchema.safeParse({
      courseLists: [
        {
          type: "course_list",
          heading: "Test",
          items: [{ code: "ABC", name: "" }],
        },
      ],
    });
    expect(result.success).toBe(false);
  });

  test("benefits without items fails", () => {
    const result = CourseContentSchema.safeParse({
      courseLists: [],
      benefits: {
        type: "benefits",
        items: [],
      },
    });
    expect(result.success).toBe(false);
  });

  test("benefit item without English text fails", () => {
    const result = CourseContentSchema.safeParse({
      courseLists: [],
      benefits: {
        type: "benefits",
        items: [{ textEn: "", textMl: "മലയാളം" }],
      },
    });
    expect(result.success).toBe(false);
  });

  test("invalid type on course list fails", () => {
    const result = CourseContentSchema.safeParse({
      courseLists: [
        {
          type: "invalid_type",
          heading: "Test",
          items: [{ code: "ABC", name: "Test" }],
        },
      ],
    });
    expect(result.success).toBe(false);
  });

  test("non-array course lists fails", () => {
    const result = CourseContentSchema.safeParse({
      courseLists: "not an array",
    });
    expect(result.success).toBe(false);
  });

  test("empty strings are accepted for optional fields", () => {
    const result = CourseContentSchema.safeParse({
      heroTaglineEn: "",
      courseLists: [],
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.heroTaglineEn).toBe("");
    }
  });

  test("excessively long string fails validation", () => {
    const longText = "a".repeat(6000);
    const result = CourseContentSchema.safeParse({
      heroTaglineEn: longText,
      courseLists: [],
    });
    expect(result.success).toBe(false);
  });

  test("multiple course lists are valid", () => {
    const result = CourseContentSchema.safeParse({
      courseLists: [
        {
          type: "course_list",
          heading: "Diploma Courses",
          items: [{ code: "D1", name: "Diploma 1" }],
        },
        {
          type: "course_list",
          heading: "Certificate Courses",
          items: [{ code: "C1", name: "Certificate 1" }],
        },
      ],
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.courseLists).toHaveLength(2);
    }
  });

  test("benefits heading is optional", () => {
    const result = CourseContentSchema.safeParse({
      courseLists: [],
      benefits: {
        type: "benefits",
        items: [{ textEn: "Benefit one" }],
      },
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.benefits?.heading).toBeFalsy();
    }
  });
});
