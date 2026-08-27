import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { createClerkClient } from "@clerk/backend";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL! });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY! });

/**
 * Creates deterministic test data for E2E flow testing.
 * Creates both Clerk users AND DB records.
 * Designed to be idempotent — safe to run repeatedly.
 *
 * Usage:
 *   npx tsx tests/e2e/flows/seed-e2e.ts
 *   CLERK_SECRET_KEY=sk_test_xxx npx tsx tests/e2e/flows/seed-e2e.ts
 */

// ── Fixed test IDs ──

export const TEST_IDS = {
  // Student
  studentUserId: "test_e2e_student",
  studentRecordId: "TEST001",
  studentFullName: "E2E Test Student",
  studentPhone: "9876500001",
  studentEmail: "student-e2e@test.com",

  // Job Seeker
  jobSeekerUserId: "test_e2e_job_seeker",
  jobSeekerEmail: "jobseeker-e2e@test.com",

  // Employer
  employerUserId: "test_e2e_employer",
  employerProfileId: "test_e2e_employer_profile",
  employerEmail: "employer-e2e@test.com",

  // Admin (Super Admin + Centre Staff)
  superAdminUserId: "test_e2e_super_admin",
  superAdminEmail: "superadmin-e2e@test.com",
  centreStaffUserId: "test_e2e_centre_staff",
  centreStaffEmail: "staff-e2e@test.com",

  // Test password (same for all test users)
  testPassword: "TestE2E@2024!Secure",

  // Courses
  testCourseSlug: "test-e2e-course",
  testCourseId: "test_e2e_course_id",

  // Job Posting
  testJobPostingId: "test_e2e_job_posting",

  // Skills
  testSkillLabel: "E2E Test Skill",

  // Academic Resource
  testResourceId: "test_e2e_resource",
} as const;

// ── Clerk user creation helpers ──

async function findOrCreateClerkUser(
  userId: string,
  email: string,
  role: "STUDENT" | "JOB_SEEKER" | "EMPLOYER" | "CENTRE_STAFF" | "SUPER_ADMIN",
) {
  // Try to find existing user by external ID
  try {
    const users = await clerk.users.getUserList({
      externalId: [userId],
      limit: 1,
    });
    if (users.data.length > 0) {
      console.log(`  ℹ Clerk user ${email} already exists`);
      return users.data[0].id;
    }
  } catch {
    // User doesn't exist — create below
  }

  const created = await clerk.users.createUser({
    externalId: userId,
    emailAddress: [email],
    password: TEST_IDS.testPassword,
    publicMetadata: { role },
    skipPasswordChecks: true,
  });
  console.log(`  ✅ Created Clerk user: ${email} (Clerk ID: ${created.id})`);
  return created.id;
}

async function deleteExistingClerkUser(userId: string): Promise<void> {
  try {
    const users = await clerk.users.getUserList({
      externalId: [userId],
      limit: 1,
    });
    if (users.data.length > 0) {
      await clerk.users.deleteUser(users.data[0].id);
      console.log(`  🗑 Deleted existing Clerk user: ${userId}`);
    }
  } catch {
    // Already gone or doesn't exist — fine
  }
}

// ── Main seed ──

async function seedTestData() {
  console.log("🌱 Seeding E2E test data...\n");

  // ── 0. Create Clerk users ──
  console.log("Creating Clerk users...");

  // Delete and recreate to ensure clean state
  await deleteExistingClerkUser(TEST_IDS.studentUserId);
  await deleteExistingClerkUser(TEST_IDS.jobSeekerUserId);
  await deleteExistingClerkUser(TEST_IDS.employerUserId);
  await deleteExistingClerkUser(TEST_IDS.superAdminUserId);
  await deleteExistingClerkUser(TEST_IDS.centreStaffUserId);

  const clerkStudentId = await findOrCreateClerkUser(
    TEST_IDS.studentUserId, TEST_IDS.studentEmail, "STUDENT",
  );
  const clerkJobSeekerId = await findOrCreateClerkUser(
    TEST_IDS.jobSeekerUserId, TEST_IDS.jobSeekerEmail, "JOB_SEEKER",
  );
  const clerkEmployerId = await findOrCreateClerkUser(
    TEST_IDS.employerUserId, TEST_IDS.employerEmail, "EMPLOYER",
  );
  const clerkSuperAdminId = await findOrCreateClerkUser(
    TEST_IDS.superAdminUserId, TEST_IDS.superAdminEmail, "SUPER_ADMIN",
  );
  const clerkCentreStaffId = await findOrCreateClerkUser(
    TEST_IDS.centreStaffUserId, TEST_IDS.centreStaffEmail, "CENTRE_STAFF",
  );

  console.log("");

  // ── 1. Users (DB-side records with Clerk IDs) ──
  const users = [
    { id: clerkStudentId, role: "STUDENT" as const },
    { id: clerkJobSeekerId, role: "JOB_SEEKER" as const },
    { id: clerkEmployerId, role: "EMPLOYER" as const },
    { id: clerkSuperAdminId, role: "SUPER_ADMIN" as const },
    { id: clerkCentreStaffId, role: "CENTRE_STAFF" as const },
  ];

  for (const u of users) {
    await prisma.user.upsert({
      where: { id: u.id },
      create: { id: u.id, role: u.role },
      update: { role: u.role },
    });
  }
  console.log(`  ✅ ${users.length} DB user records (mapped to Clerk IDs)`);

  // ── 2. Student Record ──
  await prisma.studentRecord.upsert({
    where: { studentId: TEST_IDS.studentRecordId },
    create: {
      studentId: TEST_IDS.studentRecordId,
      fullName: TEST_IDS.studentFullName,
      phone: TEST_IDS.studentPhone,
      email: TEST_IDS.studentEmail,
    },
    update: {
      fullName: TEST_IDS.studentFullName,
      phone: TEST_IDS.studentPhone,
      email: TEST_IDS.studentEmail,
    },
  });
  console.log("  ✅ Student record");

  // ── 3. Course ──
  await prisma.course.upsert({
    where: { slug: TEST_IDS.testCourseSlug },
    create: {
      id: TEST_IDS.testCourseId,
      slug: TEST_IDS.testCourseSlug,
      titleEn: "E2E Test Course",
      titleMl: "ഇ2ഇ ടെസ്റ്റ് കോഴ്സ്",
      descriptionEn: "A course for E2E testing",
      descriptionMl: "ഇ2ഇ ടെസ്റ്റിനുള്ള കോഴ്സ്",
      durationText: "3 months",
      certifications: ["Test Cert"],
      status: "PUBLISHED",
      contentBlocks: {
        heroTaglineEn: "Master E2E Testing",
        heroTaglineMl: "ഇ2ഇ ടെസ്റ്റിംഗ് മാസ്റ്റർ ചെയ്യുക",
        overviewEn: "This course covers everything about end-to-end testing.",
        overviewMl: "ഈ കോഴ്സ് എൻഡ്-ടു-എൻഡ് ടെസ്റ്റിംഗിനെക്കുറിച്ച് എല്ലാം ഉൾക്കൊള്ളുന്നു.",
        courseLists: [
          {
            heading: "Testing Modules",
            items: [
              { code: "E2E101", name: "Playwright Basics" },
              { code: "E2E102", name: "Clerk Auth Testing" },
              { code: "E2E103", name: "CI/CD Integration" },
            ],
          },
        ],
        benefits: {
          heading: "What you'll learn",
          items: [
            { textEn: "Write reliable E2E tests", textMl: "വിശ്വസനീയമായ ഇ2ഇ ടെസ്റ്റുകൾ എഴുതുക" },
            { textEn: "Test Clerk authentication", textMl: "ക്ലർക്ക് ഓഥെന്റിക്കേഷൻ ടെസ്റ്റ് ചെയ്യുക" },
          ],
        },
      },
    },
    update: {
      titleEn: "E2E Test Course",
      titleMl: "ഇ2ഇ ടെസ്റ്റ് കോഴ്സ്",
      status: "PUBLISHED",
    },
  });
  console.log("  ✅ Test course with content blocks");

  // ── 4. Skill ──
  await prisma.skill.upsert({
    where: { label: TEST_IDS.testSkillLabel },
    create: { label: TEST_IDS.testSkillLabel, status: "APPROVED" },
    update: { status: "APPROVED" },
  });
  console.log("  ✅ Test skill");

  const skill = await prisma.skill.findUnique({ where: { label: TEST_IDS.testSkillLabel } });

  // ── 5. Employer Profile (APPROVED) ──
  await prisma.employerProfile.upsert({
    where: { userId: clerkEmployerId },
    create: {
      id: TEST_IDS.employerProfileId,
      userId: clerkEmployerId,
      companyName: "E2E Test Corp",
      industrySector: "IT_SOFTWARE",
      contactPersonName: "Test Employer",
      designation: "HR Manager",
      phone: "9876500002",
      email: TEST_IDS.employerEmail,
      companyAddress: "Test Address, Kerala",
      hasWebsite: true,
      websiteUrl: "https://testcorp.com",
      employeeCountRange: "RANGE_11_50",
      aboutCompany: "A test company for E2E testing.",
      status: "APPROVED",
      autoPublishTrusted: true,
    },
    update: { status: "APPROVED", autoPublishTrusted: true },
  });
  console.log("  ✅ Approved employer profile");

  // ── 6. Job Posting (APPROVED) ──
  const deadline = new Date();
  deadline.setDate(deadline.getDate() + 30);

  await prisma.jobPosting.upsert({
    where: { id: TEST_IDS.testJobPostingId },
    create: {
      id: TEST_IDS.testJobPostingId,
      employerId: TEST_IDS.employerProfileId,
      title: "E2E Test Position",
      department: "QA",
      salaryMin: 300000,
      salaryMax: 600000,
      salaryVisibility: "DISCLOSE",
      jobType: "FULL_TIME",
      skillIds: skill ? [skill.id] : [],
      applicationDeadline: deadline,
      description: "A test job posting for E2E testing of the application flow.",
      status: "APPROVED",
    },
    update: {
      title: "E2E Test Position",
      status: "APPROVED",
      applicationDeadline: deadline,
      skillIds: skill ? [skill.id] : [],
    },
  });
  console.log("  ✅ Approved job posting (30-day deadline)");

  // ── 7. Candidate Profile for Job Seeker ──
  await prisma.candidateProfile.upsert({
    where: { userId: clerkJobSeekerId },
    create: {
      userId: clerkJobSeekerId,
      fullName: "E2E Job Seeker",
      phone: "9876500003",
      email: TEST_IDS.jobSeekerEmail,
      courseCompletedIds: [TEST_IDS.testCourseId],
      skillIds: skill ? [skill.id] : [],
      educationalQualification: "GRADUATE",
      profileVisible: true,
    },
    update: { fullName: "E2E Job Seeker", profileVisible: true },
  });
  console.log("  ✅ Job seeker candidate profile");

  // ── 8. Candidate Profile for Student ──
  const studentCandidateProfile = await prisma.candidateProfile.upsert({
    where: { userId: clerkStudentId },
    create: {
      userId: clerkStudentId,
      isVerifiedStudent: true,
      studentRecordId: TEST_IDS.studentRecordId,
      fullName: TEST_IDS.studentFullName,
      phone: TEST_IDS.studentPhone,
      email: TEST_IDS.studentEmail,
      courseCompletedIds: [TEST_IDS.testCourseId],
      skillIds: skill ? [skill.id] : [],
      educationalQualification: "PLUS_TWO",
      profileVisible: true,
    },
    update: {
      fullName: TEST_IDS.studentFullName,
      isVerifiedStudent: true,
      studentRecordId: TEST_IDS.studentRecordId,
      profileVisible: true,
    },
  });
  console.log("  ✅ Student candidate profile");

  // ── 9. Course Enrollment ──
  await prisma.studentCourseEnrollment.upsert({
    where: {
      studentProfileId_courseId: {
        studentProfileId: studentCandidateProfile.id,
        courseId: TEST_IDS.testCourseId,
      },
    },
    create: {
      studentProfileId: studentCandidateProfile.id,
      courseId: TEST_IDS.testCourseId,
    },
    update: {},
  });
  console.log("  ✅ Student course enrollment");

  // ── 10. Academic Resources ──
  await prisma.academicResource.upsert({
    where: { id: TEST_IDS.testResourceId },
    create: {
      id: TEST_IDS.testResourceId,
      courseId: TEST_IDS.testCourseId,
      type: "NOTE",
      title: "E2E Test Study Notes",
      fileUrl: "https://example.com/test-notes.pdf",
    },
    update: { title: "E2E Test Study Notes" },
  });
  console.log("  ✅ Academic resource");

  // ── 11. Staff Permission for Centre Staff ──
  await prisma.staffPermission.upsert({
    where: { userId: clerkCentreStaffId },
    create: {
      userId: clerkCentreStaffId,
      canEditCourses: true,
      canEditGallery: true,
      canEditCertificationPartners: true,
      canEditNewsEvents: true,
      canEditFlashNews: true,
      canProvisionStudents: true,
      canApproveEmployers: true,
      canApproveJobPostings: true,
      canModerateSkillsTaxonomy: true,
    },
    update: {
      canEditCourses: true,
      canEditGallery: true,
      canEditCertificationPartners: true,
      canEditNewsEvents: true,
      canEditFlashNews: true,
      canProvisionStudents: true,
      canApproveEmployers: true,
      canApproveJobPostings: true,
      canModerateSkillsTaxonomy: true,
    },
  });
  console.log("  ✅ Centre staff permissions (all enabled)");

  // ── 12. Flash News ──
  const existingFlashNews = await prisma.flashNewsItem.findFirst({
    where: { textEn: "E2E Test: New batch starting soon!" },
  });
  if (!existingFlashNews) {
    await prisma.flashNewsItem.create({
      data: {
        textEn: "E2E Test: New batch starting soon!",
        textMl: "ഇ2ഇ ടെസ്റ്റ്: പുതിയ ബാച്ച് ഉടൻ ആരംഭിക്കുന്നു!",
        active: true,
        sortOrder: 999,
      },
    });
  }
  console.log("  ✅ Flash news item");

  // ── 13. SiteSettings ──
  const existingSettings = await prisma.siteSettings.findFirst();
  if (!existingSettings) {
    await prisma.siteSettings.create({
      data: {
        yearsInOperation: "25+",
        studentsTrained: "15000+",
        centresWorldwide: "120+",
        affiliations: "50+",
        countries: "23",
        aboutBodyEn: "E2E test about section.",
        address: "E2E Test Address, Kerala",
      },
    });
  }
  console.log("  ✅ Site settings\n");

  console.log("🎉 E2E test data seed complete!\n");
  console.log("Clerk user credentials (for manual testing):");
  console.log(`  Student:      ${TEST_IDS.studentEmail} / ${TEST_IDS.testPassword}`);
  console.log(`  Job Seeker:   ${TEST_IDS.jobSeekerEmail} / ${TEST_IDS.testPassword}`);
  console.log(`  Employer:     ${TEST_IDS.employerEmail} / ${TEST_IDS.testPassword}`);
  console.log(`  Super Admin:  ${TEST_IDS.superAdminEmail} / ${TEST_IDS.testPassword}`);
  console.log(`  Centre Staff: ${TEST_IDS.centreStaffEmail} / ${TEST_IDS.testPassword}`);
  console.log(`\nClerk IDs (for Agent Tasks):`);
  console.log(`  student:      ${clerkStudentId}`);
  console.log(`  job_seeker:   ${clerkJobSeekerId}`);
  console.log(`  employer:     ${clerkEmployerId}`);
  console.log(`  super_admin:  ${clerkSuperAdminId}`);
  console.log(`  centre_staff: ${clerkCentreStaffId}`);
}

seedTestData()
  .catch((e) => {
    console.error("E2E seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
