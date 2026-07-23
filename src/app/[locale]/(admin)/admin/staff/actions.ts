"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireRole, Role } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { clerkClient } from "@clerk/nextjs/server";
import { logAdminAction } from "@/lib/audit";

function localeFromFormData(formData: FormData): string {
  return (formData.get("locale") as string) || "en";
}

export async function inviteStaff(formData: FormData) {
  const authResult = await requireRole([Role.SUPER_ADMIN]);
  if (!authResult.authorized) {
    redirect(`/${localeFromFormData(formData)}/forbidden`);
  }

  const email = formData.get("email") as string;
  const locale = localeFromFormData(formData);

  const clerk = await clerkClient();
  await clerk.invitations.createInvitation({
    emailAddress: email,
    publicMetadata: { role: Role.CENTRE_STAFF },
    redirectUrl: `/${locale}/complete-signup`,
  });

  await logAdminAction({
    actorUserId: authResult.userId,
    actorRole: authResult.role,
    action: "staff.invite",
    entityType: "User",
    entityId: email,
    metadata: { email, invitedRole: Role.CENTRE_STAFF },
  });

  revalidatePath(`/${locale}/admin/staff`);
}

export async function deactivateStaff(formData: FormData) {
  const authResult = await requireRole([Role.SUPER_ADMIN]);
  if (!authResult.authorized) {
    redirect(`/${localeFromFormData(formData)}/forbidden`);
  }

  const userId = formData.get("userId") as string;
  const locale = localeFromFormData(formData);

  await prisma.user.update({
    where: { id: userId },
    data: { deactivatedAt: new Date() },
  });

  await logAdminAction({
    actorUserId: authResult.userId,
    actorRole: authResult.role,
    action: "staff.deactivate",
    entityType: "User",
    entityId: userId,
  });

  revalidatePath(`/${locale}/admin/staff`);
}

export async function reactivateStaff(formData: FormData) {
  const authResult = await requireRole([Role.SUPER_ADMIN]);
  if (!authResult.authorized) {
    redirect(`/${localeFromFormData(formData)}/forbidden`);
  }

  const userId = formData.get("userId") as string;
  const locale = localeFromFormData(formData);

  await prisma.user.update({
    where: { id: userId },
    data: { deactivatedAt: null },
  });

  await logAdminAction({
    actorUserId: authResult.userId,
    actorRole: authResult.role,
    action: "staff.reactivate",
    entityType: "User",
    entityId: userId,
  });

  revalidatePath(`/${locale}/admin/staff`);
}
