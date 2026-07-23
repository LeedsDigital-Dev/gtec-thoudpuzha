import { describe, expect, test } from "vitest";
import { renderToString } from "react-dom/server";
import { Footer } from "./Footer";

describe("Footer", () => {
  test("copyright year is computed from the current date, not hardcoded", () => {
    const html = renderToString(<Footer />);
    const currentYear = new Date().getFullYear().toString();
    expect(html).toContain(currentYear);
    expect(html).toContain("\u00A9");
  });

  test('"Verify Certificate" link points to the real external gtecadmin.com URL', () => {
    const html = renderToString(<Footer />);
    expect(html).toContain("https://gtecadmin.com");
  });
});
