import { redirect } from "next/navigation";
import { requireRole, Role } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { inviteStaff, deactivateStaff, reactivateStaff } from "./actions";

interface StaffPageProps {
  params: Promise<{ locale: string }>;
}

export default async function StaffPage({ params }: StaffPageProps) {
  const { locale } = await params;
  const authResult = await requireRole([Role.SUPER_ADMIN]);

  if (!authResult.authorized) {
    redirect(`/${locale}/forbidden`);
  }

  const staff = await prisma.user.findMany({
    where: {
      role: { in: [Role.CENTRE_STAFF, Role.SUPER_ADMIN] },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="p-6 space-y-10">
      <h1 className="text-2xl font-semibold">Staff Management</h1>

      {/* Invite Staff */}
      <section className="rounded border border-border p-4">
        <h2 className="text-lg font-medium">Invite Staff</h2>
        <form action={inviteStaff} className="mt-4 flex items-end gap-3">
          <input type="hidden" name="locale" value={locale} />
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email address <span className="text-destructive">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 rounded border border-border bg-background px-3 py-2 text-sm"
            />
          </div>
          <Button type="submit">Send Invite</Button>
        </form>
      </section>

      {/* Staff List */}
      <section>
        <h2 className="text-lg font-medium">All Staff</h2>
        {staff.length > 0 ? (
          <table className="mt-4 w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-3 py-2 text-left">User ID</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Role</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Status</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Created</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((user) => (
                <tr key={user.id}>
                  <td className="border border-gray-300 px-3 py-2 font-mono text-xs">
                    {user.id}
                  </td>
                  <td className="border border-gray-300 px-3 py-2">{user.role}</td>
                  <td className="border border-gray-300 px-3 py-2">
                    <span
                      className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${
                        user.deactivatedAt
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {user.deactivatedAt ? "Deactivated" : "Active"}
                    </span>
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-xs">
                    {user.createdAt.toISOString().slice(0, 10)}
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    {user.role === Role.CENTRE_STAFF && (
                      <>
                        {user.deactivatedAt ? (
                          <form action={reactivateStaff} className="inline">
                            <input type="hidden" name="userId" value={user.id} />
                            <input type="hidden" name="locale" value={locale} />
                            <Button type="submit" size="xs" variant="outline">
                              Reactivate
                            </Button>
                          </form>
                        ) : (
                          <form action={deactivateStaff} className="inline">
                            <input type="hidden" name="userId" value={user.id} />
                            <input type="hidden" name="locale" value={locale} />
                            <Button type="submit" size="xs" variant="destructive">
                              Deactivate
                            </Button>
                          </form>
                        )}
                      </>
                    )}
                    {user.role === Role.SUPER_ADMIN && (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="mt-4 text-muted-foreground">No staff found.</p>
        )}
      </section>
    </main>
  );
}
