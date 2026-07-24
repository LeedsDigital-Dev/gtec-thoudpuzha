import { clerkClient } from "@clerk/nextjs/server";

/**
 * When the session token's JWT claims are stale (e.g. a role was just set
 * via updateUserMetadata but the token hasn't been re-minted), fall back
 * to the Clerk Backend API for the freshest data.
 *
 * The sanctioned Clerk pattern for this scenario is:
 *   - Client-side: `getToken({ skipCache: true })` or `user.reload()`
 *   - Server-side: fetch from the Backend API directly
 * https://clerk.com/docs/guides/sessions/force-token-refresh
 */
export async function fetchRoleFromApi(
  userId: string,
): Promise<string | undefined> {
  try {
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    return user.publicMetadata?.role as string | undefined;
  } catch {
    return undefined;
  }
}
