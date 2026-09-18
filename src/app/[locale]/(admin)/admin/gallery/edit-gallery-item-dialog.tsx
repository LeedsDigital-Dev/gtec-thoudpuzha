"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { getMediaUrl } from "@/lib/media";
import { Button } from "@/components/ui/button";

interface CategoryOption {
  id: string;
  nameEn: string;
}

interface GalleryItemData {
  id: string;
  categoryId: string;
  mediaType: "IMAGE" | "VIDEO";
  url: string;
  altText?: string | null;
  captionEn: string | null;
  captionMl: string | null;
  sortOrder: number;
}

interface EditGalleryItemDialogProps {
  item: GalleryItemData;
  categories: CategoryOption[];
  locale: string;
  action: (formData: FormData) => Promise<void> | void;
  triggerButton?: ReactNode;
}

export function EditGalleryItemDialog({
  item,
  categories,
  locale,
  action,
  triggerButton,
}: EditGalleryItemDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewFile, setPreviewFile] = useState<string | null>(null);

  const isImage = item.mediaType === "IMAGE";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewFile(URL.createObjectURL(file));
    } else {
      setPreviewFile(null);
    }
  };

  return (
    <>
      <div onClick={() => setIsOpen(true)} className="inline-block">
        {triggerButton ?? (
          <Button type="button" size="xs" variant="outline">
            Edit
          </Button>
        )}
      </div>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs overflow-y-auto"
        >
          <div className="w-full max-w-lg rounded-xl border border-border bg-card p-6 shadow-xl space-y-4 text-left my-8">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-semibold text-foreground">
                {isImage ? "Edit Image Details & SEO" : "Edit Video Details & SEO"}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setPreviewFile(null);
                }}
                className="text-muted-foreground hover:text-foreground text-sm font-semibold p-1 cursor-pointer"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Current / New Media Preview */}
            <div className="flex items-center gap-4 rounded-lg border border-border bg-muted/30 p-3">
              {isImage ? (
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md border border-border bg-background">
                  <Image
                    src={previewFile ?? getMediaUrl(item.url)}
                    alt={item.altText || item.captionEn || "Gallery image"}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-md bg-muted text-xl font-bold text-muted-foreground border border-border">
                  ▶
                </div>
              )}
              <div className="min-w-0 flex-1 space-y-1 text-xs">
                <span className="inline-block rounded bg-primary/10 px-2 py-0.5 font-semibold text-primary uppercase text-[10px]">
                  {item.mediaType}
                </span>
                <p className="font-mono text-muted-foreground truncate">{item.url}</p>
                {previewFile && (
                  <p className="text-primary font-medium">New image selected (preview above)</p>
                )}
              </div>
            </div>

            <form
              action={async (formData) => {
                setIsSubmitting(true);
                try {
                  await action(formData);
                  setIsOpen(false);
                  setPreviewFile(null);
                } finally {
                  setIsSubmitting(false);
                }
              }}
              className="space-y-4"
            >
              <input type="hidden" name="id" value={item.id} />
              <input type="hidden" name="locale" value={locale} />

              {/* Replace image file if IMAGE */}
              {isImage && (
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-foreground">
                    Replace Image File <span className="text-xs text-muted-foreground">(Optional)</span>
                  </label>
                  <input
                    type="file"
                    name="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block w-full text-sm file:mr-3 file:rounded file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-primary-foreground hover:file:cursor-pointer"
                  />
                </div>
              )}

              {/* Video URL if VIDEO */}
              {!isImage && (
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-foreground">
                    Video URL <span className="text-destructive">*</span>
                  </label>
                  <input
                    name="url"
                    type="url"
                    defaultValue={item.url}
                    required
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary"
                  />
                </div>
              )}

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1 sm:col-span-2">
                  <label className="block text-sm font-medium text-foreground">
                    Category
                  </label>
                  <select
                    name="categoryId"
                    defaultValue={item.categoryId}
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nameEn}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Alt Text / SEO Keywords */}
                <div className="space-y-1 sm:col-span-2">
                  <label htmlFor={`edit-alt-${item.id}`} className="block text-sm font-medium text-foreground">
                    Alt Text / SEO Keywords <span className="text-xs text-muted-foreground">(Search indexing & accessibility)</span>
                  </label>
                  <input
                    id={`edit-alt-${item.id}`}
                    name="altText"
                    defaultValue={item.altText ?? ""}
                    placeholder="e.g. G-TEC Thodupuzha Computer Lab Workstations, Python Training"
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary"
                  />
                  <p className="text-[11px] text-muted-foreground">
                    Used as the HTML <code className="font-mono text-primary font-semibold">alt</code> attribute for image SEO search rankings and screen readers.
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-foreground">
                    Caption (English)
                  </label>
                  <input
                    name="captionEn"
                    defaultValue={item.captionEn ?? ""}
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-foreground">
                    Caption (Malayalam)
                  </label>
                  <input
                    name="captionMl"
                    defaultValue={item.captionMl ?? ""}
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="block text-sm font-medium text-foreground">
                    Sort Order
                  </label>
                  <input
                    name="sortOrder"
                    type="number"
                    defaultValue={item.sortOrder}
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsOpen(false);
                    setPreviewFile(null);
                  }}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" size="sm" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
