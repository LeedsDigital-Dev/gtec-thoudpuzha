"use client";

import { useState, useCallback } from "react";
import { useSignUp, useClerk } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { lookupStudentRecord, finalizeStudentVerification } from "./actions";

type Step = "form" | "verifying" | "otp" | "done" | "error";

export default function StudentSignUpPage() {
  const { signUp, isLoaded: signUpLoaded } = useSignUp();
  const clerk = useClerk();

  const [step, setStep] = useState<Step>("form");
  const [studentId, setStudentId] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [alreadyLinked, setAlreadyLinked] = useState(false);
  const [studentRecordId, setStudentRecordId] = useState("");
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
        setAlreadyLinked("alreadyLinked" in result && result.alreadyLinked);
        setStep("error");
        return;
      }

      setStudentRecordId(result.studentRecordId);
      setStep("verifying");

      if (!signUpLoaded || !signUp) {
        setError("Verification service is not ready. Please try again.");
        setStep("error");
        return;
      }

      // Start Clerk sign-up with the phone number on file
      await signUp.create({ phoneNumber: result.phone });
      await signUp.preparePhoneVerification();

      setStep("otp");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(message);
      setStep("error");
    } finally {
      setSubmitting(false);
    }
  }, [studentId, phone, signUp, signUpLoaded]);

  const handleVerifyOtp = useCallback(
    async (code: string) => {
      if (!signUp) return;

      setSubmitting(true);
      setError("");

      try {
        const result = await signUp.attemptPhoneVerification({ code });

        if (result.status !== "complete") {
          setError("Invalid verification code. Please try again.");
          return;
        }

        // Set the active session so the server action can read the userId
        await clerk.setActive({ session: result.createdSessionId });

        // Finalize: set role, create CandidateProfile, link StudentRecord
        await finalizeStudentVerification(studentRecordId);
        // finalizeStudentVerification redirects on success
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Verification failed. Please try again.";
        setError(message);
      } finally {
        setSubmitting(false);
      }
    },
    [signUp, clerk, studentRecordId],
  );

  if (step === "otp") {
    return <OtpForm onVerify={handleVerifyOtp} submitting={submitting} error={error} />;
  }

  const isError = step === "error";

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="mb-2 text-3xl font-semibold">Student Verification</h1>
          <p className="text-gray-600">
            Enter your Student ID and phone number as registered with the centre.
          </p>
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
                  WhatsApp
                </a>
                <a
                  href="tel:+919999999999"
                  className="inline-flex items-center gap-1 rounded-md bg-gray-700 px-3 py-1.5 text-xs font-medium text-white hover:bg-gray-800"
                >
                  Call Centre
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
            <Label htmlFor="studentId">Student ID</Label>
            <Input
              id="studentId"
              name="studentId"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="e.g. GTEC2025001"
              required
              disabled={submitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 9876543210"
              required
              disabled={submitting}
            />
          </div>

          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Verifying..." : "Verify Details"}
          </Button>
        </form>

        <p className="text-center text-xs text-gray-500">
          Don&apos;t have a Student ID?{" "}
          <a href="/contact" className="underline">
            Contact the centre
          </a>
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
}: {
  onVerify: (code: string) => Promise<void>;
  submitting: boolean;
  error: string;
}) {
  const [code, setCode] = useState("");

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="mb-2 text-3xl font-semibold">Verify Your Phone</h1>
          <p className="text-gray-600">
            We sent a one-time verification code to your registered phone number.
          </p>
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
            <Label htmlFor="otp">Verification Code</Label>
            <Input
              id="otp"
              name="otp"
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="one-time-code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter 6-digit code"
              required
              disabled={submitting}
            />
          </div>

          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Verifying..." : "Verify Code"}
          </Button>
        </form>
      </div>
    </div>
  );
}
