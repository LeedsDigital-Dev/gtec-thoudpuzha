import {
  LayoutDashboard,
  Building2,
  PlusCircle,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface PortalRoute {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const EMPLOYER_ROUTES: PortalRoute[] = [
  { href: "/portal/employer",              label: "Dashboard",      icon: LayoutDashboard },
  { href: "/portal/employer/profile",      label: "My Profile",     icon: Building2 },
  { href: "/portal/employer/post-vacancy", label: "Post a Vacancy", icon: PlusCircle },
  { href: "/portal/employer/candidates",   label: "Candidates",     icon: Users },
];
