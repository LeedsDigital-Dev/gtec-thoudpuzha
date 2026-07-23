import { vi, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

afterEach(cleanup);

// Load en.json for test translation mocks so existing string assertions still work
import enMessages from "@/lib/i18n/en.json";

function lookup(namespace: string, key: string, values?: Record<string, string>): string {
  const ns = (enMessages as Record<string, Record<string, string>>)[namespace];
  let msg = ns?.[key] ?? key;
  if (values) {
    for (const [k, v] of Object.entries(values)) {
      msg = msg.replace(`{${k}}`, v);
    }
  }
  return msg;
}

vi.mock("next-intl/server", async (importOriginal) => {
  const mod = await importOriginal<typeof import("next-intl/server")>();
  return {
    ...mod,
    getLocale: vi.fn(() => Promise.resolve("en")),
    getTranslations: vi.fn(
      (namespace: string) =>
        Promise.resolve(
          (key: string, values?: Record<string, string>) =>
            lookup(namespace, key, values),
        ),
    ),
  };
});

vi.mock("next-intl", async (importOriginal) => {
  const mod = await importOriginal<typeof import("next-intl")>();
  return {
    ...mod,
    useLocale: vi.fn(() => "en"),
    useTranslations: vi.fn(
      (namespace: string) =>
        (key: string, values?: Record<string, string>) =>
          lookup(namespace, key, values),
    ),
  };
});

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
