"use client";

import {
  LayoutDashboard,
  Building2,
  PlusCircle,
  Users,
} from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { EmployerSidebar } from "@/components/portal/employer-sidebar";
import { PortalBottomNav } from "@/components/portal/portal-bottom-nav";
import type { PortalRoute } from "@/lib/student-routes";

const TOP_EMPLOYER_ROUTES: PortalRoute[] = [
  { href: "/portal/employer",             label: "Dashboard",      icon: LayoutDashboard },
  { href: "/portal/employer/profile",     label: "Profile",        icon: Building2 },
  { href: "/portal/employer/post-vacancy",label: "Post Vacancy",   icon: PlusCircle },
  { href: "/portal/employer/candidates",  label: "Candidates",     icon: Users },
];

interface EmployerShellProps {
  children: React.ReactNode;
}

export function EmployerShell({ children }: EmployerShellProps) {
  return (
    <SidebarProvider defaultOpen>
      <EmployerSidebar />
      <main className="flex min-h-svh flex-1 flex-col bg-background pb-20 md:pb-0">
        {children}
        <PortalBottomNav routes={TOP_EMPLOYER_ROUTES} />
      </main>
    </SidebarProvider>
  );
}
