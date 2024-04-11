/*
  Warnings:

  - You are about to alter the column `company` on the `applications` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(40)`.
  - You are about to alter the column `title` on the `applications` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(40)`.
  - You are about to alter the column `location` on the `applications` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(40)`.
  - You are about to alter the column `salary` on the `applications` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(40)`.
  - You are about to alter the column `link` on the `applications` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(4000)`.

*/
-- AlterTable
ALTER TABLE "applications" ALTER COLUMN "company" SET DATA TYPE VARCHAR(40),
ALTER COLUMN "title" SET DATA TYPE VARCHAR(40),
ALTER COLUMN "location" SET DATA TYPE VARCHAR(40),
ALTER COLUMN "salary" SET DATA TYPE VARCHAR(40),
ALTER COLUMN "link" SET DEFAULT 'N/A',
ALTER COLUMN "link" SET DATA TYPE VARCHAR(4000);
