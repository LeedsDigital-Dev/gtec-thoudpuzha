import { redirect } from "next/navigation";
import { requireRole, Role } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { getMediaUrl } from "@/lib/media";
import {
  createPartner,
  updatePartner,
  deletePartner,
  movePartner,
} from "./actions";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function CertificationPartnersPage({
  params,
}: PageProps) {
  const { locale } = await params;
  const authResult = await requireRole([Role.CENTRE_STAFF, Role.SUPER_ADMIN]);

  if (!authResult.authorized) {
    redirect(`/${locale}/forbidden`);
  }

  const partners = await prisma.certificationPartner.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Certification Partners</h1>

      <section className="mt-6 rounded border border-border p-4">
        <h2 className="text-lg font-medium">Add partner</h2>
        <form action={createPartner} className="mt-4 space-y-4">
          <input type="hidden" name="locale" value={locale} />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <label htmlFor="name" className="text-sm font-medium">
                Name (English) <span className="text-destructive">*</span>
              </label>
              <input
                id="name"
                name="name"
                required
                className="w-full rounded border border-border bg-background px-3 py-2 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="nameMl" className="text-sm font-medium">
                Name (Malayalam)
              </label>
              <input
                id="nameMl"
                name="nameMl"
                className="w-full rounded border border-border bg-background px-3 py-2 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="link" className="text-sm font-medium">
                Link (optional)
              </label>
              <input
                id="link"
                name="link"
                type="url"
                className="w-full rounded border border-border bg-background px-3 py-2 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="logo" className="text-sm font-medium">
                Logo <span className="text-destructive">*</span>
              </label>
              <input
                id="logo"
                name="logo"
                type="file"
                accept="image/*"
                required
                className="w-full rounded border border-border bg-background px-3 py-2 text-sm"
              />
            </div>
          </div>
          <Button type="submit">Add partner</Button>
        </form>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-medium">All partners</h2>
        <table className="mt-4 w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-3 py-2 text-left">Order</th>
              <th className="border border-gray-300 px-3 py-2 text-left">Logo</th>
              <th className="border border-gray-300 px-3 py-2 text-left">Name (EN)</th>
              <th className="border border-gray-300 px-3 py-2 text-left">Name (ML)</th>
              <th className="border border-gray-300 px-3 py-2 text-left">Link</th>
              <th className="border border-gray-300 px-3 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {partners.map((partner, index) => (
              <tr key={partner.id}>
                <td className="border border-gray-300 px-3 py-2">
                  <div className="flex items-center gap-1">
                    <form action={movePartner}>
                      <input type="hidden" name="id" value={partner.id} />
                      <input type="hidden" name="direction" value="up" />
                      <input type="hidden" name="locale" value={locale} />
                      <Button
                        type="submit"
                        size="icon-xs"
                        variant="outline"
                        disabled={index === 0}
                        aria-label="Move up"
                      >
                        ↑
                      </Button>
                    </form>
                    <form action={movePartner}>
                      <input type="hidden" name="id" value={partner.id} />
                      <input type="hidden" name="direction" value="down" />
                      <input type="hidden" name="locale" value={locale} />
                      <Button
                        type="submit"
                        size="icon-xs"
                        variant="outline"
                        disabled={index === partners.length - 1}
                        aria-label="Move down"
                      >
                        ↓
                      </Button>
                    </form>
                    <span className="ml-2 text-xs">{partner.sortOrder}</span>
                  </div>
                </td>
                <td className="border border-gray-300 px-3 py-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getMediaUrl(partner.logoUrl)}
                    alt={partner.name}
                    className="h-10 w-auto object-contain"
                  />
                </td>
                <td className="border border-gray-300 px-3 py-2">
                  {partner.name}
                </td>
                <td className="border border-gray-300 px-3 py-2">
                  {partner.nameMl || "—"}
                </td>
                <td className="border border-gray-300 px-3 py-2">
                  {partner.link ? (
                    <a
                      href={partner.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline"
                    >
                      link
                    </a>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="border border-gray-300 px-3 py-2">
                  <form action={deletePartner}>
                    <input type="hidden" name="id" value={partner.id} />
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

        {partners.length === 0 && (
          <p className="mt-4 text-muted-foreground">
            No certification partners yet.
          </p>
        )}
      </section>

      <section className="mt-8 rounded border border-border p-4">
        <h2 className="text-lg font-medium">Edit partner</h2>
        <form action={updatePartner} className="mt-4 space-y-4">
          <input type="hidden" name="locale" value={locale} />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <label htmlFor="edit-id" className="text-sm font-medium">
                Partner ID <span className="text-destructive">*</span>
              </label>
              <input
                id="edit-id"
                name="id"
                required
                className="w-full rounded border border-border bg-background px-3 py-2 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="edit-name" className="text-sm font-medium">
                Name (English) <span className="text-destructive">*</span>
              </label>
              <input
                id="edit-name"
                name="name"
                required
                className="w-full rounded border border-border bg-background px-3 py-2 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="edit-nameMl" className="text-sm font-medium">
                Name (Malayalam)
              </label>
              <input
                id="edit-nameMl"
                name="nameMl"
                className="w-full rounded border border-border bg-background px-3 py-2 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="edit-link" className="text-sm font-medium">
                Link
              </label>
              <input
                id="edit-link"
                name="link"
                type="url"
                className="w-full rounded border border-border bg-background px-3 py-2 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="edit-logo" className="text-sm font-medium">
                New logo (leave empty to keep current)
              </label>
              <input
                id="edit-logo"
                name="logo"
                type="file"
                accept="image/*"
                className="w-full rounded border border-border bg-background px-3 py-2 text-sm"
              />
            </div>
          </div>
          <Button type="submit">Update</Button>
        </form>
      </section>
    </main>
  );
}
