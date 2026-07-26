import {
  LayoutDashboard,
  Search,
  User,
  FileText,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface PortalRoute {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const JOB_SEEKER_ROUTES: PortalRoute[] = [
  { href: "/portal/job-seeker",           label: "Dashboard",       icon: LayoutDashboard },
  { href: "/portal/jobs",                 label: "Browse Jobs",     icon: Search },
  { href: "/portal/student/biodata",      label: "My Biodata",      icon: User },
  { href: "/portal/student/applications", label: "My Applications", icon: FileText },
];
