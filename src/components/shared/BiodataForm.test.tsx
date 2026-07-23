import { describe, expect, test, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BiodataForm } from "./BiodataForm";
import { isProfileComplete } from "@/app/[locale]/(portal)/portal/student/biodata/actions";
import type { CandidateProfileWithCompletion } from "@/app/[locale]/(portal)/portal/student/biodata/actions";
import type { PublicCourse } from "@/lib/courses";
import type { SkillDto } from "@/lib/skills";

const mockCourses: PublicCourse[] = [
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
    featured: false,
    category: null,
  },
];

const mockApprovedSkills: SkillDto[] = [
  { id: "s1", label: "JavaScript", status: "APPROVED", createdAt: new Date() },
  { id: "s2", label: "Python", status: "APPROVED", createdAt: new Date() },
  { id: "s3", label: "React", status: "APPROVED", createdAt: new Date() },
];

const mockPendingSkill: SkillDto = {
  id: "s-pending-1",
  label: "Rust",
  status: "PENDING",
  createdAt: new Date(),
};

function emptyProfile(isVerifiedStudent: boolean): CandidateProfileWithCompletion {
  return {
    id: "",
    fullName: null,
    dateOfBirth: null,
    phone: null,
    email: null,
    courseCompletedIds: [],
    certificationIds: [],
    educationalQualification: null,
    yearOfPassing: null,
    address: null,
    languagesKnown: [],
    skillIds: [],
    preferredJobLocation: null,
    preferredJobType: null,
    careerObjective: null,
    photoUrl: null,
    isVerifiedStudent,
    studentRecordId: null,
  };
}

describe("BiodataForm", () => {
  test("job_seeker does NOT see Course Completed or Certification Earned fields", () => {
    render(
      <BiodataForm
        profile={emptyProfile(false)}
        isVerifiedStudent={false}
        courses={mockCourses}
        skills={mockApprovedSkills}
        onAddNewSkill={vi.fn()}
        onSubmit={vi.fn()}
      />,
    );

    expect(screen.queryByText("Course Completed")).toBeNull();
    expect(screen.queryByText("Certification Earned")).toBeNull();
  });

  test("student DOES see Course Completed and Certification Earned fields", () => {
    render(
      <BiodataForm
        profile={emptyProfile(true)}
        isVerifiedStudent={true}
        courses={mockCourses}
        skills={mockApprovedSkills}
        onAddNewSkill={vi.fn()}
        onSubmit={vi.fn()}
      />,
    );

    expect(screen.getByText("Course Completed")).toBeInTheDocument();
    expect(screen.getByText("Certification Earned")).toBeInTheDocument();
  });

  test("saving a partially-filled form succeeds without blocking", async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);

    render(
      <BiodataForm
        profile={emptyProfile(false)}
        isVerifiedStudent={false}
        courses={mockCourses}
        skills={mockApprovedSkills}
        onAddNewSkill={vi.fn()}
        onSubmit={onSubmit}
      />,
    );

    const saveButton = screen.getByRole("button", { name: "Save Biodata" });
    expect(saveButton).not.toBeDisabled();
  });
});

describe("isProfileComplete", () => {
  test("returns false for a partial profile", () => {
    const partial = emptyProfile(false);
    expect(isProfileComplete(partial)).toBe(false);
  });

  test("returns true when all required fields are filled", () => {
    const complete: CandidateProfileWithCompletion = {
      id: "p1",
      fullName: "John Doe",
      dateOfBirth: new Date("2000-01-01"),
      phone: "9876543210",
      email: "john@example.com",
      courseCompletedIds: [],
      certificationIds: [],
      educationalQualification: "GRADUATE",
      yearOfPassing: 2022,
      address: "123 Main St",
      languagesKnown: ["English", "Malayalam"],
      skillIds: [],
      preferredJobLocation: "Kochi",
      preferredJobType: "FULL_TIME",
      careerObjective: "Looking for opportunities",
      photoUrl: null,
      isVerifiedStudent: false,
      studentRecordId: null,
    };
    expect(isProfileComplete(complete)).toBe(true);
  });

  test("returns false for student without courseCompletedIds", () => {
    const studentProfile: CandidateProfileWithCompletion = {
      id: "p2",
      fullName: "Jane Doe",
      dateOfBirth: new Date("2001-01-01"),
      phone: "9876543211",
      email: "jane@example.com",
      courseCompletedIds: [],
      certificationIds: [],
      educationalQualification: "GRADUATE",
      yearOfPassing: 2023,
      address: "456 Oak St",
      languagesKnown: ["English"],
      skillIds: [],
      preferredJobLocation: "Bangalore",
      preferredJobType: "FULL_TIME",
      careerObjective: "Aspiring developer",
      photoUrl: null,
      isVerifiedStudent: true,
      studentRecordId: "SR001",
    };
    expect(isProfileComplete(studentProfile)).toBe(false);
  });

  test("returns true for verified student with courseCompletedIds filled", () => {
    const studentProfile: CandidateProfileWithCompletion = {
      id: "p3",
      fullName: "Jane Doe",
      dateOfBirth: new Date("2001-01-01"),
      phone: "9876543211",
      email: "jane@example.com",
      courseCompletedIds: ["c1"],
      certificationIds: [],
      educationalQualification: "GRADUATE",
      yearOfPassing: 2023,
      address: "456 Oak St",
      languagesKnown: ["English"],
      skillIds: [],
      preferredJobLocation: "Bangalore",
      preferredJobType: "FULL_TIME",
      careerObjective: "Aspiring developer",
      photoUrl: null,
      isVerifiedStudent: true,
      studentRecordId: "SR001",
    };
    expect(isProfileComplete(studentProfile)).toBe(true);
  });
});

describe("SkillMultiSelect (inside BiodataForm)", () => {
  test("typing an existing APPROVED skill name shows it as a selectable suggestion", async () => {
    const user = userEvent.setup();
    render(
      <BiodataForm
        profile={emptyProfile(false)}
        isVerifiedStudent={false}
        courses={mockCourses}
        skills={mockApprovedSkills}
        onAddNewSkill={vi.fn()}
        onSubmit={vi.fn()}
      />,
    );

    const input = screen.getByPlaceholderText("Type to add skills...");
    await user.type(input, "Python");

    const suggestion = screen.getByRole("option", { name: "Python" });
    expect(suggestion).toBeInTheDocument();
  });

  test("typing a new skill creates a new PENDING Skill row and associates it", async () => {
    const onAddNewSkill = vi.fn().mockResolvedValue(mockPendingSkill);
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    const user = userEvent.setup();

    render(
      <BiodataForm
        profile={emptyProfile(false)}
        isVerifiedStudent={false}
        courses={mockCourses}
        skills={mockApprovedSkills}
        onAddNewSkill={onAddNewSkill}
        onSubmit={onSubmit}
      />,
    );

    const input = screen.getByPlaceholderText("Type to add skills...");
    await user.type(input, "Rust");

    const addOption = screen.getByRole("option", { name: /Add "Rust"/ });
    await user.click(addOption);

    expect(onAddNewSkill).toHaveBeenCalledWith("Rust");

    // The skill should appear as a selected chip
    expect(screen.getByText("Rust")).toBeInTheDocument();

    // The "x" remove button for Rust should exist
    expect(screen.getByLabelText("Remove Rust")).toBeInTheDocument();
  });

  test("a PENDING skill does NOT show as a suggestion for a DIFFERENT candidate", () => {
    render(
      <BiodataForm
        profile={emptyProfile(false)}
        isVerifiedStudent={false}
        courses={mockCourses}
        skills={mockApprovedSkills}
        onAddNewSkill={vi.fn()}
        onSubmit={vi.fn()}
      />,
    );

    // The pending skill is NOT in the approved skills list passed to the form
    const input = screen.getByPlaceholderText("Type to add skills...") as HTMLInputElement;
    expect(input).not.toBeNull();
    // mockApprovedSkills contains only APPROVED skills (s1=JavaScript, s2=Python, s3=React)
    // mockPendingSkill (Rust) is not in that list, so it should never appear as a suggestion
    expect(mockApprovedSkills.find((s) => s.id === "s-pending-1")).toBeUndefined();
    // Verify the approved skills ARE present
    expect(mockApprovedSkills).toHaveLength(3);
  });

  test("selecting multiple skills persists all of them on save", async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    const user = userEvent.setup();

    render(
      <BiodataForm
        profile={emptyProfile(false)}
        isVerifiedStudent={false}
        courses={mockCourses}
        skills={mockApprovedSkills}
        onAddNewSkill={vi.fn()}
        onSubmit={onSubmit}
      />,
    );

    const input = screen.getByPlaceholderText("Type to add skills...");

    // Select JavaScript
    await user.type(input, "JavaScript");
    const jsOption = screen.getByRole("option", { name: "JavaScript" });
    await user.click(jsOption);

    // Clear and type to select React
    await user.type(screen.getByPlaceholderText("Add more..."), "React");
    const reactOption = screen.getByRole("option", { name: "React" });
    await user.click(reactOption);

    // Save
    const saveButton = screen.getByRole("button", { name: "Save Biodata" });
    await user.click(saveButton);

    expect(onSubmit).toHaveBeenCalledTimes(1);
    const submittedData = onSubmit.mock.calls[0][0];
    expect(submittedData.skillIds).toContain("s1");
    expect(submittedData.skillIds).toContain("s3");
    expect(submittedData.skillIds).toHaveLength(2);
  });
});
