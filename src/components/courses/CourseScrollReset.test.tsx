import { describe, expect, test, vi, beforeEach, afterEach } from "vitest";
import { render } from "@testing-library/react";
import { CourseScrollReset } from "./CourseScrollReset";

let mockPathname = "/courses/tally-prime-gst";

vi.mock("next/navigation", () => ({
  usePathname: () => mockPathname,
}));

describe("CourseScrollReset", () => {
  const originalScrollTo = window.scrollTo;

  beforeEach(() => {
    mockPathname = "/courses/tally-prime-gst";
    window.scrollTo = vi.fn();
    window.location.hash = "";
    document.documentElement.scrollTop = 500;
    document.body.scrollTop = 500;
  });

  afterEach(() => {
    window.scrollTo = originalScrollTo;
    vi.restoreAllMocks();
  });

  test("scrolls window to (0, 0) and resets document scrollTop when mounted without hash", () => {
    window.location.hash = "";
    render(<CourseScrollReset />);

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: "instant",
    });
    expect(document.documentElement.scrollTop).toBe(0);
    expect(document.body.scrollTop).toBe(0);
  });

  test("does not reset scroll if hash is present (e.g. #admission-enquiry or #enquiry)", () => {
    window.location.hash = "#admission-enquiry";
    render(<CourseScrollReset />);

    expect(window.scrollTo).not.toHaveBeenCalled();
  });

  test("re-triggers scroll to top when pathname changes to a new course", () => {
    window.location.hash = "";
    const { rerender } = render(<CourseScrollReset />);

    expect(window.scrollTo).toHaveBeenCalledTimes(1);

    // Simulate navigating to another course
    mockPathname = "/courses/full-stack-web-development";
    rerender(<CourseScrollReset />);

    expect(window.scrollTo).toHaveBeenCalledTimes(2);
  });
});
