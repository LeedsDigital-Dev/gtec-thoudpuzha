# UAT Script — GTEC Thodupuzha Admin Panel

## Setup

- Browser: Chrome (primary), Firefox (cross-check)
- Logged in as a **Super Admin** account
- Logged in as a **Centre Staff** account in a separate browser/incognito

---

## Flow 1: Admin Dashboard & Audit Log

### 1.1 Dashboard as Super Admin
- [ ] Navigate to `/en/admin`
- [ ] See "Welcome, Super Admin"
- [ ] See **Pending Employer Registrations** card (amber if >0)
- [ ] See **Pending Job Postings** card (amber if >0)
- [ ] See **Pending Skills Taxonomy** card (amber if >0)
- [ ] See **Recent Enquiries** table (5 newest)
- [ ] See **View Audit Log** button
- [ ] Click each pending card — filters to correct admin page with status pre-applied

### 1.2 Dashboard as Centre Staff
- [ ] Repeat all above as Centre Staff
- [ ] Only cards for permitted actions are shown
- [ ] "View Audit Log" is **not** shown

### 1.3 Audit Log Page
- [ ] Navigate to `/en/admin/audit-log`
- [ ] See last 50 audit entries sorted by newest first
- [ ] Columns: Time, Actor, Role, Action, Entity, Metadata
- [ ] Data renders correctly (no broken JSON)

---

## Flow 2: Course Management

### 2.1 Course Categories
- [ ] Create a category: "IT Courses" (English), leave Malayalam blank
- [ ] Create a second category: "Design Courses"
- [ ] Reorder categories using up/down arrows
- [ ] Verify "Courses" count shows 0 for both
- [ ] Delete a category with 0 courses — success
- [ ] Re-create needed categories for subsequent tests

### 2.2 Create Course
- [ ] Create a course: "Web Development", "IT Courses" category, DRAFT status, fill all fields including syllabus JSON
- [ ] Verify course appears in list with correct data
- [ ] Create a second course in same category

### 2.3 Edit Course
- [ ] Open Edit <details> for created course
- [ ] Change title, status to PUBLISHED, save
- [ ] Verify updates reflected in table

### 2.4 Upload Cover Image
- [ ] Upload a cover image file for the course
- [ ] Verify cover image URL appears in table

### 2.5 Delete Course
- [ ] Delete the second course
- [ ] Verify it disappears from the list

---

## Flow 3: Gallery Management

### 3.1 Gallery Categories
- [ ] Create a category: "Classroom Photos"
- [ ] Create a second category: "Events"
- [ ] Reorder categories
- [ ] Delete a category with 0 items

### 3.2 Upload Gallery Images
- [ ] Select "Classroom Photos" category
- [ ] Upload 3 images with a shared English caption
- [ ] Verify all 3 appear in items table with correct caption

### 3.3 Add Video
- [ ] Add a YouTube video URL to "Events" category
- [ ] Verify it appears with VIDEO type

### 3.4 Delete Gallery Item
- [ ] Delete one image
- [ ] Verify it's removed from items table

---

## Flow 4: Employer Registration Moderation

### 4.1 View Pending Employers
- [ ] Navigate to `/en/admin/employers`
- [ ] Filter: All / Pending / Approved / Rejected
- [ ] See at least one pending employer (seeded or test-registered)

### 4.2 Approve Employer
- [ ] Click "Approve" on a pending employer
- [ ] Status changes to "Approved"
- [ ] Check Audit Log — `employerProfile.approve` entry recorded

### 4.3 Approve + Trust Employer
- [ ] Find another pending employer
- [ ] Click "Approve + Trust"
- [ ] Status = "Approved", Auto-Publish = "Trusted"

### 4.4 Reject Employer with Reason
- [ ] Find pending employer
- [ ] Click "Reject", enter rejection reason
- [ ] Status = "Rejected", reason shown in table

### 4.5 Re-approve Rejected Employer
- [ ] Click "Re-approve" on the rejected employer
- [ ] Status = "Approved", reason cleared

### 4.6 Toggle Trust on Approved Employer
- [ ] For an APPROVED employer, click "Remove Trust" / "Mark Trusted"
- [ ] Toggle flips correctly

---

## Flow 5: Job Posting Moderation

### 5.1 View Pending Job Postings
- [ ] Navigate to `/en/admin/job-postings`
- [ ] Filter by status tabs work
- [ ] Auto-published (audit) filter shows only auto-published APPROVED postings

### 5.2 Approve Job Posting
- [ ] Click "Approve" on a pending posting
- [ ] Status = "Approved"
- [ ] Audit entry: `jobPosting.approve`

### 5.3 Edit & Approve
- [ ] For a pending posting, click "Edit & Approve"
- [ ] Modify title and description
- [ ] Click "Save & Approve"
- [ ] Status = "Approved" with edited content

### 5.4 Reject Job Posting (with reason)
- [ ] Click "Reject" on a pending posting
- [ ] Enter rejection reason
- [ ] Verify rejection is persisted (Bug #1: this previously silently dropped the reason)

### 5.5 Re-approve Rejected Posting
- [ ] Click "Re-approve" on the rejected posting
- [ ] Status = "Approved"

---

## Flow 6: Staff Management

### 6.1 Invite Staff
- [ ] Navigate to `/en/admin/staff`
- [ ] Enter an email address, click "Send Invite"
- [ ] Verify invite is sent (Clerk invitation created)
- [ ] Audit entry: `staff.invite`

### 6.2 View Staff List
- [ ] See all CENTRE_STAFF and SUPER_ADMIN users
- [ ] Columns: ID, Role, Status (Active/Deactivated), Created date

### 6.3 Deactivate Staff
- [ ] Click "Deactivate" on a CENTRE_STAFF member
- [ ] Status changes to "Deactivated"
- [ ] Audit entry: `staff.deactivate`

### 6.4 Reactivate Staff
- [ ] Click "Reactivate" on the deactivated staff member
- [ ] Status changes to "Active"
- [ ] Audit entry: `staff.reactivate`

### 6.5 Permission Toggles
- [ ] Find the active CENTRE_STAFF member in permissions grid
- [ ] Toggle "Edit Courses" ON → verify green ON state
- [ ] Toggle "Approve Employers" ON
- [ ] Toggle "Approve Employers" OFF → verify red OFF state
- [ ] Audit entry: `staffPermission.set` for each toggle

### 6.6 Super Admin cannot be deactivated
- [ ] Super Admin row shows "—" in actions

---

## Flow 7: Flash News Management

- [ ] Create a flash news item with English text, link, no expiry
- [ ] Verify it appears in the list
- [ ] Toggle active/inactive
- [ ] Delete the item

---

## Flow 8: News & Events Management

- [ ] Create a News item with English body, publish now
- [ ] Verify it appears as "Published"
- [ ] Create an Event with a future event date, do not publish
- [ ] Verify it appears as "Draft"
- [ ] Toggle publish/unpublish
- [ ] Delete an item

---

## Flow 9: Certification Partners

- [ ] Create a certification partner with name and link
- [ ] Upload a logo image
- [ ] Verify it appears in the list
- [ ] Reorder using up/down arrows
- [ ] Delete the partner

---

## Cross-cutting Checks

- [ ] Every admin action appears in the audit log
- [ ] Public pages update after admin changes (course appears on public listing)
- [ ] Response errors show clear messages, not raw stack traces
- [ ] Malayalam fields accept and persist Unicode text
