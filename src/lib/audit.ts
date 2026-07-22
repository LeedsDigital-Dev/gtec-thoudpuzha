import { prisma } from "@/lib/db";
import { Role } from "@/lib/auth";
import type { Prisma } from "@prisma/client";

interface LogAdminActionInput {
  actorUserId: string;
  actorRole: Role;
  action: string;
  entityType: string;
  entityId: string;
  metadata?: Record<string, unknown>;
}

export async function logAdminAction({
  actorUserId,
  actorRole,
  action,
  entityType,
  entityId,
  metadata,
}: LogAdminActionInput): Promise<void> {
  try {
    await prisma.auditLogEntry.create({
      data: {
        actorUserId,
        actorRole,
        action,
        entityType,
        entityId,
        metadata: metadata as Prisma.InputJsonValue | undefined,
      },
    });
  } catch (error) {
    console.error("[audit] failed to write audit log entry:", error);
  }
}
