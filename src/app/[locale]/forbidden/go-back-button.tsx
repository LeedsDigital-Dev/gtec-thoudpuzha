"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function GoBackButton() {
  return (
    <Button
      type="button"
      variant="outline"
      size="lg"
      className="w-full sm:w-auto gap-2"
      onClick={() => {
        if (window.history.length > 1) {
          window.history.back();
        } else {
          window.location.href = "/";
        }
      }}
    >
      <ArrowLeft className="size-4" />
      <span>Go Back</span>
    </Button>
  );
}
