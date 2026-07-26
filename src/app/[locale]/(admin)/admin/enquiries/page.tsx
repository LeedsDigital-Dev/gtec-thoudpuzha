import { redirect } from "next/navigation";
import { requireRole, Role } from "@/lib/auth";
import { prisma } from "@/lib/db";

interface EnquiriesPageProps {
  params: Promise<{ locale: string }>;
}

export default async function EnquiriesPage({ params }: EnquiriesPageProps) {
  const { locale } = await params;
  const authResult = await requireRole([Role.CENTRE_STAFF, Role.SUPER_ADMIN]);

  if (!authResult.authorized) {
    redirect(`/${locale}/forbidden`);
  }

  const enquiries = await prisma.enquiry.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      course: {
        select: { titleEn: true },
      },
    },
  });

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Enquiries</h1>

      <section className="mt-6">
        <table className="w-full border-collapse border border-border">
          <thead>
            <tr>
              <th className="border border-border px-3 py-2 text-left">
                Name
              </th>
              <th className="border border-border px-3 py-2 text-left">
                Phone
              </th>
              <th className="border border-border px-3 py-2 text-left">
                Course
              </th>
              <th className="border border-border px-3 py-2 text-left">
                Source
              </th>
              <th className="border border-border px-3 py-2 text-left">
                Created At
              </th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map((enquiry) => (
              <tr key={enquiry.id}>
                <td className="border border-border px-3 py-2">
                  {enquiry.name}
                </td>
                <td className="border border-border px-3 py-2">
                  {enquiry.phone}
                </td>
                <td className="border border-border px-3 py-2">
                  {enquiry.course?.titleEn || "—"}
                </td>
                <td className="border border-border px-3 py-2">
                  {enquiry.source}
                </td>
                <td className="border border-border px-3 py-2">
                  {enquiry.createdAt.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {enquiries.length === 0 && (
          <p className="mt-4 text-muted-foreground">No enquiries yet.</p>
        )}
      </section>
    </main>
  );
}
