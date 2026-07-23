/**
 * Convert an R2 object key to a public URL served by our API route.
 * For keys like "gallery/12345-img.png" this returns "/api/media/gallery/12345-img.png".
 */
export function getMediaUrl(key: string): string {
  if (key.startsWith("http://") || key.startsWith("https://")) return key;
  return `/api/media/${key}`;
}

/**
 * Convert a batch of R2 keys to public URLs.
 */
export function getMediaUrls(keys: string[]): string[] {
  return keys.map(getMediaUrl);
}
