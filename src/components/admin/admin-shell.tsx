"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminBottomNav } from "@/components/admin/admin-bottom-nav";
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
      <main className="flex min-h-svh flex-1 flex-col bg-background pb-20 md:pb-0">
        <div className="flex items-center justify-between border-b px-4 py-3 md:hidden">
          <span className="font-semibold text-lg">Admin Portal</span>
        </div>
        {children}
        <AdminBottomNav isSuperAdmin={isSuperAdmin} permissions={permissions} />
      </main>
    </SidebarProvider>
  );
}
