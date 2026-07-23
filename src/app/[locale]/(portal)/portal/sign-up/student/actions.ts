"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { checkRateLimit, getClientIp } from "@/lib/rate-limiter";

export async function lookupStudentRecord(formData: FormData) {
  // Rate-limit: 5 per minute per IP — this is a public, unauthenticated
  // endpoint that acts as an enumeration oracle for Student ID / phone pairs.
  const ip = await getClientIp();
  const rateCheck = checkRateLimit(`student-lookup:${ip}`);
  if (!rateCheck.allowed) {
    return {
      success: false as const,
      error:
        "Too many attempts. Please try again later.",
    };
  }
  const studentId = formData.get("studentId") as string;
  const phone = formData.get("phone") as string;

  if (!studentId || !phone) {
    return {
      success: false as const,
      error: "Please provide both Student ID and phone number.",
    };
  }

  const record = await prisma.studentRecord.findFirst({
    where: { studentId, phone },
  });

  if (!record) {
    return {
      success: false as const,
      error:
        "We couldn't verify these details — please contact the centre.",
    };
  }

  if (record.linkedUserId) {
    return {
      success: false as const,
      alreadyLinked: true as const,
      error:
        "This Student ID has already been registered — if this is you, please sign in instead.",
    };
  }

  return {
    success: true as const,
    studentRecordId: record.id,
    phone: record.phone,
  };
}

export async function finalizeStudentVerification(studentRecordId: string) {
  const session = await auth();
  if (!session.userId) {
    redirect("/sign-in");
  }

  const record = await prisma.studentRecord.findUnique({
    where: { id: studentRecordId },
  });

  if (!record || record.linkedUserId) {
    redirect("/portal/sign-up/student");
  }

  const client = await clerkClient();
  await client.users.updateUser(session.userId, {
    publicMetadata: { role: "STUDENT" },
  });

  await prisma.user.upsert({
    where: { id: session.userId },
    update: { role: "STUDENT" },
    create: { id: session.userId, role: "STUDENT" },
  });

  await prisma.candidateProfile.create({
    data: {
      userId: session.userId,
      isVerifiedStudent: true,
      studentRecordId,
    },
  });

  await prisma.studentRecord.update({
    where: { id: studentRecordId },
    data: { linkedUserId: session.userId },
  });

  redirect("/portal/student/biodata");
}
