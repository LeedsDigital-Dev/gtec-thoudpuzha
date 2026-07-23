import { redirect } from "next/navigation";
import { requireRole, Role } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  moveCategory,
  uploadGalleryImages,
  addVideoItem,
  deleteGalleryItem,
} from "./actions";

interface GalleryPageProps {
  params: Promise<{ locale: string }>;
}

export default async function GalleryPage({ params }: GalleryPageProps) {
  const { locale } = await params;
  const authResult = await requireRole([Role.CENTRE_STAFF, Role.SUPER_ADMIN]);

  if (!authResult.authorized) {
    redirect(`/${locale}/forbidden`);
  }

  const [categories, items] = await Promise.all([
    prisma.galleryCategory.findMany({
      orderBy: { sortOrder: "asc" },
      include: { _count: { select: { items: true } } },
    }),
    prisma.galleryItem.findMany({
      orderBy: [{ categoryId: "asc" }, { sortOrder: "asc" }],
      include: { category: true },
    }),
  ]);

  const itemsByCategory = new Map<string, typeof items>();
  for (const item of items) {
    const group = itemsByCategory.get(item.categoryId) ?? [];
    group.push(item);
    itemsByCategory.set(item.categoryId, group);
  }

  return (
    <main className="p-6 space-y-10">
      <h1 className="text-2xl font-semibold">Gallery</h1>

      {/* ── Categories ── */}
      <section className="rounded border border-border p-4">
        <h2 className="text-lg font-medium">Gallery Categories</h2>

        <form action={createCategory} className="mt-4 flex flex-wrap items-end gap-3">
          <input type="hidden" name="locale" value={locale} />
          <div>
            <label htmlFor="cat-nameEn" className="block text-sm font-medium">
              Name (English) <span className="text-destructive">*</span>
            </label>
            <input
              id="cat-nameEn"
              name="nameEn"
              required
              className="mt-1 rounded border border-border bg-background px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label htmlFor="cat-nameMl" className="block text-sm font-medium">
              Name (Malayalam)
            </label>
            <input
              id="cat-nameMl"
              name="nameMl"
              className="mt-1 rounded border border-border bg-background px-3 py-2 text-sm"
            />
          </div>
          <Button type="submit">Add Category</Button>
        </form>

        {categories.length > 0 && (
          <table className="mt-4 w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-3 py-2 text-left">Order</th>
                <th className="border border-gray-300 px-3 py-2 text-left">English</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Malayalam</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Items</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat, index) => (
                <tr key={cat.id}>
                  <td className="border border-gray-300 px-3 py-2">
                    <div className="flex items-center gap-1">
                      <form action={moveCategory}>
                        <input type="hidden" name="id" value={cat.id} />
                        <input type="hidden" name="direction" value="up" />
                        <input type="hidden" name="locale" value={locale} />
                        <Button type="submit" size="icon-xs" variant="outline" disabled={index === 0} aria-label="Move up">↑</Button>
                      </form>
                      <form action={moveCategory}>
                        <input type="hidden" name="id" value={cat.id} />
                        <input type="hidden" name="direction" value="down" />
                        <input type="hidden" name="locale" value={locale} />
                        <Button type="submit" size="icon-xs" variant="outline" disabled={index === categories.length - 1} aria-label="Move down">↓</Button>
                      </form>
                      <span className="ml-1 text-xs">{cat.sortOrder}</span>
                    </div>
                  </td>
                  <td className="border border-gray-300 px-3 py-2">{cat.nameEn}</td>
                  <td className="border border-gray-300 px-3 py-2">{cat.nameMl || "—"}</td>
                  <td className="border border-gray-300 px-3 py-2">{cat._count.items}</td>
                  <td className="border border-gray-300 px-3 py-2">
                    <form
                      action={deleteCategory}
                      onSubmit={(e) => {
                        if (cat._count.items > 0) {
                          const ok = confirm(
                            `Delete "${cat.nameEn}" and all ${cat._count.items} items in it?`,
                          );
                          if (!ok) e.preventDefault();
                        }
                      }}
                    >
                      <input type="hidden" name="id" value={cat.id} />
                      <input type="hidden" name="nameEn" value={cat.nameEn} />
                      <input type="hidden" name="locale" value={locale} />
                      <Button type="submit" size="xs" variant="destructive">Delete</Button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {categories.length === 0 && (
          <p className="mt-4 text-muted-foreground">No categories yet.</p>
        )}
      </section>

      {/* ── Media management per category ── */}
      {categories.map((cat) => {
        const catItems = itemsByCategory.get(cat.id) ?? [];

        return (
          <section key={cat.id} className="rounded border border-border p-4">
            <h2 className="text-lg font-medium">{cat.nameEn}</h2>

            {/* Bulk image upload */}
            <div className="mt-4 rounded border border-border bg-muted/30 p-4">
              <h3 className="text-sm font-medium">Upload Images</h3>
              <form action={uploadGalleryImages} className="mt-2 space-y-3">
                <input type="hidden" name="locale" value={locale} />
                <input type="hidden" name="categoryId" value={cat.id} />
                <div>
                  <label htmlFor={`files-${cat.id}`} className="text-xs font-medium">
                    Select images (multi-file)
                  </label>
                  <input
                    id={`files-${cat.id}`}
                    type="file"
                    name="files"
                    multiple
                    accept="image/*"
                    required
                    className="mt-1 block w-full text-sm file:mr-3 file:rounded file:border-0 file:bg-primary file:px-3 file:py-1 file:text-xs file:text-primary-foreground"
                  />
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <label htmlFor={`capEn-${cat.id}`} className="text-xs font-medium">
                      Caption (English)
                    </label>
                    <input
                      id={`capEn-${cat.id}`}
                      name="captionEn"
                      className="mt-1 w-full rounded border border-border bg-background px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor={`capMl-${cat.id}`} className="text-xs font-medium">
                      Caption (Malayalam)
                    </label>
                    <input
                      id={`capMl-${cat.id}`}
                      name="captionMl"
                      className="mt-1 w-full rounded border border-border bg-background px-3 py-2 text-sm"
                    />
                  </div>
                </div>
                <Button type="submit" size="sm">Upload</Button>
              </form>
            </div>

            {/* Add video URL */}
            <div className="mt-4 rounded border border-border bg-muted/30 p-4">
              <h3 className="text-sm font-medium">Add Video URL</h3>
              <form action={addVideoItem} className="mt-2 space-y-3">
                <input type="hidden" name="locale" value={locale} />
                <input type="hidden" name="categoryId" value={cat.id} />
                <div>
                  <label htmlFor={`vidUrl-${cat.id}`} className="text-xs font-medium">
                    External video URL <span className="text-destructive">*</span>
                  </label>
                  <input
                    id={`vidUrl-${cat.id}`}
                    name="url"
                    type="url"
                    required
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="mt-1 w-full rounded border border-border bg-background px-3 py-2 text-sm"
                  />
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <label htmlFor={`vidCapEn-${cat.id}`} className="text-xs font-medium">
                      Caption (English)
                    </label>
                    <input
                      id={`vidCapEn-${cat.id}`}
                      name="captionEn"
                      className="mt-1 w-full rounded border border-border bg-background px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor={`vidCapMl-${cat.id}`} className="text-xs font-medium">
                      Caption (Malayalam)
                    </label>
                    <input
                      id={`vidCapMl-${cat.id}`}
                      name="captionMl"
                      className="mt-1 w-full rounded border border-border bg-background px-3 py-2 text-sm"
                    />
                  </div>
                </div>
                <Button type="submit" size="sm" variant="secondary">Add Video</Button>
              </form>
            </div>

            {/* Items list */}
            {catItems.length > 0 ? (
              <table className="mt-4 w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-3 py-2 text-left">Type</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">URL / Key</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Caption</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Sort</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {catItems.map((item) => (
                    <tr key={item.id}>
                      <td className="border border-gray-300 px-3 py-2 text-xs">
                        {item.mediaType}
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-xs font-mono max-w-[200px] truncate">
                        {item.url}
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-xs">
                        {item.captionEn || "—"}
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-xs">
                        {item.sortOrder}
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        <form
                          action={deleteGalleryItem}
                          onSubmit={(e) => {
                            if (!confirm("Delete this item?")) e.preventDefault();
                          }}
                        >
                          <input type="hidden" name="id" value={item.id} />
                          <input type="hidden" name="locale" value={locale} />
                          <Button type="submit" size="xs" variant="destructive">Delete</Button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="mt-4 text-xs text-muted-foreground">No items yet.</p>
            )}
          </section>
        );
      })}
    </main>
  );
}
