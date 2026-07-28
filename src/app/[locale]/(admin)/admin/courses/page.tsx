import { redirect } from "next/navigation";
import { requireRole, Role } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import {
  createCategory,
  updateCategory as _updateCategory,
  deleteCategory,
  moveCategory,
  createCourse,
  updateCourse,
  deleteCourse,
  uploadCourseImage,
} from "./actions";

interface CoursesPageProps {
  params: Promise<{ locale: string }>;
}

function _formatDate(d: Date): string {
  return d.toISOString().slice(0, 16);
}

export default async function CoursesPage({ params }: CoursesPageProps) {
  const { locale } = await params;
  const authResult = await requireRole([Role.CENTRE_STAFF, Role.SUPER_ADMIN]);

  if (!authResult.authorized) {
    redirect(`/${locale}/forbidden`);
  }

  const [categories, courses] = await Promise.all([
    prisma.courseCategory.findMany({
      orderBy: { sortOrder: "asc" },
      include: { _count: { select: { courses: true } } },
    }),
    prisma.course.findMany({
      orderBy: { createdAt: "desc" },
      include: { category: true },
    }),
  ]);

  return (
    <main className="p-6 space-y-10">
      <h1 className="text-2xl font-semibold">Courses</h1>

      {/* ── Categories ── */}
      <section className="rounded border border-border p-4">
        <h2 className="text-lg font-medium">Course Categories</h2>

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
          <table className="mt-4 w-full border-collapse border border-border">
            <thead>
              <tr>
                <th className="border border-border px-3 py-2 text-left">Order</th>
                <th className="border border-border px-3 py-2 text-left">English</th>
                <th className="border border-border px-3 py-2 text-left">Malayalam</th>
                <th className="border border-border px-3 py-2 text-left">Courses</th>
                <th className="border border-border px-3 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat, index) => (
                <tr key={cat.id}>
                  <td className="border border-border px-3 py-2">
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
                  <td className="border border-border px-3 py-2">{cat.nameEn}</td>
                  <td className="border border-border px-3 py-2">{cat.nameMl || "—"}</td>
                  <td className="border border-border px-3 py-2">{cat._count.courses}</td>
                  <td className="border border-border px-3 py-2">
                    <form action={deleteCategory}>
                      <input type="hidden" name="id" value={cat.id} />
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

      {/* ── Create Course ── */}
      <section className="rounded border border-border p-4">
        <h2 className="text-lg font-medium">Create Course</h2>
        <form action={createCourse} className="mt-4 space-y-4">
          <input type="hidden" name="locale" value={locale} />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <label htmlFor="co-titleEn" className="text-sm font-medium">Title (English) <span className="text-destructive">*</span></label>
              <input id="co-titleEn" name="titleEn" required className="w-full rounded border border-border bg-background px-3 py-2 text-sm" />
            </div>
            <div className="space-y-1">
              <label htmlFor="co-titleMl" className="text-sm font-medium">Title (Malayalam)</label>
              <input id="co-titleMl" name="titleMl" className="w-full rounded border border-border bg-background px-3 py-2 text-sm" />
            </div>
            <div className="space-y-1">
              <label htmlFor="co-slug" className="text-sm font-medium">Slug (auto-generated if empty)</label>
              <input id="co-slug" name="slug" className="w-full rounded border border-border bg-background px-3 py-2 text-sm" />
            </div>
            <div className="space-y-1">
              <label htmlFor="co-categoryId" className="text-sm font-medium">Category</label>
              <select id="co-categoryId" name="categoryId" className="w-full rounded border border-border bg-background px-3 py-2 text-sm">
                <option value="">— None —</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.nameEn}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1 md:col-span-2">
              <label htmlFor="co-descriptionEn" className="text-sm font-medium">Description (English)</label>
              <textarea id="co-descriptionEn" name="descriptionEn" rows={3} className="w-full rounded border border-border bg-background px-3 py-2 text-sm" />
            </div>
            <div className="space-y-1 md:col-span-2">
              <label htmlFor="co-descriptionMl" className="text-sm font-medium">Description (Malayalam)</label>
              <textarea id="co-descriptionMl" name="descriptionMl" rows={3} className="w-full rounded border border-border bg-background px-3 py-2 text-sm" />
            </div>
            <div className="space-y-1">
              <label htmlFor="co-durationText" className="text-sm font-medium">Duration</label>
              <input id="co-durationText" name="durationText" className="w-full rounded border border-border bg-background px-3 py-2 text-sm" />
            </div>
            <div className="space-y-1">
              <label htmlFor="co-certifications" className="text-sm font-medium">Certifications (comma-separated)</label>
              <input id="co-certifications" name="certifications" className="w-full rounded border border-border bg-background px-3 py-2 text-sm" />
            </div>
            <div className="space-y-1 md:col-span-2">
              <label htmlFor="co-careerOutcomesEn" className="text-sm font-medium">Career Outcomes (English)</label>
              <textarea id="co-careerOutcomesEn" name="careerOutcomesEn" rows={2} className="w-full rounded border border-border bg-background px-3 py-2 text-sm" />
            </div>
            <div className="space-y-1 md:col-span-2">
              <label htmlFor="co-careerOutcomesMl" className="text-sm font-medium">Career Outcomes (Malayalam)</label>
              <textarea id="co-careerOutcomesMl" name="careerOutcomesMl" rows={2} className="w-full rounded border border-border bg-background px-3 py-2 text-sm" />
            </div>
            <div className="space-y-1">
              <label htmlFor="co-syllabus" className="text-sm font-medium">Syllabus (JSON)</label>
              <textarea id="co-syllabus" name="syllabus" rows={3} className="w-full rounded border border-border bg-background px-3 py-2 text-sm font-mono" placeholder='[{"topic":"Introduction","hours":4}]' />
            </div>
            <div className="space-y-1">
              <label htmlFor="co-status" className="text-sm font-medium">Status</label>
              <select id="co-status" name="status" className="w-full rounded border border-border bg-background px-3 py-2 text-sm">
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <input id="co-featured" name="featured" type="checkbox" className="h-4 w-4" />
              <label htmlFor="co-featured" className="text-sm font-medium">Featured</label>
            </div>
          </div>
          <Button type="submit">Create Course</Button>
        </form>
      </section>

      {/* ── Course List ── */}
      <section>
        <h2 className="text-lg font-medium">All Courses</h2>
        {courses.length > 0 ? (
          <table className="mt-4 w-full border-collapse border border-border">
            <thead>
              <tr>
                <th className="border border-border px-3 py-2 text-left">Title</th>
                <th className="border border-border px-3 py-2 text-left">Slug</th>
                <th className="border border-border px-3 py-2 text-left">Category</th>
                <th className="border border-border px-3 py-2 text-left">Status</th>
                <th className="border border-border px-3 py-2 text-left">Featured</th>
                <th className="border border-border px-3 py-2 text-left">Cover Image</th>
                <th className="border border-border px-3 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id}>
                  <td className="border border-border px-3 py-2">{course.titleEn}</td>
                  <td className="border border-border px-3 py-2 text-xs font-mono">{course.slug}</td>
                  <td className="border border-border px-3 py-2">{course.category?.nameEn || "—"}</td>
                  <td className="border border-border px-3 py-2">{course.status}</td>
                  <td className="border border-border px-3 py-2">{course.featured ? "Yes" : "No"}</td>
                  <td className="border border-border px-3 py-2">
                    {course.coverImageUrl ? (
                      <span className="text-xs">{course.coverImageUrl}</span>
                    ) : (
                      <span className="text-muted-foreground text-xs">—</span>
                    )}
                  </td>
                  <td className="border border-border px-3 py-2">
                    <div className="flex flex-col gap-2">
                      <a
                        href={`/${locale}/admin/courses/${course.id}/content`}
                        className="text-xs text-primary hover:underline"
                      >
                        Edit Content
                      </a>
                      {/* Upload cover image */}
                      <form action={uploadCourseImage} className="flex items-center gap-2">
                        <input type="hidden" name="courseId" value={course.id} />
                        <input type="hidden" name="locale" value={locale} />
                        <input type="file" name="coverImage" accept="image/*" className="text-xs" />
                        <Button type="submit" size="xs" variant="outline">Upload Cover</Button>
                      </form>
                      {/* Edit form inline */}
                      <details>
                        <summary className="cursor-pointer text-xs text-primary">Edit</summary>
                        <form action={updateCourse} className="mt-2 space-y-2 border border-border rounded p-2">
                          <input type="hidden" name="id" value={course.id} />
                          <input type="hidden" name="locale" value={locale} />
                          <input name="titleEn" defaultValue={course.titleEn} className="w-full rounded border border-border px-2 py-1 text-xs" placeholder="Title EN" required />
                          <input name="titleMl" defaultValue={course.titleMl ?? ""} className="w-full rounded border border-border px-2 py-1 text-xs" placeholder="Title ML" />
                          <input name="slug" defaultValue={course.slug} className="w-full rounded border border-border px-2 py-1 text-xs" placeholder="Slug" required />
                          <select name="categoryId" defaultValue={course.categoryId ?? ""} className="w-full rounded border border-border px-2 py-1 text-xs">
                            <option value="">— None —</option>
                            {categories.map((cat) => (
                              <option key={cat.id} value={cat.id}>{cat.nameEn}</option>
                            ))}
                          </select>
                          <textarea name="descriptionEn" defaultValue={course.descriptionEn ?? ""} rows={2} className="w-full rounded border border-border px-2 py-1 text-xs" placeholder="Description EN" />
                          <textarea name="descriptionMl" defaultValue={course.descriptionMl ?? ""} rows={2} className="w-full rounded border border-border px-2 py-1 text-xs" placeholder="Description ML" />
                          <input name="durationText" defaultValue={course.durationText ?? ""} className="w-full rounded border border-border px-2 py-1 text-xs" placeholder="Duration" />
                          <input name="certifications" defaultValue={course.certifications.join(", ")} className="w-full rounded border border-border px-2 py-1 text-xs" placeholder="Certifications (comma-sep)" />
                          <textarea name="careerOutcomesEn" defaultValue={course.careerOutcomesEn ?? ""} rows={2} className="w-full rounded border border-border px-2 py-1 text-xs" placeholder="Career Outcomes EN" />
                          <textarea name="careerOutcomesMl" defaultValue={course.careerOutcomesMl ?? ""} rows={2} className="w-full rounded border border-border px-2 py-1 text-xs" placeholder="Career Outcomes ML" />
                          <textarea name="syllabus" defaultValue={course.syllabus ? JSON.stringify(course.syllabus, null, 2) : ""} rows={3} className="w-full rounded border border-border px-2 py-1 text-xs font-mono" placeholder="Syllabus JSON" />
                          <select name="status" defaultValue={course.status} className="w-full rounded border border-border px-2 py-1 text-xs">
                            <option value="DRAFT">Draft</option>
                            <option value="PUBLISHED">Published</option>
                            <option value="ARCHIVED">Archived</option>
                          </select>
                          <label className="flex items-center gap-2 text-xs">
                            <input type="checkbox" name="featured" defaultChecked={course.featured} />
                            Featured
                          </label>
                          <Button type="submit" size="xs">Save</Button>
                        </form>
                        <form action={deleteCourse} className="mt-2">
                          <input type="hidden" name="id" value={course.id} />
                          <input type="hidden" name="locale" value={locale} />
                          <Button type="submit" size="xs" variant="destructive">Delete</Button>
                        </form>
                      </details>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="mt-4 text-muted-foreground">No courses yet.</p>
        )}
      </section>
    </main>
  );
}
