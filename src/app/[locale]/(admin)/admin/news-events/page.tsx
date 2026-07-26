import { redirect } from "next/navigation";
import { requireRole, Role } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { ConfirmDeleteForm } from "./confirm-delete-form";
import {
  createNewsEvent,
  updateNewsEvent,
  deleteNewsEvent,
  togglePublishNewsEvent,
} from "./actions";

interface NewsEventsPageProps {
  params: Promise<{ locale: string }>;
}

function formatDate(date: Date | null): string {
  if (!date) return "—";
  return date.toISOString().slice(0, 16).replace("T", " ");
}

export default async function NewsEventsPage({
  params,
}: NewsEventsPageProps) {
  const { locale } = await params;
  const authResult = await requireRole([Role.CENTRE_STAFF, Role.SUPER_ADMIN]);

  if (!authResult.authorized) {
    redirect(`/${locale}/forbidden`);
  }

  const items = await prisma.newsEvent.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">News &amp; Events</h1>

      <section className="mt-6 rounded border border-border p-4">
        <h2 className="text-lg font-medium">Create new item</h2>
        <form action={createNewsEvent} className="mt-4 space-y-4">
          <input type="hidden" name="locale" value={locale} />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <label htmlFor="type" className="text-sm font-medium">
                Type <span className="text-destructive">*</span>
              </label>
              <select
                id="type"
                name="type"
                required
                className="w-full rounded border border-border bg-background px-3 py-2 text-sm"
              >
                <option value="NEWS">News</option>
                <option value="EVENT">Event</option>
              </select>
            </div>
            <div className="space-y-1">
              <label htmlFor="titleEn" className="text-sm font-medium">
                Title (English) <span className="text-destructive">*</span>
              </label>
              <input
                id="titleEn"
                name="titleEn"
                required
                className="w-full rounded border border-border bg-background px-3 py-2 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="titleMl" className="text-sm font-medium">
                Title (Malayalam)
              </label>
              <input
                id="titleMl"
                name="titleMl"
                className="w-full rounded border border-border bg-background px-3 py-2 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="eventDate" className="text-sm font-medium">
                Event date
              </label>
              <input
                id="eventDate"
                name="eventDate"
                type="datetime-local"
                className="w-full rounded border border-border bg-background px-3 py-2 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="coverImageUrl" className="text-sm font-medium">
                Cover image URL
              </label>
              <input
                id="coverImageUrl"
                name="coverImageUrl"
                className="w-full rounded border border-border bg-background px-3 py-2 text-sm"
              />
            </div>
            <div className="space-y-1 md:col-span-2">
              <label className="inline-flex items-center gap-2 text-sm font-medium">
                <input type="checkbox" name="publishNow" />
                Publish immediately
              </label>
            </div>
          </div>
          <div className="space-y-1 md:col-span-2">
            <label htmlFor="bodyEn" className="text-sm font-medium">
              Body (English) <span className="text-destructive">*</span>
            </label>
            <textarea
              id="bodyEn"
              name="bodyEn"
              required
              rows={4}
              className="w-full rounded border border-border bg-background px-3 py-2 text-sm"
            />
          </div>
          <div className="space-y-1 md:col-span-2">
            <label htmlFor="bodyMl" className="text-sm font-medium">
              Body (Malayalam)
            </label>
            <textarea
              id="bodyMl"
              name="bodyMl"
              rows={4}
              className="w-full rounded border border-border bg-background px-3 py-2 text-sm"
            />
          </div>
          <Button type="submit">Create</Button>
        </form>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-medium">All items</h2>
        <table className="mt-4 w-full border-collapse border border-border">
          <thead>
            <tr>
              <th className="border border-border px-3 py-2 text-left">Type</th>
              <th className="border border-border px-3 py-2 text-left">Title (EN)</th>
              <th className="border border-border px-3 py-2 text-left">Status</th>
              <th className="border border-border px-3 py-2 text-left">Event date</th>
              <th className="border border-border px-3 py-2 text-left">Published</th>
              <th className="border border-border px-3 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td className="border border-border px-3 py-2">
                  {item.type === "NEWS" ? "News" : "Event"}
                </td>
                <td className="border border-border px-3 py-2">{item.titleEn}</td>
                <td className="border border-border px-3 py-2">
                  {item.publishedAt ? (
                    <span className="text-primary">Published</span>
                  ) : (
                    <span className="text-muted-foreground">Draft</span>
                  )}
                </td>
                <td className="border border-border px-3 py-2">
                  {formatDate(item.eventDate)}
                </td>
                <td className="border border-border px-3 py-2">
                  {formatDate(item.publishedAt)}
                </td>
                <td className="border border-border px-3 py-2">
                  <div className="flex items-center gap-2">
                    <form action={togglePublishNewsEvent}>
                      <input type="hidden" name="id" value={item.id} />
                      <input
                        type="hidden"
                        name="publish"
                        value={String(!item.publishedAt)}
                      />
                      <input type="hidden" name="locale" value={locale} />
                      <Button
                        type="submit"
                        size="xs"
                        variant={item.publishedAt ? "outline" : "default"}
                      >
                        {item.publishedAt ? "Unpublish" : "Publish"}
                      </Button>
                    </form>
                    <ConfirmDeleteForm
                      action={deleteNewsEvent}
                      confirmMessage="Delete this item?"
                    >
                      <input type="hidden" name="id" value={item.id} />
                      <input type="hidden" name="locale" value={locale} />
                      <Button
                        type="submit"
                        size="xs"
                        variant="destructive"
                      >
                        Delete
                      </Button>
                    </ConfirmDeleteForm>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {items.length === 0 && (
          <p className="mt-4 text-muted-foreground">No news or events yet.</p>
        )}
      </section>

      <section className="mt-8 rounded border border-border p-4">
        <h2 className="text-lg font-medium">Edit item</h2>
        <form action={updateNewsEvent} className="mt-4 space-y-4">
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
              <label htmlFor="edit-type" className="text-sm font-medium">
                Type <span className="text-destructive">*</span>
              </label>
              <select
                id="edit-type"
                name="type"
                required
                className="w-full rounded border border-border bg-background px-3 py-2 text-sm"
              >
                <option value="NEWS">News</option>
                <option value="EVENT">Event</option>
              </select>
            </div>
            <div className="space-y-1">
              <label htmlFor="edit-titleEn" className="text-sm font-medium">
                Title (English) <span className="text-destructive">*</span>
              </label>
              <input
                id="edit-titleEn"
                name="titleEn"
                required
                className="w-full rounded border border-border bg-background px-3 py-2 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="edit-titleMl" className="text-sm font-medium">
                Title (Malayalam)
              </label>
              <input
                id="edit-titleMl"
                name="titleMl"
                className="w-full rounded border border-border bg-background px-3 py-2 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="edit-eventDate" className="text-sm font-medium">
                Event date
              </label>
              <input
                id="edit-eventDate"
                name="eventDate"
                type="datetime-local"
                className="w-full rounded border border-border bg-background px-3 py-2 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="edit-coverImageUrl" className="text-sm font-medium">
                Cover image URL
              </label>
              <input
                id="edit-coverImageUrl"
                name="coverImageUrl"
                className="w-full rounded border border-border bg-background px-3 py-2 text-sm"
              />
            </div>
          </div>
          <div className="space-y-1">
            <label htmlFor="edit-bodyEn" className="text-sm font-medium">
              Body (English) <span className="text-destructive">*</span>
            </label>
            <textarea
              id="edit-bodyEn"
              name="bodyEn"
              required
              rows={4}
              className="w-full rounded border border-border bg-background px-3 py-2 text-sm"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="edit-bodyMl" className="text-sm font-medium">
              Body (Malayalam)
            </label>
            <textarea
              id="edit-bodyMl"
              name="bodyMl"
              rows={4}
              className="w-full rounded border border-border bg-background px-3 py-2 text-sm"
            />
          </div>
          <Button type="submit">Update</Button>
        </form>
      </section>
    </main>
  );
}
