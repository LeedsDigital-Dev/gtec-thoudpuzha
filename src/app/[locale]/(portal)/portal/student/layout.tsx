import { Role } from "@/lib/auth";
import { PortalRoleGate } from "@/components/shared/PortalRoleGate";

/**
 * Parent layout for /portal/student/* — accessible to STUDENT and JOB_SEEKER
 * (biodata is shared). The /portal/student/resources sub-layout adds a
 * stricter STUDENT-only gate on top.
 */
export default function StudentPortalLayout({
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
