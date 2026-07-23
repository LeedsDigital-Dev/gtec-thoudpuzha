import { Role } from "@/lib/auth";
import { PortalRoleGate } from "@/components/shared/PortalRoleGate";

export default function StudentResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PortalRoleGate allowedRoles={[Role.STUDENT]}>
      {children}
    </PortalRoleGate>
  );
}
