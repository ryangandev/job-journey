/*
  Warnings:

  - You are about to drop the column `username` on the `users` table. All the data in the column will be lost.
  - Made the column `company` on table `applications` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title` on table `applications` required. This step will fail if there are existing NULL values in that column.
  - Made the column `location` on table `applications` required. This step will fail if there are existing NULL values in that column.
  - Made the column `salary` on table `applications` required. This step will fail if there are existing NULL values in that column.
  - Made the column `link` on table `applications` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "applications" 
ALTER COLUMN "company" SET NOT NULL,
ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "location" SET NOT NULL,
ALTER COLUMN "salary" SET NOT NULL,
ALTER COLUMN "link" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" 
RENAME COLUMN "username" to "name";
