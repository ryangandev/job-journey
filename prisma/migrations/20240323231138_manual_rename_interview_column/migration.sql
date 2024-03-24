/*
  Warnings:

  - You are about to drop the column `interviewRequired` on the `applied_jobs` table. All the data in the column will be lost.
  - Added the required column `interviewAquired` to the `applied_jobs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "applied_jobs" RENAME COLUMN "interviewRequired" TO "interviewAquired";

