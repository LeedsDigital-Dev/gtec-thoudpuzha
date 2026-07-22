"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireRole, Role } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { logAdminAction } from "@/lib/audit";

function localeFromFormData(formData: FormData): string {
  return (formData.get("locale") as string) || "en";
}

export async function createFlashNews(formData: FormData) {
  const authResult = await requireRole([Role.CENTRE_STAFF, Role.SUPER_ADMIN]);
  if (!authResult.authorized) {
    redirect(`/${localeFromFormData(formData)}/forbidden`);
  }

  const textEn = formData.get("textEn") as string;
  const textMl = (formData.get("textMl") as string) || null;
  const link = (formData.get("link") as string) || null;
  const expiresAtValue = formData.get("expiresAt") as string;
  const expiresAt = expiresAtValue ? new Date(expiresAtValue) : null;

  const maxOrder = await prisma.flashNewsItem.aggregate({
    _max: { sortOrder: true },
  });

  const item = await prisma.flashNewsItem.create({
    data: {
      textEn,
      textMl,
      link,
      expiresAt,
      sortOrder: (maxOrder._max.sortOrder ?? 0) + 1,
    },
  });

  await logAdminAction({
    actorUserId: authResult.userId!,
    actorRole: authResult.role,
    action: "flashNews.create",
    entityType: "FlashNewsItem",
    entityId: item.id,
    metadata: { textEn, textMl, link, expiresAt: expiresAt?.toISOString() },
  });

  revalidatePath(`/${localeFromFormData(formData)}/admin/flash-news`);
}

export async function updateFlashNews(formData: FormData) {
  const authResult = await requireRole([Role.CENTRE_STAFF, Role.SUPER_ADMIN]);
  if (!authResult.authorized) {
    redirect(`/${localeFromFormData(formData)}/forbidden`);
  }

  const id = formData.get("id") as string;
  const textEn = formData.get("textEn") as string;
  const textMl = (formData.get("textMl") as string) || null;
  const link = (formData.get("link") as string) || null;
  const active = formData.get("active") === "on";
  const expiresAtValue = formData.get("expiresAt") as string;
  const expiresAt = expiresAtValue ? new Date(expiresAtValue) : null;

  const item = await prisma.flashNewsItem.update({
    where: { id },
    data: { textEn, textMl, link, active, expiresAt },
  });

  await logAdminAction({
    actorUserId: authResult.userId!,
    actorRole: authResult.role,
    action: "flashNews.update",
    entityType: "FlashNewsItem",
    entityId: item.id,
    metadata: { textEn, textMl, link, active, expiresAt: expiresAt?.toISOString() },
  });

  revalidatePath(`/${localeFromFormData(formData)}/admin/flash-news`);
}

export async function deleteFlashNews(formData: FormData) {
  const authResult = await requireRole([Role.CENTRE_STAFF, Role.SUPER_ADMIN]);
  if (!authResult.authorized) {
    redirect(`/${localeFromFormData(formData)}/forbidden`);
  }

  const id = formData.get("id") as string;

  await prisma.flashNewsItem.delete({ where: { id } });

  await logAdminAction({
    actorUserId: authResult.userId!,
    actorRole: authResult.role,
    action: "flashNews.delete",
    entityType: "FlashNewsItem",
    entityId: id,
  });

  revalidatePath(`/${localeFromFormData(formData)}/admin/flash-news`);
}

export async function toggleFlashNewsActive(formData: FormData) {
  const authResult = await requireRole([Role.CENTRE_STAFF, Role.SUPER_ADMIN]);
  if (!authResult.authorized) {
    redirect(`/${localeFromFormData(formData)}/forbidden`);
  }

  const id = formData.get("id") as string;
  const active = formData.get("active") === "true";

  const item = await prisma.flashNewsItem.update({
    where: { id },
    data: { active },
  });

  await logAdminAction({
    actorUserId: authResult.userId!,
    actorRole: authResult.role,
    action: active ? "flashNews.activate" : "flashNews.deactivate",
    entityType: "FlashNewsItem",
    entityId: item.id,
    metadata: { active },
  });

  revalidatePath(`/${localeFromFormData(formData)}/admin/flash-news`);
}

export async function moveFlashNews(formData: FormData) {
  const authResult = await requireRole([Role.CENTRE_STAFF, Role.SUPER_ADMIN]);
  if (!authResult.authorized) {
    redirect(`/${localeFromFormData(formData)}/forbidden`);
  }

  const id = formData.get("id") as string;
  const direction = formData.get("direction") as "up" | "down";

  const items = await prisma.flashNewsItem.findMany({
    orderBy: { sortOrder: "asc" },
  });

  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return;

  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (swapIndex < 0 || swapIndex >= items.length) return;

  const current = items[index];
  const swap = items[swapIndex];

  await prisma.flashNewsItem.update({
    where: { id: current.id },
    data: { sortOrder: swap.sortOrder },
  });

  await prisma.flashNewsItem.update({
    where: { id: swap.id },
    data: { sortOrder: current.sortOrder },
  });

  await logAdminAction({
    actorUserId: authResult.userId!,
    actorRole: authResult.role,
    action: "flashNews.reorder",
    entityType: "FlashNewsItem",
    entityId: current.id,
    metadata: { direction, swappedWith: swap.id },
  });

  revalidatePath(`/${localeFromFormData(formData)}/admin/flash-news`);
}
