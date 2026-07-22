// @vitest-environment node

import { describe, expect, test, vi, beforeEach } from "vitest";
import { submitEnquiry } from "./enquiry";

const mockEnquiryCreate = vi.hoisted(() => vi.fn());
const mockCourseFindFirst = vi.hoisted(() => vi.fn());
const mockResendSend = vi.hoisted(() => vi.fn());

vi.mock("@/lib/db", () => ({
  prisma: {
    enquiry: {
      create: mockEnquiryCreate,
    },
    course: {
      findFirst: mockCourseFindFirst,
    },
  },
}));

vi.mock("resend", () => ({
  Resend: vi.fn(function () {
    return {
      emails: {
        send: mockResendSend,
      },
    };
  }),
}));

describe("submitEnquiry", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockEnquiryCreate.mockReset();
    mockCourseFindFirst.mockReset();
    mockResendSend.mockReset();
    process.env.CENTRE_STAFF_NOTIFICATION_EMAILS = "staff@example.com";
  });

  test("creates an Enquiry row with the correct source value", async () => {
    const courseId = "course_1";
    mockCourseFindFirst.mockResolvedValue({
      id: courseId,
      titleEn: "Diploma in Computer Application",
    });

    mockEnquiryCreate.mockResolvedValue({
      id: "enquiry_1",
      name: "Jane Doe",
      phone: "9876543210",
      courseId,
      message: "I want to know more.",
      source: "homepage-hero",
      createdAt: new Date(),
    });

    await submitEnquiry({
      source: "homepage-hero",
      fullName: "Jane Doe",
      phone: "9876543210",
      course: "Diploma in Computer Application",
      message: "I want to know more.",
    });

    expect(mockEnquiryCreate).toHaveBeenCalledTimes(1);
    expect(mockEnquiryCreate).toHaveBeenCalledWith({
      data: expect.objectContaining({
        name: "Jane Doe",
        phone: "9876543210",
        courseId,
        message: "I want to know more.",
        source: "homepage-hero",
      }),
    });
  });

  test("rejects invalid data missing phone server-side", async () => {
    await expect(
      submitEnquiry({
        source: "homepage-hero",
        fullName: "Jane Doe",
        phone: "",
        course: "Diploma in Computer Application",
        message: "",
      }),
    ).rejects.toThrow("Enter a valid 10-digit Indian mobile number.");

    expect(mockEnquiryCreate).not.toHaveBeenCalled();
    expect(mockResendSend).not.toHaveBeenCalled();
  });

  test("triggers exactly one Resend email send call on success", async () => {
    const courseId = "course_1";
    mockCourseFindFirst.mockResolvedValue({
      id: courseId,
      titleEn: "Diploma in Computer Application",
    });

    mockEnquiryCreate.mockResolvedValue({
      id: "enquiry_1",
      name: "Jane Doe",
      phone: "9876543210",
      courseId,
      message: null,
      source: "contact-page",
      createdAt: new Date(),
    });

    await submitEnquiry({
      source: "contact-page",
      fullName: "Jane Doe",
      phone: "9876543210",
      course: "Diploma in Computer Application",
      message: "",
    });

    expect(mockResendSend).toHaveBeenCalledTimes(1);
  });
});
