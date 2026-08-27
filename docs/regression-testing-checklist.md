# GTEC Thodupuzha — Manual Regression Testing Checklist

## Roles
- **Visitor** — Unauthenticated user browsing the public website
- **Student** — GTEC student (verified via Student ID + phone, Clerk role: `STUDENT`)
- **Job Seeker** — Independent job seeker (signs up via email, Clerk role: `JOB_SEEKER`)
- **Employer** — Employer registering to post jobs (Clerk role: `EMPLOYER`, requires admin approval)
- **Centre Staff** — Admin staff with role-based permissions (Clerk role: `CENTRE_STAFF`)
- **Super Admin** — Full access to all admin modules (Clerk role: `SUPER_ADMIN`)

---

## VISITOR WORKFLOWS

### V1 — Public Homepage
- [ ] V1.1 Page loads at `/` (redirects to `/[locale]`)
- [ ] V1.2 **Preloader** animation appears and disappears
- [ ] V1.3 **Flash News Bar** — marquee scrolls with active news items
- [ ] V1.4 **Header** — Logo, brand name, centre name visible
- [ ] V1.5 **Header — Desktop nav** — Home, About, Courses dropdown, Placement, Gallery, Resources, Contact links work
- [ ] V1.6 **Header — Courses dropdown** — Opens course list on hover/click, links navigate correctly
- [ ] V1.7 **Header — CTA buttons** — WhatsApp, Call Now, Apply Now all work
- [ ] V1.8 **Header — Language Switcher** — Toggles between English (en) and Malayalam (ml)
- [ ] V1.9 **Header — Mobile hamburger** — Opens mobile nav with all links + course sub-links + LanguageSwitcher
- [ ] V1.10 **Header — Mobile touch targets** — All buttons ≥ 44px

### V2 — Hero Section
- [ ] V2.1 Badge, headline, subhead text display correctly in both languages
- [ ] V2.2 "Apply Now" button scrolls to enquiry form
- [ ] V2.3 WhatsApp and Call Now buttons link correctly
- [ ] V2.4 **Enquiry Form** — Full Name, Phone, Course select, Message fields present
- [ ] V2.5 **Enquiry Form — Validation** — Shows errors for empty required fields, invalid Indian phone number
- [ ] V2.6 **Enquiry Form — Submit** — Submits successfully, shows success message, form resets
- [ ] V2.7 **Enquiry Form — Error state** — Shows error message on failure

### V3 — At A Glance Section
- [ ] V3.1 Stats grid displays (Years in Operation, Students Trained, Centres Worldwide, Affiliations, Countries)
- [ ] V3.2 Responsive: 2 cols mobile → 3 cols sm → 5 cols lg

### V4 — News Teaser Section
- [ ] V4.1 News items grid displays with dates and titles
- [ ] V4.2 Upcoming event card highlighted (if exists)
- [ ] V4.3 "View All" link navigates to `/news`
- [ ] V4.4 Responsive: 1 col mobile → 2 cols sm → 4 cols lg

### V5 — About Section
- [ ] V5.1 Centre photo or placeholder displays
- [ ] V5.2 About body text renders
- [ ] V5.3 Responsive: stacks on mobile, side-by-side on lg

### V6 — Why Choose Us Section
- [ ] V6.1 Feature cards display with icons, titles, descriptions
- [ ] V6.2 Responsive: 1 col mobile → 2 cols sm → 3 cols lg
- [ ] V6.3 Card padding reduces on mobile (p-6 vs p-8)

### V7 — Certification Partner Strip
- [ ] V7.1 Partner logos display (if configured)
- [ ] V7.2 Logos link to partner websites (if link set)
- [ ] V7.3 Logos have grayscale-to-color hover effect

### V8 — Placement Support Section
- [ ] V8.1 Gallery grid of placement photos displays
- [ ] V8.2 "View Full Gallery" link navigates to `/gallery?category=placement-support`
- [ ] V8.3 CTA section: "View Vacancies" → `/portal/jobs`, "Hiring?" → `/portal/employer/register`
- [ ] V8.4 Section hidden if no placement data

### V9 — Contact Section
- [ ] V9.1 Google Maps iframe renders (if map URL set)
- [ ] V9.2 Address, phone, WhatsApp links display
- [ ] V9.3 Social media icons link correctly (Facebook, Instagram, YouTube, LinkedIn)
- [ ] V9.4 Google Reviews link works
- [ ] V9.5 "Send Message" button opens modal enquiry form
- [ ] V9.6 Modal closes on Escape, backdrop click, and close button

### V10 — Footer
- [ ] V10.1 Logo + centre name display
- [ ] V10.2 Address text renders (if set)
- [ ] V10.3 Quick Links column — all 7 links navigate correctly
- [ ] V10.4 Portals column — student login, resources, jobs, biodata, employer login, post vacancy, verify certificate
- [ ] V10.5 Verify Certificate links to `https://gtecadmin.com` (external)
- [ ] V10.6 Legal column — Privacy Policy → `/privacy`, Terms → `/terms`
- [ ] V10.7 Copyright year and text display
- [ ] V10.8 Responsive: 1 col mobile → 2 cols sm → 4 cols lg, centred text on mobile

### V11 — Public Secondary Pages
- [ ] V11.1 **Courses Page** (`/courses`) — Lists all published courses in a grid
- [ ] V11.2 **Course Detail** (`/courses/[slug]`) — Hero, overview, detailed content, course table with overflow-x scroll, benefits
- [ ] V11.3 **About Page** (`/about`) — Hero, About Section, Vision/Mission/Values cards, At A Glance, Why Choose Us, Cert Partners, Location map
- [ ] V11.4 **Placement Page** (`/placement`) — Loads correctly
- [ ] V11.5 **Gallery Page** (`/gallery`) — Category tabs, image grid, lightbox with prev/next/close, video items show play button
- [ ] V11.6 **Gallery Lightbox** — Close, prev, next buttons positioned correctly on mobile
- [ ] V11.7 **News Page** (`/news`) — Lists news/events
- [ ] V11.8 **Contact Page** (`/contact`) — Same as V9 but as standalone page
- [ ] V11.9 **Privacy Page** (`/privacy`) — Loads
- [ ] V11.10 **Terms Page** (`/terms`) — Loads

### V12 — Authentication Pages
- [ ] V12.1 **Sign In** (`/sign-in`) — Clerk sign-in UI loads
- [ ] V12.2 **Sign Up Picker** (`/portal/sign-up`) — Three options: Student, Job Seeker, Employer
- [ ] V12.3 **Student Sign Up** (`/portal/sign-up/student`) — Student ID + Phone lookup → verification flow
- [ ] V12.4 **Job Seeker Sign Up** — Redirects to Clerk sign-up with `intent=job_seeker`
- [ ] V12.5 **Employer Sign Up** — Redirects to Clerk sign-up with `intent=employer`
- [ ] V12.6 Already-authenticated user redirected from sign-up picker to their portal
- [ ] V12.7 **Forbidden Page** (`/forbidden`) — Access denied page renders
- [ ] V12.8 **Account Setup Incomplete** (`/account-setup-incomplete`) — Renders when user has no role

---

## STUDENT WORKFLOWS

**Prerequisites:** Staff must create a Student Record (studentId + phone + email). Student signs up via `/portal/sign-up/student` with matching Student ID + phone. Must be linked to at least one course.

### S1 — Student Dashboard
- [ ] S1.1 Login redirects to `/portal/student`
- [ ] S1.2 If no linked course → empty state message
- [ ] S1.3 If linked course → dashboard grid with resource tiles (Study Notes, Video Lectures, Assignments, My Progress, Timetable, Past Papers)
- [ ] S1.4 Dashboard tiles navigate to respective resource pages

### S2 — Bottom Navigation (Mobile)
- [ ] S2.1 Bottom nav visible on mobile (< 768px)
- [ ] S2.2 4 tabs: Dashboard, Jobs, Biodata, Resources + Account (UserButton)
- [ ] S2.3 Active tab highlighted with primary color
- [ ] S2.4 Clicking tabs navigates correctly
- [ ] S2.5 UserButton avatar opens Clerk account menu
- [ ] S2.6 Sidebar NOT visible on mobile
- [ ] S2.7 Bottom nav NOT visible on desktop (> 768px)
- [ ] S2.8 Sidebar visible on desktop with all 11 navigation items
- [ ] S2.9 Content scrolls behind bottom nav (pb-16 applied)

### S3 — My Biodata
- [ ] S3.1 Navigate to `/portal/student/biodata`
- [ ] S3.2 Biodata form loads with fields: Full Name, Email, Phone, Address, Qualification, Skills, etc.
- [ ] S3.3 Multi-skill select works (search, add, remove)
- [ ] S3.4 Course completion selection
- [ ] S3.5 Form saves successfully
- [ ] S3.6 Form pre-fills if profile already exists
- [ ] S3.7 Profile completion status indicator

### S4 — Browse Jobs
- [ ] S4.1 Navigate to `/portal/jobs`
- [ ] S4.2 Job listings display with title, company, job type badge, salary, deadline
- [ ] S4.3 Filter by job type (FULL_TIME, PART_TIME, CONTRACT, INTERNSHIP, FREELANCE)
- [ ] S4.4 Filter by skill
- [ ] S4.5 Filter by location
- [ ] S4.6 Empty state when no jobs match

### S5 — Job Detail & Apply
- [ ] S5.1 Navigate to `/portal/jobs/[id]`
- [ ] S5.2 Job details: title, company, department, job type, salary, description, skills required, deadline
- [ ] S5.3 "Apply" button present (if profile complete and not already applied)
- [ ] S5.4 "Apply" button disabled/message if profile incomplete
- [ ] S5.5 "Already Applied" message if duplicate
- [ ] S5.6 Apply action succeeds, status shows "APPLIED"

### S6 — My Applications
- [ ] S6.1 Navigate to `/portal/student/applications`
- [ ] S6.2 Lists all job applications with status badges (APPLIED, VIEWED, SHORTLISTED, REJECTED, HIRED)
- [ ] S6.3 Each application shows job title (linkable), company, status
- [ ] S6.4 Empty state when no applications

### S7 — Academic Resources
- [ ] S7.1 **Resources Hub** (`/portal/student/resources`) — Landing page
- [ ] S7.2 **Study Notes** (`/portal/student/resources/notes`) — Lists downloadable notes
- [ ] S7.3 **Video Lectures** (`/portal/student/resources/lectures`) — Lists video lectures with thumbnails
- [ ] S7.4 **Assignments** (`/portal/student/resources/assignments`) — Lists assignments
- [ ] S7.5 **My Progress** (`/portal/student/resources/progress`) — Shows progress entries for linked courses
- [ ] S7.6 **Timetable** (`/portal/student/resources/timetable`) — Shows timetable entries for linked courses
- [ ] S7.7 **Past Papers** (`/portal/student/resources/past-papers`) — Lists past papers
- [ ] S7.8 All resource pages are STUDENT-only gated (Job Seekers blocked)

---

## JOB SEEKER WORKFLOWS

**Prerequisites:** Sign up via Clerk with `intent=job_seeker`. Complete biodata profile.

### JS1 — Job Seeker Dashboard
- [ ] JS1.1 Login redirects to `/portal/job-seeker`
- [ ] JS1.2 Welcome message with name (if profile exists)
- [ ] JS1.3 Action tiles: Browse Jobs, My Applications, Complete/Update Profile
- [ ] JS1.4 Profile completion hint if no biodata
- [ ] JS1.5 Recent applications section (last 3)

### JS2 — Bottom Navigation (Mobile)
- [ ] JS2.1 Bottom nav: Dashboard, Jobs, Biodata, Applications + Account
- [ ] JS2.2 Same mobile/desktop behavior as Student bottom nav

### JS3 — Shared Features
- [ ] JS3.1 Browse Jobs (same as S4)
- [ ] JS3.2 Job Detail & Apply (same as S5)
- [ ] JS3.3 My Biodata (same as S3)
- [ ] JS3.4 My Applications (same as S6)
- [ ] JS3.5 Resources pages NOT accessible to Job Seeker

---

## EMPLOYER WORKFLOWS

**Prerequisites:** Sign up via Clerk with `intent=employer`. Complete employer registration form. Wait for admin approval.

### E1 — Employer Registration
- [ ] E1.1 First login after sign-up → redirect to `/portal/employer/register`
- [ ] E1.2 Registration form: Company Name, Industry Sector (dropdown), Contact Person, Designation, Phone, Email, Company Address, Website toggle, Website URL, Employee Count, About Company
- [ ] E1.3 Form validation works
- [ ] E1.4 Submit → redirects to status page
- [ ] E1.5 **Status Page** (`/portal/employer/register/status`) — Shows "Under Review" message
- [ ] E1.6 Dashboard inaccessible while PENDING or REJECTED

### E2 — Employer Dashboard
- [ ] E2.1 After admin approval → `/portal/employer` accessible
- [ ] E2.2 Company name displayed
- [ ] E2.3 "Post a Vacancy" button
- [ ] E2.4 List of all postings with title, job type, deadline, status badge, applicant count
- [ ] E2.5 Empty state when no postings: "No postings yet" + link to post first
- [ ] E2.6 Clicking a posting → navigates to applicants page

### E3 — Bottom Navigation (Mobile)
- [ ] E3.1 Bottom nav: Dashboard, Profile, Post Vacancy, Candidates + Account
- [ ] E3.2 Same mobile/desktop behavior

### E4 — Post a Vacancy
- [ ] E4.1 Navigate to `/portal/employer/post-vacancy`
- [ ] E4.2 Form: Title, Department, Salary Min/Max, Salary Visibility (PRIVATE/DISCLOSE), Job Type, Skills (multi-select), Application Deadline, Description
- [ ] E4.3 Skill multi-select with create-new-skill flow
- [ ] E4.4 Form validation
- [ ] E4.5 Submit creates posting (PENDING status, auto-published if trusted)
- [ ] E4.6 Redirect back to dashboard after success

### E5 — Employer Profile
- [ ] E5.1 Navigate to `/portal/employer/profile`
- [ ] E5.2 Edit employer profile (same form as registration, pre-filled)
- [ ] E5.3 Save updates

### E6 — Candidates
- [ ] E6.1 Navigate to `/portal/employer/candidates`
- [ ] E6.2 Search form with filters
- [ ] E6.3 Candidate list with key details
- [ ] E6.4 **Candidate Detail** (`/portal/employer/candidates/[candidateId]`) — Full biodata, skills, qualifications, course history
- [ ] E6.5 Download biodata PDF (if available)

### E7 — Applicants Management
- [ ] E7.1 Navigate from dashboard posting → `/portal/employer/postings/[postingId]/applicants`
- [ ] E7.2 Lists all applicants for the posting
- [ ] E7.3 Each applicant shows: name, email, phone, applied date, status
- [ ] E7.4 Status change: VIEWED → SHORTLISTED → HIRED or REJECTED
- [ ] E7.5 Auto-marked as VIEWED on first visit
- [ ] E7.6 View applicant's full biodata

---

## ADMIN (CENTRE STAFF) WORKFLOWS

**Prerequisites:** Logged in as CENTRE_STAFF or SUPER_ADMIN. Permissions set in StaffPermission table.

### A0 — Admin Shell
- [ ] A0.1 Sidebar visible on desktop with all permitted modules
- [ ] A0.2 Mobile header bar with SidebarTrigger opens sidebar as offcanvas sheet
- [ ] A0.3 Sidebar collapse/expand on desktop
- [ ] A0.4 UserButton (account menu) in sidebar footer
- [ ] A0.5 Active route highlighted in sidebar

### A1 — Admin Dashboard
- [ ] A1.1 Navigate to `/admin`
- [ ] A1.2 Welcome message with role name
- [ ] A1.3 Summary cards: Pending Employers (if canApproveEmployers), Pending Job Postings (if canApproveJobPostings), Pending Skills Taxonomy (if canModerateSkillsTaxonomy)
- [ ] A1.4 Summary cards show count + "Requires review" badge
- [ ] A1.5 Recent Enquiries table (last 5): Name, Phone, Course, Source, Date
- [ ] A1.6 Quick links: Manage Course Enrollments, View Audit Log (Super Admin only)
- [ ] A1.7 All Modules grid — all permitted admin modules as link cards
- [ ] A1.8 Responsive: cards and tables adapt to mobile, tables scroll horizontally

### A2 — Students Management
- [ ] A2.1 Navigate to `/admin/students`
- [ ] A2.2 Warning banner if students without email
- [ ] A2.3 "Manage Course Enrollments" link
- [ ] A2.4 **Add Single Student** — Student ID, Full Name, Phone, Email → creates record
- [ ] A2.5 **Bulk Import (CSV)** — Paste CSV content → imports multiple records
- [ ] A2.6 **Records Table** — Lists all student records with: Student ID, Full Name, Phone, Email, Verification status, Created date
- [ ] A2.7 Missing email rows show inline email form + "Add" button
- [ ] A2.8 Verification column: Verified (linked user), Pending, Blocked (no email)
- [ ] A2.9 Table scrolls horizontally on mobile

### A3 — Course Enrollment
- [ ] A3.1 Navigate to `/admin/students/course-enrollment`
- [ ] A3.2 Enroll students in courses
- [ ] A3.3 Form: Select student + Select course(s)
- [ ] A3.4 Enrollment created successfully

### A4 — Courses Management
- [ ] A4.1 Navigate to `/admin/courses`
- [ ] A4.2 **Categories**: Create, edit, reorder, delete course categories
- [ ] A4.3 **Courses**: Create course with title (en/ml), description, duration, cover image, certifications
- [ ] A4.4 Edit course: update title, description, image, content blocks
- [ ] A4.5 Delete course
- [ ] A4.6 Upload course cover image
- [ ] A4.7 Content blocks editor: hero tagline, overview, detailed content, course lists (Code + Name table), benefits

### A5 — Gallery Management
- [ ] A5.1 Navigate to `/admin/gallery`
- [ ] A5.2 **Categories**: Create, edit, reorder, delete gallery categories
- [ ] A5.3 **Upload Images**: Multi-file upload, caption per image
- [ ] A5.4 **Add Video**: YouTube/Vimeo URL, caption
- [ ] A5.5 Delete individual gallery items
- [ ] A5.6 Preview grid of items per category

### A6 — Certification Partners
- [ ] A6.1 Navigate to `/admin/certification-partners`
- [ ] A6.2 Create partner: Name, Logo upload, Website link (optional)
- [ ] A6.3 Edit/delete partners
- [ ] A6.4 Partner list with logos

### A7 — News & Events
- [ ] A7.1 Navigate to `/admin/news-events`
- [ ] A7.2 Create item: Type (NEWS/EVENT), Title (en/ml), Content, Published date, Event date (for events)
- [ ] A7.3 Edit/delete items
- [ ] A7.4 Items list with type, title, status

### A8 — Flash News
- [ ] A8.1 Navigate to `/admin/flash-news`
- [ ] A8.2 Create item: Text, Link (optional), Active toggle
- [ ] A8.3 Edit/delete items
- [ ] A8.4 Active items appear in FlashNewsBar marquee

### A9 — Employers
- [ ] A9.1 Navigate to `/admin/employers`
- [ ] A9.2 Filter by status: All, Pending, Approved, Rejected
- [ ] A9.3 Table: Company, Contact Person, Phone, Email, Industry, Status, Auto-Publish, Actions
- [ ] A9.4 PENDING: Approve, Approve + Trust, Reject (with reason) buttons
- [ ] A9.5 REJECTED: Re-approve button
- [ ] A9.6 APPROVED: Mark Trusted / Remove Trust button
- [ ] A9.7 Trust toggle enables/disables auto-publish for this employer
- [ ] A9.8 Table scrolls horizontally on mobile

### A10 — Job Postings Moderation
- [ ] A10.1 Navigate to `/admin/job-postings`
- [ ] A10.2 Filter: All, Pending, Approved, Rejected, Closed, Auto-published (audit)
- [ ] A10.3 Table: Title, Company, Job Type, Deadline, Status, Auto-published, Actions
- [ ] A10.4 PENDING: Approve, Reject (with reason), Edit & Approve (inline form)
- [ ] A10.5 REJECTED: Re-approve
- [ ] A10.6 Auto-published audit view: lists auto-published postings for review
- [ ] A10.7 Table scrolls horizontally on mobile

### A11 — Skills Taxonomy
- [ ] A11.1 Navigate to `/admin/skills-taxonomy`
- [ ] A11.2 Filter: All, Pending, Approved, Rejected
- [ ] A11.3 Approve/reject pending skills
- [ ] A11.4 Creates/edits skills

### A12 — Academic Resources
- [ ] A12.1 Navigate to `/admin/academic-resources`
- [ ] A12.2 Upload resource: Select course, Type (NOTE/ASSIGNMENT/PAST_PAPER/LECTURE), Title, File/URL, Label
- [ ] A12.3 Delete resources
- [ ] A12.4 Resources listed by course and type

### A13 — Enquiries
- [ ] A13.1 Navigate to `/admin/enquiries`
- [ ] A13.2 All enquiries table: Name, Phone, Course, Source, Created At
- [ ] A13.3 Table scrolls horizontally on mobile

### A14 — Audit Log
- [ ] A14.1 Navigate to `/admin/audit-log` (Super Admin or permitted)
- [ ] A14.2 Table: Time, Actor, Role, Action, Entity, Metadata
- [ ] A14.3 Last 50 entries
- [ ] A14.4 Table scrolls horizontally on mobile

### A15 — Timetable & Progress
- [ ] A15.1 Navigate to `/admin/timetable-progress`
- [ ] A15.2 **Timetable**: Add entry (course, candidate, day, time, topic), delete
- [ ] A15.3 **Progress**: Add entry (course, candidate, title, description), delete

### A16 — Site Settings (Super Admin only)
- [ ] A16.1 Navigate to `/admin/settings/site`
- [ ] A16.2 Edit: Address, Map embed URL, Social media URLs, Google Reviews URL
- [ ] A16.3 Edit: Years in operation, Students trained, Centres worldwide, Affiliations, Countries
- [ ] A16.4 Edit: About body (en/ml), About photo
- [ ] A16.5 Edit: Why Choose Us cards (title, description, icon per card)
- [ ] A16.6 Save all settings

### A17 — Staff Management (Super Admin only)
- [ ] A17.1 Navigate to `/admin/staff`
- [ ] A17.2 **Invite Staff**: Email → sends invite, creates user with CENTRE_STAFF role
- [ ] A17.3 Staff list with permissions grid
- [ ] A17.4 Toggle individual permission checkboxes per staff member
- [ ] A17.5 Deactivate/Reactivate staff
- [ ] A17.6 Deactivated staff cannot access admin

### A18 — Admin Permissions Matrix
- [ ] A18.1 Centre Staff sees only modules where their permission flag is true
- [ ] A18.2 Super Admin sees all modules
- [ ] A18.3 Sidebar hides unauthorized routes
- [ ] A18.4 Direct URL access to unauthorized routes shows "No access" or redirects

---

## CROSS-CUTTING CONCERNS

### CC1 — Authentication & Authorization
- [ ] CC1.1 Unauthenticated user redirected to sign-in when accessing protected routes
- [ ] CC1.2 User with no role redirected to account-setup-incomplete
- [ ] CC1.3 Wrong role accessing portal area → role gate page with "This area isn't for your account type"
- [ ] CC1.4 Wrong role accessing admin → 403 forbidden
- [ ] CC1.5 Deactivated staff → blocked from admin with deactivated reason
- [ ] CC1.6 Sign-out clears session and redirects to homepage

### CC2 — Internationalization (i18n)
- [ ] CC2.1 All pages render in English (en) and Malayalam (ml)
- [ ] CC2.2 Language switcher works on all pages
- [ ] CC2.3 Language persists across navigation
- [ ] CC2.4 Course titles, descriptions, bios switch per locale

### CC3 — Mobile Responsiveness
- [ ] CC3.1 All public pages render correctly at 320px, 375px, 414px, 768px
- [ ] CC3.2 All portal pages render correctly at mobile widths
- [ ] CC3.3 All admin pages render with horizontal table scrolling at mobile
- [ ] CC3.4 Header hamburger menu works on mobile
- [ ] CC3.5 Bottom nav visible on mobile portal pages, sidebar absent
- [ ] CC3.6 Bottom nav absent on desktop, sidebar visible
- [ ] CC3.7 Touch targets ≥ 44px on all interactive elements
- [ ] CC3.8 No horizontal overflow on any page (except intentional table scroll)
- [ ] CC3.9 Forms are full-width on mobile
- [ ] CC3.10 Select dropdowns are full-width on mobile
- [ ] CC3.11 iOS: no zoom on input focus (16px font-size enforced)

### CC4 — Dark Mode
- [ ] CC4.1 (If implemented) Toggle dark mode, verify all pages
