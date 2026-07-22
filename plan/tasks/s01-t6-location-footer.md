# Build Location/Contact/Footer with Google Map + Reviews embed

**ID:** `s01-t6`  
**Sprint:** Sprint 1 - Public Marketing Site Core  
**Epic:** Public Marketing Site Core  
**Track:** Frontend  
**Priority:** Should Have  
**Story Points:** 3  
**Depends on:** s01-t3, s01-t5  
**Model tier:** cheap  

## Manual Prerequisites
- [ ] Google Maps Embed API key obtained, added as NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY
- [ ] Confirmed centre address for the map pin
- [ ] Social media URLs confirmed by the client
- [ ] Google Reviews approach confirmed (widget vs. simple link)

## Task Breakdown

```
Read AGENTS.md first. Build the Location/Contact/Social section and the site Footer.

Requirements:
- Extend the SiteSettings model (from the previous task) with: address, mapEmbedUrl, social URLs (facebookUrl, instagramUrl, youtubeUrl, linkedinUrl, all nullable), googleReviewsUrl (nullable).
- Build the public Location/Contact/Social section: embedded Google Map iframe, a static contact block (name, address, tel:, wa.me), social icons linking out, and a "Send us a message" button that opens the EnquiryForm in a modal with source="contact_page".
- Build the Footer: logo + address block; "Quick Links" column (Home, About, Courses, Gallery, Placement, News & Events, Contact); "Portals" column (Student Login, Academic Resources, Job Vacancies, My Biodata, Employer Login, Post a Vacancy, Verify Certificate — the last linking OUT to the real gtecadmin.com validation portal); copyright line with the current year computed dynamically, never hardcoded.
- Add the social/map/reviews fields to the /admin/settings/site form (Super Admin only).

Write tests (Vitest) covering:
1. The Footer's copyright year is computed from the current date, not hardcoded.
2. The "Verify Certificate" footer link points to the real external gtecadmin.com URL, not an internal route.
3. Clicking "Send us a message" opens the EnquiryForm modal with source="contact_page".
4. The Google Map iframe renders using the configured embed URL.

Definition of done: the Contact section and Footer are complete and correctly linked, the copyright year is dynamic, and all 4 tests pass.
```

## Definition of Done
- [ ] SiteSettings extended with address/social/map/reviews fields
- [ ] Google Map embeds correctly
- [ ] Contact block + social icons + "Send us a message" modal work
- [ ] Footer Quick Links + Portals columns complete, Verify Certificate links externally
- [ ] Copyright year computed dynamically
- [ ] All 4 tests pass in CI
