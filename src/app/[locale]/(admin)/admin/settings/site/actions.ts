"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { requireRole, Role } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { logAdminAction } from "@/lib/audit";
import { uploadFile } from "@/lib/storage";
import { validateUrlOrNull } from "@/lib/url-validation";
import type { WhyCardIcon } from "@prisma/client";

function localeFromFormData(formData: FormData): string {
  return (formData.get("locale") as string) || "en";
}

function getString(formData: FormData, name: string): string {
  return (formData.get(name) as string) ?? "";
}

function getNullableString(formData: FormData, name: string): string | null {
  const value = formData.get(name) as string | null;
  return value?.trim() ? value.trim() : null;
}

export async function updateSiteSettings(formData: FormData) {
  const authResult = await requireRole([Role.SUPER_ADMIN]);
  if (!authResult.authorized) {
    redirect(`/${localeFromFormData(formData)}/forbidden`);
  }

  const settings = await prisma.siteSettings.findFirst({
    include: { whyChooseUsCards: { orderBy: { sortOrder: "asc" } } },
  });

  if (!settings) {
    throw new Error("Site settings have not been initialized.");
  }

  const locale = localeFromFormData(formData);

  let aboutPhotoUrl = getNullableString(formData, "aboutPhotoUrl");
  const aboutPhotoFile = formData.get("aboutPhotoFile") as File | null;
  if (aboutPhotoFile && aboutPhotoFile.size > 0 && typeof aboutPhotoFile.arrayBuffer === "function") {
    try {
      const key = await uploadFile(aboutPhotoFile, "about");
      aboutPhotoUrl = `/api/media/${key}`;
    } catch (err) {
      console.error("[site-settings] Failed to upload about photo file:", err);
    }
  }

  // Same validation the footer action applies to these columns: `mapEmbedUrl`
  // is rendered into an <iframe src> and the rest into <a href>, so an
  // unvalidated value lands directly in an attribute. Validating only one of the
  // two writers of these columns is not a boundary.
  const mapEmbedUrl = await validateUrlOrNull(
    getNullableString(formData, "mapEmbedUrl"),
    "Google Maps Embed URL",
  );
  const mapsUrl = await validateUrlOrNull(
    getNullableString(formData, "mapsUrl"),
    "Google Maps URL",
  );
  const whatsappNumber = await validateUrlOrNull(
    getNullableString(formData, "whatsappNumber"),
    "WhatsApp",
  );
  const facebookUrl = await validateUrlOrNull(
    getNullableString(formData, "facebookUrl"),
    "Facebook URL",
  );
  const instagramUrl = await validateUrlOrNull(
    getNullableString(formData, "instagramUrl"),
    "Instagram URL",
  );
  const youtubeUrl = await validateUrlOrNull(
    getNullableString(formData, "youtubeUrl"),
    "YouTube URL",
  );
  const linkedinUrl = await validateUrlOrNull(
    getNullableString(formData, "linkedinUrl"),
    "LinkedIn URL",
  );
  const googleReviewsUrl = await validateUrlOrNull(
    getNullableString(formData, "googleReviewsUrl"),
    "Google Reviews URL",
  );

  await prisma.siteSettings.update({
    where: { id: settings.id },
    data: {
      yearsInOperation: getString(formData, "yearsInOperation"),
      studentsTrained: getString(formData, "studentsTrained"),
      centresWorldwide: getString(formData, "centresWorldwide"),
      affiliations: getString(formData, "affiliations"),
      countries: getString(formData, "countries"),
      aboutBodyEn: getString(formData, "aboutBodyEn"),
      aboutBodyMl: getNullableString(formData, "aboutBodyMl"),
      aboutPhotoUrl,
      address: getNullableString(formData, "address"),
      mapEmbedUrl,
      mapsUrl,
      whatsappNumber,
      facebookUrl,
      instagramUrl,
      youtubeUrl,
      linkedinUrl,
      googleReviewsUrl,
    },
  });

  for (let i = 0; i < settings.whyChooseUsCards.length; i++) {
    const card = settings.whyChooseUsCards[i];
    await prisma.whyChooseUsCard.update({
      where: { id: card.id },
      data: {
        icon: getString(formData, `card_${i}_icon`) as WhyCardIcon,
        titleEn: getString(formData, `card_${i}_titleEn`),
        titleMl: getNullableString(formData, `card_${i}_titleMl`),
        descriptionEn: getString(formData, `card_${i}_descriptionEn`),
        descriptionMl: getNullableString(formData, `card_${i}_descriptionMl`),
      },
    });
  }

  await logAdminAction({
    actorUserId: authResult.userId,
    actorRole: authResult.role,
    action: "siteSettings.update",
    entityType: "SiteSettings",
    entityId: settings.id,
    metadata: { locale },
  });

  revalidateTag("site-settings", "max");
  revalidatePath(`/${locale}/admin/settings/site`);
  revalidatePath(`/${locale}`);
}
