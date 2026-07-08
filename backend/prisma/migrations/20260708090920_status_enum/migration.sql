/*
  Warnings:

  - The `status` column on the `Incident` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "IncidentStatus" AS ENUM ('RECEIVED', 'IN_PROGRESS', 'RESOLVED', 'FAILED');

-- AlterTable
ALTER TABLE "Incident" DROP COLUMN "status",
ADD COLUMN     "status" "IncidentStatus" NOT NULL DEFAULT 'RECEIVED';
