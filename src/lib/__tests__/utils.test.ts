import { describe, expect, test } from "vitest";
import { isRouteActive } from "../utils";

describe("isRouteActive", () => {
  const allHrefs = [
    "/admin",
    "/admin/students",
    "/admin/students/course-enrollment",
    "/admin/courses",
    "/admin/enquiries",
  ];

  test("exact matches return true", () => {
    expect(isRouteActive("/admin/students", "/admin/students", allHrefs)).toBe(true);
    expect(isRouteActive("/admin/students/course-enrollment", "/admin/students/course-enrollment", allHrefs)).toBe(true);
  });

  test("prevents parent route (/admin/students) from matching when a more specific route (/admin/students/course-enrollment) is active", () => {
    expect(isRouteActive("/admin/students", "/admin/students/course-enrollment", allHrefs)).toBe(false);
    expect(isRouteActive("/admin/students/course-enrollment", "/admin/students/course-enrollment", allHrefs)).toBe(true);
  });

  test("matches subpaths of a specific route when no longer matching route exists", () => {
    // /admin/students/cmry123 (student detail page) should match /admin/students, not /admin or /admin/students/course-enrollment
    expect(isRouteActive("/admin/students", "/admin/students/cmry123", allHrefs)).toBe(true);
    expect(isRouteActive("/admin", "/admin/students/cmry123", allHrefs)).toBe(false);
    expect(isRouteActive("/admin/students/course-enrollment", "/admin/students/cmry123", allHrefs)).toBe(false);
  });

  test("root route /admin only matches /admin or /admin/", () => {
    expect(isRouteActive("/admin", "/admin", allHrefs)).toBe(true);
    expect(isRouteActive("/admin", "/admin/", allHrefs)).toBe(true);
    expect(isRouteActive("/admin", "/admin/courses", allHrefs)).toBe(false);
  });
});
