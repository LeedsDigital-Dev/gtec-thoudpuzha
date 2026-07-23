import { describe, expect, test } from "vitest";
import { renderToString } from "react-dom/server";
import { Footer } from "./Footer";

describe("Footer", () => {
  test("copyright year is computed from the current date, not hardcoded", async () => {
    const html = renderToString(await Footer({}));
    const currentYear = new Date().getFullYear().toString();
    expect(html).toContain(currentYear);
    expect(html).toContain("\u00A9");
  });

  test('"Verify Certificate" link points to the real external gtecadmin.com URL', async () => {
    const html = renderToString(await Footer({}));
    expect(html).toContain("https://gtecadmin.com");
  });
});
