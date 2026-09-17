import type { PermissionKey } from "@/lib/auth";

export const PERMISSION_KEYS: PermissionKey[] = [
  "canEditCourses",
  "canEditCertificationPartners",
  "canEditFlashNews",
  "canProvisionStudents",
  "canApproveEmployers",
  "canApproveJobPostings",
  "canModerateSkillsTaxonomy",
];

export const PERMISSION_LABELS: Partial<Record<PermissionKey, string>> = {
  canEditCourses: "Edit Courses",
  canEditCertificationPartners: "Edit Certification Partners",
  canEditFlashNews: "Edit Flash News",
  canProvisionStudents: "Provision Students",
  canApproveEmployers: "Approve Employers",
  canApproveJobPostings: "Approve Job Postings",
  canModerateSkillsTaxonomy: "Moderate Skills Taxonomy",
};
