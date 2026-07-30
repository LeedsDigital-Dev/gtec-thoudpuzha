"use client";

import { UserButton } from "@clerk/nextjs";
import { Home } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, usePathname } from "@/lib/i18n/navigation";
import { STUDENT_ROUTES, type PortalRoute } from "@/lib/student-routes";
import { cn, isRouteActive } from "@/lib/utils";

export function StudentSidebar() {
  const pathname = usePathname();
  const allHrefs = STUDENT_ROUTES.map((r) => r.href);

  return (
    <Sidebar collapsible="icon" className="hidden md:flex">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link
              href="/portal/student"
              className={cn(
                "flex items-center gap-2 px-2 py-3",
                "group-data-[collapsible=icon]:justify-center",
              )}
            >
              <span className="text-lg font-semibold text-sidebar-foreground group-data-[collapsible=icon]:hidden">
                Student Portal
              </span>
              <span className="hidden text-lg font-bold text-sidebar-foreground group-data-[collapsible=icon]:inline">
                S
              </span>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            {STUDENT_ROUTES.map((route) => {
              const active = isRouteActive(route.href, pathname, allHrefs);

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
        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel>Main Site</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link
                href="/"
                className={cn(
                  "flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-sm text-sidebar-foreground/80",
                  "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  "outline-hidden focus-visible:ring-2 focus-visible:ring-sidebar-ring",
                  "transition-[width,height,padding]",
                  "[&_svg]:size-4 [&_svg]:shrink-0",
                  "[&>span:last-child]:truncate",
                )}
              >
                <Home />
                <span>Back to Website</span>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-2 px-2 py-2">
              <UserButton
                appearance={{ elements: { avatarBox: "h-8 w-8" } }}
              />
              <span className="text-sm text-sidebar-foreground group-data-[collapsible=icon]:hidden">
                Account
              </span>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
