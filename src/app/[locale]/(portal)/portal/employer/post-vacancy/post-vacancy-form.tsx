"use client";

import { useState, useCallback, useRef } from "react";
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
import { SkillMultiSelect } from "@/components/shared/SkillMultiSelect";
import { createPENDINGSkill } from "@/lib/skills";
import type { SkillDto } from "@/lib/skills";
import { submitVacancy } from "./actions";

type PostVacancyFormProps = {
  skills: SkillDto[];
};

const JOB_TYPES = [
  { value: "FULL_TIME", label: "Full Time" },
  { value: "PART_TIME", label: "Part Time" },
  { value: "CONTRACT", label: "Contract" },
] as const;

export function PostVacancyForm({ skills }: PostVacancyFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [salaryVisibility, setSalaryVisibility] = useState("PRIVATE");
  const [jobType, setJobType] = useState("");
  const [selectedSkillIds, setSelectedSkillIds] = useState<string[]>([]);
  const [applicationDeadline, setApplicationDeadline] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitting(true);
      setError("");

      const fd = new FormData(formRef.current ?? undefined);
      fd.set("skillIds", JSON.stringify(selectedSkillIds));

      try {
        const result = await submitVacancy(fd);
        if (result && !result.success) {
          setError(result.error);
          setSubmitting(false);
        }
      } catch {
        setError("Something went wrong. Please try again.");
        setSubmitting(false);
      }
    },
    [selectedSkillIds],
  );

  return (
    <div className="mx-auto max-w-2xl p-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-semibold">Post a Vacancy</h1>
        <p className="text-gray-600">
          Fill in the details below to publish a new job posting.
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

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div className="space-y-1.5">
          <Label htmlFor="title">Job Title *</Label>
          <Input
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={submitting}
          />
        </div>

        {/* Department */}
        <div className="space-y-1.5">
          <Label htmlFor="department">Department</Label>
          <Input
            id="department"
            name="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            disabled={submitting}
          />
        </div>

        {/* Job Type */}
        <div className="space-y-1.5">
          <Label htmlFor="jobType">Job Type *</Label>
          <Select
            value={jobType}
            onValueChange={(v) => setJobType(v ?? "")}
            disabled={submitting}
            name="jobType"
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select job type..." />
            </SelectTrigger>
            <SelectContent>
              {JOB_TYPES.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Salary Range */}
        <div className="space-y-1.5">
          <Label>Salary Range</Label>
          <div className="flex items-center gap-2">
            <Input
              id="salaryMin"
              name="salaryMin"
              type="number"
              placeholder="Min"
              value={salaryMin}
              onChange={(e) => setSalaryMin(e.target.value)}
              disabled={submitting}
            />
            <span className="text-muted-foreground">-</span>
            <Input
              id="salaryMax"
              name="salaryMax"
              type="number"
              placeholder="Max"
              value={salaryMax}
              onChange={(e) => setSalaryMax(e.target.value)}
              disabled={submitting}
            />
          </div>
        </div>

        {/* Salary Visibility Toggle */}
        <fieldset className="space-y-1.5">
          <span className="text-sm leading-none font-medium select-none">
            Salary Visibility
          </span>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="salaryVisibility"
                value="DISCLOSE"
                checked={salaryVisibility === "DISCLOSE"}
                onChange={() => setSalaryVisibility("DISCLOSE")}
                className="accent-blue-600"
                disabled={submitting}
              />
              Disclose to applicants
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="salaryVisibility"
                value="PRIVATE"
                checked={salaryVisibility === "PRIVATE"}
                onChange={() => setSalaryVisibility("PRIVATE")}
                className="accent-blue-600"
                disabled={submitting}
              />
              Keep private
            </label>
          </div>
        </fieldset>

        {/* Skills */}
        <div className="space-y-1.5">
          <Label>Skills</Label>
          <input type="hidden" name="skillIds" value={JSON.stringify(selectedSkillIds)} />
          <SkillMultiSelect
            skills={skills}
            selectedIds={selectedSkillIds}
            onChange={setSelectedSkillIds}
            onAddNewSkill={createPENDINGSkill}
          />
        </div>

        {/* Application Deadline */}
        <div className="space-y-1.5">
          <Label htmlFor="applicationDeadline">Application Deadline *</Label>
          <Input
            id="applicationDeadline"
            name="applicationDeadline"
            type="date"
            value={applicationDeadline}
            onChange={(e) => setApplicationDeadline(e.target.value)}
            required
            disabled={submitting}
          />
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <Label htmlFor="description">Job Description *</Label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            disabled={submitting}
            className="h-32 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 resize-y"
            data-slot="input"
          />
        </div>

        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? "Submitting..." : "Post Vacancy"}
        </Button>
      </form>
    </div>
  );
}
