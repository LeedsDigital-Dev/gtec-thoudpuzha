"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { EmployerSidebar } from "@/components/portal/employer-sidebar";

interface EmployerShellProps {
  children: React.ReactNode;
}

export function EmployerShell({ children }: EmployerShellProps) {
  return (
    <SidebarProvider defaultOpen>
      <EmployerSidebar />
      <main className="flex min-h-svh flex-1 flex-col bg-background">
        <div className="flex items-center gap-2 border-b p-4 md:hidden">
          <SidebarTrigger />
          <span className="font-semibold">Employer Portal</span>
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}
