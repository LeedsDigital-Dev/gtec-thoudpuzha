import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { closeExpiredJobPostings } from "@/inngest/functions/close-expired-job-postings";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [closeExpiredJobPostings],
});
