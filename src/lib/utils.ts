import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Determines whether a route is active given the current pathname.
 * Prevents shorter parent routes from matching when a more specific child route is active.
 */
export function isRouteActive(
  routeHref: string,
  pathname: string,
  allHrefs: string[] = [],
): boolean {
  const cleanPath = pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  const cleanHref = routeHref.length > 1 && routeHref.endsWith("/") ? routeHref.slice(0, -1) : routeHref;

  // 1. Exact match
  if (cleanPath === cleanHref) {
    return true;
  }

  // 2. Prefix match (must be followed by / or end of string)
  const isPrefix = cleanPath.startsWith(cleanHref + "/");
  if (!isPrefix) {
    return false;
  }

  // 3. If any other route in allHrefs is a longer match for cleanPath, this shorter route should NOT be active
  if (allHrefs.length > 0) {
    const hasMoreSpecificMatch = allHrefs.some((otherHref) => {
      const cleanOther = otherHref.length > 1 && otherHref.endsWith("/") ? otherHref.slice(0, -1) : otherHref;
      if (cleanOther.length <= cleanHref.length) return false;
      return cleanPath === cleanOther || cleanPath.startsWith(cleanOther + "/");
    });
    if (hasMoreSpecificMatch) {
      return false;
    }
  }

  return true;
}
