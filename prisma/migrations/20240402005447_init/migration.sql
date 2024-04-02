-- CreateEnum
CREATE TYPE "JobSetting" AS ENUM ('on_site', 'remote', 'hybrid');

-- CreateEnum
CREATE TYPE "JobType" AS ENUM ('full_time', 'part_time', 'contract', 'freelance');

-- CreateEnum
CREATE TYPE "JobLevel" AS ENUM ('intern', 'entry', 'junior', 'associate', 'mid', 'mid_senior', 'senior', 'lead', 'manager', 'director', 'executive');

-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('applied', 'interviewing', 'offered', 'rejected', 'ghosted');

-- CreateTable
CREATE TABLE "applications" (
    "id" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "setting" "JobSetting" NOT NULL DEFAULT 'on_site',
    "type" "JobType" NOT NULL DEFAULT 'full_time',
    "level" "JobLevel" NOT NULL DEFAULT 'entry',
    "status" "JobStatus" NOT NULL,
    "isFavorite" BOOLEAN NOT NULL,
    "replied" BOOLEAN NOT NULL,
    "interviewAquired" BOOLEAN NOT NULL,
    "appliedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "salary" TEXT NOT NULL DEFAULT 'N/A',
    "link" TEXT NOT NULL,
    "applicationQA" JSONB[],
    "updates" JSONB[],

    CONSTRAINT "applications_pkey" PRIMARY KEY ("id")
);
