/*
  Warnings:

  - The `queuedAt` column on the `Incident` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `IncidentId` on the `IncidentHistory` table. All the data in the column will be lost.
  - You are about to drop the column `completeAt` on the `IncidentHistory` table. All the data in the column will be lost.
  - Added the required column `incidentId` to the `IncidentHistory` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `stage` on the `IncidentHistory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "IncidentHistory" DROP CONSTRAINT "IncidentHistory_IncidentId_fkey";

-- AlterTable
ALTER TABLE "Incident" DROP COLUMN "queuedAt",
ADD COLUMN     "queuedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "IncidentHistory" DROP COLUMN "IncidentId",
DROP COLUMN "completeAt",
ADD COLUMN     "completedAt" TIMESTAMP(3),
ADD COLUMN     "incidentId" TEXT NOT NULL,
DROP COLUMN "stage",
ADD COLUMN     "stage" "IncidentStatus" NOT NULL;

-- AddForeignKey
ALTER TABLE "IncidentHistory" ADD CONSTRAINT "IncidentHistory_incidentId_fkey" FOREIGN KEY ("incidentId") REFERENCES "Incident"("id") ON DELETE CASCADE ON UPDATE CASCADE;
