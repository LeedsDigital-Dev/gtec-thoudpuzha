import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forbidden",
};

export default function ForbiddenPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-semibold">403 — Forbidden</h1>
        <p className="mt-2 text-gray-600">
          You do not have permission to access this page.
        </p>
      </div>
    </div>
  );
}
