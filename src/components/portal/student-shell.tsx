"use client";

import {
  LayoutDashboard,
  Search,
  User,
  FolderOpen,
} from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { StudentSidebar } from "@/components/portal/student-sidebar";
import { PortalBottomNav } from "@/components/portal/portal-bottom-nav";
import type { PortalRoute } from "@/lib/student-routes";

const TOP_STUDENT_ROUTES: PortalRoute[] = [
  { href: "/portal/student",          label: "Dashboard",   icon: LayoutDashboard },
  { href: "/portal/jobs",             label: "Jobs",        icon: Search },
  { href: "/portal/student/biodata",  label: "Biodata",     icon: User },
  { href: "/portal/student/resources",label: "Resources",   icon: FolderOpen },
];

interface StudentShellProps {
  children: React.ReactNode;
}

export function StudentShell({ children }: StudentShellProps) {
  return (
    <SidebarProvider defaultOpen>
      <StudentSidebar />
      <main className="flex min-h-svh flex-1 flex-col bg-background pb-20 md:pb-0">
        {children}
        <PortalBottomNav routes={TOP_STUDENT_ROUTES} />
      </main>
    </SidebarProvider>
  );
}
