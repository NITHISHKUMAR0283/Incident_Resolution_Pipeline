-- CreateEnum
CREATE TYPE "Incidentseverity" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- AlterTable
ALTER TABLE "Incident" ADD COLUMN     "assignedTo" TEXT,
ADD COLUMN     "resolvedAt" TIMESTAMP(3),
ADD COLUMN     "severity" "Incidentseverity" NOT NULL DEFAULT 'MEDIUM',
ADD COLUMN     "source" TEXT,
ADD COLUMN     "stackTrace" TEXT;
