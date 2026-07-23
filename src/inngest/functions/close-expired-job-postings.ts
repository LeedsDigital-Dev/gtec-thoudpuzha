import { closeExpiredPostings } from "@/lib/services/close-expired-postings";
import { inngest } from "@/inngest/client";

export const closeExpiredJobPostings = inngest.createFunction(
  {
    id: "close-expired-job-postings",
    name: "Close Expired Job Postings",
    triggers: [{ cron: "0 0 * * *" }],
  },
  async ({ step }) =>
    step.run("close-expired", () => closeExpiredPostings()),
);
