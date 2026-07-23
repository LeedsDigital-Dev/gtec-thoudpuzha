import type { PermissionKey } from "@/lib/auth";

export const PERMISSION_KEYS: PermissionKey[] = [
  "canEditCourses",
  "canEditGallery",
  "canEditCertificationPartners",
  "canEditNewsEvents",
  "canEditFlashNews",
  "canProvisionStudents",
  "canApproveEmployers",
  "canApproveJobPostings",
  "canModerateSkillsTaxonomy",
];

export const PERMISSION_LABELS: Record<PermissionKey, string> = {
  canEditCourses: "Edit Courses",
  canEditGallery: "Edit Gallery",
  canEditCertificationPartners: "Edit Certification Partners",
  canEditNewsEvents: "Edit News & Events",
  canEditFlashNews: "Edit Flash News",
  canProvisionStudents: "Provision Students",
  canApproveEmployers: "Approve Employers",
  canApproveJobPostings: "Approve Job Postings",
  canModerateSkillsTaxonomy: "Moderate Skills Taxonomy",
};
