/**
 * Strip HTML tags from a string.
 *
 * This is defense-in-depth: all user content in this project is rendered
 * as React text children (never via dangerouslySetInnerHTML), so React's
 * default escaping already prevents XSS.  Stripping tags at the input layer
 * eliminates any residual risk from future refactors that might introduce
 * raw-HTML rendering of these fields.
 */
export function stripHtml(input: string): string {
  return input.replace(/<[^>]*>/g, "");
}
