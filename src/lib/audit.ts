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

interface LogSystemActionInput {
  action: string;
  entityType: string;
  entityId: string;
  metadata?: Record<string, unknown>;
}

/**
 * Write a system-level audit log entry (actorUserId = null).
 *
 * This documents automated/system actions (e.g. scheduled job auto-closing
 * expired vacancies) without attributing them to any user. The convention
 * "actorUserId = null" signals a system actor; do NOT set it to a literal
 * "system" string, as AuditLogEntry.actorUserId is a FK to User and would
 * fail the FK constraint.
 */
export async function logSystemAction({
  action,
  entityType,
  entityId,
  metadata,
}: LogSystemActionInput): Promise<void> {
  try {
    await prisma.auditLogEntry.create({
      data: {
        actorUserId: null,
        actorRole: null,
        action,
        entityType,
        entityId,
        metadata: metadata as Prisma.InputJsonValue | undefined,
      },
    });
  } catch (error) {
    console.error("[audit] failed to write system audit log entry:", error);
  }
}
