"use server";

import { prisma } from "@/lib/db";
import { sendEnquiryNotification } from "@/lib/email";

export type EnquiryPayload = {
  source: string;
  fullName: string;
  phone: string;
  course: string;
  message: string;
};

const indianMobileRegex = /^[6-9]\d{9}$/;

export async function submitEnquiry(payload: EnquiryPayload): Promise<void> {
  if (!payload.fullName || !payload.fullName.trim()) {
    throw new Error("Full name is required.");
  }

  if (!payload.phone || !indianMobileRegex.test(payload.phone)) {
    throw new Error("Enter a valid 10-digit Indian mobile number.");
  }

  if (!payload.course) {
    throw new Error("Please select a course.");
  }

  if (!payload.source) {
    throw new Error("Source is required.");
  }

  const course = await prisma.course.findUnique({
    where: { id: payload.course },
  });

  const enquiry = await prisma.enquiry.create({
    data: {
      name: payload.fullName.trim(),
      phone: payload.phone,
      courseId: course?.id ?? null,
      message: payload.message?.trim() || null,
      source: payload.source,
    },
  });

  await sendEnquiryNotification({
    name: enquiry.name,
    phone: enquiry.phone,
    course: course?.titleEn ?? payload.course,
    message: enquiry.message,
    source: enquiry.source,
  });
}
