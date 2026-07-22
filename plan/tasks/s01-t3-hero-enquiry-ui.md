# Build Hero + Quick Enquiry Form component (reusable, with source tracking)

**ID:** `s01-t3`  
**Sprint:** Sprint 1 - Public Marketing Site Core  
**Epic:** Public Marketing Site Core  
**Track:** Frontend  
**Priority:** Must Have  
**Story Points:** 5  
**Depends on:** s01-t1  
**Model tier:** cheap  

## Manual Prerequisites
- [ ] Final hero copy (headline, subtext, admissions-year eyebrow) from the client — placeholder copy fine if unavailable

## Task Breakdown

```
Read AGENTS.md first. Build the homepage Hero section and the reusable Enquiry Form UI component. This task builds the FRONTEND only (component, client-side validation, a stubbed submit handler that logs to console) — the real backend wiring is the next task in this sprint; leave a clearly marked TODO where it plugs in.

Requirements:
- Build a HeroSection component: eyebrow text, headline, subtext, three CTA buttons (Apply Now, WhatsApp Us, Call Now) — placeholder copy, TODO comment for future Super-Admin-editable content.
- Build a reusable EnquiryForm component in components/shared/ accepting a `source` prop (string): Full name (required), Phone number (required, basic Indian mobile format validation), Course interested in (a select — hardcode a short placeholder list of course names for now, TODO to swap for live data in Sprint 2), Message/query (optional).
- Client-side validation: required fields filled and phone matches a basic pattern before submit; show inline field-level errors.
- On submit, call a stubbed onSubmit handler that logs the payload including `source` — no real API call yet.
- Show inline success/error UI state after "submission" without a page reload; clear the form on success.
- Place HeroSection and EnquiryForm side by side on the homepage (Hero left, Enquiry right), visible above the fold on desktop; stacked on mobile.

Write tests (Vitest + React Testing Library) covering:
1. Submitting with all required fields filled calls the submit handler with the correct payload including `source`.
2. Submitting with a missing required field shows a validation error and does NOT call the submit handler.
3. An invalid phone number format shows a validation error.
4. The EnquiryForm can be rendered twice on the same page with different `source` props without id collisions or state leakage.

Definition of done: Hero + Enquiry render side by side above the fold on desktop, stacked on mobile, client-side validation works, and all 4 tests pass.
```

## Definition of Done
- [ ] HeroSection renders with 3 CTAs and placeholder copy
- [ ] EnquiryForm reusable with source prop, validates required fields + phone format
- [ ] Inline success/error states, no page reload, form clears on success
- [ ] Two EnquiryForm instances on one page don't collide
- [ ] All 4 tests pass in CI
