# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: pdf-download.spec.ts >> PDF download flow — WebKit engine >> PDF API endpoint returns 401 when unauthenticated
- Location: tests/e2e/pdf-download.spec.ts:4:7

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/en/api/biodata/nonexistent/pdf
Call log:
  - navigating to "http://localhost:3000/en/api/biodata/nonexistent/pdf", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test.describe("PDF download flow — WebKit engine", () => {
  4  |   test("PDF API endpoint returns 401 when unauthenticated", async ({
  5  |     page,
  6  |   }) => {
> 7  |     const response = await page.goto(
     |                                 ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/en/api/biodata/nonexistent/pdf
  8  |       "/en/api/biodata/nonexistent/pdf",
  9  |     );
  10 |     // Without auth, Clerk redirects to sign-in, so we get a 200 on the sign-in page
  11 |     // or a redirect. Check the response status is a redirect toward sign-in.
  12 |     expect(response?.status()).toBe(200);
  13 |     expect(page.url()).toContain("sign-in");
  14 |   });
  15 | 
  16 |   test("biodata page contains link/button to PDF download for authenticated user", async ({
  17 |     page,
  18 |   }) => {
  19 |     // Public view: the sign-in page redirects unauthenticated users.
  20 |     // This test verifies the route exists and redirects to auth properly.
  21 |     const response = await page.goto("/en/portal/student/biodata");
  22 |     expect(response?.status()).toBe(200);
  23 |     expect(page.url()).toContain("sign-in");
  24 |   });
  25 | });
  26 | 
```