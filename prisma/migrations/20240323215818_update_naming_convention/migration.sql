/*
  Warnings:

  - You are about to drop the `AppliedJob` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "AppliedJob";

-- CreateTable
CREATE TABLE "applied_jobs" (
    "id" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "remote" "JobType" NOT NULL,
    "status" "JobStatus" NOT NULL,
    "isFavorite" BOOLEAN NOT NULL,
    "link" TEXT NOT NULL,
    "replied" BOOLEAN NOT NULL,
    "interviewRequired" BOOLEAN NOT NULL,
    "applicationQA" JSONB NOT NULL,
    "updates" JSONB NOT NULL,
    "appliedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "applied_jobs_pkey" PRIMARY KEY ("id")
);
