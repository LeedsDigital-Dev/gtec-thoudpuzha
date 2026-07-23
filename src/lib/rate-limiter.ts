import { headers } from "next/headers";

const store = new Map<string, number[]>();

export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

/**
 * Check whether `key` has exceeded the configured rate limit.
 * Uses a sliding-window algorithm: timestamps older than `windowMs`
 * are pruned on every check() call.
 */
export function checkRateLimit(
  key: string,
  config: RateLimitConfig = { windowMs: 60_000, maxRequests: 5 },
  now: number = Date.now(),
): RateLimitResult {
  const windowStart = now - config.windowMs;
  let timestamps = store.get(key) ?? [];

  // Prune expired entries
  timestamps = timestamps.filter((t) => t > windowStart);

  if (timestamps.length >= config.maxRequests) {
    store.set(key, timestamps);
    return {
      allowed: false,
      remaining: 0,
      resetAt: timestamps[0] + config.windowMs,
    };
  }

  timestamps.push(now);
  store.set(key, timestamps);

  return {
    allowed: true,
    remaining: config.maxRequests - timestamps.length,
    resetAt: now + config.windowMs,
  };
}

/**
 * Extract the client IP from the current request's headers.
 * Checks x-forwarded-for (first address) then x-real-ip, falling
 * back to "unknown".
 */
export async function getClientIp(): Promise<string> {
  const hdrs = await headers();
  const forwarded = hdrs.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const realIp = hdrs.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}

/** Reset all rate-limit state — for use in tests only. */
export function resetRateLimiter(): void {
  store.clear();
}
