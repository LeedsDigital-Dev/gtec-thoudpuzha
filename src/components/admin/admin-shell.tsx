"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import type { PermissionKey } from "@/lib/admin-routes";

interface AdminShellProps {
  isSuperAdmin: boolean;
  permissions: Partial<Record<PermissionKey, boolean>>;
  children: React.ReactNode;
}

export function AdminShell({
  isSuperAdmin,
  permissions,
  children,
}: AdminShellProps) {
  return (
    <SidebarProvider defaultOpen>
      <AdminSidebar isSuperAdmin={isSuperAdmin} permissions={permissions} />
      <main className="flex min-h-svh flex-1 flex-col bg-background">
        {children}
      </main>
    </SidebarProvider>
  );
}
