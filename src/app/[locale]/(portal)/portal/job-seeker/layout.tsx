import { Role } from "@/lib/auth";
import { PortalRoleGate } from "@/components/shared/PortalRoleGate";

export default function JobSeekerPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PortalRoleGate allowedRoles={[Role.JOB_SEEKER]}>
      {children}
    </PortalRoleGate>
  );
}
