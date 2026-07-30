"use client";

import {
  LayoutDashboard,
  Search,
  User,
  FileText,
} from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { JobSeekerSidebar } from "@/components/portal/job-seeker-sidebar";
import { PortalBottomNav } from "@/components/portal/portal-bottom-nav";
import type { PortalRoute } from "@/lib/student-routes";

const TOP_JOB_SEEKER_ROUTES: PortalRoute[] = [
  { href: "/portal/job-seeker",           label: "Dashboard",       icon: LayoutDashboard },
  { href: "/portal/jobs",                 label: "Jobs",            icon: Search },
  { href: "/portal/student/biodata",      label: "Biodata",         icon: User },
  { href: "/portal/student/applications", label: "Applications",    icon: FileText },
];

interface JobSeekerShellProps {
  children: React.ReactNode;
}

export function JobSeekerShell({ children }: JobSeekerShellProps) {
  return (
    <SidebarProvider defaultOpen>
      <JobSeekerSidebar />
      <main className="flex min-h-svh flex-1 flex-col bg-background pb-20 md:pb-0">
        {children}
        <PortalBottomNav routes={TOP_JOB_SEEKER_ROUTES} />
      </main>
    </SidebarProvider>
  );
}
