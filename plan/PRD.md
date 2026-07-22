# Product Requirements Document
## GTEC Thodupuzha — Official Branch Website & Placement Platform

| | |
|---|---|
| **Client** | G-TEC Thodupuzha (branch of G-TEC Education) |
| **Document Type** | Product Requirements Document (PRD) |
| **Version** | 1.0 (Draft for client review) |
| **Date** | 20 July 2026 |
| **Source Inputs** | Client feature brief, wireframe (`wireframe.pdf`), clarification Q&A, gteceducation.com (parent brand reference) |
| **Status** | Draft — pending client sign-off on Section 4 (Open Items) before development starts |

---

## 1. Introduction & Purpose

G-TEC Education is a 25-year-old, ISO-certified global IT education network with 800+ centres across 23 countries, operating under a central brand (gteceducation.com) that covers company-wide information, all centres, and global placements.

This PRD covers a **standalone website for the Thodupuzha branch specifically** — not a replacement for the central GTEC site, but a centre-level site that combines:
1. A **marketing/lead-generation front** (courses, about, placements, gallery, news) tailored to the Thodupuzha centre, near DePaul School.
2. A **Student Portal** for enrolled students (academic resources, biodata/profile).
3. A **two-sided Job Portal** connecting Thodupuzha students/alumni and the general public (job seekers) with employers.
4. A **tiered Admin Panel** so centre staff can manage day-to-day content without developer involvement, with Super Admin oversight.

This document translates the client's feature list and wireframe into detailed, buildable functional and non-functional requirements, data models, user flows, and an admin/content governance model.

---

## 2. Goals & Objectives

| Goal | Description |
|---|---|
| **Lead generation** | Convert website visitors into course enquiries via a prominent, always-visible enquiry form. |
| **Brand credibility** | Present Thodupuzha centre with the same polish/trust signals as the parent brand (stats, certifications, global network) while being locally specific (address, contact, local events). |
| **Student self-service** | Give enrolled students 24/7 access to study material, timetables, progress, and a single structured profile they maintain once and reuse everywhere (job applications, PDF resume). |
| **Placement engine** | Actively connect students/alumni AND external job seekers with local/regional employers, and let employers self-serve (register, post jobs, search candidates) with light-touch centre oversight. |
| **Low-friction content operations** | Let non-technical centre staff update news, gallery, flash bar, and courses without code changes, while a Super Admin retains quality control via a moderation queue. |

---

## 3. Scope

### 3.1 In Scope
- Public marketing website (all sections per wireframe: Hero, Enquiry, At a Glance, About, Why Choose Us, Courses, Placement & Support, Gallery, Certification Partners, News & Events, Location/Contact, Footer).
- Flash news ticker, centrally controlled from admin panel.
- Unified authentication system (Clerk) supporting three logical account types: **Student**, **Job Seeker (non-student)**, **Employer** — plus internal **Centre Staff** and **Super Admin** accounts.
- Student Portal: academic resources (read-only content delivery) + biodata/profile builder with PDF export.
- Job Portal: employer registration, vacancy posting with moderation, public/portal job listings, one-click apply from saved biodata, employer-side candidate search.
- Two-tier Admin Panel (Super Admin + Centre Staff) with a content moderation/approval queue and an auto-publish override.
- Bilingual UI: English and Malayalam.
- Integration link-out to the existing `gtecadmin.com` certificate verification portal (no native re-build of that system).
- Responsive design (mobile, tablet, desktop) — the wireframe and G-TEC's own site are heavily mobile-consumed (WhatsApp/Call CTAs in the sticky header confirm this).

### 3.2 Out of Scope (this phase) — see also Section 19, Risks
- Online fee/tuition payment gateway (not mentioned in brief; the parent site has a separate "Pay Now" flow — assumed out of scope unless confirmed).
- Native certificate issuance/verification engine (we link out to `gtecadmin.com` instead).
- LMS-grade features: quizzes, auto-grading, live class hosting, video streaming infrastructure (Student Portal "video lectures" is assumed to be **hosted/embedded content**, e.g., YouTube unlisted / Vimeo / cloud storage links, not a custom video platform — **flagged as an open item**, see 4.2).
- Multi-branch/multi-centre management (this build is Thodupuzha-only; not the national GTEC network).
- Native mobile apps (iOS/Android) — responsive web only.
- Payroll/HRMS-grade applicant tracking for employers (kanban pipelines, interview scheduling) — the employer portal is scoped to post → view applicants → contact, not a full ATS.

---

## 4. Assumptions & Open Items Requiring Client Confirmation

These do not block starting design/architecture, but should be confirmed before or during Sprint 1 of development, as they affect data modeling and third-party costs.

| # | Item | Assumption Made | Needs Confirmation |
|---|---|---|---|
| 4.1 | Hosting split | Domain/DNS via Hostinger; application deployed on **either** Vercel **or** Cloudflare Pages | Client to pick one target host — Vercel is the natural fit for Next.js (native support, ISR, image optimization); Cloudflare Pages is cheaper at scale but needs `next-on-pages` adapter. **Recommendation: Vercel**, unless budget dictates Cloudflare. |
| 4.2 | Video lectures | Videos are uploaded to a third-party host (YouTube unlisted/Vimeo) and embedded, not self-hosted | Confirm video volume/size expectations to avoid storage/bandwidth cost surprises |
| 4.3 | Student ID source | New students are enrolled by Centre Staff in the Admin Panel first (name + Student ID + phone/email), and the student then "claims" that record via self-service signup + OTP verification matched against the ID | Confirm whether Student IDs already exist in an external GTEC system (e.g. gtecadmin.com) that we should integrate/import from, or whether they're issued fresh at this centre |
| 4.4 | Auto-publish scope | Auto-publish is a **trust flag** — configurable at two levels: (a) globally per content type (e.g., "Gallery uploads by Centre Staff auto-publish"), and (b) per employer ("this employer's postings auto-publish without review") | Confirm this two-level design matches intent, or if auto-publish should work differently (e.g., time-delay auto-approval) |
| 4.5 | Skills field for students | Client's field list for Student Biodata doesn't include a "Skills" field (though the wireframe mockup does). Since the employer-supplied skills taxonomy is meant to help *students* understand employer demand, we recommend **adding an optional multi-select Skills field** to the biodata form, sourced from the same growing taxonomy | Confirm inclusion |
| 4.6 | Payment | No online payments mentioned | Confirm truly out of scope for v1 |
| 4.7 | Data hosting/location | Since PII (phone, email, DOB, address, photos) is collected from minors' parents/adults and companies, standard data protection practice (India — DPDP Act 2023) applies | Confirm data residency preference and whether a Privacy Policy / consent checkbox is required at signup (recommended: yes) |
| 4.8 | Notifications | Not explicitly requested | Recommend transactional email (and optionally SMS/WhatsApp) for: enquiry received, application submitted, job posting approved/rejected, new job match — confirm which are must-have for v1 vs later |

---

## 5. User Roles & Personas

| Role | Description | Auth Type |
|---|---|---|
| **Visitor** | Anonymous public user browsing the marketing site | None |
| **Student** | Verified G-TEC Thodupuzha enrollee/alumnus with a Student ID | Clerk — role: `student` |
| **Job Seeker** | Member of the public (not a G-TEC student) who registers to search/apply for jobs | Clerk — role: `job_seeker` |
| **Employer** | Company representative who registers to post vacancies and search candidates | Clerk — role: `employer` |
| **Centre Staff** | Thodupuzha centre employee who manages day-to-day content (courses, gallery, news, flash bar) and moderates submissions within permission limits | Clerk — role: `centre_staff` (internal, provisioned by Super Admin, not self-registered) |
| **Super Admin** | Agency/centre owner-level account with full control, including publishing approval, staff management, and system-wide settings | Clerk — role: `super_admin` (internal) |

> **Design note:** "Student" and "Job Seeker" are the *same underlying account/profile type* (both fill the Biodata form and both can browse/apply to jobs) — the only difference is that a Student record is linked to a verified Student ID and unlocks two additional fields (Course Completed, Certification Earned) plus access to the Student Portal (academic resources). This is modeled as one `candidate` profile with an `is_verified_student: boolean` flag rather than two separate systems, so switching a job seeker into a verified student later (e.g., they enrol) doesn't require a new account.

---

## 6. Technical Architecture Overview

### 6.1 Proposed Stack
| Layer | Technology | Notes |
|---|---|---|
| Framework | **Next.js** (App Router) | Per client requirement |
| Authentication | **Clerk** | Per client requirement. Use Clerk's custom roles/metadata for `student`, `job_seeker`, `employer`, `centre_staff`, `super_admin`. Clerk **Organizations** can model each Employer as an "org" if multiple company reps need shared access later. |
| Database | PostgreSQL (recommend **Neon** or **Supabase**, both integrate cleanly with Vercel/Next.js) | Not specified by client — flagged as a recommendation, needs sign-off |
| ORM | Prisma or Drizzle | Standard pairing with Next.js + Postgres |
| File/image storage | Cloudflare R2 or UploadThing (profile photos, gallery images, biodata photo uploads, partner logos) | Needs a CDN-backed object store; local filesystem storage won't work on Vercel's serverless/ephemeral environment |
| PDF generation | Server-side (e.g., `@react-pdf/renderer` or Puppeteer/Playwright on a serverless function) for "Download Biodata as PDF" | |
| Search (candidate/job search) | Postgres full-text search initially; can graduate to a dedicated search service (e.g., Algolia/Meilisearch) if candidate volume grows | |
| i18n | `next-intl` or Next.js built-in i18n routing for English/Malayalam | |
| Hosting | Vercel (recommended) or Cloudflare Pages — see Open Item 4.1 | |
| Domain/DNS | Hostinger | |
| Notifications | Resend/SendGrid (email); optional WhatsApp Business API or Twilio (SMS/WhatsApp) — see Open Item 4.8 | |

### 6.2 Authentication & Route Protection Model
- Clerk middleware protects all `/portal/*` routes.
- On first sign-up, user selects intent: **"I am a G-TEC Thodupuzha student"** vs **"I am a job seeker"** vs **"I am an employer"** — this determines which onboarding form they see next (see Section 9).
- Centre Staff and Super Admin accounts are **not self-registerable** — they are invited/provisioned directly by a Super Admin from within the Admin Panel (Clerk invitation flow).
- Role is stored in Clerk's `publicMetadata` and mirrored in the application database for query/join convenience.

### 6.3 Internationalization (English / Malayalam)
- All public-facing marketing content, form labels, portal UI, and system emails should support both languages via a language switcher (likely in the navbar, consistent with the sticky header pattern in the wireframe).
- **Recommendation:** Admin-managed content (course descriptions, news, gallery captions) should have **per-language fields** in the CMS (i.e., Centre Staff enter both an English and Malayalam version), rather than relying on machine translation, to preserve accuracy for official communication.
- Form validation messages, buttons, and static UI strings are translated once as part of the build (standard i18n dictionary).

### 6.4 Information Architecture Note (Important Structural Decision)
The wireframe presents all 13 sections — including Student Portal, Biodata Form, and Employer Portal — as one continuously scrolling page. **We recommend NOT implementing it that way.** Sections 1–6 and 10–13 (Hero through Why Choose Us, and Gallery through Footer) are public marketing content and belong on the public homepage/marketing pages. Sections 7, 8, and 9 (Student Portal, Biodata Form, Employer Portal) require authentication and distinct, focused UI (dashboards, tables, forms with save states) — cramming them into the public homepage as inline reveal panels would hurt both SEO and usability. Recommended architecture:

- **Public site** (`/`, `/about`, `/courses`, `/courses/[slug]`, `/placement`, `/gallery`, `/news`, `/news/[slug]`, `/contact`) — statically generated where possible for SEO and speed.
- **Authenticated portal** (`/portal/student`, `/portal/student/biodata`, `/portal/jobs`, `/portal/jobs/[id]`, `/portal/employer`, `/portal/employer/post-vacancy`, `/portal/employer/candidates`) — behind Clerk auth, rendered dynamically.
- **Admin** (`/admin/...`) — behind Clerk auth + role check (`centre_staff` or `super_admin` only).

The homepage retains **teasers/CTAs** into the portal sections (e.g., a "Student Portal" card with a "Login" button that routes to `/portal/student`), preserving the wireframe's intent and visual flow without technically embedding gated content on a public page.

---

## 7. Information Architecture / Sitemap

```
Public Site
├── / (Home: Hero+Enquiry, At a Glance, About teaser, Why Choose Us, Courses teaser,
│      Placement teaser, News teaser, Location/Contact, Footer)
├── /about (full About page)
├── /courses (all courses, filterable by category)
│   └── /courses/[slug] (course detail: certifications, duration, syllabus, career outcomes, Enquire CTA)
├── /placement (Placement & Support: job fair photos, events, industry tie-ups + link to /portal/jobs)
├── /gallery (categorized: Programme Photos / Videos / Celebrations / Seminars)
├── /news (Latest News + Upcoming Events, paginated)
│   └── /news/[slug]
├── /contact (Location, contact form, map, social)
└── /privacy-policy, /terms (standard legal pages)

Authenticated Portal (Clerk-protected)
├── /portal/sign-up, /portal/sign-in (role selection: Student / Job Seeker / Employer)
├── /portal/student
│   ├── /portal/student (dashboard: resources tiles + quick links)
│   ├── /portal/student/resources/notes
│   ├── /portal/student/resources/lectures
│   ├── /portal/student/resources/assignments
│   ├── /portal/student/resources/progress
│   ├── /portal/student/resources/timetable
│   ├── /portal/student/resources/past-papers
│   └── /portal/student/biodata (also used by non-student Job Seekers, minus 2 fields)
├── /portal/jobs (browse/search all active vacancies — visible to Student + Job Seeker roles)
│   └── /portal/jobs/[id] (detail + 1-click Apply)
├── /portal/employer
│   ├── /portal/employer (dashboard: my postings, applicant counts)
│   ├── /portal/employer/register (if not yet completed)
│   ├── /portal/employer/post-vacancy
│   └── /portal/employer/candidates (search/browse student & job-seeker biodata)

Admin Panel (Clerk-protected, role = centre_staff | super_admin)
├── /admin (dashboard: pending approvals count, recent activity)
├── /admin/flash-news
├── /admin/courses (CRUD, categories)
├── /admin/gallery (CRUD, categories)
├── /admin/certification-partners (CRUD)
├── /admin/news-events (CRUD)
├── /admin/students (view/provision Student ID records)
├── /admin/employers (view, verify, set auto-publish trust flag)
├── /admin/job-postings (moderation queue: approve/reject/edit)
├── /admin/skills-taxonomy (view/merge/clean employer-submitted skill tags)
├── /admin/staff (Super Admin only — invite/manage Centre Staff, set permissions)
└── /admin/settings (Super Admin only — global auto-publish toggles per content type, site-wide settings)
```

---

## 8. Functional Requirements — Public Marketing Site

### 8.1 Global Navigation & Header
- **Sticky header** containing: G-TEC logo, "THODUPUZHA" centre label under the logo, primary nav (Home, About, Courses, Placement, Gallery, Resources, Contact), and four persistent CTA buttons: **WhatsApp**, **Call Now** (tel: link, displays phone number), **Apply Now**, **Login**.
- "Login" opens the unified Clerk sign-in (auto-routes to the correct portal dashboard based on stored role after authentication).
- "Resources" nav item routes to `/portal/student` (prompts login if not authenticated) — represents the Student Portal entry point from the main nav, matching the wireframe's footer "Portals" column intent.
- Mobile: collapses into a hamburger menu; the WhatsApp/Call/Apply/Login buttons remain visible or collapse into a fixed bottom bar on small screens (mobile-first, since click-to-call/WhatsApp are primary conversion actions for this audience).
- Language switcher (EN / ML) placed in the header.

### 8.2 Flash News Bar
- Horizontal scrolling ticker directly below the header, showing short admin-entered announcements (e.g., Job Fair, Exam Notifications, New Course Launch, Scholarship updates).
- **Admin control:** Centre Staff/Super Admin can add, edit, reorder, enable/disable, and set an optional expiry date per flash item from `/admin/flash-news`. Expired items auto-hide (no need to manually delete).
- Each flash item optionally links to a relevant page (e.g., a News detail page or the Job Portal).
- Multiple simultaneous items scroll/rotate in the ticker; empty state (no active items) collapses the bar entirely rather than showing a blank strip.

### 8.3 Hero Section + Quick Enquiry Form
**Hero (left column):**
- Eyebrow text: "Admissions open — [dynamic academic year, e.g., 2026–27]" (admin-editable)
- Headline: "Build Your Career with G-TEC Thodupuzha" (admin-editable)
- Subtext: location line + years of excellence + certifications blurb (admin-editable)
- Three CTA buttons: **Apply Now**, **WhatsApp Us**, **Call Now**

**Quick Enquiry Form (right column, always visible above the fold):**

| Field | Type | Required | Notes |
|---|---|---|---|
| Full name | text | Yes | |
| Phone number | tel | Yes | Format-validated (Indian mobile) |
| Course interested in | select (dropdown) | Yes | Options populated live from the Courses list managed in `/admin/courses` |
| Message / query | textarea | No | |

- Submit posts to a leads table and triggers a notification email to Centre Staff (and optionally auto-reply confirmation to the user — see 4.8).
- Success/error states shown inline (no page reload); on success, form clears and shows a thank-you confirmation.
- This same enquiry form component is reused elsewhere (course detail pages, "Send us a message" in the Contact section) — build as a shared component with a `source` field so admins can see where each lead originated (Hero, Course Page, Contact Page, etc.).

### 8.4 GTEC At a Glance
- Five stat tiles: Years of experience, Students trained, Centres worldwide, Affiliations, Countries — mirrors the parent brand's real figures (25 years, 3.2M+ students, 800+ centres, 100+ affiliations, 23 countries per gteceducation.com).
- **Admin control:** Since these are company-wide (not Thodupuzha-specific) figures, recommend these be editable by Super Admin only (Centre Staff shouldn't casually change brand-wide claims), via `/admin/settings`.

### 8.5 About GTEC Thodupuzha
- Centre photo/campus image (upload via admin) + short descriptive copy (bilingual, admin-editable rich text) + two secondary buttons: "Vision & Mission" and "Read More" (both route to the full `/about` page, potentially to specific anchors/sections on it).

### 8.6 Why Choose GTEC
- Three static value-proposition cards with icon, title, and short description (per wireframe: International Certifications, Placement Support, Global Network). Recommend making these admin-editable (icon selection from a small fixed icon set + title + description) so Centre Staff can adjust messaging without a developer, rather than hardcoding.

### 8.7 Courses
- Grid of course category cards (per wireframe: Software, Finance & Business, Multimedia, Hardware & Networking, Robotics & AI, CAD — matches the parent site's course taxonomy, so we recommend keeping category names consistent with gteceducation.com for brand consistency, while content itself is written fresh for Thodupuzha per Open Item 4/Answer 3.1).
- Each card shows: category name, short blurb, duration range (e.g., "3–6 months"), and a badge for the primary certification body (SAP, Tally, Adobe, Cisco, Autodesk, etc.).
- Clicking a card routes to `/courses/[slug]` showing: full description, list of certifications offered, duration, detailed syllabus, career opportunities, and an "Enquire" CTA (pre-fills the Course field in the enquiry form).
- **Admin control (`/admin/courses`):** Centre Staff can create/edit/archive course categories and individual course entries: name, description (bilingual), duration, certification badge(s), syllabus (rich text or structured list), career outcomes, cover image, and a "featured" flag for homepage display. New courses immediately become selectable in the Enquiry form's "Course interested in" dropdown and in the Student Biodata "Course Completed" dropdown.

### 8.8 Placement & Support
- Media grid: Job Fair photos, Centre Events, Industry Tie-ups (image/short-video cards). Content sourced from the same underlying Gallery system (filtered to a "Placement" category) to avoid maintaining two duplicate media systems — recommend Placement & Support reuses `/admin/gallery` content tagged appropriately, rather than being a separate admin module.
- Includes a CTA banner into the Job Portal ("View current vacancies" → `/portal/jobs`, "Are you hiring? Post a vacancy" → employer registration).

### 8.9 Gallery
- Tabbed categories: Programme Photos, Videos, Celebrations, Seminars — **plus admin-addable categories** (not a fixed list).
- Grid layout with lightbox on click; video tiles play inline or link out to hosted video (see 4.2).
- **Admin control (`/admin/gallery`):** create/rename/delete categories; upload/caption/reorder/delete media items within a category; bulk upload support recommended given events generate many photos at once.

### 8.10 Certification Partners
- Logo strip (Adobe, SAP, Tally, Microsoft, Cisco, Autodesk, EC-Council, Zoho, Meta, etc., matching the parent site's affiliation list).
- **Admin control (`/admin/certification-partners`):** add/remove partner logo + name + optional link to the partner's official page; drag-to-reorder.

### 8.11 News & Upcoming Events
- **Latest News** list (Exam notifications, Scholarship updates, Placement updates, New course launches) with a "View all news" link to `/news`.
- **Upcoming Events** card (e.g., Job Fair) with date and a small poster/thumbnail.
- **Admin control (`/admin/news-events`):** Centre Staff create posts with a type tag (News / Event), title, body (bilingual rich text), cover image, and optional event date/location for Event-type posts. Published items appear in both the homepage teaser and the `/news` listing.

### 8.12 Location, Contact & Social
- Embedded Google Map (centred on "Near DePaul School, Thodupuzha").
- Static contact block: centre name, address, phone (click-to-call), WhatsApp link.
- Social icons (Facebook, Instagram, YouTube, LinkedIn) — admin-editable URLs.
- Embedded Google Reviews widget.
- "Send us a message" button opens the shared enquiry form (see 8.3) in a modal, or routes to `/contact`.

### 8.13 Footer
- Logo + centre address block.
- **Quick Links** column: Home, About, Courses, Gallery, Placement, News & Events, Contact.
- **Portals** column: Student Login, Academic Resources, Job Vacancies, My Biodata, Employer Login, Post a Vacancy, Verify Certificate (this last one links out to `gtecadmin.com`'s validation portal per Open Item confirmation in Section 4).
- Copyright line with dynamic year + Privacy Policy link.

---

## 9. Functional Requirements — Authentication & Account System

### 9.1 Sign-Up Flow
On visiting `/portal/sign-up` (or clicking Login/Apply/Post a Vacancy from anywhere on the public site), the user is first asked to choose:

1. **"I'm a G-TEC Thodupuzha student"** → Student verification sub-flow (9.2)
2. **"I'm looking for a job"** (job seeker, non-student) → Standard Clerk sign-up (email/phone + OTP or password) → redirected to complete the Biodata form (Section 10.2) minus the two student-only fields
3. **"I'm an employer looking to hire"** → Standard Clerk sign-up → redirected to Employer Registration form (Section 11.1)

### 9.2 Student ID Verification Sub-Flow
1. Centre Staff pre-provisions a lightweight record in `/admin/students` when a student enrolls: Student ID, full name, phone number (minimum viable record — this can also be bulk-imported via CSV if the centre has an existing enrolment spreadsheet, recommended as a v1 admin feature to ease onboarding of existing student backlog).
2. The student visits the public sign-up, selects "I'm a student," enters their **Student ID + registered phone number**.
3. System matches against the Centre Staff-provisioned record. On match, an OTP is sent to the phone number on file; entering it correctly creates/links the Clerk account and marks `is_verified_student = true`.
4. On mismatch (wrong ID or unrecognized number), the user is shown a message directing them to contact the centre (WhatsApp/Call CTA surfaced inline) rather than silently failing.
5. Once verified, the student is redirected to complete the remainder of their Biodata profile (Course Completed / Certification Earned dropdowns unlock) and gains access to `/portal/student` academic resources.

### 9.3 Role & Permission Summary

| Capability | Visitor | Job Seeker | Student | Employer | Centre Staff | Super Admin |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| View public site | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Submit enquiry | ✅ | ✅ | ✅ | — | — | — |
| Browse/apply to jobs | — | ✅ | ✅ | — | — | — |
| Access academic resources | — | — | ✅ | — | — | — |
| Fill/edit Biodata | — | ✅ (partial fields) | ✅ (full fields) | — | — | — |
| Register company / post vacancy | — | — | — | ✅ (pending approval) | — | — |
| Search candidate biodata | — | — | — | ✅ | — | — |
| Manage flash news, courses, gallery, partners, news | — | — | — | — | ✅ | ✅ |
| Approve/reject job postings & employer registrations | — | — | — | — | ⚠️ limited* | ✅ |
| Set auto-publish trust flags | — | — | — | — | — | ✅ |
| Invite/manage Centre Staff accounts | — | — | — | — | — | ✅ |
| Edit brand-wide stats/global settings | — | — | — | — | — | ✅ |

\* Centre Staff moderation permissions are configurable by Super Admin per Section 12.4 — e.g., a senior staff member might be granted approval rights while junior staff can only submit-for-approval.

---

## 10. Functional Requirements — Student Portal

### 10.1 Academic Resources Dashboard (`/portal/student`)
Six resource tiles, each a dedicated route:

| Tile | Content Type | Admin Source |
|---|---|---|
| Study Notes | Downloadable documents (PDF/DOC), organized by course | `/admin` — uploaded per course by Centre Staff |
| Video Lectures | Embedded video links (see 4.2), organized by course | `/admin` |
| Assignments | Downloadable assignment briefs, optionally with a due date | `/admin` |
| My Progress | Read-only view of the student's recorded progress/attendance/marks (data entry by Centre Staff, not self-reported) | `/admin` |
| Timetable | Class schedule, either per-batch or per-student | `/admin` |
| Past Papers | Downloadable past exam papers, organized by course/year | `/admin` |

- All resource content is scoped so a student sees only material relevant to **their enrolled course(s)** — requires linking a student's profile to one or more course records (set by Centre Staff at enrollment, editable later).
- **Acceptance criteria:** A student with no course link sees an empty/friendly state directing them to contact the centre, not a broken page.

### 10.2 Student Biodata / Profile (`/portal/student/biodata` and `/portal/jobs` for Job Seekers)

This is the single most important shared data structure in the system — it doubles as the student's academic profile AND their job-application resume.

| Field | Type | Student | Job Seeker (non-student) | Notes |
|---|---|:---:|:---:|---|
| Full name | text | Required | Required | |
| Date of birth | date | Required | Required | |
| Phone number | tel | Required (pre-filled from verified account) | Required | |
| Email address | email | Required | Required | |
| Course completed | select (from Courses taxonomy) | Required | Hidden | Multi-select if a student has completed more than one course |
| Certification earned | select (from Courses/Certification taxonomy) | Required | Hidden | Multi-select |
| Educational qualification | select (10th / 12th / Diploma / Degree / PG / Other) | Required | Required | |
| Year of passing | number/year picker | Required | Required | |
| Address | textarea | Required | Required | |
| Languages known | multi-select/tag input | Required | Required | |
| Skills | multi-select (from growing employer-fed taxonomy, Section 11.6) | Recommended (Open Item 4.5) | Recommended | Free-text "add new skill" also allowed, feeding the taxonomy |
| Preferred job location | text/select | Required | Required | |
| Preferred job type | select (Full-time / Part-time / Contract / Internship) | Required | Required | |
| Career objective / about me | textarea | Required | Required | |
| Photo upload | image file | Optional | Optional | |

- **Save Biodata** persists the profile (draft-saveable, doesn't need to be complete to save).
- **Download as PDF** generates a clean, employer-ready formatted PDF from the saved data (server-side rendered — see Section 6.1).
- This profile is what powers **one-click Apply** on the Job Portal (Section 11.4) — no separate CV upload needed.
- **Acceptance criteria:** A user cannot use "Apply" on a job listing until their Biodata has all *required* fields filled; the UI should proactively prompt them to complete their profile rather than fail silently at apply-time.

---

## 11. Functional Requirements — Job Portal & Employer Portal

### 11.1 Employer Registration (`/portal/employer/register`)

| Field | Type | Required | Notes |
|---|---|---|---|
| Company name | text | Yes | |
| Industry / Sector | select | Yes | Fixed, admin-managed list (e.g., IT, Manufacturing, Retail, Hospitality, BFSI, etc.) |
| Contact person name | text | Yes | *(present in wireframe, omitted from client's written list — retained as it's operationally necessary; flag for confirmation)* |
| Designation | text | Yes | *(same as above)* |
| Phone number | tel | Yes | |
| Email address | email | Yes | |
| Company address | textarea | Yes | |
| Website | choice: "No website" / "Add link" | Yes (one selection mandatory) | If "Add link" selected, a URL field appears and becomes required |
| No. of employees | select (range bands, e.g., 1–10, 11–50, 51–200, 200+) | Yes | |
| About your company / recruitment requirements | textarea | Yes | |

- On submit, the Employer record status = **Pending Review** (unless the account is flagged auto-publish-trusted, which won't apply on first registration since trust is only granted post-verification by Super Admin).
- Employer sees a "Your registration is under review" state and cannot post vacancies until approved.
- Super Admin reviews new employer registrations in `/admin/employers`: Approve, Reject (with optional reason sent to employer), or Approve + Mark as Auto-Publish Trusted (so future job posts from this employer skip the queue).

### 11.2 Post a Vacancy (`/portal/employer/post-vacancy`) — available only to Approved employers

| Field | Type | Required | Notes |
|---|---|---|---|
| Job title | text | Yes | |
| Department | text/select | Yes | |
| Salary range | number range + visibility toggle: **Disclose** / **Keep Private** | Yes (range), toggle Yes | If "Keep Private," range is hidden from public/candidate view but retained for admin/matching purposes and can be marked "Disclosed at interview" |
| Job type | select (Full-time / Part-time / Contract) | Yes | |
| Skills required | multi-select from Skills Taxonomy + free-text "add new" | Yes | New tags feed into the shared taxonomy for admin review (Section 11.6) |
| Application deadline | date | Yes | |
| Job description | rich textarea | Yes | |

- New postings from a **non-trusted** employer enter status = **Pending Review** in `/admin/job-postings`.
- New postings from an **auto-publish-trusted** employer go live immediately, but still appear in the admin log for audit/visibility (auto-publish ≠ invisible to admin, just not blocking).
- Postings auto-expire (move to Closed/Archived) after the Application Deadline; employer can manually close early.

### 11.3 Job Listings
- Public teaser: `/placement` shows a small number of open roles as a taste, with a "View all vacancies" CTA into the gated `/portal/jobs` (login required to view full listings and apply — consistent with client's "login required" framing for the portal).
- `/portal/jobs`: full searchable/filterable list (by course/skill, location, job type) for logged-in Students and Job Seekers.
- `/portal/jobs/[id]`: full detail (title, department, type, skills, description, salary if disclosed, deadline, employer name) + **Apply** button.

### 11.4 One-Click Apply
- Clicking Apply on a job with a complete Biodata immediately creates an Application record (Candidate ↔ Job) and notifies the employer (in-portal + email).
- Duplicate-apply protection: button changes to "Applied ✓" and is disabled after a successful application.
- Candidate can view their own application history (list of jobs applied to + status if the employer updates it) — recommend a simple status field (`Applied` → `Viewed` → `Shortlisted` → `Rejected`/`Hired`), settable by the employer from their applicant list, to close the loop without building a full ATS.

### 11.5 Employer Candidate Search (`/portal/employer/candidates`)
- Approved employers can browse/search the pool of Student + Job Seeker biodata profiles.
- Filters: Course completed, Certification earned, Skills, Preferred location, Preferred job type, Qualification, Languages known.
- **Privacy consideration (recommended, needs confirmation):** candidates should have visibility control — e.g., a profile-level toggle "Make my profile visible to employer search" (default ON, but disclosed clearly at signup) — since students are auto-enrolled into a searchable database rather than opting in per application. This protects against complaints and aligns with reasonable data-privacy practice (see Open Item 4.7).
- Employer can view a candidate's full biodata (and downloadable PDF) and initiate contact (phone/email shown, or an in-portal "Invite to Apply" action that notifies the candidate of a specific job).

### 11.6 Skills Taxonomy
- Every time an employer types a new skill (not already in the list) into "Skills required" or a candidate adds one to their Biodata, it's added to a shared taxonomy table with a `status: pending | approved` flag.
- Super Admin periodically reviews `/admin/skills-taxonomy` to merge duplicates/typos (e.g., "MS Excel" vs "Microsoft Excel") and approve new entries, keeping the filter/dropdown lists clean over time.
- Only `approved` skills appear as suggestions in dropdowns; free-text entry always remains possible so the list can keep growing.

---

## 12. Functional Requirements — Admin Panel

### 12.1 Roles
- **Super Admin:** full access to every module listed in Section 7's Admin sitemap, including staff management and global settings.
- **Centre Staff:** access to day-to-day content modules (Flash News, Courses, Gallery, Certification Partners, News & Events, Student provisioning) and can *submit* job postings/employer edits for review, but approval authority is Super-Admin-default and only extended per staff member at Super Admin's discretion (see 12.4).

### 12.2 Content Management Modules — Summary Table

| Module | Route | Managed By | Requires Approval? |
|---|---|---|---|
| Flash News | `/admin/flash-news` | Centre Staff / Super Admin | No (direct publish — low risk, time-sensitive content) |
| Courses | `/admin/courses` | Centre Staff / Super Admin | No (direct publish) |
| Gallery | `/admin/gallery` | Centre Staff / Super Admin | No (direct publish) |
| Certification Partners | `/admin/certification-partners` | Centre Staff / Super Admin | No (direct publish) |
| News & Events | `/admin/news-events` | Centre Staff / Super Admin | No (direct publish) |
| Student records (provisioning) | `/admin/students` | Centre Staff / Super Admin | No |
| Employer registrations | `/admin/employers` | Super Admin (Centre Staff view-only, recommended) | **Yes** |
| Job postings | `/admin/job-postings` | Super Admin approves; Centre Staff can flag/escalate | **Yes** (unless employer is auto-publish-trusted) |
| Skills taxonomy | `/admin/skills-taxonomy` | Super Admin | N/A (cleanup task) |
| Staff accounts | `/admin/staff` | Super Admin only | N/A |
| Global settings (stats, auto-publish toggles) | `/admin/settings` | Super Admin only | N/A |

> **Rationale:** Flash News/Courses/Gallery/Partners/News are low-risk, frequently-updated marketing content — gating these behind approval would slow down time-sensitive updates (e.g., posting today's job fair photos) with little benefit. Employer registrations and job postings are the two modules with real risk (spam, fraudulent postings, inappropriate content reaching students) — these get the moderation queue.

### 12.3 Moderation & Publishing Workflow

```
Employer submits registration/vacancy
        │
        ▼
 status = PENDING
        │
        ├── If employer.auto_publish_trusted == true → status = APPROVED (published immediately, logged for audit)
        │
        └── Else → appears in Super Admin's /admin/job-postings or /admin/employers queue
                       │
                       ├── Approve → status = APPROVED (goes live, employer notified)
                       ├── Reject → status = REJECTED (employer notified, optional reason shown)
                       └── Edit & Approve → Super Admin can correct minor issues (typos, category) before publishing
```

- Auto-publish trust is toggled **per employer** (Section 11.1) by Super Admin — this satisfies "an auto-pilot feature where the admin can select an auto publish tag" from the client brief, applied at the point that matters most (repeat, verified employers), while still gating first-time/unknown employers.
- Additionally, `/admin/settings` exposes **global** auto-publish toggles per low-risk content type (Flash News, Gallery, etc. — already direct-publish by default per 12.2, but the toggle exists in case Super Admin wants to require Centre Staff submissions to be reviewed during a probation period for a new staff member — see 12.4).

### 12.4 Permission Matrix (Super Admin configurable per staff member)
Recommend building Centre Staff permissions as granular, assignable toggles (not just one fixed role), since a real centre will have staff of varying seniority:

| Permission | Assignable to Centre Staff? |
|---|---|
| Edit Flash News | Yes |
| Edit Courses | Yes |
| Edit Gallery | Yes |
| Edit Certification Partners | Yes |
| Edit News & Events | Yes |
| Provision Student records | Yes |
| View (not approve) Employer/Job queue | Yes |
| Approve/Reject Employer registrations | Optional grant |
| Approve/Reject Job postings | Optional grant |
| Set employer auto-publish trust | Super Admin only |
| Manage other staff accounts | Super Admin only |
| Edit global brand stats/settings | Super Admin only |

---

## 13. Data Model (Key Entities)

> High-level entity list for engineering reference; exact schema/migrations to be finalized during technical design.

- **User** (Clerk-linked): id, role, language_preference, created_at
- **CandidateProfile** (1:1 with User where role ∈ {student, job_seeker}): all Biodata fields (Section 10.2), is_verified_student, student_id (nullable, FK), profile_visibility (public search on/off)
- **StudentRecord** (provisioned by Centre Staff pre-signup): student_id, full_name, phone, linked_user_id (nullable until claimed)
- **Course**: id, category, name (bilingual), description (bilingual), duration, certifications[], syllabus, cover_image, featured flag
- **EmployerProfile** (1:1 with User where role = employer): all fields in Section 11.1, status (pending/approved/rejected), auto_publish_trusted (bool)
- **JobPosting**: id, employer_id (FK), title, department, salary_min, salary_max, salary_visibility (disclose/private), job_type, skills[] (FK to Skill), deadline, description, status (pending/approved/rejected/closed)
- **Application**: id, candidate_id (FK), job_id (FK), status (applied/viewed/shortlisted/rejected/hired), applied_at
- **Skill**: id, label, status (pending/approved)
- **GalleryItem**: id, category, media_type (image/video), url, caption (bilingual), sort_order
- **CertificationPartner**: id, name, logo_url, link, sort_order
- **NewsEvent**: id, type (news/event), title (bilingual), body (bilingual), cover_image, event_date (nullable), published_at
- **FlashNewsItem**: id, text (bilingual), link (nullable), active (bool), expires_at (nullable), sort_order
- **Enquiry**: id, name, phone, course_id (nullable FK), message, source (page/component it was submitted from), created_at
- **AcademicResource**: id, course_id (FK), type (note/lecture/assignment/past_paper), title, file_url or embed_url, uploaded_at
- **StudentProgress / Timetable**: id, student_id (FK), course_id (FK), data (structure TBD with client — e.g., attendance %, marks per module, or a simple staff-entered text/table)

---

## 14. Key User Flows

### 14.1 Enquiry Submission (Visitor → Lead)
Visitor lands on homepage → fills Quick Enquiry Form (name, phone, course, message) → submits → confirmation shown inline → lead notification emailed to Centre Staff → lead visible in `/admin` (recommend a simple `/admin/enquiries` list, not explicitly requested but a natural companion to the enquiry form — flagged as a recommended addition).

### 14.2 New Student Onboarding → Job Application
Student enrolls at centre → Centre Staff creates a StudentRecord (ID + phone) in `/admin/students` → Student visits site, clicks Login → selects "I'm a student" → enters Student ID + phone → OTP verification → account created & linked → redirected to complete Biodata (Course Completed/Certification unlocked) → Student can now access Academic Resources AND browse `/portal/jobs` → clicks Apply on a listing → Application created instantly (no re-entry of data) → status trackable in "My Applications."

### 14.3 Employer Onboarding → Vacancy Live
Employer visits site → clicks "Post a Vacancy" (or Employer Login) → selects "I'm an employer" → signs up via Clerk → completes Employer Registration form → status = Pending → Super Admin reviews in `/admin/employers` → Approves (optionally also marks Auto-Publish Trusted) → Employer notified, can now access Post a Vacancy → fills vacancy form → if trusted, goes live immediately; if not, enters `/admin/job-postings` queue → Super Admin approves → listing appears in `/portal/jobs` and public `/placement` teaser.

### 14.4 Admin Content Update (Low-Risk Path)
Centre Staff logs into `/admin` → navigates to Gallery → uploads new Job Fair photos, tags category "Placement & Support" → publishes directly (no approval needed) → images appear immediately on both `/gallery` and the homepage Placement & Support section.

---

## 15. Non-Functional Requirements

| Category | Requirement |
|---|---|
| **Performance** | Public marketing pages should be statically generated/ISR where possible for fast load on mobile data connections (primary audience access pattern, given the heavy WhatsApp/Call CTA emphasis). Target Largest Contentful Paint < 2.5s on 4G. |
| **Responsiveness** | Fully responsive across mobile (primary), tablet, and desktop — mobile-first, matching wireframe's mobile-oriented CTA pattern. |
| **Accessibility** | WCAG 2.1 AA baseline: sufficient color contrast, form labels, keyboard navigation, alt text fields for all admin-uploaded images. |
| **SEO** | Server-rendered/static public pages, proper meta tags per page, sitemap.xml, structured data for courses (JobPosting/Course schema.org markup recommended for the Courses and Job listing pages to aid discoverability). |
| **Security** | Clerk-managed auth (industry-standard session handling, OTP); role-based route protection at middleware level; input validation/sanitization on all forms; rate-limiting on Enquiry/Apply/Registration endpoints to prevent spam/bot abuse. |
| **Data Privacy** | Explicit consent checkbox at signup referencing the Privacy Policy (candidate data will be visible to employers); ability for a candidate to toggle profile visibility off; data retention/deletion policy to be defined (recommend confirming with client re: DPDP Act 2023 compliance posture). |
| **Localization** | English/Malayalam parity across all user-facing text; admin-entered content fields default to bilingual pairs. |
| **Auditability** | All admin actions on moderated content (approve/reject/auto-publish grants) should be logged with actor + timestamp for accountability, even though not explicitly requested — standard good practice for a system with delegated publishing authority. |
| **Browser support** | Latest 2 versions of Chrome, Safari, Edge, Firefox; Android Chrome and iOS Safari for mobile (primary traffic). |

---

## 16. Integrations & Third-Party Services

| Service | Purpose |
|---|---|
| **Clerk** | Authentication, session management, role/metadata storage |
| **WhatsApp (`wa.me` link)** | Click-to-chat CTA in header and hero |
| **Google Maps Embed** | Location section |
| **Google Reviews widget** | Location section (via Google Places API or an embed widget) |
| **gtecadmin.com** | External link-out for "Verify Certificate" — no data integration, just a navigation link |
| **Email provider (Resend/SendGrid)** | Enquiry confirmations, application notifications, employer approval/rejection notices, OTP fallback (Clerk handles primary OTP, but transactional emails for other events are separate) |
| **Video host (YouTube/Vimeo, TBD)** | Video Lectures and Gallery video content — see Open Item 4.2 |
| **Object storage (Cloudflare R2 / UploadThing, TBD)** | Photos, documents, biodata photo uploads, gallery media |

---

## 17. Content & Governance Responsibilities

To avoid delays during build/launch, the following content must be supplied by the client (Centre Staff/Super Admin) ahead of or during development:

- Final English + Malayalam copy for: Hero, About, Why Choose Us cards, all course descriptions/syllabi.
- High-resolution centre/campus photography, job fair/event photos, certification partner logos.
- Confirmed list of course categories and individual courses to seed at launch.
- Initial list of enrolled students (name + phone + Student ID) for bulk-import into `/admin/students`, if applicable (Open Item 4.3).
- Final legal copy for Privacy Policy / Terms (required given PII collection from students and employers).
- Branding assets: logo files (SVG/PNG, transparent background), brand colors/fonts if different from the parent gteceducation.com palette.

---

## 18. Success Metrics (Recommended KPIs)
Not specified by the client, but recommended so the build can be evaluated post-launch:

- Enquiry form submission rate / month
- Student self-service adoption: % of enrolled students who complete signup + Biodata within 30 days
- Job Portal activity: postings/month, applications/month, employer registration → approval turnaround time
- Admin efficiency: average time-to-approve for job postings/employer registrations

---

## 19. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Video/document storage costs scale unpredictably with content volume (many past papers, lecture videos) | Use external video hosting (YouTube unlisted) rather than self-hosting; set reasonable file-size limits on document uploads |
| Employer portal attracts spam/fake company registrations | Manual Super Admin approval gate by default (already designed in); consider requiring company email domain verification in a later phase |
| Bilingual content upkeep becomes a bottleneck for Centre Staff (double content entry) | Make Malayalam fields optional-but-encouraged at launch if needed to avoid blocking go-live, with English as the required baseline — confirm priority with client |
| Data privacy concerns from candidates whose profiles are broadly searchable by employers | Explicit consent + visibility toggle (Section 11.5) |
| "Auto-publish" misconfiguration leads to inappropriate content going live unmoderated | Global settings changes restricted to Super Admin only; all auto-published items still logged for retrospective review |

---

## 20. Appendix A — Wireframe Section → PRD Section Mapping

| Wireframe Section | PRD Reference |
|---|---|
| Navbar (sticky) | 8.1 |
| Flash News Bar | 8.2 |
| 1 — Hero + Enquiry Form | 8.3 |
| 2 — At a Glance | 8.4 |
| 3 — About G-TEC | 8.5 |
| 4 — Why Choose G-TEC? | 8.6 |
| 5 — Courses | 8.7 |
| 6 — Placement & Support | 8.8 |
| 7 — Student Portal (Login required) | 10.1 (moved to authenticated route, see 6.4) |
| 8 — Student Biodata / Profile Form | 10.2 |
| 9 — Employer Registration & Portal | 11.1, 11.2, 11.5 |
| 10 — Gallery | 8.9 |
| 11 — Certification Partners | 8.10 |
| 12 — News & Upcoming Events | 8.11 |
| 13 — Location, Contact & Social | 8.12 |
| Footer | 8.13 |

## Appendix B — Full Field Specs Reference
All form field tables are consolidated in-line within their respective sections for easy developer reference:
- Quick Enquiry Form — Section 8.3
- Student Biodata / Job Seeker Profile — Section 10.2
- Employer Registration — Section 11.1
- Post a Vacancy — Section 11.2

---

**Next steps:** Client review and sign-off on Section 4 (Open Items), particularly hosting target (4.1), video hosting approach (4.2), Student ID source (4.3), and Skills field inclusion (4.5), after which technical design (DB schema, Clerk role configuration, wireframe-to-UI design handoff) can begin.
