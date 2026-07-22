import { expect, test } from "vitest";
import { renderToString } from "react-dom/server";
import HomePage from "@/app/[locale]/(public)/page";

test("homepage renders without throwing", () => {
  expect(() => renderToString(<HomePage />)).not.toThrow();
});

test("(public) route group renders placeholder text", () => {
  const html = renderToString(<HomePage />);
  expect(html).toContain("GTEC Thodupuzha");
  expect(html).toContain("Coming soon");
});
