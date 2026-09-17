import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { HeroVisualCollage } from "./HeroVisualCollage";

describe("HeroVisualCollage", () => {
  it("renders all 3 technology images in the composition", () => {
    render(<HeroVisualCollage />);

    // 1. Main focal image (hero-main-tech.jpg)
    const mainImage = screen.getByAltText(/Professional executive and tech learner/i);
    expect(mainImage).toBeInTheDocument();
    expect(mainImage).toHaveAttribute("src", expect.stringContaining("hero-main-tech.jpg"));

    // 2. AI student image (hero-ai-student.jpg)
    const aiStudentImage = screen.getByAltText(/Student exploring artificial intelligence/i);
    expect(aiStudentImage).toBeInTheDocument();
    expect(aiStudentImage).toHaveAttribute("src", expect.stringContaining("hero-ai-student.jpg"));

    // 3. Coding student image (courses/hero-ai-student.jpg.jpg)
    const codingImage = screen.getByAltText(/Hands-on coding and software education/i);
    expect(codingImage).toBeInTheDocument();
    expect(codingImage).toHaveAttribute("src", expect.stringContaining("hero-ai-student.jpg.jpg"));
  });

  it("does not render any Google Reviews or rating badges", () => {
    render(<HeroVisualCollage />);

    expect(screen.queryByText(/Google Reviews/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/4\.9\/5/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Rating/i)).not.toBeInTheDocument();
  });
});
