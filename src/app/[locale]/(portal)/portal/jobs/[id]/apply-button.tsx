"use client";

import { useActionState } from "react";
import { applyToJob } from "./actions";

interface ApplyButtonProps {
  jobPostingId: string;
  locale: string;
  hasProfile: boolean;
  profileComplete: boolean;
  alreadyApplied: boolean;
}

export function ApplyButton({
  jobPostingId,
  locale,
  hasProfile,
  profileComplete,
  alreadyApplied,
}: ApplyButtonProps) {
  const [state, action, pending] = useActionState(
    async (_prevState: { error?: string; applied?: boolean }, formData: FormData) => {
      return applyToJob(formData);
    },
    {},
  );

  const applied = alreadyApplied || state?.applied || state?.error === "Already applied";

  if (!hasProfile || !profileComplete) {
    return (
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-center text-amber-800">
        Complete your profile to apply
      </div>
    );
  }

  if (applied) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-center">
        <span className="text-lg font-medium text-green-700">Applied ✓</span>
      </div>
    );
  }

  return (
    <form action={action} className="text-center">
      <input type="hidden" name="jobPostingId" value={jobPostingId} />
      <input type="hidden" name="locale" value={locale} />
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-blue-600 px-8 py-3 text-lg font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? "Applying..." : "Apply Now"}
      </button>
      {state?.error && state.error !== "Already applied" && (
        <p className="mt-2 text-sm text-red-600">{state.error}</p>
      )}
    </form>
  );
}
