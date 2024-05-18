-- CreateEnum
CREATE TYPE "ProfilePlatform" AS ENUM ('discord', 'github', 'gmail', 'hackerrank', 'leetcode', 'linkedin', 'twitter', 'portfolio');

-- CreateTable
CREATE TABLE "profile_links" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "profile_links_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "profile_links" ADD CONSTRAINT "profile_links_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
