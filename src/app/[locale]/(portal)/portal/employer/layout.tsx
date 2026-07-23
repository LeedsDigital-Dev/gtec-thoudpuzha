import { Role } from "@/lib/auth";
import { PortalRoleGate } from "@/components/shared/PortalRoleGate";

export default function EmployerPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PortalRoleGate allowedRoles={[Role.EMPLOYER]}>
      {children}
    </PortalRoleGate>
  );
}
