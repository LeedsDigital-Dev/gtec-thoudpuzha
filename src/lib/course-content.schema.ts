import { z } from "zod";

const STRING_FIELD_MAX = 5000;

const optionalString = z
  .string()
  .max(STRING_FIELD_MAX, "Must be at most 5000 characters")
  .optional()
  .or(z.literal(""));

const CourseListItemSchema = z.object({
  code: z.string().min(1, "Course code is required").max(200),
  name: z.string().min(1, "Course name is required").max(500),
});

const CourseListBlockSchema = z.object({
  type: z.literal("course_list"),
  heading: z.string().min(1, "Heading is required").max(500),
  items: z
    .array(CourseListItemSchema)
    .min(1, "At least one course item is required"),
});

const BenefitsItemSchema = z.object({
  textEn: z.string().min(1, "English text is required").max(1000),
  textMl: z.string().max(1000).optional().or(z.literal("")),
});

const BenefitsBlockSchema = z.object({
  type: z.literal("benefits"),
  heading: z.string().max(500).optional().or(z.literal("")),
  items: z
    .array(BenefitsItemSchema)
    .min(1, "At least one benefit item is required"),
});

export const CourseContentSchema = z.object({
  heroTaglineEn: optionalString,
  heroTaglineMl: optionalString,
  overviewEn: optionalString,
  overviewMl: optionalString,
  detailedContentEn: optionalString,
  detailedContentMl: optionalString,
  detailedContentImageUrl: z.string().max(2000).optional().or(z.literal("")),
  courseLists: z.array(CourseListBlockSchema).default([]),
  benefits: BenefitsBlockSchema.optional(),
});

export type ValidatedCourseContent = z.infer<typeof CourseContentSchema>;
