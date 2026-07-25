"use client";

import type { ReactNode } from "react";

interface ConfirmDeleteFormProps {
  action: (formData: FormData) => void | Promise<void>;
  confirmMessage: string;
  children: ReactNode;
  className?: string;
}

export function ConfirmDeleteForm({
  action,
  confirmMessage,
  children,
  className,
}: ConfirmDeleteFormProps) {
  return (
    <form
      action={action}
      className={className}
      onSubmit={(e) => {
        if (!confirm(confirmMessage)) {
          e.preventDefault();
        }
      }}
    >
      {children}
    </form>
  );
}
