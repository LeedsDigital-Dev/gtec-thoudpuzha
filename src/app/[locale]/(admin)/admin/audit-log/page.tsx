import { redirect } from "next/navigation";
import { requireRole, Role } from "@/lib/auth";
import { prisma } from "@/lib/db";

interface AuditLogPageProps {
  params: Promise<{ locale: string }>;
}

export default async function AuditLogPage({ params }: AuditLogPageProps) {
  const { locale } = await params;
  const authResult = await requireRole([Role.CENTRE_STAFF, Role.SUPER_ADMIN]);

  if (!authResult.authorized) {
    redirect(`/${locale}/forbidden`);
  }

  const entries = await prisma.auditLogEntry.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Audit Log</h1>
      <table className="mt-4 w-full border-collapse border border-border">
        <thead>
          <tr>
            <th className="border border-border px-3 py-2 text-left">Time</th>
            <th className="border border-border px-3 py-2 text-left">Actor</th>
            <th className="border border-border px-3 py-2 text-left">Role</th>
            <th className="border border-border px-3 py-2 text-left">Action</th>
            <th className="border border-border px-3 py-2 text-left">Entity</th>
            <th className="border border-border px-3 py-2 text-left">Metadata</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id}>
              <td className="border border-border px-3 py-2">
                {entry.createdAt.toISOString()}
              </td>
              <td className="border border-border px-3 py-2">
                {entry.actorUserId}
              </td>
              <td className="border border-border px-3 py-2">
                {entry.actorRole}
              </td>
              <td className="border border-border px-3 py-2">
                {entry.action}
              </td>
              <td className="border border-border px-3 py-2">
                {entry.entityType}:{entry.entityId}
              </td>
              <td className="border border-border px-3 py-2">
                {entry.metadata
                  ? JSON.stringify(entry.metadata)
                  : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
