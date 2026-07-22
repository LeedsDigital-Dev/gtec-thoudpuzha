# Build server-side PDF generation for 'Download Biodata as PDF' (react-pdf)

**ID:** `s05-t3`  
**Sprint:** Sprint 5 - Student Biodata / Candidate Profile  
**Epic:** Student Biodata / Candidate Profile  
**Track:** Backend  
**Priority:** Must Have  
**Story Points:** 5  
**Depends on:** s05-t1  
**Model tier:** premium — Access control correctness (self vs. employer vs. other-candidate) on a PII export endpoint.  

## Manual Prerequisites
- [ ] None

## Task Breakdown

```
Read AGENTS.md first. Build the employer-ready PDF export of a candidate's Biodata.

Requirements:
- Build a React PDF document template (@react-pdf/renderer) rendering all Biodata fields in a clean, employer-readable layout.
- Build a route handler (e.g. GET /api/biodata/[candidateId]/pdf) that generates the PDF server-side and streams it as a download. Must verify the requester is EITHER the candidate themselves OR an authenticated EMPLOYER (needed for Sprint 8's candidate search) — reject anyone else, including other candidates browsing by guessed ID.
- The "Download as PDF" button lives on the BiodataForm page for the candidate's own use.
- Handle an incomplete profile gracefully — render whatever fields are filled, never crash.

Write tests (Vitest) covering:
1. Generating a PDF for a complete profile succeeds and returns a valid PDF buffer/stream.
2. Generating a PDF for an incomplete profile succeeds without throwing.
3. A student-role user attempting to download ANOTHER candidate's PDF by guessing a different candidateId is rejected.
4. An employer-role user CAN successfully download another candidate's PDF — this access pattern is intentional.

Definition of done: PDF generation works for complete and incomplete profiles, access control correctly distinguishes "self" and "employer" from "other candidate", and all 4 tests pass.
```

## Definition of Done
- [ ] PDF template renders all Biodata fields cleanly
- [ ] Download route streams a valid PDF
- [ ] Incomplete profiles render without crashing
- [ ] Access control: self OR employer only, not other candidates
- [ ] All 4 tests pass in CI
