import { redirect } from "next/navigation";
import { requireRole, Role } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { createStudentRecord, bulkImportStudents } from "./actions";

interface StudentsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function StudentsPage({ params }: StudentsPageProps) {
  const { locale } = await params;
  const authResult = await requireRole([Role.CENTRE_STAFF, Role.SUPER_ADMIN]);

  if (!authResult.authorized) {
    redirect(`/${locale}/forbidden`);
  }

  const records = await prisma.studentRecord.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Students</h1>

      {/* Single-entry create form */}
      <section className="mt-6 rounded border border-border p-4">
        <h2 className="text-lg font-medium">Add single student</h2>
        <form action={createStudentRecord} className="mt-4 space-y-4">
          <input type="hidden" name="locale" value={locale} />
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-1">
              <label htmlFor="studentId" className="text-sm font-medium">
                Student ID <span className="text-destructive">*</span>
              </label>
              <input
                id="studentId"
                name="studentId"
                required
                className="w-full rounded border border-border bg-background px-3 py-2 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="fullName" className="text-sm font-medium">
                Full Name <span className="text-destructive">*</span>
              </label>
              <input
                id="fullName"
                name="fullName"
                required
                className="w-full rounded border border-border bg-background px-3 py-2 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="phone" className="text-sm font-medium">
                Phone <span className="text-destructive">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                required
                className="w-full rounded border border-border bg-background px-3 py-2 text-sm"
              />
            </div>
          </div>
          <Button type="submit">Create</Button>
        </form>
      </section>

      {/* CSV bulk import */}
      <section className="mt-8 rounded border border-border p-4">
        <h2 className="text-lg font-medium">Bulk import (CSV)</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          CSV must have columns: studentId,fullName,phone. Header row is
          optional.
        </p>
        <form action={bulkImportStudents} className="mt-4 space-y-4">
          <input type="hidden" name="locale" value={locale} />
          <div className="space-y-1">
            <label htmlFor="csv" className="text-sm font-medium">
              CSV content <span className="text-destructive">*</span>
            </label>
            <textarea
              id="csv"
              name="csv"
              required
              rows={8}
              className="w-full rounded border border-border bg-background px-3 py-2 text-sm font-mono"
              placeholder={`studentId,fullName,phone\nGTEC001,John Doe,9876543210\nGTEC002,Jane Smith,9876543211`}
            />
          </div>
          <Button type="submit">Import CSV</Button>
        </form>
      </section>

      {/* Records table */}
      <section className="mt-8">
        <h2 className="text-lg font-medium">
          All records ({records.length})
        </h2>
        <table className="mt-4 w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-3 py-2 text-left">
                Student ID
              </th>
              <th className="border border-gray-300 px-3 py-2 text-left">
                Full Name
              </th>
              <th className="border border-gray-300 px-3 py-2 text-left">
                Phone
              </th>
              <th className="border border-gray-300 px-3 py-2 text-left">
                Verification
              </th>
              <th className="border border-gray-300 px-3 py-2 text-left">
                Created
              </th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <td className="border border-gray-300 px-3 py-2 font-mono text-sm">
                  {record.studentId}
                </td>
                <td className="border border-gray-300 px-3 py-2">
                  {record.fullName}
                </td>
                <td className="border border-gray-300 px-3 py-2">
                  {record.phone}
                </td>
                <td className="border border-gray-300 px-3 py-2">
                  {record.linkedUserId ? (
                    <span className="text-green-600">Verified</span>
                  ) : (
                    <span className="text-amber-600">Pending</span>
                  )}
                </td>
                <td className="border border-gray-300 px-3 py-2 text-sm">
                  {record.createdAt.toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {records.length === 0 && (
          <p className="mt-4 text-muted-foreground">
            No student records yet.
          </p>
        )}
      </section>
    </main>
  );
}
