import { prisma } from "@/lib/db";
import { logSystemAction } from "@/lib/audit";

export async function closeExpiredPostings(): Promise<{ closed: number }> {
  const expiredPostings = await prisma.jobPosting.findMany({
    where: {
      status: "APPROVED",
      deletedAt: null,
      applicationDeadline: { lt: new Date() },
    },
  });

  if (expiredPostings.length === 0) return { closed: 0 };

  const ids = expiredPostings.map((p) => p.id);

  await prisma.jobPosting.updateMany({
    where: { id: { in: ids } },
    data: { status: "CLOSED" },
  });

  await Promise.all(
    expiredPostings.map((p) =>
      logSystemAction({
        action: "VACANCY_AUTO_CLOSE",
        entityType: "JobPosting",
        entityId: p.id,
        metadata: {
          title: p.title,
          employerId: p.employerId,
          deadline: p.applicationDeadline.toISOString(),
        },
      }),
    ),
  );

  return { closed: ids.length };
}
