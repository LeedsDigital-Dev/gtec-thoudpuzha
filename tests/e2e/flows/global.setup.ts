import { clerkSetup } from "@clerk/testing/playwright";

async function globalSetup() {
  await clerkSetup();
  console.log("Clerk testing token obtained for E2E tests");
}

export default globalSetup;
