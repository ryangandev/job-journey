/*
  Warnings:

  - You are about to drop the `applied_jobs` table. If the table is not empty, all the data it contains will be lost.

*/
-- Manually modified migration to rename table and column without dropping data

-- Rename the `applied_jobs` table to `applications`
ALTER TABLE "applied_jobs" RENAME TO "applications";

-- Assuming you want to rename a column, for example, from `remote` to `type`
ALTER TABLE "applications" RENAME COLUMN "remote" TO "type";
