import { vi, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

afterEach(cleanup);

vi.mock("next-intl/middleware", () => ({
  default: vi.fn(
    (routing: { locales: string[]; defaultLocale: string }) =>
      (req: { nextUrl: { pathname: string }; url: string }) => {
        const firstSegment = req.nextUrl.pathname.split("/")[1];
        const hasLocale = routing.locales.includes(firstSegment);

        if (!hasLocale) {
          const redirectUrl = new URL(req.url);
          const path = req.nextUrl.pathname;
          redirectUrl.pathname = `/${routing.defaultLocale}${path === "/" ? "" : path}`;
          return new Response(null, {
            status: 307,
            headers: { Location: redirectUrl.toString() },
          });
        }

        return new Response(null, { status: 200 });
      },
  ),
}));
