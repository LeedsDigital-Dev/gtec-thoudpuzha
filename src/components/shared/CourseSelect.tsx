"use client";

import type { PublicCourse } from "@/lib/courses";

type CourseSelectProps = {
  courses: PublicCourse[];
  mode: "single" | "multi";
  value: string | string[];
  onChange: (value: string | string[]) => void;
  id?: string;
  error?: string;
};

export function CourseSelect({
  courses,
  mode,
  value,
  onChange,
  id,
  error,
}: CourseSelectProps) {
  if (mode === "multi") {
    const selected = (value as string[]) ?? [];
    return (
      <fieldset>
        <div className="space-y-1.5">
          {courses.map((course) => (
            <label
              key={course.id}
              className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm has-[:checked]:border-primary has-[:checked]:bg-primary/5"
            >
              <input
                type="checkbox"
                value={course.id}
                checked={selected.includes(course.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    onChange([...selected, course.id]);
                  } else {
                    onChange(selected.filter((id) => id !== course.id));
                  }
                }}
                className="size-4 accent-primary"
              />
              {course.titleEn}
            </label>
          ))}
        </div>
        {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
      </fieldset>
    );
  }

  return (
    <div>
      <select
        id={id}
        value={value as string}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${id}-error` : undefined}
        className="h-9 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        required
      >
        <option value="" disabled>
          Select a course
        </option>
        {courses.map((course) => (
          <option key={course.id} value={course.id}>
            {course.titleEn}
          </option>
        ))}
      </select>
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
