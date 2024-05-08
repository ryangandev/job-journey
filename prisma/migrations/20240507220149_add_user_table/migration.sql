-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" VARCHAR(20) NOT NULL,
    "lastName" VARCHAR(20) NOT NULL,
    "avatar" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

INSERT INTO "User" ("id", "email", "password", "firstName", "lastName", "avatar") 
VALUES ('3f0c7659-b023-422b-9b49-9b9d43cf2e26', 'ryangan.dev@gmail.com', '$2y$10$U/B9JJ.frTooDhhvvAOp/eEcEc9rLiurXV2XTkzhH/izvGyruP1Qe', 'Ryan', 'Gan', NULL);

-- AlterTable
ALTER TABLE "applications" ADD COLUMN "userId" TEXT;

-- Update Applications to Set userId
UPDATE "applications" SET "userId" = '3f0c7659-b023-422b-9b49-9b9d43cf2e26';

-- Alter userId Column to Not Null
ALTER TABLE "applications" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
