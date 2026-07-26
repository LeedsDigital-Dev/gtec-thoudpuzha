"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { StudentSidebar } from "@/components/portal/student-sidebar";

interface StudentShellProps {
  children: React.ReactNode;
}

export function StudentShell({ children }: StudentShellProps) {
  return (
    <SidebarProvider defaultOpen>
      <StudentSidebar />
      <main className="flex min-h-svh flex-1 flex-col bg-background">
        <div className="flex items-center gap-2 border-b p-4 md:hidden">
          <SidebarTrigger />
          <span className="font-semibold">Student Portal</span>
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}
