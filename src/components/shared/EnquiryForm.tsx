"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { submitEnquiry, type EnquiryPayload } from "@/lib/enquiry";
import { CourseSelect } from "./CourseSelect";
import type { PublicCourse } from "@/lib/courses";
export type { EnquiryPayload };

type EnquiryFormProps = {
  source: string;
  courses: PublicCourse[];
  onSubmit?: (payload: EnquiryPayload) => void | Promise<void>;
};

type FormErrors = {
  fullName?: string;
  phone?: string;
  course?: string;
};

function indianMobileRegex() {
  return /^[6-9]\d{9}$/;
}

function sanitizePhone(value: string) {
  return value.replace(/\D/g, "").slice(0, 10);
}

export function EnquiryForm({ source, courses, onSubmit }: EnquiryFormProps) {
  const t = useTranslations("enquiry");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [course, setCourse] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const resetForm = useCallback(() => {
    setFullName("");
    setPhone("");
    setCourse("");
    setMessage("");
    setErrors({});
  }, []);

  const validate = useCallback((): boolean => {
    const nextErrors: FormErrors = {};

    if (!fullName.trim()) {
      nextErrors.fullName = t("validationNameRequired");
    }

    if (!phone) {
      nextErrors.phone = t("validationPhoneRequired");
    } else if (!indianMobileRegex().test(phone)) {
      nextErrors.phone = t("validationPhoneInvalid");
    }

    if (!course) {
      nextErrors.course = t("validationCourseRequired");
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }, [fullName, phone, course, t]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setStatus("idle");

      if (!validate()) {
        return;
      }

      const payload: EnquiryPayload = {
        source,
        fullName: fullName.trim(),
        phone,
        course,
        message: message.trim(),
      };

      try {
        setStatus("submitting");
        if (onSubmit) {
          await onSubmit(payload);
        } else {
          await submitEnquiry(payload);
        }
        setStatus("success");
        resetForm();
      } catch {
        setStatus("error");
      }
    },
    [source, fullName, phone, course, message, validate, onSubmit, resetForm],
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-2xl border bg-card p-6 shadow-md"
      aria-label={`Enquiry form${source ? ` — ${source}` : ""}`}
      noValidate
    >
      <div>
        <h2 className="text-xl font-semibold">{t("heading")}</h2>
        <p className="text-sm text-muted-foreground">
          {t("description")}
        </p>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor={`enquiry-fullName-${source}`}>{t("fullName")}</Label>
        <Input
          id={`enquiry-fullName-${source}`}
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          aria-invalid={errors.fullName ? "true" : "false"}
          aria-describedby={errors.fullName ? `enquiry-fullName-${source}-error` : undefined}
          placeholder={t("fullNamePlaceholder")}
          required
        />
        {errors.fullName && (
          <p id={`enquiry-fullName-${source}-error`} className="text-sm text-destructive">
            {errors.fullName}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor={`enquiry-phone-${source}`}>{t("phoneNumber")}</Label>
        <Input
          id={`enquiry-phone-${source}`}
          type="tel"
          inputMode="tel"
          value={phone}
          onChange={(e) => setPhone(sanitizePhone(e.target.value))}
          aria-invalid={errors.phone ? "true" : "false"}
          aria-describedby={errors.phone ? `enquiry-phone-${source}-error` : undefined}
          placeholder={t("phonePlaceholder")}
          required
        />
        {errors.phone && (
          <p id={`enquiry-phone-${source}-error`} className="text-sm text-destructive">
            {errors.phone}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor={`enquiry-course-${source}`}>{t("courseInterested")}</Label>
        <CourseSelect
          courses={courses}
          mode="single"
          value={course}
          onChange={(v: string | string[]) => { if (typeof v === "string") setCourse(v); }}
          id={`enquiry-course-${source}`}
          error={errors.course}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor={`enquiry-message-${source}`}>{t("messageQuery")}</Label>
        <textarea
          id={`enquiry-message-${source}`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          placeholder={t("messagePlaceholder")}
          className="w-full resize-none rounded-lg border border-input bg-transparent px-2.5 py-1.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        />
      </div>

      {status === "success" && (
        <div className="rounded-lg bg-primary/10 p-3 text-sm text-primary dark:bg-primary/20 dark:text-primary-foreground">
          {t("success")}
        </div>
      )}
      {status === "error" && (
        <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
          {t("error")}
        </div>
      )}

      <Button type="submit" disabled={status === "submitting"} className="w-full">
        {status === "submitting" ? t("submitting") : t("submit")}
      </Button>
    </form>
  );
}
