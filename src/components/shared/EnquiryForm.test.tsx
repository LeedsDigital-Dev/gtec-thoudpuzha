import { describe, expect, test, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, within, waitFor } from "@testing-library/react";
import { EnquiryForm, type EnquiryPayload } from "./EnquiryForm";
import type { PublicCourse } from "@/lib/courses";

const MOCK_COURSES: PublicCourse[] = [
  {
    id: "c_python",
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
    id: "c_graphic",
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
  },
];

describe("EnquiryForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  function fillRequiredFields(
    source: string,
    values: { fullName?: string; phone?: string; course?: string; message?: string } = {},
  ) {
    const fullName = screen.getByLabelText("Full name");
    const phone = screen.getByLabelText("Phone number");
    const course = screen.getByLabelText("Course interested in");

    fireEvent.change(fullName, { target: { value: values.fullName ?? "Jane Doe" } });
    fireEvent.change(phone, { target: { value: values.phone ?? "9876543210" } });
    fireEvent.change(course, {
      target: { value: values.course ?? MOCK_COURSES[0].id },
    });

    if (values.message !== undefined) {
      const message = screen.getByLabelText("Message / query");
      fireEvent.change(message, { target: { value: values.message } });
    }
  }

  test("submitting with all required fields calls the submit handler with the correct payload including source", async () => {
    const source = "homepage-hero";
    const handleSubmit = vi.fn((_payload: EnquiryPayload) => {});
    render(<EnquiryForm source={source} courses={MOCK_COURSES} onSubmit={handleSubmit} />);

    fillRequiredFields(source, { message: "I want to know more about courses." });

    fireEvent.click(screen.getByRole("button", { name: "Submit Enquiry" }));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });

    expect(handleSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        source,
        fullName: "Jane Doe",
        phone: "9876543210",
        course: MOCK_COURSES[0].id,
        message: "I want to know more about courses.",
      }),
    );

    expect(
      screen.getByText(/Thank you! We have received your enquiry/),
    ).toBeInTheDocument();
  });

  test("submitting with a missing required field shows a validation error and does NOT call the submit handler", () => {
    const source = "homepage-hero";
    const handleSubmit = vi.fn();
    render(<EnquiryForm source={source} courses={MOCK_COURSES} onSubmit={handleSubmit} />);

    fireEvent.click(screen.getByRole("button", { name: "Submit Enquiry" }));

    expect(screen.getByText("Full name is required.")).toBeInTheDocument();
    expect(screen.getByText("Phone number is required.")).toBeInTheDocument();
    expect(screen.getByText("Please select a course.")).toBeInTheDocument();
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  test.each([
    ["1234567890", "starts with 1"],
    ["5555555555", "starts with 5"],
    ["987654321", "too short"],
  ])("an invalid phone number (%s) shows a validation error", (value) => {
    const source = "homepage-hero";
    const handleSubmit = vi.fn();
    render(<EnquiryForm source={source} courses={MOCK_COURSES} onSubmit={handleSubmit} />);

    fillRequiredFields(source, { phone: value });
    fireEvent.click(screen.getByRole("button", { name: "Submit Enquiry" }));

    expect(screen.getByText("Enter a valid 10-digit Indian mobile number.")).toBeInTheDocument();
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  test("two EnquiryForm instances on one page with different source props do not collide or leak state", async () => {
    const handleSubmitA = vi.fn();
    const handleSubmitB = vi.fn();

    render(
      <>
        <EnquiryForm source="homepage-hero" courses={MOCK_COURSES} onSubmit={handleSubmitA} />
        <EnquiryForm source="contact-page" courses={MOCK_COURSES} onSubmit={handleSubmitB} />
      </>,
    );

    const forms = screen.getAllByRole("form");
    expect(forms).toHaveLength(2);

    const firstForm = within(forms[0]);
    const secondForm = within(forms[1]);

    fireEvent.change(firstForm.getByLabelText("Full name"), { target: { value: "Alice" } });
    fireEvent.change(firstForm.getByLabelText("Phone number"), { target: { value: "9876543210" } });
    fireEvent.change(firstForm.getByLabelText("Course interested in"), {
      target: { value: MOCK_COURSES[0].id },
    });

    fireEvent.change(secondForm.getByLabelText("Full name"), { target: { value: "Bob" } });
    fireEvent.change(secondForm.getByLabelText("Phone number"), { target: { value: "8765432109" } });
    fireEvent.change(secondForm.getByLabelText("Course interested in"), {
      target: { value: MOCK_COURSES[1].id },
    });

    fireEvent.click(firstForm.getByRole("button", { name: "Submit Enquiry" }));

    await waitFor(() => {
      expect(handleSubmitA).toHaveBeenCalledTimes(1);
    });

    expect(handleSubmitA).toHaveBeenCalledWith(
      expect.objectContaining({
        source: "homepage-hero",
        fullName: "Alice",
        phone: "9876543210",
        course: MOCK_COURSES[0].id,
      }),
    );
    expect(handleSubmitB).not.toHaveBeenCalled();
    expect(
      firstForm.getByText(/Thank you! We have received your enquiry/),
    ).toBeInTheDocument();
    expect(
      secondForm.queryByText(/Thank you! We have received your enquiry/),
    ).not.toBeInTheDocument();
  });
});
