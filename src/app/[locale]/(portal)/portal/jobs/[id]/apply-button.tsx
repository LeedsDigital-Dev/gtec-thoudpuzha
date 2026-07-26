"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("jobDetail");
  const [state, action, pending] = useActionState(
    async (_prevState: { error?: string; applied?: boolean }, formData: FormData) => {
      return applyToJob(formData);
    },
    {},
  );

  const applied = alreadyApplied || state?.applied || state?.error === "Already applied";

  if (!hasProfile || !profileComplete) {
    return (
      <div className="rounded-lg border border-accent/30 bg-accent/5 p-4 text-center text-accent">
        {t("completeProfileToApply")}
      </div>
    );
  }

  if (applied) {
    return (
      <div className="rounded-lg border border-primary/30 bg-primary/10 p-4 text-center">
        <span className="text-lg font-medium text-primary">{t("applied")}</span>
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
        className="rounded-lg bg-primary px-8 py-3 text-lg font-medium text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? t("applying") : t("applyNow")}
      </button>
      {state?.error && state.error !== "Already applied" && (
        <p className="mt-2 text-sm text-destructive">{state.error}</p>
      )}
    </form>
  );
}
