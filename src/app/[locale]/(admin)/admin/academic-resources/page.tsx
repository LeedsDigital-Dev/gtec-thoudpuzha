import { redirect } from "next/navigation";
import { requireRole, Role } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { uploadResource, deleteResource } from "./actions";

interface Props {
  params: Promise<{ locale: string }>;
}

const RESOURCE_TYPES = ["NOTE", "ASSIGNMENT", "PAST_PAPER"] as const;
const TYPE_LABELS: Record<string, string> = {
  NOTE: "Study Notes",
  ASSIGNMENT: "Assignments",
  PAST_PAPER: "Past Papers",
};

export default async function AcademicResourcesPage({ params }: Props) {
  const { locale } = await params;
  const authResult = await requireRole([Role.CENTRE_STAFF, Role.SUPER_ADMIN]);

  if (!authResult.authorized) {
    redirect(`/${locale}/forbidden`);
  }

  const [courses, resources] = await Promise.all([
    prisma.course.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { titleEn: "asc" },
      select: { id: true, titleEn: true },
    }),
    prisma.academicResource.findMany({
      orderBy: { uploadedAt: "desc" },
      include: { course: { select: { titleEn: true } } },
    }),
  ]);

  return (
    <main className="p-6 space-y-10">
      <h1 className="text-2xl font-semibold">Academic Resources</h1>

      <section className="rounded border border-border p-4">
        <h2 className="text-lg font-medium">Upload Resource</h2>
        <form action={uploadResource} className="mt-4 space-y-4">
          <input type="hidden" name="locale" value={locale} />

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <label htmlFor="ar-courseId" className="text-sm font-medium">
                Course <span className="text-destructive">*</span>
              </label>
              <select
                id="ar-courseId"
                name="courseId"
                required
                className="w-full rounded border border-border bg-background px-3 py-2 text-sm"
              >
                <option value="">— Select Course —</option>
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.titleEn}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label htmlFor="ar-type" className="text-sm font-medium">
                Resource Type <span className="text-destructive">*</span>
              </label>
              <select
                id="ar-type"
                name="type"
                required
                className="w-full rounded border border-border bg-background px-3 py-2 text-sm"
              >
                <option value="">— Select Type —</option>
                {RESOURCE_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {TYPE_LABELS[t]}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1 md:col-span-2">
              <label htmlFor="ar-title" className="text-sm font-medium">
                Title <span className="text-destructive">*</span>
              </label>
              <input
                id="ar-title"
                name="title"
                required
                className="w-full rounded border border-border bg-background px-3 py-2 text-sm"
              />
            </div>

            <div className="space-y-1 md:col-span-2">
              <label htmlFor="ar-fileUrl" className="text-sm font-medium">
                File URL (link to resource)
              </label>
              <input
                id="ar-fileUrl"
                name="fileUrl"
                type="url"
                className="w-full rounded border border-border bg-background px-3 py-2 text-sm"
                placeholder="https://..."
              />
            </div>
          </div>

          <Button type="submit">Upload Resource</Button>
        </form>
      </section>

      <section>
        <h2 className="text-lg font-medium">All Resources</h2>
        {resources.length > 0 ? (
          <table className="mt-4 w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-3 py-2 text-left">Title</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Type</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Course</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Uploaded</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {resources.map((r) => (
                <tr key={r.id}>
                  <td className="border border-gray-300 px-3 py-2">
                    {r.fileUrl ? (
                      <a
                        href={r.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline"
                      >
                        {r.title}
                      </a>
                    ) : (
                      r.title
                    )}
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    {TYPE_LABELS[r.type] || r.type}
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    {r.course.titleEn}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-xs">
                    {r.uploadedAt.toISOString().slice(0, 10)}
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    <form action={deleteResource}>
                      <input type="hidden" name="id" value={r.id} />
                      <input type="hidden" name="locale" value={locale} />
                      <Button type="submit" size="xs" variant="destructive">
                        Delete
                      </Button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="mt-4 text-muted-foreground">No resources uploaded yet.</p>
        )}
      </section>
    </main>
  );
}
