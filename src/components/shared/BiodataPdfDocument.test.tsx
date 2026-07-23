import { describe, expect, test } from "vitest";
import { renderToBuffer } from "@react-pdf/renderer";
import { BiodataPdfDocument } from "./BiodataPdfDocument";
import type { BiodataPdfData } from "./BiodataPdfDocument";

const completeData: BiodataPdfData = {
  fullName: "John Doe",
  dateOfBirth: "2000-01-15",
  phone: "9876543210",
  email: "john@example.com",
  courseCompletedNames: ["Python Full Stack Development", "Data Science"],
  certificationCodes: ["AWS", "Google Cloud"],
  educationalQualification: "Graduate",
  yearOfPassing: 2022,
  address: "123 Main St, Kochi, Kerala",
  languagesKnown: ["English", "Malayalam", "Hindi"],
  skillLabels: ["JavaScript", "Python", "React"],
  preferredJobLocation: "Bangalore",
  preferredJobType: "Full Time",
  careerObjective: "Looking for challenging opportunities in software development",
};

const incompleteData: BiodataPdfData = {
  fullName: "Jane Smith",
  dateOfBirth: null,
  phone: null,
  email: null,
  courseCompletedNames: [],
  certificationCodes: [],
  educationalQualification: null,
  yearOfPassing: null,
  address: null,
  languagesKnown: [],
  skillLabels: [],
  preferredJobLocation: null,
  preferredJobType: null,
  careerObjective: null,
};

describe("BiodataPdfDocument", () => {
  test("generates a valid PDF buffer for a complete profile", async () => {
    const buffer = await renderToBuffer(
      <BiodataPdfDocument data={completeData} />,
    );

    expect(buffer).toBeInstanceOf(Buffer);
    expect(buffer.length).toBeGreaterThan(100);

    const header = buffer.slice(0, 8).toString("utf8");
    expect(header).toBe("%PDF-1.3");
  });

  test("generates a PDF without throwing for an incomplete profile", async () => {
    const buffer = await renderToBuffer(
      <BiodataPdfDocument data={incompleteData} />,
    );

    expect(buffer).toBeInstanceOf(Buffer);
    expect(buffer.length).toBeGreaterThan(100);

    const header = buffer.slice(0, 8).toString("utf8");
    expect(header).toBe("%PDF-1.3");
  });
});
