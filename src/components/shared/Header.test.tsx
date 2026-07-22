import { describe, expect, test, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Header } from "./Header";
import PublicLayout from "@/app/[locale]/(public)/layout";
import PortalLayout from "@/app/[locale]/(portal)/layout";
import AdminLayout from "@/app/[locale]/(admin)/layout";
import { siteConfig } from "@/lib/site";

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("next-intl", async () => {
  const actual = await vi.importActual<typeof import("next-intl")>(
    "next-intl",
  );
  return {
    ...actual,
    useLocale: vi.fn(() => "en"),
  };
});

vi.mock("@/lib/i18n/navigation", () => ({
  usePathname: vi.fn(() => "/"),
  Link: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("Header", () => {
  test("renders all four CTA buttons with correct hrefs", () => {
    render(<Header />);

    expect(screen.getByLabelText("WhatsApp")).toHaveAttribute(
      "href",
      `https://wa.me/${siteConfig.whatsappNumber}`,
    );
    expect(screen.getByLabelText("Call Now")).toHaveAttribute(
      "href",
      `tel:${siteConfig.phoneNumber}`,
    );
    expect(screen.getByLabelText("Apply Now")).toHaveAttribute(
      "href",
      "/en/#enquiry",
    );
    expect(screen.getByLabelText("Login")).toHaveAttribute(
      "href",
      "/en/sign-in",
    );
  });

  test("mobile hamburger menu toggles nav visibility on click", () => {
    render(<Header />);

    expect(
      screen.queryByLabelText("Mobile navigation"),
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Open menu"));
    expect(screen.getByLabelText("Mobile navigation")).toBeInTheDocument();
    expect(screen.getByText("Resources")).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Close menu"));
    expect(
      screen.queryByLabelText("Mobile navigation"),
    ).not.toBeInTheDocument();
  });
});

describe("Header layout presence", () => {
  test("Header is present on a (public) page", () => {
    render(
      <PublicLayout>
        <main>Public page content</main>
      </PublicLayout>,
    );

    expect(screen.getByText("G-TEC")).toBeInTheDocument();
    expect(screen.getByText(siteConfig.centreName)).toBeInTheDocument();
  });

  test("Header does not render inside a (portal) placeholder page", () => {
    render(
      <PortalLayout>
        <main>Portal page content</main>
      </PortalLayout>,
    );

    expect(screen.queryByText("G-TEC")).not.toBeInTheDocument();
    expect(screen.queryByText(siteConfig.centreName)).not.toBeInTheDocument();
  });

  test("Header does not render inside an (admin) placeholder page", () => {
    render(
      <AdminLayout>
        <main>Admin page content</main>
      </AdminLayout>,
    );

    expect(screen.queryByText("G-TEC")).not.toBeInTheDocument();
    expect(screen.queryByText(siteConfig.centreName)).not.toBeInTheDocument();
  });
});
