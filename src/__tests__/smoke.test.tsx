import { expect, test } from "vitest";
import { renderToString } from "react-dom/server";
import HomePage from "@/app/[locale]/(public)/page";

test("homepage renders without throwing", () => {
  expect(() => renderToString(<HomePage />)).not.toThrow();
});

test("(public) homepage renders hero and enquiry form", () => {
  const html = renderToString(<HomePage />);
  expect(html).toContain("Build Your Career With G-TEC Thodupuzha");
  expect(html).toContain("Apply Now");
  expect(html).toContain("Full name");
  expect(html).toContain("Phone number");
});
