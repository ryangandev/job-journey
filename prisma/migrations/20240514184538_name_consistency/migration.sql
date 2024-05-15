-- Drop the existing foreign key constraint
ALTER TABLE "applications" DROP CONSTRAINT "applications_userId_fkey";

-- Rename columns in "applications" table
ALTER TABLE "applications" RENAME COLUMN "appliedAt" TO "applied_at";
ALTER TABLE "applications" RENAME COLUMN "interviewAquired" TO "interview_aquired";
ALTER TABLE "applications" RENAME COLUMN "isFavorite" TO "is_favorite";
ALTER TABLE "applications" RENAME COLUMN "updatedAt" TO "updated_at";
ALTER TABLE "applications" RENAME COLUMN "userId" TO "user_id";

-- Rename column in "users" table
ALTER TABLE "users" RENAME COLUMN "avatarImage" TO "avatar_image";

-- Add the foreign key constraint back
ALTER TABLE "applications" ADD CONSTRAINT "applications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
