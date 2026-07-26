import { redirect } from "next/navigation";
import { requireRole, Role } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import {
  createFlashNews,
  updateFlashNews,
  deleteFlashNews,
  toggleFlashNewsActive,
  moveFlashNews,
} from "./actions";

interface FlashNewsPageProps {
  params: Promise<{ locale: string }>;
}

function formatLocalDateTime(date: Date | null): string {
  if (!date) return "";
  const iso = date.toISOString();
  return iso.slice(0, 16);
}

function isExpired(expiresAt: Date | null): boolean {
  if (!expiresAt) return false;
  return new Date() > expiresAt;
}

export default async function FlashNewsPage({ params }: FlashNewsPageProps) {
  const { locale } = await params;
  const authResult = await requireRole([Role.CENTRE_STAFF, Role.SUPER_ADMIN]);

  if (!authResult.authorized) {
    redirect(`/${locale}/forbidden`);
  }

  const items = await prisma.flashNewsItem.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Flash News</h1>

      <section className="mt-6 rounded border border-border p-4">
        <h2 className="text-lg font-medium">Create new item</h2>
        <form action={createFlashNews} className="mt-4 space-y-4">
          <input type="hidden" name="locale" value={locale} />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <label htmlFor="textEn" className="text-sm font-medium">
                Text (English) <span className="text-destructive">*</span>
              </label>
              <input
                id="textEn"
                name="textEn"
                required
                className="w-full rounded border border-border bg-background px-3 py-2 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="textMl" className="text-sm font-medium">
                Text (Malayalam)
              </label>
              <input
                id="textMl"
                name="textMl"
                className="w-full rounded border border-border bg-background px-3 py-2 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="link" className="text-sm font-medium">
                Link
              </label>
              <input
                id="link"
                name="link"
                type="url"
                className="w-full rounded border border-border bg-background px-3 py-2 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="expiresAt" className="text-sm font-medium">
                Expires at
              </label>
              <input
                id="expiresAt"
                name="expiresAt"
                type="datetime-local"
                className="w-full rounded border border-border bg-background px-3 py-2 text-sm"
              />
            </div>
          </div>
          <Button type="submit">Create</Button>
        </form>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-medium">All items</h2>
        <table className="mt-4 w-full border-collapse border border-border">
          <thead>
            <tr>
              <th className="border border-border px-3 py-2 text-left">Order</th>
              <th className="border border-border px-3 py-2 text-left">English</th>
              <th className="border border-border px-3 py-2 text-left">Malayalam</th>
              <th className="border border-border px-3 py-2 text-left">Link</th>
              <th className="border border-border px-3 py-2 text-left">Status</th>
              <th className="border border-border px-3 py-2 text-left">Expires</th>
              <th className="border border-border px-3 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr
                key={item.id}
                className={
                  !item.active || isExpired(item.expiresAt)
                    ? "bg-muted/50 text-muted-foreground"
                    : ""
                }
              >
                <td className="border border-border px-3 py-2">
                  <div className="flex items-center gap-1">
                    <form action={moveFlashNews}>
                      <input type="hidden" name="id" value={item.id} />
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
                    <form action={moveFlashNews}>
                      <input type="hidden" name="id" value={item.id} />
                      <input type="hidden" name="direction" value="down" />
                      <input type="hidden" name="locale" value={locale} />
                      <Button
                        type="submit"
                        size="icon-xs"
                        variant="outline"
                        disabled={index === items.length - 1}
                        aria-label="Move down"
                      >
                        ↓
                      </Button>
                    </form>
                    <span className="ml-2 text-xs">{item.sortOrder}</span>
                  </div>
                </td>
                <td className="border border-border px-3 py-2">{item.textEn}</td>
                <td className="border border-border px-3 py-2">
                  {item.textMl || "—"}
                </td>
                <td className="border border-border px-3 py-2">
                  {item.link ? (
                    <a
                      href={item.link}
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
                <td className="border border-border px-3 py-2">
                  <form action={toggleFlashNewsActive}>
                    <input type="hidden" name="id" value={item.id} />
                    <input
                      type="hidden"
                      name="active"
                      value={String(!item.active)}
                    />
                    <input type="hidden" name="locale" value={locale} />
                    <Button
                      type="submit"
                      size="xs"
                      variant={item.active ? "default" : "outline"}
                    >
                      {item.active ? "Active" : "Inactive"}
                    </Button>
                  </form>
                </td>
                <td className="border border-border px-3 py-2">
                  {item.expiresAt ? (
                    <>
                      {formatLocalDateTime(item.expiresAt)}
                      {isExpired(item.expiresAt) && (
                        <span className="ml-2 text-xs text-destructive">
                          expired
                        </span>
                      )}
                    </>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="border border-border px-3 py-2">
                  <div className="flex items-center gap-2">
                    <form action={deleteFlashNews}>
                      <input type="hidden" name="id" value={item.id} />
                      <input type="hidden" name="locale" value={locale} />
                      <Button type="submit" size="xs" variant="destructive">
                        Delete
                      </Button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {items.length === 0 && (
          <p className="mt-4 text-muted-foreground">No flash news items yet.</p>
        )}
      </section>

      <section className="mt-8 rounded border border-border p-4">
        <h2 className="text-lg font-medium">Edit item</h2>
        <form action={updateFlashNews} className="mt-4 space-y-4">
          <input type="hidden" name="locale" value={locale} />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <label htmlFor="edit-id" className="text-sm font-medium">
                Item ID <span className="text-destructive">*</span>
              </label>
              <input
                id="edit-id"
                name="id"
                required
                className="w-full rounded border border-border bg-background px-3 py-2 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="edit-textEn" className="text-sm font-medium">
                Text (English) <span className="text-destructive">*</span>
              </label>
              <input
                id="edit-textEn"
                name="textEn"
                required
                className="w-full rounded border border-border bg-background px-3 py-2 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="edit-textMl" className="text-sm font-medium">
                Text (Malayalam)
              </label>
              <input
                id="edit-textMl"
                name="textMl"
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
            <div className="space-y-1 md:col-span-2">
              <label className="inline-flex items-center gap-2 text-sm font-medium">
                <input type="checkbox" name="active" defaultChecked />
                Active
              </label>
            </div>
            <div className="space-y-1">
              <label htmlFor="edit-expiresAt" className="text-sm font-medium">
                Expires at
              </label>
              <input
                id="edit-expiresAt"
                name="expiresAt"
                type="datetime-local"
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
