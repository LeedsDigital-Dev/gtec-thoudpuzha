"use server";

import { prisma } from "@/lib/db";

export type SkillDto = {
  id: string;
  label: string;
  status: string;
  createdAt: Date;
};

export async function getApprovedSkills(): Promise<SkillDto[]> {
  return prisma.skill.findMany({
    where: { status: "APPROVED" },
    orderBy: { label: "asc" },
    select: { id: true, label: true, status: true, createdAt: true },
  });
}

export async function getSkillsByIds(
  ids: string[],
): Promise<SkillDto[]> {
  if (ids.length === 0) return [];
  return prisma.skill.findMany({
    where: { id: { in: ids } },
    select: { id: true, label: true, status: true, createdAt: true },
  });
}

export async function createPENDINGSkill(
  label: string,
): Promise<SkillDto> {
  return prisma.skill.create({
    data: { label, status: "PENDING" },
    select: { id: true, label: true, status: true, createdAt: true },
  });
}
