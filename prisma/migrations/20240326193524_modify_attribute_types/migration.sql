/*
  Warnings:

  - The `applicationQA` column on the `applications` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `updates` column on the `applications` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "applications" DROP COLUMN "applicationQA",
ADD COLUMN     "applicationQA" JSONB[],
DROP COLUMN "updates",
ADD COLUMN     "updates" TEXT[];
