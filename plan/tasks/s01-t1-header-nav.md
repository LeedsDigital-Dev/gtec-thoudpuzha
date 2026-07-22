# Build sticky header/nav with WhatsApp/Call/Apply/Login CTAs and language switcher

**ID:** `s01-t1`  
**Sprint:** Sprint 1 - Public Marketing Site Core  
**Epic:** Public Marketing Site Core  
**Track:** Frontend  
**Priority:** Must Have  
**Story Points:** 5  
**Depends on:** s00-t4  
**Model tier:** cheap  

## Manual Prerequisites
- [ ] GTEC Thodupuzha's WhatsApp number and phone number confirmed, for wa.me and tel: links
- [ ] G-TEC logo file (SVG/PNG) supplied by the client

## Task Breakdown

```
Read AGENTS.md first. Build the sticky global header used across every public page.

Requirements:
- Build a Header component in components/shared/ rendering: G-TEC logo, "THODUPUZHA" centre label under the logo, primary nav (Home, About, Courses, Placement, Gallery, Resources, Contact), and four CTA buttons: WhatsApp (wa.me link, new tab), Call Now (tel: link), Apply Now (placeholder link to the homepage Enquiry section for now), Login (routes to the Clerk sign-in path from Sprint 0).
- The Header must be sticky and include the LanguageSwitcher built in Sprint 0.
- "Resources" nav item routes to /portal/student (will correctly prompt Clerk sign-in for unauthenticated visitors, per Sprint 0's middleware).
- Mobile: collapse the primary nav into a hamburger menu below a defined breakpoint; keep WhatsApp/Call/Apply/Login CTAs visible or in a fixed bottom bar on small screens.
- Wire the Header into the (public) route group's layout so it appears on every public page — not on (portal) or (admin).

Write tests (Vitest + React Testing Library) covering:
1. The Header renders all four CTA buttons with correct hrefs.
2. The mobile hamburger menu toggles nav visibility on click.
3. The Header is present on a (public) page but does not render inside a (portal) or (admin) placeholder page.

Definition of done: Header renders correctly at desktop and mobile breakpoints, all CTA links are correct, and all 3 tests pass.
```

## Definition of Done
- [ ] Header sticky, all 4 CTAs present with correct links
- [ ] Language switcher visible in header
- [ ] Mobile hamburger menu works
- [ ] Header appears only on (public) pages
- [ ] All 3 tests pass in CI
