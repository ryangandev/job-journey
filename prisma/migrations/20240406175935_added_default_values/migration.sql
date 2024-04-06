-- AlterTable
ALTER TABLE "applications" ALTER COLUMN "status" SET DEFAULT 'applied',
ALTER COLUMN "isFavorite" SET DEFAULT false,
ALTER COLUMN "replied" SET DEFAULT false,
ALTER COLUMN "interviewAquired" SET DEFAULT false;
