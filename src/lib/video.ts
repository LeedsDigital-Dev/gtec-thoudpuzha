const _ALLOWED_HOSTS = [
  "youtube.com",
  "www.youtube.com",
  "youtu.be",
  "vimeo.com",
  "www.vimeo.com",
];

/**
 * Validate that a URL is from an allowed video host.
 * Returns an error message, or null if valid.
 */
export function validateVideoUrl(url: string): string | null {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return "Invalid URL format.";
  }

  const host = parsed.hostname.replace(/^www\./, "");
  if (!["youtube.com", "youtu.be", "vimeo.com"].includes(host)) {
    return "Only YouTube and Vimeo URLs are allowed.";
  }

  return null;
}

/**
 * Derive an embeddable iframe src URL from a standard video URL.
 */
export function deriveEmbedUrl(url: string): string {
  const parsed = new URL(url);
  const host = parsed.hostname.replace(/^www\./, "");

  if (host === "youtu.be") {
    return `https://www.youtube.com/embed${parsed.pathname}`;
  }

  if (host === "youtube.com") {
    const v = parsed.searchParams.get("v");
    if (v) return `https://www.youtube.com/embed/${v}`;
    // fallback: treat path as embed path already
    return `https://www.youtube.com${parsed.pathname}`;
  }

  if (host === "vimeo.com") {
    return `https://player.vimeo.com/video${parsed.pathname}`;
  }

  return url;
}
