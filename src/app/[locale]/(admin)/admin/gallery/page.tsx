import Image from "next/image";
import { redirect } from "next/navigation";
import { requireRole, Role } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getMediaUrl } from "@/lib/media";
import { Button } from "@/components/ui/button";
import { ConfirmDeleteForm } from "./confirm-delete-form";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  moveCategory,
  uploadGalleryImages,
  addVideoItem,
  updateGalleryItem,
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

  const isSuperAdmin = authResult.role === Role.SUPER_ADMIN;

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
    <main className="p-4 sm:p-6 lg:p-8 space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Gallery</h1>
        {!isSuperAdmin && (
          <span className="rounded bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
            Read-only (Super Admin required to edit)
          </span>
        )}
      </div>

      {/* ── Categories ── */}
      <section className="rounded border border-border p-4">
        <h2 className="text-lg font-medium">Gallery Categories</h2>

        {isSuperAdmin && (
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
        )}

        {categories.length > 0 && (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto mt-4">
              <table className="w-full border-collapse border border-border">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="border border-border px-3 py-2 text-left">Order</th>
                    <th className="border border-border px-3 py-2 text-left">English</th>
                    <th className="border border-border px-3 py-2 text-left">Malayalam</th>
                    <th className="border border-border px-3 py-2 text-left">Items</th>
                    {isSuperAdmin && (
                      <th className="border border-border px-3 py-2 text-left">Actions</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {categories.map((cat, index) => (
                    <tr key={cat.id}>
                      <td className="border border-border px-3 py-2">
                        {isSuperAdmin ? (
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
                            <span className="ml-1 text-sm">{cat.sortOrder}</span>
                          </div>
                        ) : (
                          <span className="text-sm font-mono">{cat.sortOrder}</span>
                        )}
                      </td>
                      <td className="border border-border px-3 py-2 font-medium">{cat.nameEn}</td>
                      <td className="border border-border px-3 py-2">{cat.nameMl || "—"}</td>
                      <td className="border border-border px-3 py-2">{cat._count.items}</td>
                      {isSuperAdmin && (
                        <td className="border border-border px-3 py-2">
                          <div className="flex items-center gap-2">
                            <details className="relative">
                              <summary className="cursor-pointer text-sm text-primary font-medium">Edit</summary>
                              <form action={updateCategory} className="absolute right-0 top-6 z-20 w-80 rounded border border-border bg-card p-3 shadow-lg space-y-2 text-left">
                                <input type="hidden" name="id" value={cat.id} />
                                <input type="hidden" name="locale" value={locale} />
                                <div>
                                  <label className="block text-sm font-medium text-foreground mb-0.5">Name (English) *</label>
                                  <input name="nameEn" defaultValue={cat.nameEn} required className="w-full rounded border border-border px-2 py-1 text-sm bg-background" />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-foreground mb-0.5">Name (Malayalam)</label>
                                  <input name="nameMl" defaultValue={cat.nameMl ?? ""} className="w-full rounded border border-border px-2 py-1 text-sm bg-background" />
                                </div>
                                <Button type="submit" size="xs" className="w-full">Save Changes</Button>
                              </form>
                            </details>
                            <ConfirmDeleteForm
                              action={deleteCategory}
                              confirmMessage={
                                cat._count.items > 0
                                  ? `Delete "${cat.nameEn}" and all ${cat._count.items} items in it?`
                                  : `Delete "${cat.nameEn}"?`
                              }
                            >
                              <input type="hidden" name="id" value={cat.id} />
                              <input type="hidden" name="nameEn" value={cat.nameEn} />
                              <input type="hidden" name="locale" value={locale} />
                              <Button type="submit" size="xs" variant="destructive">Delete</Button>
                            </ConfirmDeleteForm>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="space-y-3 mt-4 md:hidden">
              {categories.map((cat, index) => (
                <div key={cat.id} className="rounded-lg border border-border bg-card p-4 space-y-3 shadow-xs">
                  <div className="flex items-start justify-between gap-2 border-b pb-2">
                    <div className="min-w-0 flex-1">
                      <span className="font-semibold text-foreground text-sm block leading-snug">{cat.nameEn}</span>
                      {cat.nameMl && <span className="text-sm text-muted-foreground block">{cat.nameMl}</span>}
                    </div>
                    <span className="shrink-0 whitespace-nowrap rounded bg-primary/10 px-2 py-0.5 text-sm font-semibold uppercase tracking-wider text-primary">
                      {cat._count.items} items
                    </span>
                  </div>

                  <div className="pt-2 border-t space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1 text-sm">
                        <span className="text-muted-foreground mr-1">Order ({cat.sortOrder}):</span>
                        {isSuperAdmin && (
                          <>
                            <form action={moveCategory}>
                              <input type="hidden" name="id" value={cat.id} />
                              <input type="hidden" name="direction" value="up" />
                              <input type="hidden" name="locale" value={locale} />
                              <Button type="submit" size="icon-xs" variant="outline" disabled={index === 0}>↑</Button>
                            </form>
                            <form action={moveCategory}>
                              <input type="hidden" name="id" value={cat.id} />
                              <input type="hidden" name="direction" value="down" />
                              <input type="hidden" name="locale" value={locale} />
                              <Button type="submit" size="icon-xs" variant="outline" disabled={index === categories.length - 1}>↓</Button>
                            </form>
                          </>
                        )}
                        {!isSuperAdmin && <span className="font-mono">{cat.sortOrder}</span>}
                      </div>

                      {isSuperAdmin && (
                        <ConfirmDeleteForm
                          action={deleteCategory}
                          confirmMessage={
                            cat._count.items > 0
                              ? `Delete "${cat.nameEn}" and all ${cat._count.items} items in it?`
                              : `Delete "${cat.nameEn}"?`
                          }
                        >
                          <input type="hidden" name="id" value={cat.id} />
                          <input type="hidden" name="nameEn" value={cat.nameEn} />
                          <input type="hidden" name="locale" value={locale} />
                          <Button type="submit" size="xs" variant="destructive">Delete</Button>
                        </ConfirmDeleteForm>
                      )}
                    </div>

                    {isSuperAdmin && (
                      <details className="pt-1 border-t">
                        <summary className="cursor-pointer text-sm font-medium text-primary py-1">Edit Category</summary>
                        <form action={updateCategory} className="mt-2 space-y-2.5 border border-border rounded p-3 bg-muted/20 text-left">
                          <input type="hidden" name="id" value={cat.id} />
                          <input type="hidden" name="locale" value={locale} />
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-1">Name (English) *</label>
                            <input name="nameEn" defaultValue={cat.nameEn} required className="w-full rounded border border-border px-2 py-1.5 text-sm bg-background" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-1">Name (Malayalam)</label>
                            <input name="nameMl" defaultValue={cat.nameMl ?? ""} className="w-full rounded border border-border px-2 py-1.5 text-sm bg-background" />
                          </div>
                          <Button type="submit" size="xs" className="w-full">Save Changes</Button>
                        </form>
                      </details>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
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

            {isSuperAdmin && (
              <>
                {/* Bulk image upload */}
                <div className="mt-4 rounded border border-border bg-muted/30 p-4">
                  <h3 className="text-sm font-medium">Upload Images</h3>
                  <form action={uploadGalleryImages} className="mt-2 space-y-3">
                    <input type="hidden" name="locale" value={locale} />
                    <input type="hidden" name="categoryId" value={cat.id} />
                    <div>
                      <label htmlFor={`files-${cat.id}`} className="text-sm font-medium">
                        Select images (multi-file)
                      </label>
                      <input
                        id={`files-${cat.id}`}
                        type="file"
                        name="files"
                        multiple
                        accept="image/*"
                        required
                        className="mt-1 block w-full text-sm file:mr-3 file:rounded file:border-0 file:bg-primary file:px-3 file:py-1 file:text-sm file:text-primary-foreground"
                      />
                    </div>
                    <div className="grid gap-3 md:grid-cols-2">
                      <div>
                        <label htmlFor={`capEn-${cat.id}`} className="text-sm font-medium">
                          Caption (English)
                        </label>
                        <input
                          id={`capEn-${cat.id}`}
                          name="captionEn"
                          className="mt-1 w-full rounded border border-border bg-background px-3 py-2 text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor={`capMl-${cat.id}`} className="text-sm font-medium">
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
                      <label htmlFor={`vidUrl-${cat.id}`} className="text-sm font-medium">
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
                        <label htmlFor={`vidCapEn-${cat.id}`} className="text-sm font-medium">
                          Caption (English)
                        </label>
                        <input
                          id={`vidCapEn-${cat.id}`}
                          name="captionEn"
                          className="mt-1 w-full rounded border border-border bg-background px-3 py-2 text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor={`vidCapMl-${cat.id}`} className="text-sm font-medium">
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
              </>
            )}

            {/* Items list */}
            {catItems.length > 0 ? (
              <>
                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto mt-4">
                  <table className="w-full border-collapse border border-border">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="border border-border px-3 py-2 text-left">Preview</th>
                        <th className="border border-border px-3 py-2 text-left">Type</th>
                        <th className="border border-border px-3 py-2 text-left">URL / Key</th>
                        <th className="border border-border px-3 py-2 text-left">Caption</th>
                        <th className="border border-border px-3 py-2 text-left">Sort</th>
                        {isSuperAdmin && (
                          <th className="border border-border px-3 py-2 text-left">Actions</th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {catItems.map((item) => (
                        <tr key={item.id}>
                          <td className="border border-border px-3 py-2">
                            {item.mediaType === "IMAGE" ? (
                              <Image
                                src={getMediaUrl(item.url)}
                                alt={item.captionEn || "Gallery image"}
                                width={40}
                                height={40}
                                unoptimized
                                className="h-10 w-10 rounded object-cover border border-border shrink-0 bg-muted"
                              />
                            ) : (
                              <span className="flex h-10 w-10 items-center justify-center rounded bg-muted text-xs font-bold shrink-0 text-muted-foreground">
                                ▶
                              </span>
                            )}
                          </td>
                          <td className="border border-border px-3 py-2 text-sm font-medium">
                            {item.mediaType}
                          </td>
                          <td className="border border-border px-3 py-2 text-sm font-mono max-w-[200px] truncate">
                            {item.url}
                          </td>
                          <td className="border border-border px-3 py-2 text-sm">
                            {item.captionEn || "—"}
                          </td>
                          <td className="border border-border px-3 py-2 text-sm font-mono">
                            {item.sortOrder}
                          </td>
                          {isSuperAdmin && (
                            <td className="border border-border px-3 py-2">
                              <div className="flex items-center gap-2">
                                <details className="relative">
                                  <summary className="cursor-pointer text-sm text-primary font-medium">Edit</summary>
                                  <form action={updateGalleryItem} className="absolute right-0 top-6 z-20 w-80 rounded border border-border bg-card p-3 shadow-lg space-y-2 text-left">
                                    <input type="hidden" name="id" value={item.id} />
                                    <input type="hidden" name="locale" value={locale} />
                                    <div>
                                      <label className="block text-sm font-medium text-foreground mb-0.5">Category</label>
                                      <select name="categoryId" defaultValue={item.categoryId} className="w-full rounded border border-border px-2 py-1 text-sm bg-background">
                                        {categories.map((c) => (
                                          <option key={c.id} value={c.id}>{c.nameEn}</option>
                                        ))}
                                      </select>
                                    </div>
                                    <div>
                                      <label className="block text-sm font-medium text-foreground mb-0.5">Caption (English)</label>
                                      <input name="captionEn" defaultValue={item.captionEn ?? ""} className="w-full rounded border border-border px-2 py-1 text-sm bg-background" />
                                    </div>
                                    <div>
                                      <label className="block text-sm font-medium text-foreground mb-0.5">Caption (Malayalam)</label>
                                      <input name="captionMl" defaultValue={item.captionMl ?? ""} className="w-full rounded border border-border px-2 py-1 text-sm bg-background" />
                                    </div>
                                    <div>
                                      <label className="block text-sm font-medium text-foreground mb-0.5">Sort Order</label>
                                      <input name="sortOrder" type="number" defaultValue={item.sortOrder} className="w-full rounded border border-border px-2 py-1 text-sm bg-background" />
                                    </div>
                                    {item.mediaType === "VIDEO" && (
                                      <div>
                                        <label className="block text-sm font-medium text-foreground mb-0.5">Video URL</label>
                                        <input name="url" type="url" defaultValue={item.url} required className="w-full rounded border border-border px-2 py-1 text-sm bg-background" />
                                      </div>
                                    )}
                                    <Button type="submit" size="xs" className="w-full">Save Changes</Button>
                                  </form>
                                </details>
                                <ConfirmDeleteForm
                                  action={deleteGalleryItem}
                                  confirmMessage="Delete this item?"
                                >
                                  <input type="hidden" name="id" value={item.id} />
                                  <input type="hidden" name="locale" value={locale} />
                                  <Button type="submit" size="xs" variant="destructive">Delete</Button>
                                </ConfirmDeleteForm>
                              </div>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card View */}
                <div className="space-y-3 mt-4 md:hidden">
                  {catItems.map((item) => (
                    <div key={item.id} className="rounded-lg border border-border bg-card p-4 space-y-3 shadow-xs">
                      <div className="flex items-center justify-between border-b pb-2">
                        <span className="font-semibold text-foreground text-sm truncate">{item.captionEn || "Untitled Item"}</span>
                        <span className="rounded bg-muted px-2 py-0.5 text-xs font-mono text-muted-foreground">{item.mediaType}</span>
                      </div>

                      <div className="flex items-start gap-3">
                        {item.mediaType === "IMAGE" ? (
                          <Image
                            src={getMediaUrl(item.url)}
                            alt={item.captionEn || "Gallery image"}
                            width={56}
                            height={56}
                            unoptimized
                            className="h-14 w-14 rounded object-cover border border-border shrink-0 bg-muted"
                          />
                        ) : (
                          <span className="flex h-14 w-14 items-center justify-center rounded bg-muted text-base font-bold shrink-0 text-muted-foreground">
                            ▶
                          </span>
                        )}
                        <div className="min-w-0 flex-1 space-y-1 text-xs text-muted-foreground">
                          <div className="truncate font-mono text-foreground">{item.url}</div>
                          <div className="flex justify-between">
                            <span>Sort Order: <span className="font-mono font-medium text-foreground">{item.sortOrder}</span></span>
                          </div>
                        </div>
                      </div>

                      {isSuperAdmin && (
                        <div className="pt-2 border-t space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <ConfirmDeleteForm
                              action={deleteGalleryItem}
                              confirmMessage="Delete this item?"
                            >
                              <input type="hidden" name="id" value={item.id} />
                              <input type="hidden" name="locale" value={locale} />
                              <Button type="submit" size="xs" variant="destructive" className="w-full">Delete Item</Button>
                            </ConfirmDeleteForm>
                          </div>

                          <details className="pt-1 border-t">
                            <summary className="cursor-pointer text-sm font-medium text-primary py-1">Edit Item</summary>
                            <form action={updateGalleryItem} className="mt-2 space-y-2.5 border border-border rounded p-3 bg-muted/20 text-left">
                              <input type="hidden" name="id" value={item.id} />
                              <input type="hidden" name="locale" value={locale} />
                              <div>
                                <label className="block text-sm font-medium text-foreground mb-1">Category</label>
                                <select name="categoryId" defaultValue={item.categoryId} className="w-full rounded border border-border px-2 py-1.5 text-sm bg-background">
                                  {categories.map((c) => (
                                    <option key={c.id} value={c.id}>{c.nameEn}</option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-foreground mb-1">Caption (English)</label>
                                <input name="captionEn" defaultValue={item.captionEn ?? ""} className="w-full rounded border border-border px-2 py-1.5 text-sm bg-background" />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-foreground mb-1">Caption (Malayalam)</label>
                                <input name="captionMl" defaultValue={item.captionMl ?? ""} className="w-full rounded border border-border px-2 py-1.5 text-sm bg-background" />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-foreground mb-1">Sort Order</label>
                                <input name="sortOrder" type="number" defaultValue={item.sortOrder} className="w-full rounded border border-border px-2 py-1.5 text-sm bg-background" />
                              </div>
                              {item.mediaType === "VIDEO" && (
                                <div>
                                  <label className="block text-sm font-medium text-foreground mb-1">Video URL</label>
                                  <input name="url" type="url" defaultValue={item.url} required className="w-full rounded border border-border px-2 py-1.5 text-sm bg-background" />
                                </div>
                              )}
                              <Button type="submit" size="xs" className="w-full">Save Changes</Button>
                            </form>
                          </details>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="mt-4 text-sm text-muted-foreground">No items yet.</p>
            )}
          </section>
        );
      })}
    </main>
  );
}
