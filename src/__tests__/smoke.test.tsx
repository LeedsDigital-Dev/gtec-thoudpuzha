import { expect, test } from "vitest";
import { renderToString } from "react-dom/server";
import HomePage from "@/app/(public)/page";
import PortalDashboardPage from "@/app/(portal)/dashboard/page";
import AdminDashboardPage from "@/app/(admin)/admin/page";

test("homepage renders without throwing", () => {
  expect(() => renderToString(<HomePage />)).not.toThrow();
});

test("(public) route group renders placeholder text", () => {
  const html = renderToString(<HomePage />);
  expect(html).toContain("GTEC Thodupuzha");
  expect(html).toContain("Coming soon");
});

test("(portal) route group renders placeholder text", () => {
  const html = renderToString(<PortalDashboardPage />);
  expect(html).toContain("Portal");
  expect(html).toContain("Coming soon");
});

test("(admin) route group renders placeholder text", () => {
  const html = renderToString(<AdminDashboardPage />);
  expect(html).toContain("Admin");
  expect(html).toContain("Coming soon");
});
