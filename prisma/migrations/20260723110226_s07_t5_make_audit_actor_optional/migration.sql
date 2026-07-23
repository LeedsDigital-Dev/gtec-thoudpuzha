-- DropForeignKey
ALTER TABLE "AuditLogEntry" DROP CONSTRAINT "AuditLogEntry_actorUserId_fkey";

-- AlterTable
ALTER TABLE "AuditLogEntry" ALTER COLUMN "actorUserId" DROP NOT NULL,
ALTER COLUMN "actorRole" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "AuditLogEntry" ADD CONSTRAINT "AuditLogEntry_actorUserId_fkey" FOREIGN KEY ("actorUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
