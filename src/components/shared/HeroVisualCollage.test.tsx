import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { HeroVisualCollage } from "./HeroVisualCollage";

describe("HeroVisualCollage", () => {
  it("renders all 3 technology images in the composition", () => {
    render(<HeroVisualCollage />);

    // 1. Main focal image
    const mainImage = screen.getByAltText(/Professional executive and tech learner/i);
    expect(mainImage).toBeInTheDocument();
    expect(mainImage).toHaveAttribute("src", expect.stringContaining("hero-main-tech.jpg"));

    // 2. AI student image
    const aiStudentImage = screen.getByAltText(/Student exploring artificial intelligence/i);
    expect(aiStudentImage).toBeInTheDocument();
    expect(aiStudentImage).toHaveAttribute("src", expect.stringContaining("hero-ai-student.jpg"));

    // 3. Analytics / coding image
    const analyticsImage = screen.getByAltText(/Data analytics and software technology interface/i);
    expect(analyticsImage).toBeInTheDocument();
    expect(analyticsImage).toHaveAttribute("src", expect.stringContaining("hero-analytics-code.jpg"));
  });

  it("does not render any Google Reviews or rating badges", () => {
    render(<HeroVisualCollage />);

    expect(screen.queryByText(/Google Reviews/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/4\.9\/5/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Rating/i)).not.toBeInTheDocument();
  });
});
