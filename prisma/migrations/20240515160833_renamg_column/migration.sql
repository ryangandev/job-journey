/*
  Warnings:

  - You are about to drop the column `avatar_image` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" 
RENAME COLUMN "avatar_image" TO "image";
