import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
});

function slugFromName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function main() {
  const slug = slugFromName("Placement & Support");

  const existing = await prisma.galleryCategory.findUnique({
    where: { slug },
  });

  if (existing) {
    console.log(`✓ Gallery category "${existing.nameEn}" already exists (slug: ${slug})`);
    return;
  }

  const maxOrder = await prisma.galleryCategory.aggregate({
    _max: { sortOrder: true },
  });

  await prisma.galleryCategory.create({
    data: {
      slug,
      nameEn: "Placement & Support",
      nameMl: null,
      sortOrder: (maxOrder._max.sortOrder ?? 0) + 1,
    },
  });

  console.log(`✓ Created gallery category "Placement & Support" (slug: ${slug})`);
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
