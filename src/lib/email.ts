import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export interface EnquiryNotificationInput {
  name: string;
  phone: string;
  course: string;
  message: string | null;
  source: string;
}

export function getFromEmail(): string {
  return process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
}

export function getCentreStaffEmails(): string[] {
  const raw = process.env.CENTRE_STAFF_NOTIFICATION_EMAILS;
  if (!raw) return [];
  return raw
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);
}

export async function sendEnquiryNotification(
  input: EnquiryNotificationInput,
): Promise<void> {
  const { EnquiryNotificationEmail } = await import(
    "@/emails/EnquiryNotification"
  );

  const to = getCentreStaffEmails();
  if (to.length === 0) {
    console.warn(
      "[email] No Centre Staff notification addresses configured; skipping send.",
    );
    return;
  }

  await resend.emails.send({
    from: getFromEmail(),
    to,
    subject: `New enquiry from ${input.name}`,
    react: EnquiryNotificationEmail(input),
  });
}
