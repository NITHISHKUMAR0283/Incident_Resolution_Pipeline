/*
  Warnings:

  - The values [IN_PROGRESS,RESOLVED] on the enum `IncidentStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "IncidentStatus_new" AS ENUM ('RECEIVED', 'PROCESSING', 'AI_ANALYZING', 'VALIDATING', 'PR_CREATED', 'FAILED', 'COMPLETED');
ALTER TABLE "public"."Incident" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Incident" ALTER COLUMN "status" TYPE "IncidentStatus_new" USING ("status"::text::"IncidentStatus_new");
ALTER TYPE "IncidentStatus" RENAME TO "IncidentStatus_old";
ALTER TYPE "IncidentStatus_new" RENAME TO "IncidentStatus";
DROP TYPE "public"."IncidentStatus_old";
ALTER TABLE "Incident" ALTER COLUMN "status" SET DEFAULT 'RECEIVED';
COMMIT;
