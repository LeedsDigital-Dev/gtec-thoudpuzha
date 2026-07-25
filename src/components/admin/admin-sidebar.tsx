"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, usePathname } from "@/lib/i18n/navigation";
import { ADMIN_ROUTES, isRouteVisible, type AdminRoute, type PermissionKey } from "@/lib/admin-routes";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  isSuperAdmin: boolean;
  permissions: Partial<Record<PermissionKey, boolean>>;
}

function isRouteActive(route: AdminRoute, pathname: string): boolean {
  if (route.href === "/admin") {
    return pathname === "/admin" || pathname === "/admin/";
  }
  return pathname.startsWith(route.href);
}

export function AdminSidebar({ isSuperAdmin, permissions }: AdminSidebarProps) {
  const pathname = usePathname();

  const visibleRoutes = ADMIN_ROUTES.filter((route) =>
    isRouteVisible(route, isSuperAdmin, permissions),
  );

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link
              href="/admin"
              className={cn(
                "flex items-center gap-2 px-2 py-3",
                "group-data-[collapsible=icon]:justify-center",
              )}
            >
              <span className="text-lg font-semibold text-sidebar-foreground group-data-[collapsible=icon]:hidden">
                Admin
              </span>
              <span className="hidden text-lg font-bold text-sidebar-foreground group-data-[collapsible=icon]:inline">
                A
              </span>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            {visibleRoutes.map((route) => {
              const active = isRouteActive(route, pathname);

              return (
                <SidebarMenuItem key={route.href}>
                  <Link
                    href={route.href}
                    className={cn(
                      "flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-sm",
                      "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      "outline-hidden focus-visible:ring-2 focus-visible:ring-sidebar-ring",
                      "transition-[width,height,padding]",
                      "[&_svg]:size-4 [&_svg]:shrink-0",
                      "[&>span:last-child]:truncate",
                      active &&
                        "bg-sidebar-accent font-medium text-sidebar-accent-foreground",
                    )}
                  >
                    <route.icon />
                    <span>{route.label}</span>
                  </Link>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
