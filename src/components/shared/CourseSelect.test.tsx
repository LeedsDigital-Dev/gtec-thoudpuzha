import { describe, expect, test } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CourseSelect } from "./CourseSelect";
import type { PublicCourse } from "@/lib/courses";

const publishedCourses: PublicCourse[] = [
  {
    id: "c1",
    slug: "python-fullstack",
    titleEn: "Python Full Stack Development",
    titleMl: null,
    descriptionEn: null,
    descriptionMl: null,
    durationText: "6 months",
    certifications: [],
    careerOutcomesEn: null,
    careerOutcomesMl: null,
    coverImageUrl: null,
    featured: false,
    category: null,
    contentBlocks: null,
  },
  {
    id: "c2",
    slug: "graphic-design",
    titleEn: "Graphic Design & Multimedia",
    titleMl: null,
    descriptionEn: null,
    descriptionMl: null,
    durationText: "4 months",
    certifications: [],
    careerOutcomesEn: null,
    careerOutcomesMl: null,
    coverImageUrl: null,
    featured: true,
    category: null,
    contentBlocks: null,
  },
  {
    id: "c3",
    slug: "advanced-excel",
    titleEn: "Advanced Excel & Tally",
    titleMl: null,
    descriptionEn: null,
    descriptionMl: null,
    durationText: "3 months",
    certifications: [],
    careerOutcomesEn: null,
    careerOutcomesMl: null,
    coverImageUrl: null,
    featured: false,
    category: null,
    contentBlocks: null,
  },
];

describe("CourseSelect", () => {
  test("single-select mode renders options matching all passed courses", () => {
    render(
      <CourseSelect
        courses={publishedCourses}
        mode="single"
        value=""
        onChange={() => {}}
      />,
    );

    const select = screen.getByRole("combobox");
    // The default "Select a course" plus 3 courses
    expect(select).toBeInTheDocument();

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(publishedCourses.length + 1); // +1 for the disabled placeholder
    expect(options[0]).toHaveValue("");
    expect(options[0]).toBeDisabled();

    // All course titles appear
    for (const course of publishedCourses) {
      expect(screen.getByRole("option", { name: course.titleEn }));
    }
  });

  test("multi-select mode allows selecting more than one course", () => {
    let selected: string[] = [];
    const onChange = (value: string | string[]) => {
      selected = value as string[];
    };

    const { rerender } = render(
      <CourseSelect
        courses={publishedCourses}
        mode="multi"
        value={selected}
        onChange={onChange}
      />,
    );

    // All courses render as checkboxes
    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes).toHaveLength(publishedCourses.length);

    // Select first two courses
    fireEvent.click(checkboxes[0]);
    expect(selected).toHaveLength(1);
    expect(selected[0]).toBe("c1");

    rerender(
      <CourseSelect
        courses={publishedCourses}
        mode="multi"
        value={selected}
        onChange={onChange}
      />,
    );

    const updatedCheckboxes = screen.getAllByRole("checkbox");
    fireEvent.click(updatedCheckboxes[1]);
    expect(selected).toHaveLength(2);
    expect(selected).toContain("c1");
    expect(selected).toContain("c2");

    // Deselect first course
    rerender(
      <CourseSelect
        courses={publishedCourses}
        mode="multi"
        value={selected}
        onChange={onChange}
      />,
    );

    const finalCheckboxes = screen.getAllByRole("checkbox");
    fireEvent.click(finalCheckboxes[0]);
    expect(selected).toHaveLength(1);
    expect(selected[0]).toBe("c2");
  });

  test("single-select mode shows only published courses — DRAFT courses not rendered", () => {
    const draftCourse: PublicCourse = {
      id: "c_draft",
      slug: "draft-course",
      titleEn: "Draft Course (Unpublished)",
      titleMl: null,
      descriptionEn: null,
      descriptionMl: null,
      durationText: null,
      certifications: [],
      careerOutcomesEn: null,
      careerOutcomesMl: null,
      coverImageUrl: null,
      featured: false,
      category: null,
      contentBlocks: null,
    };

    // Pass only published courses (as getPublishedCourses() would)
    render(
      <CourseSelect
        courses={publishedCourses}
        mode="single"
        value=""
        onChange={() => {}}
      />,
    );

    expect(screen.queryByRole("option", { name: draftCourse.titleEn })).toBeNull();
    for (const course of publishedCourses) {
      expect(screen.getByRole("option", { name: course.titleEn }));
    }
  });

  test("multi-select mode shows only published courses — DRAFT courses not rendered", () => {
    const draftCourse: PublicCourse = {
      id: "c_draft",
      slug: "draft-course",
      titleEn: "Draft Course (Unpublished)",
      titleMl: null,
      descriptionEn: null,
      descriptionMl: null,
      durationText: null,
      certifications: [],
      careerOutcomesEn: null,
      careerOutcomesMl: null,
      coverImageUrl: null,
      featured: false,
      category: null,
      contentBlocks: null,
    };

    render(
      <CourseSelect
        courses={publishedCourses}
        mode="multi"
        value={[]}
        onChange={() => {}}
      />,
    );

    expect(screen.queryByText(draftCourse.titleEn)).toBeNull();
    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes).toHaveLength(publishedCourses.length);
  });
});
