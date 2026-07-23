import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import {
  CATEGORIES,
  COURSES,
  CERTIFICATION_PARTNERS,
  GALLERY_CATEGORIES,
  WHY_CHOOSE_US_CARDS,
  NEWS_EVENTS,
} from "./seed-data";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
});

function slugFromName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function findOrCreateCategoryId(
  nameEn: string,
  nameMl: string | null,
  sortOrder: number,
): Promise<string> {
  const existing = await prisma.courseCategory.findFirst({ where: { nameEn } });
  if (existing) {
    await prisma.courseCategory.update({
      where: { id: existing.id },
      data: { nameMl, sortOrder },
    });
    return existing.id;
  }
  const created = await prisma.courseCategory.create({
    data: { nameEn, nameMl, sortOrder },
  });
  return created.id;
}

async function main() {
  console.log("G-TEC Thodupuzha — Production seed\n");

  /* 1. Course Categories */
  console.log("Seeding course categories...");
  const categoryIdMap = new Map<string, string>();
  for (const cat of CATEGORIES) {
    const id = await findOrCreateCategoryId(
      cat.nameEn,
      cat.nameMl,
      CATEGORIES.indexOf(cat) + 1,
    );
    categoryIdMap.set(cat.nameEn, id);
  }
  console.log(`  OK: ${CATEGORIES.length} categories\n`);

  /* 2. Courses */
  console.log("Seeding courses...");
  for (const course of COURSES) {
    const categoryId = categoryIdMap.get(course.categoryName) ?? null;
    const slug = slugFromName(course.titleEn);
    await prisma.course.upsert({
      where: { slug },
      create: {
        slug,
        categoryId,
        titleEn: course.titleEn,
        titleMl: course.titleMl,
        descriptionEn: course.descriptionEn,
        descriptionMl: course.descriptionMl,
        durationText: course.durationText,
        certifications: course.certifications,
        careerOutcomesEn: course.careerOutcomesEn,
        careerOutcomesMl: course.careerOutcomesMl,
        featured: course.featured,
        status: course.status,
      },
      update: {
        categoryId,
        titleEn: course.titleEn,
        titleMl: course.titleMl,
        descriptionEn: course.descriptionEn,
        descriptionMl: course.descriptionMl,
        durationText: course.durationText,
        certifications: course.certifications,
        careerOutcomesEn: course.careerOutcomesEn,
        careerOutcomesMl: course.careerOutcomesMl,
        featured: course.featured,
        status: course.status,
      },
    });
  }
  console.log(`  OK: ${COURSES.length} courses\n`);

  /* 3. Certification Partners */
  console.log("Seeding certification partners...");
  for (const partner of CERTIFICATION_PARTNERS) {
    const existing = await prisma.certificationPartner.findFirst({
      where: { name: partner.name },
    });
    if (existing) {
      await prisma.certificationPartner.update({
        where: { id: existing.id },
        data: {
          nameMl: partner.nameMl,
          link: partner.link,
          sortOrder: CERTIFICATION_PARTNERS.indexOf(partner),
        },
      });
    } else {
      await prisma.certificationPartner.create({
        data: {
          name: partner.name,
          nameMl: partner.nameMl,
          link: partner.link,
          logoUrl: `cert-partners/${slugFromName(partner.name)}.png`,
          sortOrder: CERTIFICATION_PARTNERS.indexOf(partner),
        },
      });
    }
  }
  console.log(`  OK: ${CERTIFICATION_PARTNERS.length} partners\n`);

  /* 4. Gallery Categories */
  console.log("Seeding gallery categories...");
  for (const gc of GALLERY_CATEGORIES) {
    await prisma.galleryCategory.upsert({
      where: { slug: gc.slug },
      create: {
        slug: gc.slug,
        nameEn: gc.nameEn,
        nameMl: gc.nameMl,
        sortOrder: GALLERY_CATEGORIES.indexOf(gc),
      },
      update: {
        nameEn: gc.nameEn,
        nameMl: gc.nameMl,
        sortOrder: GALLERY_CATEGORIES.indexOf(gc),
      },
    });
  }
  console.log(`  OK: ${GALLERY_CATEGORIES.length} gallery categories\n`);

  /* 5. SiteSettings + At a Glance + Why Choose Us */
  console.log("Seeding site settings...");
  const settingsData = {
    yearsInOperation: "20+",
    studentsTrained: "15000+",
    centresWorldwide: "120+",
    affiliations: "50+",
    countries: "23",
    aboutBodyEn:
      "G-TEC Education Thodupuzha is a premier training centre offering industry-relevant courses in IT, multimedia, accounting, language, and professional development. With a commitment to quality education and student success, we have trained thousands of professionals who now work across India and abroad.\n\nOur ISO 9001:2015 certified processes, experienced faculty, and state-of-the-art facilities ensure that every student receives the best possible learning experience. We combine theoretical knowledge with practical, hands-on training to prepare students for real-world challenges.\n\nLocated in the heart of Thodupuzha, our centre serves students from across Idukki district and beyond, providing accessible, affordable, and high-quality education that transforms careers.",
    aboutBodyMl:
      "ഐടി, മൾട്ടിമീഡിയ, അക്കൗണ്ടിംഗ്, ഭാഷ, പ്രൊഫഷണൽ ഡെവലപ്മെന്റ് എന്നീ മേഖലകളിൽ വ്യവസായത്തിന് അനുയോജ്യമായ കോഴ്സുകൾ വാഗ്ദാനം ചെയ്യുന്ന ഒരു മുൻനിര പരിശീലന കേന്ദ്രമാണ് ജി-ടെക് എജ്യുക്കേഷൻ തൊടുപുഴ.",
    address:
      "G-TEC Education, Near Municipal Office, Thodupuzha, Idukki District, Kerala - 685584",
  };

  const existingSettings = await prisma.siteSettings.findFirst({
    include: { whyChooseUsCards: { orderBy: { sortOrder: "asc" } } },
  });
  let settingsId: string;
  if (!existingSettings) {
    const created = await prisma.siteSettings.create({ data: settingsData });
    settingsId = created.id;
  } else {
    await prisma.siteSettings.update({
      where: { id: existingSettings.id },
      data: settingsData,
    });
    settingsId = existingSettings.id;
  }

  /* Sync Why Choose Us cards — replace with seed data */
  const existingCards = existingSettings?.whyChooseUsCards ?? [];
  for (const card of existingCards) {
    await prisma.whyChooseUsCard.delete({ where: { id: card.id } });
  }
  for (let i = 0; i < WHY_CHOOSE_US_CARDS.length; i++) {
    const card = WHY_CHOOSE_US_CARDS[i];
    await prisma.whyChooseUsCard.create({
      data: {
        siteSettingsId: settingsId,
        sortOrder: i,
        icon: card.icon,
        titleEn: card.titleEn,
        titleMl: card.titleMl,
        descriptionEn: card.descriptionEn,
        descriptionMl: card.descriptionMl,
      },
    });
  }
  console.log(
    `  OK: SiteSettings + ${WHY_CHOOSE_US_CARDS.length} Why Choose Us cards\n`,
  );

  /* 6. News & Events */
  console.log("Seeding news & events...");
  for (const ne of NEWS_EVENTS) {
    const eventDate = ne.type === "EVENT" ? new Date("2025-08-15") : null;
    await prisma.newsEvent.upsert({
      where: { slug: ne.slug },
      create: {
        type: ne.type,
        titleEn: ne.titleEn,
        titleMl: ne.titleMl,
        bodyEn: ne.bodyEn,
        bodyMl: ne.bodyMl,
        slug: ne.slug,
        eventDate,
        publishedAt: new Date("2025-07-01"),
      },
      update: {
        titleEn: ne.titleEn,
        titleMl: ne.titleMl,
        bodyEn: ne.bodyEn,
        bodyMl: ne.bodyMl,
        eventDate,
        publishedAt: new Date("2025-07-01"),
      },
    });
  }
  console.log(`  OK: ${NEWS_EVENTS.length} news/events\n`);

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
