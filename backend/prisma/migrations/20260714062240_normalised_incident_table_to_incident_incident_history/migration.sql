-- AlterTable
ALTER TABLE "Incident" ADD COLUMN     "errorMessage" TEXT,
ADD COLUMN     "queuedAt" INTEGER,
ADD COLUMN     "retryCount" INTEGER;

-- CreateTable
CREATE TABLE "IncidentHistory" (
    "id" TEXT NOT NULL,
    "IncidentId" TEXT NOT NULL,
    "stage" TEXT NOT NULL,
    "message" TEXT,
    "startedAt" TIMESTAMP(3),
    "completeAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IncidentHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "IncidentHistory" ADD CONSTRAINT "IncidentHistory_IncidentId_fkey" FOREIGN KEY ("IncidentId") REFERENCES "Incident"("id") ON DELETE CASCADE ON UPDATE CASCADE;
