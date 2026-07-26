"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { JobSeekerSidebar } from "@/components/portal/job-seeker-sidebar";

interface JobSeekerShellProps {
  children: React.ReactNode;
}

export function JobSeekerShell({ children }: JobSeekerShellProps) {
  return (
    <SidebarProvider defaultOpen>
      <JobSeekerSidebar />
      <main className="flex min-h-svh flex-1 flex-col bg-background">
        <div className="flex items-center gap-2 border-b p-4 md:hidden">
          <SidebarTrigger />
          <span className="font-semibold">Job Seeker Portal</span>
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}
