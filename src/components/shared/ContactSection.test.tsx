import { describe, expect, test } from "vitest";
import { renderToString } from "react-dom/server";
import { render, screen, fireEvent } from "@testing-library/react";
import { ContactSection } from "./ContactSection";

const baseSettings = {
  address: "123 Main St, Thodupuzha",
  mapEmbedUrl: "https://maps.google.com/embed?pb=test123",
  facebookUrl: "https://facebook.com/gtec",
  instagramUrl: null,
  youtubeUrl: "https://youtube.com/@gtec",
  linkedinUrl: null,
  googleReviewsUrl: "https://g.page/gtec/review",
};

describe("ContactSection", () => {
  test("the Google Map iframe renders using the configured embed URL", () => {
    const html = renderToString(<ContactSection settings={baseSettings} />);
    expect(html).toContain(baseSettings.mapEmbedUrl);
    expect(html).toContain('data-testid="google-map-iframe"');
  });

  test('clicking "Send us a message" opens the EnquiryForm modal with source="contact_page"', () => {
    render(<ContactSection settings={baseSettings} />);

    // Modal should not be visible initially
    expect(screen.queryByRole("dialog")).toBeNull();

    // Click the button
    const btn = screen.getByRole("button", { name: /send us a message/i });
    fireEvent.click(btn);

    // Modal should appear with the enquiry form using contact_page
    const dialog = screen.getByRole("dialog", { name: /enquiry form/i });
    expect(dialog).toBeTruthy();

    // The form should have source="contact_page" — check the aria-label
    const form = screen.getByLabelText(/contact_page/i);
    expect(form).toBeTruthy();
  });
});
