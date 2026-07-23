"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { updateApplicationStatus } from "./actions";
import type { ApplicationStatus } from "@prisma/client";

interface Applicant {
  id: string;
  status: ApplicationStatus;
  appliedAt: Date;
  candidateProfile: {
    id: string;
    fullName: string | null;
    email: string | null;
    phone: string | null;
    educationalQualification: string | null;
    skillIds: string[];
    preferredJobLocation: string | null;
    preferredJobType: string | null;
    careerObjective: string | null;
    photoUrl: string | null;
  };
}

const STATUS_BADGE: Record<string, string> = {
  APPLIED: "bg-blue-100 text-blue-800",
  VIEWED: "bg-purple-100 text-purple-800",
  SHORTLISTED: "bg-amber-100 text-amber-800",
  REJECTED: "bg-red-100 text-red-800",
  HIRED: "bg-green-100 text-green-800",
};

const NEXT_TRANSITIONS: Record<string, ApplicationStatus[]> = {
  APPLIED: ["SHORTLISTED", "REJECTED"],
  VIEWED: ["SHORTLISTED", "REJECTED", "HIRED"],
  SHORTLISTED: ["REJECTED", "HIRED"],
  REJECTED: [],
  HIRED: [],
};

function ApplicantRow({
  applicant,
}: {
  applicant: Applicant;
}) {
  const t = useTranslations("employerApplicants");
  const [state, action, pending] = useActionState(
    async (_prev: unknown, formData: FormData) => {
      const newStatus = formData.get("status") as ApplicationStatus;
      await updateApplicationStatus(applicant.id, newStatus);
      return {};
    },
    {},
  );

  const badgeStyle = STATUS_BADGE[applicant.status] ?? "bg-gray-100 text-gray-800";
  const transitions = NEXT_TRANSITIONS[applicant.status] ?? [];

  return (
    <div className="rounded-lg border p-4 transition-colors hover:bg-gray-50">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            {applicant.candidateProfile.photoUrl && (
              <img
                src={applicant.candidateProfile.photoUrl}
                alt=""
                className="h-10 w-10 rounded-full object-cover"
              />
            )}
            <div>
              <h3 className="font-medium">
                {applicant.candidateProfile.fullName ?? t("unknown")}
              </h3>
              <p className="text-sm text-gray-500">
                {applicant.candidateProfile.preferredJobType?.replace(/_/g, " ") ?? "—"}
              </p>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-gray-600">
            {applicant.candidateProfile.email && (
              <div>
                <span className="text-xs text-gray-500">{t("email")}</span>
                <p>{applicant.candidateProfile.email}</p>
              </div>
            )}
            {applicant.candidateProfile.phone && (
              <div>
                <span className="text-xs text-gray-500">{t("phone")}</span>
                <p>{applicant.candidateProfile.phone}</p>
              </div>
            )}
            {applicant.candidateProfile.educationalQualification && (
              <div>
                <span className="text-xs text-gray-500">{t("qualification")}</span>
                <p>{applicant.candidateProfile.educationalQualification.replace(/_/g, " ")}</p>
              </div>
            )}
            {applicant.candidateProfile.preferredJobLocation && (
              <div>
                <span className="text-xs text-gray-500">{t("location")}</span>
                <p>{applicant.candidateProfile.preferredJobLocation}</p>
              </div>
            )}
          </div>

          {applicant.candidateProfile.careerObjective && (
            <p className="mt-2 text-sm italic text-gray-500">
              &ldquo;{applicant.candidateProfile.careerObjective}&rdquo;
            </p>
          )}
        </div>

        <div className="flex flex-col items-end gap-3">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${badgeStyle}`}
          >
            {applicant.status}
          </span>

          {transitions.length > 0 && (
            <form action={action}>
              <input type="hidden" name="applicationId" value={applicant.id} />
              <div className="flex flex-wrap gap-1.5">
                {transitions.map((nextStatus) => (
                  <button
                    key={nextStatus}
                    type="submit"
                    name="status"
                    value={nextStatus}
                    disabled={pending}
                    className="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-200 disabled:opacity-50"
                  >
                    {nextStatus}
                  </button>
                ))}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export function ApplicantsList({
  applicants,
  postingId: _postingId,
}: {
  applicants: Applicant[];
  postingId: string;
}) {
  const t = useTranslations("employerApplicants");

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">
        {t("applicantCount", { count: applicants.length })}
      </p>
      {applicants.map((applicant) => (
        <ApplicantRow key={applicant.id} applicant={applicant} />
      ))}
    </div>
  );
}
