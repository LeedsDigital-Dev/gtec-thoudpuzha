import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BiodataForm } from "./BiodataForm";
import { isProfileComplete } from "@/app/[locale]/(portal)/portal/student/biodata/actions";
import type { CandidateProfileWithCompletion } from "@/app/[locale]/(portal)/portal/student/biodata/actions";
import type { PublicCourse } from "@/lib/courses";

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
