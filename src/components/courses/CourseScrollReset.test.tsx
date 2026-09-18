import { describe, expect, test, vi, beforeEach, afterEach } from "vitest";
import { render, act } from "@testing-library/react";
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
    window.history.scrollRestoration = "auto";
    document.documentElement.scrollTop = 500;
    document.body.scrollTop = 500;
    document.body.innerHTML = "";
  });

  afterEach(() => {
    window.scrollTo = originalScrollTo;
    document.body.innerHTML = "";
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

  test("scrolls to enquiry element when hash is present and element exists", () => {
    window.location.hash = "#enquiry";
    const enquiryEl = document.createElement("div");
    enquiryEl.id = "admission-enquiry";
    enquiryEl.scrollIntoView = vi.fn();
    document.body.appendChild(enquiryEl);

    render(<CourseScrollReset />);

    expect(enquiryEl.scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "start",
    });
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

  test("handles hashchange events dynamically", () => {
    window.location.hash = "";
    render(<CourseScrollReset />);

    const admissionEl = document.createElement("div");
    admissionEl.id = "admission-enquiry";
    admissionEl.scrollIntoView = vi.fn();
    document.body.appendChild(admissionEl);

    act(() => {
      window.location.hash = "#admission-enquiry";
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    });

    expect(admissionEl.scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "start",
    });
  });

  test("sets history.scrollRestoration to manual", () => {
    render(<CourseScrollReset />);
    expect(window.history.scrollRestoration).toBe("manual");
  });
});


