"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { submitEmployerRegistration } from "./actions";

const SECTORS = [
  { value: "IT_SOFTWARE", label: "IT / Software" },
  { value: "EDUCATION_TRAINING", label: "Education / Training" },
  { value: "HEALTHCARE", label: "Healthcare" },
  { value: "BANKING_FINANCE", label: "Banking / Finance" },
  { value: "MANUFACTURING", label: "Manufacturing" },
  { value: "RETAIL", label: "Retail" },
  { value: "HOSPITALITY", label: "Hospitality" },
  { value: "CONSTRUCTION", label: "Construction" },
  { value: "TELECOMMUNICATION", label: "Telecommunication" },
  { value: "OTHER", label: "Other" },
] as const;

const EMPLOYEE_RANGES = [
  { value: "RANGE_1_10", label: "1-10" },
  { value: "RANGE_11_50", label: "11-50" },
  { value: "RANGE_51_200", label: "51-200" },
  { value: "RANGE_200_PLUS", label: "200+" },
] as const;

export function RegistrationForm() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [companyName, setCompanyName] = useState("");
  const [industrySector, setIndustrySector] = useState("");
  const [contactPersonName, setContactPersonName] = useState("");
  const [designation, setDesignation] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [hasWebsite, setHasWebsite] = useState<"yes" | "no" | "">("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [employeeCountRange, setEmployeeCountRange] = useState("");
  const [aboutCompany, setAboutCompany] = useState("");

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitting(true);
      setError("");

      const fd = new FormData();
      fd.set("companyName", companyName);
      fd.set("industrySector", industrySector);
      fd.set("contactPersonName", contactPersonName);
      fd.set("designation", designation);
      fd.set("phone", phone);
      fd.set("email", email);
      fd.set("companyAddress", companyAddress);
      fd.set("hasWebsite", hasWebsite);
      if (hasWebsite === "yes") {
        fd.set("websiteUrl", websiteUrl);
      }
      fd.set("employeeCountRange", employeeCountRange);
      fd.set("aboutCompany", aboutCompany);

      try {
        const result = await submitEmployerRegistration(fd);
        if (result && !result.success) {
          setError(result.error);
          setSubmitting(false);
        }
      } catch {
        setError("Something went wrong. Please try again.");
        setSubmitting(false);
      }
    },
    [
      companyName,
      industrySector,
      contactPersonName,
      designation,
      phone,
      email,
      companyAddress,
      hasWebsite,
      websiteUrl,
      employeeCountRange,
      aboutCompany,
    ],
  );

  return (
    <div className="mx-auto max-w-2xl p-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-semibold">Employer Registration</h1>
        <p className="text-gray-600">
          Register your company to post vacancies and find candidates.
        </p>
      </div>

      {error && (
        <div
          className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800"
          role="alert"
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Company Name */}
        <div className="space-y-1.5">
          <Label htmlFor="companyName">Company Name *</Label>
          <Input
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
            disabled={submitting}
          />
        </div>

        {/* Industry Sector */}
        <div className="space-y-1.5">
          <Label htmlFor="industrySector">Industry / Sector *</Label>
          <Select
            value={industrySector}
            onValueChange={(v) => setIndustrySector(v ?? "")}
            disabled={submitting}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select industry..." />
            </SelectTrigger>
            <SelectContent>
              {SECTORS.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Contact Person Name */}
        <div className="space-y-1.5">
          <Label htmlFor="contactPersonName">Contact Person Name *</Label>
          <Input
            id="contactPersonName"
            value={contactPersonName}
            onChange={(e) => setContactPersonName(e.target.value)}
            required
            disabled={submitting}
          />
        </div>

        {/* Designation */}
        <div className="space-y-1.5">
          <Label htmlFor="designation">Designation *</Label>
          <Input
            id="designation"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            required
            disabled={submitting}
          />
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone *</Label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            disabled={submitting}
          />
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={submitting}
          />
        </div>

        {/* Company Address */}
        <div className="space-y-1.5">
          <Label htmlFor="companyAddress">Company Address *</Label>
          <Input
            id="companyAddress"
            value={companyAddress}
            onChange={(e) => setCompanyAddress(e.target.value)}
            required
            disabled={submitting}
          />
        </div>

        {/* Website - radio group */}
        <fieldset className="space-y-1.5">
          <span className="flex items-center gap-2 text-sm leading-none font-medium select-none">
            Website *
          </span>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="hasWebsite"
                value="yes"
                checked={hasWebsite === "yes"}
                onChange={() => setHasWebsite("yes")}
                className="accent-blue-600"
                disabled={submitting}
              />
              Add link
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="hasWebsite"
                value="no"
                checked={hasWebsite === "no"}
                onChange={() => {
                  setHasWebsite("no");
                  setWebsiteUrl("");
                }}
                className="accent-blue-600"
                disabled={submitting}
              />
              No website
            </label>
          </div>
        </fieldset>

        {/* Website URL (shown only when "yes" is selected) */}
        {hasWebsite === "yes" && (
          <div className="space-y-1.5">
            <Label htmlFor="websiteUrl">Website URL *</Label>
            <Input
              id="websiteUrl"
              type="url"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              placeholder="https://example.com"
              required
              disabled={submitting}
            />
          </div>
        )}

        {/* Employee Count Range */}
        <div className="space-y-1.5">
          <Label htmlFor="employeeCountRange">Number of Employees *</Label>
          <Select
            value={employeeCountRange}
            onValueChange={(v) => setEmployeeCountRange(v ?? "")}
            disabled={submitting}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select range..." />
            </SelectTrigger>
            <SelectContent>
              {EMPLOYEE_RANGES.map((r) => (
                <SelectItem key={r.value} value={r.value}>
                  {r.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* About Company */}
        <div className="space-y-1.5">
          <Label htmlFor="aboutCompany">About Company *</Label>
          <textarea
            id="aboutCompany"
            value={aboutCompany}
            onChange={(e) => setAboutCompany(e.target.value)}
            required
            disabled={submitting}
            className="h-24 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 resize-y"
            data-slot="input"
          />
        </div>

        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? "Submitting..." : "Register"}
        </Button>
      </form>
    </div>
  );
}
