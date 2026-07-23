"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireRole, Role } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { logAdminAction } from "@/lib/audit";

function localeFromFormData(formData: FormData): string {
  return (formData.get("locale") as string) || "en";
}

export async function createStudentRecord(formData: FormData) {
  const authResult = await requireRole([Role.CENTRE_STAFF, Role.SUPER_ADMIN]);
  if (!authResult.authorized) {
    redirect(`/${localeFromFormData(formData)}/forbidden`);
  }

  const studentId = (formData.get("studentId") as string)?.trim();
  const fullName = (formData.get("fullName") as string)?.trim();
  const phone = (formData.get("phone") as string)?.trim();

  if (!studentId || !fullName || !phone) {
    throw new Error("studentId, fullName, and phone are required");
  }

  const existing = await prisma.studentRecord.findUnique({
    where: { studentId },
  });
  if (existing) {
    throw new Error(`Student ID "${studentId}" already exists`);
  }

  const record = await prisma.studentRecord.create({
    data: { studentId, fullName, phone },
  });

  await logAdminAction({
    actorUserId: authResult.userId,
    actorRole: authResult.role,
    action: "studentRecord.create",
    entityType: "StudentRecord",
    entityId: record.id,
    metadata: { studentId, fullName, phone },
  });

  revalidatePath(`/${localeFromFormData(formData)}/admin/students`);
}

export interface CsvRowResult {
  row: number;
  studentId: string;
  success: boolean;
  error?: string;
}

export async function bulkImportStudents(formData: FormData) {
  const authResult = await requireRole([Role.CENTRE_STAFF, Role.SUPER_ADMIN]);
  if (!authResult.authorized) {
    redirect(`/${localeFromFormData(formData)}/forbidden`);
  }

  const csvContent = formData.get("csv") as string;
  if (!csvContent) {
    throw new Error("CSV content is required");
  }

  const lines = csvContent
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  // Skip header row if first line looks like a header
  const startIndex =
    lines.length > 0 &&
    lines[0].toLowerCase().includes("studentid")
      ? 1
      : 0;

  const results: CsvRowResult[] = [];
  let createdCount = 0;

  for (let i = startIndex; i < lines.length; i++) {
    const rowNumber = i + 1;
    const parts = parseCsvLine(lines[i]);

    if (parts.length < 3) {
      results.push({
        row: rowNumber,
        studentId: parts[0] ?? "",
        success: false,
        error: "Invalid row: expected studentId,fullName,phone",
      });
      continue;
    }

    const [studentId, fullName, phone] = parts.map((p) => p.trim());

    if (!studentId || !fullName || !phone) {
      results.push({
        row: rowNumber,
        studentId: studentId ?? "",
        success: false,
        error: "Missing required field(s)",
      });
      continue;
    }

    try {
      const existing = await prisma.studentRecord.findUnique({
        where: { studentId },
      });
      if (existing) {
        results.push({
          row: rowNumber,
          studentId,
          success: false,
          error: `Duplicate studentId "${studentId}"`,
        });
        continue;
      }

      await prisma.studentRecord.create({
        data: { studentId, fullName, phone },
      });

      results.push({ row: rowNumber, studentId, success: true });
      createdCount++;
    } catch (err) {
      results.push({
        row: rowNumber,
        studentId,
        success: false,
        error:
          err instanceof Error ? err.message : "Unknown error",
      });
    }
  }

  const totalRows = lines.length - startIndex;
  const failedCount = results.filter((r) => !r.success).length;
  const existingCount = results.filter(
    (r) => !r.success && r.error?.startsWith("Duplicate"),
  ).length;

  await logAdminAction({
    actorUserId: authResult.userId,
    actorRole: authResult.role,
    action: "studentRecord.bulkImport",
    entityType: "StudentRecord",
    entityId: "bulk",
    metadata: {
      totalRows,
      createdCount,
      failedCount,
      existingCount,
      results: results.map((r) => ({
        row: r.row,
        studentId: r.studentId,
        success: r.success,
        error: r.error,
      })),
    },
  });

  revalidatePath(`/${localeFromFormData(formData)}/admin/students`);

  return results;
}

/**
 * Wrapper around bulkImportStudents for use as a form action.
 * Form action props must return void | Promise<void>, so this discards
 * the CsvRowResult[] return value that bulkImportStudents produces.
 */
export async function bulkImportStudentsAction(formData: FormData) {
  await bulkImportStudents(formData);
}

/** Simple CSV line parser that handles quoted fields. */
function parseCsvLine(line: string): string[] {
  const fields: string[] = [];
  let current = "";
  let inQuotes = false;

  for (const char of line) {
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      fields.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  fields.push(current);
  return fields;
}
