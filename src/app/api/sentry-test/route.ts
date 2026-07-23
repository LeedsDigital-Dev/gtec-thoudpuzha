import * as Sentry from "@sentry/nextjs";
import { NextResponse } from "next/server";

/**
 * Test endpoint to verify Sentry is receiving events from production.
 *
 * Call this after deployment, then check the Sentry dashboard for the
 * captured message and error. Remove this file once confirmed working
 * (or disable in production by checking NODE_ENV).
 *
 * Usage: GET /api/sentry-test
 */
export async function GET() {
  if (process.env.NODE_ENV === "production") {
    Sentry.captureMessage("Sentry test message — production verified", {
      level: "info",
      tags: { test: "sentry-prod-verification" },
    });

    Sentry.captureException(
      new Error("Sentry test error — production verified"),
      { tags: { test: "sentry-prod-verification" } },
    );
  } else {
    Sentry.captureMessage("Sentry test message (non-production)");
  }

  return NextResponse.json({ ok: true, sent: true });
}
