"use client";

import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface EditCategoryDialogProps {
  category: {
    id: string;
    nameEn: string;
    nameMl: string | null;
  };
  locale: string;
  action: (formData: FormData) => Promise<void> | void;
  triggerButton?: ReactNode;
}

export function EditCategoryDialog({
  category,
  locale,
  action,
  triggerButton,
}: EditCategoryDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
        >
          <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-xl space-y-4 text-left">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-semibold text-foreground">
                Edit Category
              </h3>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground text-sm font-semibold p-1"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <form
              action={async (formData) => {
                setIsSubmitting(true);
                try {
                  await action(formData);
                  setIsOpen(false);
                } finally {
                  setIsSubmitting(false);
                }
              }}
              className="space-y-4"
            >
              <input type="hidden" name="id" value={category.id} />
              <input type="hidden" name="locale" value={locale} />

              <div className="space-y-1">
                <label className="block text-sm font-medium text-foreground">
                  Name (English) <span className="text-destructive">*</span>
                </label>
                <input
                  name="nameEn"
                  defaultValue={category.nameEn}
                  required
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-foreground">
                  Name (Malayalam)
                </label>
                <input
                  name="nameMl"
                  defaultValue={category.nameMl ?? ""}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsOpen(false)}
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
