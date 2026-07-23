import { describe, expect, test, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { renderToString } from "react-dom/server";
import { NextIntlClientProvider, useTranslations } from "next-intl";
import type { Mock } from "vitest";
import middleware from "@/middleware";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import mlMessages from "@/lib/i18n/ml.json";

const mockAuthResult = vi.hoisted(() => ({
  userId: null as string | null,
  sessionClaims: undefined as { metadata?: { role?: string } } | undefined,
}));

const mockAuth = vi.hoisted(() => vi.fn(() => Promise.resolve(mockAuthResult)));

const mockCreateRouteMatcher = vi.hoisted(
  () => (patterns: string[]) => (req: { url: string }) => {
    const pathname = new URL(req.url).pathname;
    return patterns.some((pattern) => {
      const segments = pattern.split("/").filter(Boolean);
      const regexSegments = segments.map((segment) => {
        if (segment === ":locale") return "(?:en|ml)";
        if (segment === "(.*)") return ".*";
        return segment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      });
      return new RegExp(`^/${regexSegments.join("/")}$`).test(pathname);
    });
  },
);

const mockClerkMiddleware = vi.hoisted(
  () =>
    (
      handler: (
        authFn: () => Promise<typeof mockAuthResult>,
        req: NextRequest,
      ) => Promise<Response | undefined>,
    ) =>
      async (req: NextRequest) => {
        return handler(mockAuth, req);
      },
);

vi.mock("@clerk/nextjs/server", () => ({
  auth: mockAuth,
  createRouteMatcher: mockCreateRouteMatcher,
  clerkMiddleware: mockClerkMiddleware,
}));

vi.mock("next-intl", async () => {
  const actual = await vi.importActual<typeof import("next-intl")>("next-intl");
  return {
    ...actual,
    useLocale: vi.fn(),
  };
});

vi.mock("@/lib/i18n/navigation", () => ({
  usePathname: vi.fn(),
}));

function makeRequest(path: string) {
  return new NextRequest(new URL(`https://example.com${path}`));
}

describe("i18n routing middleware", () => {
  beforeEach(() => {
    mockAuthResult.userId = null;
    mockAuthResult.sessionClaims = undefined;
    vi.clearAllMocks();
  });

  test("1. visiting / redirects to /en as the default locale", async () => {
    const req = makeRequest("/");
    const response = await middleware(req);
    expect(response?.status).toBe(307);
    expect(response?.headers.get("Location")).toBe("https://example.com/en");
  });

  test("2. visiting /ml passes through without redirecting to /en", async () => {
    const req = makeRequest("/ml");
    const response = await middleware(req);
    expect(response).toBeUndefined();
  });
});

describe("i18n auth middleware regression", () => {
  beforeEach(() => {
    mockAuthResult.userId = null;
    mockAuthResult.sessionClaims = undefined;
    vi.clearAllMocks();
  });

  test("4. unauthenticated /en/portal redirects to /en/sign-in", async () => {
    const req = makeRequest("/en/portal");
    const response = await middleware(req);
    expect(response?.status).toBe(307);
    const location = response?.headers.get("Location") ?? "";
    expect(location).toContain("/en/sign-in");
    expect(location).toContain("redirect_url=");
  });

  test("4b. unauthenticated /ml/admin redirects to /ml/sign-in", async () => {
    const req = makeRequest("/ml/admin");
    const response = await middleware(req);
    expect(response?.status).toBe(307);
    const location = response?.headers.get("Location") ?? "";
    expect(location).toContain("/ml/sign-in");
    expect(location).toContain("redirect_url=");
  });
});

describe("Malayalam dictionary rendering", () => {
  test("2. renders a known Malayalam placeholder string from ml.json", () => {
    function TestMessage() {
      const t = useTranslations("common");
      return <span>{t("loading")}</span>;
    }

    const html = renderToString(
      <NextIntlClientProvider locale="ml" messages={mlMessages}>
        <TestMessage />
      </NextIntlClientProvider>,
    );

    expect(html).toContain("ലോഡ് ചെയ്യുന്നു");
  });
});

describe("LanguageSwitcher", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("3. toggles /en/courses to /ml/courses", async () => {
    const { useLocale } = await import("next-intl");
    const { usePathname } = await import("@/lib/i18n/navigation");

    (useLocale as Mock).mockReturnValue("en");
    (usePathname as Mock).mockReturnValue("/courses");

    const html = renderToString(<LanguageSwitcher />);
    expect(html).toContain('href="/ml/courses"');
    expect(html).toContain('hrefLang="ml"');
  });

  test("3b. toggles /ml/courses/abc to /en/courses/abc", async () => {
    const { useLocale } = await import("next-intl");
    const { usePathname } = await import("@/lib/i18n/navigation");

    (useLocale as Mock).mockReturnValue("ml");
    (usePathname as Mock).mockReturnValue("/courses/abc");

    const html = renderToString(<LanguageSwitcher />);
    expect(html).toContain('href="/en/courses/abc"');
    expect(html).toContain('hrefLang="en"');
  });
});
