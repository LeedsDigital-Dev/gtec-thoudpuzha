import {
  LayoutDashboard,
  Search,
  User,
  FileText,
  FolderOpen,
  BookOpen,
  Video,
  ClipboardList,
  BarChart3,
  Calendar,
  ScrollText,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface PortalRoute {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const STUDENT_ROUTES: PortalRoute[] = [
  { href: "/portal/student",                 label: "Dashboard",        icon: LayoutDashboard },
  { href: "/portal/jobs",                    label: "Browse Jobs",      icon: Search },
  { href: "/portal/student/biodata",         label: "My Biodata",       icon: User },
  { href: "/portal/student/applications",    label: "My Applications",  icon: FileText },
  { href: "/portal/student/resources",       label: "Resources",        icon: FolderOpen },
  { href: "/portal/student/resources/notes",       label: "Study Notes",      icon: BookOpen },
  { href: "/portal/student/resources/lectures",    label: "Video Lectures",   icon: Video },
  { href: "/portal/student/resources/assignments", label: "Assignments",      icon: ClipboardList },
  { href: "/portal/student/resources/progress",    label: "My Progress",      icon: BarChart3 },
  { href: "/portal/student/resources/timetable",   label: "Timetable",        icon: Calendar },
  { href: "/portal/student/resources/past-papers", label: "Past Papers",      icon: ScrollText },
];
