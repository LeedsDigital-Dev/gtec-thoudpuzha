"use client";

import { useState, useCallback } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { lookupStudentRecord, finalizeStudentVerification } from "./actions";

type Step = "form" | "verifying" | "otp" | "password" | "done" | "error";

const MIN_PASSWORD_LENGTH = 8;

function isValidPassword(password: string): boolean {
  return password.length >= MIN_PASSWORD_LENGTH;
}

export default function StudentSignUpPage() {
  const { signUp } = useSignUp();
  const t = useTranslations("studentVerification");

  const [step, setStep] = useState<Step>("form");
  const [studentId, setStudentId] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [alreadyLinked, setAlreadyLinked] = useState(false);
  const [studentRecordId, setStudentRecordId] = useState("");
  const [verifiedEmail, setVerifiedEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleLookup = useCallback(async () => {
    setSubmitting(true);
    setError("");

    try {
      const formData = new FormData();
      formData.set("studentId", studentId);
      formData.set("phone", phone);
      const result = await lookupStudentRecord(formData);

      if (!result.success) {
        setError(result.error);
        setAlreadyLinked("alreadyLinked" in result && result.alreadyLinked === true);
        setStep("error");
        return;
      }

      setStudentRecordId(result.studentRecordId);
      setVerifiedEmail(result.email);
      setStep("verifying");

      if (!signUp) {
        setError("Verification service is not ready. Please try again.");
        setStep("error");
        return;
      }

      let { error } = await signUp.create({ emailAddress: result.email });
      if (error) {
        setError(error.message);
        setStep("error");
        return;
      }

      ({ error } = await signUp.verifications.sendEmailCode());
      if (error) {
        setError(error.message);
        setStep("error");
        return;
      }

      setStep("otp");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(message);
      setStep("error");
    } finally {
      setSubmitting(false);
    }
  }, [studentId, phone, signUp]);

  const handleVerifyOtp = useCallback(
    async (code: string) => {
      if (!signUp) return;

      setSubmitting(true);
      setError("");

      try {
        const { error } = await signUp.verifications.verifyEmailCode({ code });

        if (error) {
          setError(error.message);
          return;
        }

        // Email is now verified. The Clerk instance also requires a
        // password before the SignUp can be finalized (confirmed via
        // signUp.missingFields === ["password"]) — this custom flow never
        // collects one, so ask for it now rather than failing at finalize().
        setStep("password");
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Verification failed. Please try again.";
        setError(message);
      } finally {
        setSubmitting(false);
      }
    },
    [signUp],
  );

  const handleSetPassword = useCallback(
    async (password: string) => {
      if (!signUp) return;

      if (!isValidPassword(password)) {
        setError(t("passwordTooShort", { minLength: MIN_PASSWORD_LENGTH }));
        return;
      }

      setSubmitting(true);
      setError("");

      try {
        // Clerk's `update()` deliberately excludes `password` in this SDK
        // version — `password()` is the dedicated method for setting it.
        // Email is already verified on this signUp attempt; re-supplying
        // it here is required by the method's signature, it does not
        // re-trigger verification.
        let { error } = await signUp.password({
          password,
          emailAddress: verifiedEmail,
        });
        if (error) {
          setError(error.message);
          return;
        }

        ({ error } = await signUp.finalize());
        if (error) {
          setError(error.message);
          return;
        }

        await finalizeStudentVerification(studentRecordId);
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Something went wrong. Please try again.";
        setError(message);
      } finally {
        setSubmitting(false);
      }
    },
    [signUp, studentRecordId, verifiedEmail, t],
  );

  if (step === "otp") {
    return <OtpForm onVerify={handleVerifyOtp} submitting={submitting} error={error} t={t} />;
  }

  if (step === "password") {
    return (
      <PasswordForm
        onSubmit={handleSetPassword}
        submitting={submitting}
        error={error}
        minLength={MIN_PASSWORD_LENGTH}
        t={t}
      />
    );
  }

  const isError = step === "error";

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="mb-2 text-3xl font-semibold">{t("heading")}</h1>
          <p className="text-gray-600">{t("description")}</p>
        </div>

        {isError && (
          <div
            className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800"
            role="alert"
          >
            <p>{error}</p>
            {!alreadyLinked && (
              <div className="mt-3 flex gap-3">
                <a
                  href="https://wa.me/yournumber"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-md bg-green-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-green-700"
                >
                  {t("whatsapp")}
                </a>
                <a
                  href="tel:+919999999999"
                  className="inline-flex items-center gap-1 rounded-md bg-gray-700 px-3 py-1.5 text-xs font-medium text-white hover:bg-gray-800"
                >
                  {t("callCentre")}
                </a>
              </div>
            )}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLookup();
          }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="studentId">{t("studentId")}</Label>
            <Input
              id="studentId"
              name="studentId"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder={t("studentIdPlaceholder")}
              required
              disabled={submitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">{t("phone")}</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t("phonePlaceholder")}
              required
              disabled={submitting}
            />
          </div>

          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? t("verifying") : t("verifyDetails")}
          </Button>
        </form>

        <p className="text-center text-xs text-gray-500">
          {t("noStudentId")}{" "}
          <Link href="/contact" className="underline">
            {t("contactCentre")}
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

function OtpForm({
  onVerify,
  submitting,
  error,
  t,
}: {
  onVerify: (code: string) => Promise<void>;
  submitting: boolean;
  error: string;
  t: (key: string) => string;
}) {
  const [code, setCode] = useState("");

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="mb-2 text-3xl font-semibold">{t("verifyYourEmail")}</h1>
          <p className="text-gray-600">{t("otpDescription")}</p>
        </div>

        {error && (
          <div
            className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800"
            role="alert"
          >
            {error}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onVerify(code);
          }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="otp">{t("verificationCode")}</Label>
            <Input
              id="otp"
              name="otp"
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="one-time-code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={t("otpPlaceholder")}
              required
              disabled={submitting}
            />
          </div>

          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? t("verifying") : t("verifyCode")}
          </Button>
        </form>
      </div>
    </div>
  );
}

function PasswordForm({
  onSubmit,
  submitting,
  error,
  minLength,
  t,
}: {
  onSubmit: (password: string) => Promise<void>;
  submitting: boolean;
  error: string;
  minLength: number;
  t: (key: string, values?: Record<string, string | number>) => string;
}) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mismatchError, setMismatchError] = useState("");

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="mb-2 text-3xl font-semibold">{t("setPasswordHeading")}</h1>
          <p className="text-gray-600">{t("setPasswordDescription")}</p>
        </div>

        {(error || mismatchError) && (
          <div
            className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800"
            role="alert"
          >
            {mismatchError || error}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setMismatchError("");
            if (password !== confirmPassword) {
              setMismatchError(t("passwordMismatch"));
              return;
            }
            onSubmit(password);
          }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="password">{t("password")}</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={minLength}
              required
              disabled={submitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">{t("confirmPassword")}</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              minLength={minLength}
              required
              disabled={submitting}
            />
          </div>

          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? t("settingPassword") : t("continueButton")}
          </Button>
        </form>
      </div>
    </div>
  );
}