/**
 * Shape validation for admin-supplied URL fields.
 *
 * Deliberately NOT a `"use server"` module: every exported async function in a
 * Server Action file becomes a publicly callable, unauthenticated endpoint, and
 * this is an internal helper rather than an action.
 */

/**
 * Return the trimmed value if it is an acceptable URL (or, for WhatsApp, a phone
 * number), otherwise `null` for empty input or throw for malformed input.
 */
export async function validateUrlOrNull(
  value: string | null,
  fieldName: string,
): Promise<string | null> {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;

  // WhatsApp allows phone numbers or wa.me / api.whatsapp.com URLs
  if (fieldName === "WhatsApp") {
    const isPhone = /^(\+?[0-9\s-]{7,20})$/.test(trimmed);
    if (isPhone) return trimmed;
    try {
      const url = new URL(trimmed);
      if (url.protocol === "http:" || url.protocol === "https:") {
        return trimmed;
      }
    } catch {
      throw new Error(
        "Invalid WhatsApp format. Enter a valid phone number (e.g. +919744221113) or wa.me link.",
      );
    }
  }

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      throw new Error(`Invalid protocol for ${fieldName}. Must be http:// or https://`);
    }
    return trimmed;
  } catch {
    throw new Error(`Invalid URL for ${fieldName}. Must be a valid web URL starting with https://`);
  }
}
