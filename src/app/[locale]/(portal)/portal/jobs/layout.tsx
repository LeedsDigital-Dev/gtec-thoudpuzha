import { Role } from "@/lib/auth";
import { PortalRoleGate } from "@/components/shared/PortalRoleGate";

export default function JobsPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PortalRoleGate allowedRoles={[Role.STUDENT, Role.JOB_SEEKER]}>
      {children}
    </PortalRoleGate>
  );
}
