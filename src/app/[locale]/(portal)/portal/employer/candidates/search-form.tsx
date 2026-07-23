"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type {
  CandidateSearchResult,
  EmployerJobPosting,
  CandidateSearchFilters,
} from "./actions";

interface CandidateSearchFormProps {
  candidates: CandidateSearchResult[];
  jobPostings: EmployerJobPosting[];
}

type FilterField = keyof CandidateSearchFilters;

export function CandidateSearchForm({
  candidates: initialCandidates,
  jobPostings,
}: CandidateSearchFormProps) {
  const router = useRouter();
  const [filters, setFilters] = useState<CandidateSearchFilters>({});
  const [inviteStatus, setInviteStatus] = useState<Record<string, string>>({});

  const filtered = applyFilters(initialCandidates, filters);

  const handleFilterChange = useCallback(
    (field: FilterField, value: unknown) => {
      setFilters((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  const handleInvite = async (candidateId: string, jobPostingId: string) => {
    setInviteStatus((prev) => ({ ...prev, [candidateId]: "sending..." }));

    try {
      const { inviteToApply } = await import("./actions");
      const result = await inviteToApply(candidateId, jobPostingId);

      if (result.success) {
        setInviteStatus((prev) => ({
          ...prev,
          [candidateId]: "sent",
        }));
      } else {
        setInviteStatus((prev) => ({
          ...prev,
          [candidateId]: result.error ?? "Failed",
        }));
      }
    } catch {
      setInviteStatus((prev) => ({
        ...prev,
        [candidateId]: "Error sending invite",
      }));
    }

    setTimeout(() => {
      setInviteStatus((prev) => {
        const next = { ...prev };
        delete next[candidateId];
        return next;
      });
    }, 5000);
  };

  return (
    <div className="space-y-6">
      {/* Filter Section */}
      <div className="rounded-lg border bg-white p-4">
        <h2 className="mb-3 text-lg font-medium">Filters</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Preferred Location
            </label>
            <input
              type="text"
              placeholder="e.g. Kochi"
              value={filters.preferredJobLocation ?? ""}
              onChange={(e) =>
                handleFilterChange("preferredJobLocation", e.target.value)
              }
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Preferred Job Type
            </label>
            <select
              value={filters.preferredJobType ?? ""}
              onChange={(e) =>
                handleFilterChange(
                  "preferredJobType",
                  e.target.value || undefined,
                )
              }
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
            >
              <option value="">Any</option>
              <option value="FULL_TIME">Full Time</option>
              <option value="PART_TIME">Part Time</option>
              <option value="INTERNSHIP">Internship</option>
              <option value="WORK_FROM_HOME">Work From Home</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Educational Qualification
            </label>
            <select
              value={filters.educationalQualification ?? ""}
              onChange={(e) =>
                handleFilterChange(
                  "educationalQualification",
                  e.target.value || undefined,
                )
              }
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
            >
              <option value="">Any</option>
              <option value="SSLC">SSLC</option>
              <option value="PLUS_TWO">Plus Two</option>
              <option value="DIPLOMA">Diploma</option>
              <option value="GRADUATE">Graduate</option>
              <option value="POST_GRADUATE">Post Graduate</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Languages (comma-separated)
            </label>
            <input
              type="text"
              placeholder="e.g. English, Malayalam"
              value={(filters.languagesKnown ?? []).join(", ")}
              onChange={(e) =>
                handleFilterChange(
                  "languagesKnown",
                  e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean),
                )
              }
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div className="mt-3 flex items-center gap-4">
          <button
            type="button"
            onClick={clearFilters}
            className="rounded-md bg-gray-100 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-200"
          >
            Clear Filters
          </button>
          <span className="text-sm text-gray-500">
            {filtered.length} candidate{filtered.length !== 1 ? "s" : ""} found
          </span>
        </div>
      </div>

      {/* Results */}

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center text-gray-500">
          <p>No candidates match your search criteria.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((candidate) => (
            <CandidateCard
              key={candidate.id}
              candidate={candidate}
              jobPostings={jobPostings}
              inviteStatus={inviteStatus[candidate.id]}
              onInvite={handleInvite}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface CandidateCardProps {
  candidate: CandidateSearchResult;
  jobPostings: EmployerJobPosting[];
  inviteStatus: string | undefined;
  onInvite: (candidateId: string, jobPostingId: string) => void;
}

function CandidateCard({
  candidate,
  jobPostings: employerPostings,
  inviteStatus,
  onInvite,
}: CandidateCardProps) {
  const [selectedJobId, setSelectedJobId] = useState<string>("");

  const handleInviteClick = () => {
    if (selectedJobId) {
      onInvite(candidate.id, selectedJobId);
    }
  };

  return (
    <div className="rounded-lg border bg-white p-4 transition-colors hover:border-blue-300">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <Link
            href={`/portal/employer/candidates/${candidate.id}`}
            className="text-lg font-medium text-blue-600 hover:underline"
          >
            {candidate.fullName ?? "Unnamed Candidate"}
          </Link>

          <div className="mt-1 flex flex-wrap gap-2 text-sm text-gray-500">
            {candidate.preferredJobLocation && (
              <span>📍 {candidate.preferredJobLocation}</span>
            )}
            {candidate.preferredJobType && (
              <span>💼 {candidate.preferredJobType.replace(/_/g, " ")}</span>
            )}
            {candidate.educationalQualification && (
              <span>
                🎓 {candidate.educationalQualification.replace(/_/g, " ")}
              </span>
            )}
          </div>

          {candidate.careerObjective && (
            <p className="mt-2 text-sm text-gray-600 italic">
              &ldquo;{candidate.careerObjective}&rdquo;
            </p>
          )}

          <div className="mt-3 flex flex-wrap gap-2">
            {candidate.languagesKnown.slice(0, 4).map((lang) => (
              <span
                key={lang}
                className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs text-blue-700"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>

        <Link
          href={`/portal/employer/candidates/${candidate.id}`}
          className="ml-4 shrink-0 rounded-md bg-gray-100 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-200"
        >
          View Profile
        </Link>
      </div>

      {/* Invite to Apply */}
      {employerPostings.length > 0 && (
        <div className="mt-4 flex items-center gap-3 border-t pt-3">
          <select
            value={selectedJobId}
            onChange={(e) => setSelectedJobId(e.target.value)}
            className="max-w-xs rounded-md border px-3 py-1.5 text-sm"
          >
            <option value="">Select a job posting...</option>
            {employerPostings.map((jp) => (
              <option key={jp.id} value={jp.id}>
                {jp.title}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={handleInviteClick}
            disabled={!selectedJobId || inviteStatus === "sending..."}
            className="rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {inviteStatus === "sending..." ? "Sending..." : "Invite to Apply"}
          </button>

          {inviteStatus && inviteStatus !== "sending..." && (
            <span
              className={`text-sm ${
                inviteStatus === "sent" ? "text-green-600" : "text-red-600"
              }`}
            >
              {inviteStatus === "sent"
                ? "✓ Invitation sent"
                : inviteStatus}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Applies all active filters in-memory over the candidate list.
 */
function applyFilters(
  candidates: CandidateSearchResult[],
  filters: CandidateSearchFilters,
): CandidateSearchResult[] {
  let results = candidates;

  if (filters.preferredJobLocation) {
    const loc = filters.preferredJobLocation.toLowerCase();
    results = results.filter(
      (c) => c.preferredJobLocation?.toLowerCase().includes(loc),
    );
  }

  if (filters.preferredJobType) {
    results = results.filter(
      (c) => c.preferredJobType === filters.preferredJobType,
    );
  }

  if (filters.educationalQualification) {
    results = results.filter(
      (c) => c.educationalQualification === filters.educationalQualification,
    );
  }

  if (filters.languagesKnown && filters.languagesKnown.length > 0) {
    results = results.filter((c) =>
      filters.languagesKnown!.some((lang) =>
        c.languagesKnown.some(
          (cl) => cl.toLowerCase() === lang.toLowerCase(),
        ),
      ),
    );
  }

  return results;
}
