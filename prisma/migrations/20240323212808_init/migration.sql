-- CreateEnum
CREATE TYPE "JobType" AS ENUM ('on_site', 'remote');

-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('applied', 'interviewing', 'offered', 'rejected', 'ghosted');

-- CreateTable
CREATE TABLE "AppliedJob" (
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

    CONSTRAINT "AppliedJob_pkey" PRIMARY KEY ("id")
);
