import { redirect } from "next/navigation";
import { requireRole, Role } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import {
  createStudentRecord,
  bulkImportStudentsAction,
  updateStudentEmail,
} from "./actions";

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
  const missingEmailCount = records.filter((r) => !r.email).length;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Students</h1>

      {missingEmailCount > 0 && (
        <div
          className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800"
          role="alert"
        >
          {missingEmailCount} student record
          {missingEmailCount === 1 ? "" : "s"} {missingEmailCount === 1 ? "has" : "have"} no
          email on file and can&apos;t complete sign-up (sign-up verification now
          uses email, not phone — see the &quot;Verification&quot; column
          below). Add an email to each flagged row to unblock them.
        </div>
      )}

      {/* Single-entry create form */}
      <section className="mt-6 rounded border border-border p-4">
        <h2 className="text-lg font-medium">Add single student</h2>
        <form action={createStudentRecord} className="mt-4 space-y-4">
          <input type="hidden" name="locale" value={locale} />
          <div className="grid gap-4 md:grid-cols-4">
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
            <div className="space-y-1">
              <label htmlFor="email" className="text-sm font-medium">
                Email <span className="text-destructive">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
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
          CSV must have columns: studentId,fullName,phone,email. Header row
          is optional.
        </p>
        <form action={bulkImportStudentsAction} className="mt-4 space-y-4">
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
              placeholder={`studentId,fullName,phone,email\nGTEC001,John Doe,9876543210,john@example.com\nGTEC002,Jane Smith,9876543211,jane@example.com`}
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
                Email
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
                  {record.email ? (
                    record.email
                  ) : (
                    <form
                      action={updateStudentEmail}
                      className="flex items-center gap-2"
                    >
                      <input type="hidden" name="locale" value={locale} />
                      <input type="hidden" name="recordId" value={record.id} />
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="student@example.com"
                        className="w-40 rounded border border-amber-300 bg-amber-50 px-2 py-1 text-xs"
                      />
                      <Button type="submit" size="sm" variant="outline">
                        Add
                      </Button>
                    </form>
                  )}
                </td>
                <td className="border border-gray-300 px-3 py-2">
                  {record.linkedUserId ? (
                    <span className="text-green-600">Verified</span>
                  ) : !record.email ? (
                    <span className="text-amber-600">Blocked — no email</span>
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
